"use client";

import React, { useRef, useState } from "react";
import useTests from "@/hooks/useTests";
import TestCard from "@/components/ui/TestCard";
import RequireAuth from "@/components/auth/RequireAuth";
import PasswordModal from "@/components/ui/Modal/PasswordModal";
import { useStarfield } from "@/hooks/useStarField";
import { toast } from "sonner";

export default function HomePage() {
  const { tests } = useTests();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [selectedTest, setSelectedTest] = useState<null | {
    slug: string;
    password: string;
  }>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useStarfield(canvasRef);

  return (
    <RequireAuth>
      <main className="relative min-h-screen w-full flex flex-col items-center justify-start px-6 py-16 text-white overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0 w-full h-full"
        />

        <div className="relative z-10 text-center space-y-2 mb-10">
          <h1 className="text-5xl sm:text-6xl font-semibold tracking-tight text-white">
            INFOTREK<span className="text-cyan-400">&apos;25</span>
          </h1>
          <p className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white tracking-wide">
            BackTrack
          </p>
        </div>

        <section className="relative z-10 w-full max-w-[1300px] px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tests?.map((test) => (
              <TestCard
                key={test.slug}
                name={test.name}
                description={test.description ?? ""}
                image="/test.jpg"
                onClick={() => {
                  setSelectedTest({ slug: test.slug, password: test.password });
                  setIsModalOpen(true);
                }}
              />
            ))}
          </div>
        </section>
        <PasswordModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={(enteredPassword) => {
            if (enteredPassword === selectedTest?.password) {
              window.location.href = `/tests/${selectedTest.slug}`;
            } else {
              toast.error(`Incorrect password`);
            }
            setIsModalOpen(false);
          }}
        />
      </main>
    </RequireAuth>
  );
}
