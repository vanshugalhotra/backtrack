"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Orbit, FilePlus, BookText, TestTube, ListChecks } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { GlobalUIOverlay } from "@/components/chors/GlobalUIOverlay";
import { GlobalUIProvider } from "../../../context/GlobalUIContext";
import RequireAdmin from "@/components/auth/RequireAdmin";

const adminNavItems = [
  { label: "Dashboard", href: "/admin", icon: Orbit },
  { label: "Add Problem", href: "/admin/problems/add", icon: FilePlus },
  { label: "Problems", href: "/admin/problems", icon: BookText },
  { label: "Add Test", href: "/admin/tests/add", icon: TestTube },
  { label: "Tests", href: "/admin/tests", icon: ListChecks },
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
          <aside className="w-80 min-h-screen bg-gradient-to-b from-[#0d1117] to-[#161b22] text-white flex flex-col px-8 py-10 border-r border-white/10 shadow-2xl backdrop-blur-xl">
            <h1 className="text-3xl font-extrabold text-center tracking-wider text-transparent bg-gradient-to-r from-sky-400 via-cyan-400 to-indigo-400 bg-clip-text mb-14">
              BACKTRACK ADMIN
            </h1>

            <nav className="flex flex-col gap-5">
              {adminNavItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-r from-[#2e335a] to-[#1c1b33] text-white shadow-md scale-[1.03]"
                        : "text-white/70 hover:text-white hover:bg-white/10 hover:scale-[1.03]"
                    )}
                  >
                    <span className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/10 group-hover:border-indigo-400 transition-all">
                      <Icon className="w-5 h-5 text-cyan-300 group-hover:scale-110 transition-transform duration-200" />
                    </span>
                    <span className="tracking-wide font-semibold text-base">
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto pt-16 text-sm text-white/30 text-center border-t border-white/10">
              <p className="mt-4">
                &copy; {new Date().getFullYear()} InfoTrek. All rights reserved.
              </p>
            </div>
          </aside>

          <main className="flex-1 p-10 overflow-auto bg-zinc-950/60">
            {children}
            <Toaster
              richColors
              position="top-center"
              expand
              closeButton={true}
            />
          </main>
        </div>
        a
        <GlobalUIOverlay />
      </RequireAdmin>
    </GlobalUIProvider>
  );
}
