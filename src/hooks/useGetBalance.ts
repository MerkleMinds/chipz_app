import { useState } from "react";

import { createPublicClient, formatEther, getContract, http } from "viem";
import { stableTokenABI } from "@celo/abis";

import { tokenMap } from "@/hooks/useTransaction";
import { getNetworkConfig } from "@/utils/networkConfig";

async function check(address: `0x${string}`) {
  // Determine which network to use based on environment variable
  const chain = getNetworkConfig();
  
  const contract = getContract({
    abi: stableTokenABI,
    address: tokenMap["cUSD"].address,
    publicClient: createPublicClient({
      chain,
      transport: http(),
    }),
  });

  const balance = await contract.read.balanceOf([
    address,
  ]);

  return Number(formatEther(balance));
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
