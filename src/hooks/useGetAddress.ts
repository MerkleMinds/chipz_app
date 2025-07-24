import { useEffect, useState, useCallback } from "react";
import { createWalletClient, custom } from "viem";
import { getNetworkConfig } from "@/utils/networkConfig";

export default function useGetAddress() {
  const [address, setAddress] = useState<`0x${string}` | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Function to connect wallet using Viem
  const connectWallet = useCallback(async () => {
    setIsConnecting(true);
    try {
      if (window && window.ethereum) {
        // Create a wallet client using Viem
        const client = createWalletClient({
          chain: getNetworkConfig(window.ethereum.isMiniPay), // Use appropriate chain based on environment
          transport: custom(window.ethereum)
        });
        
        // Get addresses (this will prompt the user if not already connected)
        const addresses = await client.getAddresses();
        
        if (addresses && addresses.length > 0) {
          setAddress(addresses[0]);
        }
      }
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    } finally {
      setIsConnecting(false);
    }
  }, []);

  // Auto-connect on mount
  useEffect(() => {
    const autoConnect = async () => {
      if (window && window.ethereum) {
        try {
          // Create a wallet client using Viem
          const client = createWalletClient({
            chain: getNetworkConfig(window.ethereum.isMiniPay),
            transport: custom(window.ethereum)
          });
          
          // Try to get addresses without prompting
          // This will only return addresses if the user is already connected
          const addresses = await client.getAddresses().catch(() => []);
          
          if (addresses && addresses.length > 0) {
            // User is already connected
            setAddress(addresses[0]);
          } else if (window.ethereum.isMiniPay) {
            // If using MiniPay and not connected, try to connect automatically
            connectWallet();
          }
        } catch (error) {
          console.error("Error auto-connecting to wallet:", error);
        }
      }
    };

    autoConnect();

    // Listen for account changes
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        // User disconnected
        setAddress(null);
      } else {
        // Account changed
        setAddress(accounts[0] as `0x${string}`);
      }
    };

    if (window && window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    return () => {
      // Clean up listener
      if (window && window.ethereum) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      }
    };
  }, [connectWallet]);

  return { address, connectWallet, isConnecting };
}
