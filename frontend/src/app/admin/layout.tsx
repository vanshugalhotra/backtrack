// app/admin/layout.tsx
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

const adminNavItems = [
  { label: "Dashboard", href: "/admin", icon: LucideLayoutDashboard },
  { label: "Add Problem", href: "/admin/problems/add", icon: LucidePlusCircle },
  { label: "Problems", href: "/admin/problems", icon: LucideList },
  { label: "Settings", href: "/admin/settings", icon: LucideSettings }, // Optional
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-muted">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-950 text-white flex flex-col p-6 space-y-6">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

        <nav className="space-y-2">
          {adminNavItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 transition-colors",
                  isActive
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-auto">
        {children}
        <Toaster richColors position="top-center" expand closeButton={true}/>
      </main>
    </div>
  );
}
