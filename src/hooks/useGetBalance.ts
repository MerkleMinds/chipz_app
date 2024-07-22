import { useState } from "react";

import { createPublicClient, formatEther, getContract, http } from "viem";
import { celo } from "viem/chains";
import { stableTokenABI } from "@celo/abis";

import { tokenMap } from "@/hooks/useTransaction";

async function check(address: `0x${string}`) {
  const constract = getContract({
    abi: stableTokenABI,
    address: tokenMap["cUSD"].address,
    publicClient: createPublicClient({
      chain: celo,
      transport: http(),
    }),
  });

  const balance = await constract.read.balanceOf([
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
