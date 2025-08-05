"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import {
  LucideLayoutDashboard,
  LucidePlusCircle,
  LucideList,
  LucideClipboardList,
  LucideClipboardPlus,
} from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { GlobalUIOverlay } from "@/components/chors/GlobalUIOverlay";
import { GlobalUIProvider } from "../../../context/GlobalUIContext";
import RequireAdmin from "@/components/auth/RequireAdmin";

const adminNavItems = [
  { label: "Dashboard", href: "/admin", icon: LucideLayoutDashboard },
  { label: "Add Problem", href: "/admin/problems/add", icon: LucidePlusCircle },
  { label: "Problems", href: "/admin/problems", icon: LucideList },
  { label: "Add Test", href: "/admin/tests/add", icon: LucideClipboardPlus },
  { label: "Tests", href: "/admin/tests", icon: LucideClipboardList },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <GlobalUIProvider>
      <RequireAdmin>
        <div
          className="flex min-h-screen bg-zinc-950 text-white"
          style={{
            backgroundImage: "url('/bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          <aside className="w-72 min-h-screen bg-gradient-to-b from-[#0d1117] to-[#161b22] text-white flex flex-col px-6 py-8 border-r border-white/10 shadow-xl backdrop-blur-2xl">
            <h1 className="text-4xl font-extrabold tracking-tight mb-12 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              BACKTRACK ADMIN
            </h1>

            <nav className="flex flex-col gap-4">
              {adminNavItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group flex items-center gap-5 px-5 py-4 rounded-xl text-base font-semibold transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md scale-105"
                        : "text-white/70 hover:text-white hover:bg-white/10 hover:scale-105"
                    )}
                  >
                    <Icon className="w-6 h-6 group-hover:scale-110 transition-transform duration-150" />
                    <span className="tracking-wide">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto pt-16 text-xs text-white/30 text-center border-t border-white/10">
              <p className="mt-4">
                &copy; {new Date().getFullYear()} InfoTrek. All rights reserved.
              </p>
            </div>
          </aside>

          <main className="flex-1 p-8 overflow-auto bg-zinc-950/60">
            {children}
            <Toaster
              richColors
              position="top-center"
              expand
              closeButton={true}
            />
          </main>
        </div>
        <GlobalUIOverlay />
      </RequireAdmin>
    </GlobalUIProvider>
  );
}
