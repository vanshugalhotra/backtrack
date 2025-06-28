import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GlobalUIProvider } from "../../context/GlobalUIContext";
import { ProblemProvider } from "../../context/ProblemContext";
import { GlobalUIOverlay } from "@/components/chors/GlobalUIOverlay";
import { AuthProvider } from "../../context/AuthContext";

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
          <AuthProvider>
            <ProblemProvider>
              <GlobalUIOverlay />
              {children}
            </ProblemProvider>
          </AuthProvider>
        </GlobalUIProvider>
      </body>
    </html>
  );
}
