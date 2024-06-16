import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import PrelineScript from "@/components/PrelineScript";
import Bottom from "@/components/Bottom";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BlockBet",
  description: "A blockchain-based betting platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900 font-montserrat`}>
        <Header />
        {children}
        <Bottom />
      </body>
      <PrelineScript />
    </html>
  );
}
