"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import {
  LucideLayoutDashboard,
  LucidePlusCircle,
  LucideList,
  LucideSettings,
} from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { GlobalUIOverlay } from "@/components/chors/GlobalUIOverlay";
import { GlobalUIProvider } from "../../../context/GlobalUIContext";
import RequireAdmin from "@/components/auth/RequireAdmin";

const adminNavItems = [
  { label: "Dashboard", href: "/admin", icon: LucideLayoutDashboard },
  { label: "Add Problem", href: "/admin/problems/add", icon: LucidePlusCircle },
  { label: "Problems", href: "/admin/problems", icon: LucideList },
  { label: "Settings", href: "/admin/settings", icon: LucideSettings }, // Optional
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <GlobalUIProvider>
      <RequireAdmin>
      <div
        className="flex min-h-screen bg-muted"
        style={{
          backgroundImage: "url('/bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Sidebar */}
        <aside className="w-72 min-h-screen bg-gradient-to-b from-gray-950 to-gray-800 text-white flex flex-col px-6 py-8 border-r border-gray-700 rounded-l-xl shadow-xl">
          <h1 className="text-3xl font-bold text-white tracking-tight mb-10">
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
                    "flex items-center gap-4 p-4 rounded-lg transition-all duration-200 ease-in-out text-lg font-medium",
                    isActive
                      ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg transform scale-105"
                      : "text-gray-300 hover:text-white hover:bg-gray-700 hover:scale-105"
                  )}
                >
                  <Icon className="w-6 h-6 transition-all duration-200 ease-in-out" />
                  <span className="font-semibold">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Optional Footer */}
          <div className="mt-auto pt-12 text-xs text-gray-400 text-center">
            <p>
              &copy; {new Date().getFullYear()} InfoTrek. All rights reserved.
            </p>
          </div>
        </aside>
        {/* Main content */}
        <main className="flex-1 p-6 overflow-auto z-10">
          {children}
          <Toaster richColors position="top-center" expand closeButton={true} />
        </main>
      </div>
      <GlobalUIOverlay />
      </RequireAdmin>
    </GlobalUIProvider>
  );
}
