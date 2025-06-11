import { useState } from "react";
import {
  Abi,
  createPublicClient,
  createWalletClient,
  custom,
  http,
  parseUnits,
} from "viem";
import { celo, celoAlfajores } from "viem/chains";
import hackathonABI from "@/contracts/abi.json";

type AllowedTokens = "cUSD" | "cUSDt" | "lHKTHN" | "USDC";

const chainMap: {
  [k in AllowedTokens]: typeof celo | typeof celoAlfajores;
} = {
  "cUSD": celo,
  "cUSDt": celoAlfajores,
  "lHKTHN": celoAlfajores,
  "USDC": celoAlfajores,
};

export const tokenMap: {
  [k in AllowedTokens]: {
    address: `0x${string}`;
    decimals: number;
    abi: Abi;
  };
} = {
  "cUSD": {
    address: "0x765DE816845861e75A25fCA122bb6898B8B1282a",
    decimals: 18,
    abi: [{
      type: "function",
      stateMutability: "nonpayable",
      payable: false,
      outputs: [
        { "type": "bool", "name": "", "internalType": "bool" },
      ],
      name: "transfer",
      inputs: [
        { type: "address", name: "to", internalType: "address" },
        { type: "uint256", name: "value", internalType: "uint256" },
      ],
      constant: false,
    }],
  },
  "cUSDt": {
    address: "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1",
    decimals: 0,
    abi: [{
      type: "function",
      stateMutability: "nonpayable",
      payable: false,
      outputs: [
        { "type": "bool", "name": "", "internalType": "bool" },
      ],
      name: "transfer",
      inputs: [
        { type: "address", name: "to", internalType: "address" },
        { type: "uint256", name: "value", internalType: "uint256" },
      ],
      constant: false,
    }],
  },
  "lHKTHN": {
    address: "0xeC8027457e5d353FA28D45f62C4De57a607749B6",
    decimals: 0,
    abi: hackathonABI as Abi,
  },
  "USDC": {
    address: "0x2F25deB3848C207fc8E0c34035B3Ba7fC157602B", // Alfajores testnet USDC address
    decimals: 6, // USDC uses 6 decimals
    abi: [{
      type: "function",
      stateMutability: "nonpayable",
      payable: false,
      outputs: [
        { "type": "bool", "name": "", "internalType": "bool" },
      ],
      name: "transfer",
      inputs: [
        { type: "address", name: "to", internalType: "address" },
        { type: "uint256", name: "value", internalType: "uint256" },
      ],
      constant: false,
    }, {
      type: "function",
      stateMutability: "view",
      payable: false,
      outputs: [
        { "type": "uint256", "name": "", "internalType": "uint256" },
      ],
      name: "balanceOf",
      inputs: [
        { type: "address", name: "account", internalType: "address" },
      ],
      constant: true,
    }],
  },
};

export type Nullable<T> = T | null;

export default function useTransaction(token: AllowedTokens): [
  { error: Nullable<string>; success: Nullable<boolean> },
  (to: `0x${string}`, amount: number) => Promise<void>,
] {
  const [success, setSuccess] = useState<Nullable<boolean>>(null);
  const [error, setError] = useState<Nullable<string>>(null);

  const dispatch = async (to: `0x${string}`, amount: number) => {
    // Always verify the existence of window.ethereum before initializing
    if (!window || !window.ethereum) {
      setError("Could not find provider, are you using Opera MiniPay?");
      setSuccess(false);
      return;
    }
    
    const client = createWalletClient({
      chain: chainMap[token],
      transport: custom(window.ethereum),
    });

    const publicClient = createPublicClient({
      chain: chainMap[token],
      transport: http(),
    });

    // Client is now guaranteed to exist since we check for window.ethereum above

    const writeArgs: {
      [k in AllowedTokens]: { functionName: string; args: unknown[] };
    } = {
      "cUSD": {
        functionName: "transfer",
        args: [
          to,
          parseUnits(amount.toString(), 18),
        ],
      },
      "cUSDt": {
        functionName: "transfer",
        args: [
          to,
          parseUnits(amount.toString(), 0),
        ],
      },
      "lHKTHN": {
        functionName: "transferFrom",
        args: [
          to,
          parseUnits(amount.toString(), 0),
        ],
      },
      "USDC": {
        functionName: "transfer",
        args: [
          to,
          parseUnits(amount.toString(), 6),
        ],
      },
    };

    setError(null);
    setSuccess(null);

    const { address, abi } = tokenMap[token];
    const { functionName, args } = writeArgs[token];

    try {
      // Get the user's address
      const addresses = await client.getAddresses();
      if (!addresses || addresses.length === 0) {
        setError("No connected accounts found");
        setSuccess(false);
        return;
      }
      
      // MiniPay only accepts legacy transactions and supports setting feeCurrency to cUSD
      const hash = await client.writeContract({
        address,
        abi,
        functionName,
        account: addresses[0],
        args,
        // Use legacy transactions for MiniPay compatibility
        // Add feeCurrency if needed for cUSD gas payments
        ...(window.ethereum.isMiniPay ? {
          // @ts-ignore - MiniPay specific property
          feeCurrency: "0x765DE816845861e75A25fCA122bb6898B8B1282a" // cUSD address
        } : {})
      });

      const transaction = await publicClient.waitForTransactionReceipt({
        hash,
      });

      setSuccess(transaction.status === "success");
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
      setSuccess(false);
    }
  };

  return [{ error, success }, dispatch];
}
