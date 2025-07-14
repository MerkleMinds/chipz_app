import "./globals.css";

import { AppContextProvider } from "@/components/Context";
import Betslip from "@/components/BetSlip";
import Bottom from "@/components/Bottom";
import Header from "@/components/Header";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import PrelineScript from "@/components/PrelineScript";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chipz",
  description: "A blockchain-based betting platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-bb-bg-app`}>
        <AppContextProvider>
          <div className="max-w-sm mx-auto">
            <Header />
            {children}
            <Bottom />
            <Betslip />
          </div>
        </AppContextProvider>
      </body>
      <PrelineScript />
    </html>
  );
}