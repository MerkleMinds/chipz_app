import { celo, celoAlfajores } from "viem/chains";

/**
 * Determines which network to use based on environment variables and wallet type
 * @param isMiniPay Whether the wallet is MiniPay
 * @returns The appropriate chain configuration
 */
export function getNetworkConfig(isMiniPay?: boolean) {
  // Check environment variable
  const useTestnet = process.env.NEXT_PUBLIC_USE_TESTNET === "true";
  
  // If using MiniPay in developer mode or testnet is explicitly enabled, use Alfajores
  if (useTestnet || isMiniPay) {
    return celoAlfajores;
  }
  
  // Otherwise use mainnet
  return celo;
}
