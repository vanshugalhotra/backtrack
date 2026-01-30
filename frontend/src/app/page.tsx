"use client";

import React, { useState, useEffect } from "react";
import useTests from "@/hooks/useTests";
import TestCard from "@/components/ui/TestCard";
import RequireAuth from "@/components/auth/RequireAuth";
import PasswordModal from "@/components/ui/Modal/PasswordModal";
import { toast } from "sonner";
import LoaderGate from "@/components/chors/LoaderGate";

import { Orbitron } from "next/font/google";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-orbitron",
});

export default function HomePage() {
  const { tests } = useTests();

  const [selectedTest, setSelectedTest] = useState<null | {
    slug: string;
    password: string;
  }>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Lazy-load video
  const [videoLoaded, setVideoLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setVideoLoaded(true), 100); // small delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <RequireAuth>
      <LoaderGate>
        <main className="relative min-h-screen w-full flex flex-col items-center justify-start px-6 pt-10 text-white overflow-hidden">
          {/* Background video */}
          {videoLoaded && (
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="/cosmos.webp" // your existing background image
              className="absolute top-0 left-0 w-full h-full object-cover -z-10"
            >
              <source src="/cosmos.mp4" type="video/mp4" />
            </video>
          )}

          {/* Heading Section */}
          <div
            className="relative z-10 text-center mb-12 space-y-3"
            data-testid="homepage-heading"
          >
            <p
              className={`${orbitron.className} text-sm sm:text-base uppercase tracking-[0.35em] text-indigo-300/90 font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]`}
            >
              Presented by ACM NIT Trichy
            </p>

            <h1
              className={`${orbitron.className} text-5xl sm:text-6xl font-extrabold tracking-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]`}
            >
              ACUMEN
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-400 to-sky-300 bg-[length:200%_auto]">
                &apos;25
              </span>
            </h1>

            <p
              className={`${orbitron.className} text-3xl sm:text-4xl font-semibold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#e0e5ff] via-[#b0b5ff] to-[#a0a5ff] drop-shadow-[0_1px_6px_rgba(50,50,150,0.3)] group-hover:from-[#f0f0ff] group-hover:via-[#c5caff] group-hover:to-[#b5baff] group-hover:scale-[1.02] transition-all duration-300 ease-in-out`}
            >
              BackTrack
            </p>
          </div>

          {/* Test Grid Section */}
          <section className="relative z-10 w-full max-w-7xl px-4">
            {tests && tests.length > 0 ? (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                data-testid="tests-grid"
              >
                {tests.map((test) => (
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
            ) : (
              <div
                className="flex flex-col items-center justify-center py-32 text-center space-y-3"
                data-testid="no-tests-message"
              >
                <h2 className="text-2xl sm:text-3xl font-semibold text-cyan-300 drop-shadow-lg">
                  No Tests Available
                </h2>
                <p className="text-base sm:text-lg text-cyan-200 opacity-80 max-w-md">
                  The galaxy is quiet for now. Please check back soon.
                </p>
              </div>
            )}
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
