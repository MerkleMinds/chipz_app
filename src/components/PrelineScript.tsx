"use client";

import { IStaticMethods } from "preline/preline";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

export default function PrelineScript() {
  const path = usePathname();

  useEffect(() => {
    const loadPreline = async () => {
      await import("preline/preline");

      window.HSStaticMethods.autoInit();
    };

    loadPreline();
  }, [path]);

  return null;
}
