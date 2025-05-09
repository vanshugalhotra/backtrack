import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GlobalUIProvider} from "../../context/GlobalUIContext";

import { GlobalUIOverlay } from "@/components/chors/GlobalUIOverlay";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BackTrack",
  description: "InfoTrek 25",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GlobalUIProvider>
          <GlobalUIOverlay />
          {children}
        </GlobalUIProvider>
      </body>
    </html>
  );
}
