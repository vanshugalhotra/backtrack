"use client";

import React, { useRef, useState } from "react";
import useTests from "@/hooks/useTests";
import TestCard from "@/components/ui/TestCard";
import RequireAuth from "@/components/auth/RequireAuth";
import PasswordModal from "@/components/ui/Modal/PasswordModal";
import { useStarfield } from "@/hooks/useStarField";
import { toast } from "sonner";
import LoaderGate from "@/components/chors/LoaderGate";

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
      <LoaderGate>
        <main className="relative min-h-screen w-full flex flex-col items-center justify-start px-6 py-12 text-white overflow-hidden">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 w-full h-full"
          />

          {/* Heading Section */}
          <div className="relative z-10 text-center mb-12 space-y-2" data-testid="homepage-heading">
            <p className="text-base uppercase tracking-widest text-cyan-400 font-semibold">
              Presented by ACM NIT Trichy
            </p>
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-white drop-shadow">
              INFOTREK<span className="text-cyan-400">&apos;25</span>
            </h1>
            <p className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white tracking-wide">
              BackTrack
            </p>
          </div>

          {/* Test Grid Section */}
          <section className="relative z-10 w-full max-w-7xl px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="tests-grid">
              {tests?.map((test) => (
                <TestCard
                  key={test.slug}
                  name={test.name}
                  description={test.description ?? ""}
                  image="/test.png"
                  onClick={() => {
                    setSelectedTest({
                      slug: test.slug,
                      password: test.password,
                    });
                    setIsModalOpen(true);
                  }}
                />
              ))}
            </div>
          </section>

          {/* Modal */}
          <PasswordModal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={(enteredPassword) => {
              if (enteredPassword === selectedTest?.password) {
                window.location.href = `/tests/${
                  selectedTest.slug
                }?password=${encodeURIComponent(enteredPassword)}`;
              } else {
                toast.error("Incorrect password");
              }
              setIsModalOpen(false);
            }}
          />
        </main>
      </LoaderGate>
    </RequireAuth>
  );
}
