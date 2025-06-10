import "./globals.css";

import { AppContextProvider } from "@/components/Context";
import Betslip from "@/components/BetSlip";
import Bottom from "@/components/Bottom";
import Header from "@/components/Header";
// Using local fonts instead of Google Fonts to avoid network issues
import type { Metadata } from "next";
import PrelineScript from "@/components/PrelineScript";

// No longer using Inter font from Google

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
      <body className="bg-bb-bg-app font-sans">
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
