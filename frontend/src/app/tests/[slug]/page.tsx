"use client";

import Sidebar from "@/components/ui/Sidebar/Sidebar";
import dynamic from "next/dynamic";
import RequireAuth from "@/components/auth/RequireAuth";
import useTestBySlug from "@/hooks/useTestBySlug";
import TestNotStarted from "@/components/ui/TestNotStarted";

const Terminal = dynamic(() => import("@/components/ui/Terminal/Terminal"), {
  ssr: false,
});

export default function TestPage() {
  const { test } = useTestBySlug();

  if (!test) return null;

  return (
    <RequireAuth>
      {test.hasStarted ? (
        <main className="min-h-screen w-full bg-cover bg-center flex items-center justify-center p-10">
          <div className="flex w-full max-w-[1300px] min-h-[600px] rounded-xl bg-[#0b0f26]/30 border border-white/10 backdrop-blur-2xl shadow-2xl overflow-hidden">
            {/* Sidebar with test-specific problems */}
            <Sidebar problems={test.problems} />

            {/* Terminal */}
            <div className="flex-1 p-6 bg-[#0b0f26]/90 border-l border-white/10 text-white font-mono">
              <Terminal />
            </div>
          </div>
        </main>
      ) : (
        <TestNotStarted />
      )}
    </RequireAuth>
  );
}
