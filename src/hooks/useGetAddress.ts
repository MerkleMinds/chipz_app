import { useEffect, useState } from "react";

export default function useGetAddress() {
  const [address, setAddress] = useState<`0x${string}` | null>(null);

  useEffect(() => {
    if (window && window.ethereum) {
      if (window.ethereum.isMiniPay) {
        window.ethereum.request({
          method: "eth_requestAccounts",
          params: [],
        }).then(([account]: string[]) => setAddress(account as `0x${string}`));
      }
    }
  }, []);

  return address;
}
