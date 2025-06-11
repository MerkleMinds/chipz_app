import { useState } from "react";

import { createPublicClient, formatUnits, getContract, http } from "viem";

import { tokenMap } from "@/hooks/useTransaction";
import { getNetworkConfig } from "@/utils/networkConfig";

async function check(address: `0x${string}`) {
  // Determine which network to use based on environment variable
  const chain = getNetworkConfig();
  
  // Use USDC on testnet (Alfajores) and cUSD on mainnet
  const isTestnet = process.env.NEXT_PUBLIC_USE_TESTNET === "true";
  const tokenKey = isTestnet ? "USDC" : "cUSD";
  
  const contract = getContract({
    abi: tokenMap[tokenKey].abi,
    address: tokenMap[tokenKey].address,
    publicClient: createPublicClient({
      chain,
      transport: http(),
    }),
  });

  const balance = await contract.read.balanceOf([
    address,
  ]) as bigint;
  
  // Format based on token decimals (USDC uses 6 decimals, cUSD uses 18)
  return Number(formatUnits(balance, tokenMap[tokenKey].decimals));
}

export default function useGetBalance(): [
  number,
  (address: `0x${string}`) => Promise<void>,
] {
  const [balance, setBalance] = useState<number>(0);

  return [
    balance,
    (address: `0x${string}`) => check(address).then(setBalance),
  ];
}
