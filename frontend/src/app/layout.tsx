import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GlobalUIProvider } from "../../context/GlobalUIContext";
import { ProblemProvider } from "../../context/ProblemContext";
import { GlobalUIOverlay } from "@/components/chors/GlobalUIOverlay";
import { AuthProvider } from "../../context/AuthContext";
import { Toaster } from "@/components/ui/sonner";

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
  description: "VERSION'26",
  icons: {
    icon: '/favicon.ico',
  },
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
              <Toaster richColors position="top-center" expand closeButton={true} />
            </ProblemProvider>
          </AuthProvider>
        </GlobalUIProvider>
      </body>
    </html>
  );
}
