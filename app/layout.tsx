import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Noto_Sans_TC } from "next/font/google";

const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-noto",
});

export const metadata: Metadata = {
  title: "SamHacker的首頁",
  description: "Custom browser homepage with clock, weather, and shortcuts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${notoSansTC.className}`}>
        {children}
      </body>
    </html>
  );
}
