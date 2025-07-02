"use client";

import Sidebar from "@/components/ui/Sidebar/Sidebar";
// in app/page.tsx or wherever it's used
import dynamic from "next/dynamic";

const Terminal = dynamic(() => import("@/components/ui/Terminal/Terminal"), {
  ssr: false, // disable SSR
});

export default function HomePage() {
  return (
      <main className="min-h-screen w-full bg-cover bg-center flex items-center justify-center p-10">
        <div className="flex w-full max-w-[1300px] min-h-[600px] rounded-xl bg-[#0b0f26]/30 border border-white/10 backdrop-blur-2xl shadow-2xl overflow-hidden">
          {/* Sidebar */}
          <Sidebar />

          {/* Terminal Panel */}
          <div className="flex-1 p-6 bg-[#0b0f26]/90 border-l border-white/10 text-white font-mono">
            <Terminal />
          </div>
        </div>
      </main>
  );
}
