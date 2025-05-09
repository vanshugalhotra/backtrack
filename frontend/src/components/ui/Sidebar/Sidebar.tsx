"use client";

import React, { useState } from "react";
import ChallengeList from "./ChallengeList";
import { Menu, X } from "lucide-react";
import useProblems from "@/hooks/useProblems";
import { Problem } from "../../../../types/problem";

const Sidebar: React.FC = () => {
  const [selectedChallenge, setSelectedChallenge] = useState("Binary Black Hole");
  const [open, setOpen] = useState(false);

  const { problems} = useProblems();

  return (
    <>
      {/* Hamburger (Mobile Only) */}
      <button
        className="fixed top-4 left-4 z-50 p-2 text-white bg-cyan-600 rounded-full md:hidden"
        onClick={() => setOpen(!open)}
        aria-label="Toggle Sidebar"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar for desktop */}
      <aside className="hidden md:block w-[300px] bg-[#0b0f26]/50 backdrop-blur-xl border-r border-white/10 px-6 py-10 text-white shadow-xl">
        <div className="mb-12 text-center">
          <h1 className="text-lg tracking-[0.2em] text-cyan-400 font-bold">
            INFOTREK
          </h1>
          <h2 className="text-3xl font-extrabold mt-3 leading-tight text-white">
            BackTrack
          </h2>
        </div>
        {problems && (
          <ChallengeList
            challenges={problems.map((problem: Problem) => ({
              name: problem.name,
              icon: "/icons/blackhole.svg",
            }))}
            selectedChallenge={selectedChallenge}
            onSelect={setSelectedChallenge}
          />
        )}
      </aside>

      {/* Sidebar for mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-[250px] bg-[#0b0f26]/90 backdrop-blur-md p-6 text-white shadow-2xl z-40 transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-8 text-center">
          <h1 className="text-lg tracking-[0.2em] text-cyan-400 font-bold">
            INFOTREK
          </h1>
          <h2 className="text-2xl font-extrabold mt-2">BackTrack</h2>
        </div>

        {problems && (
          <ChallengeList
            challenges={problems.map((problem: Problem) => ({
              name: problem.name,
              icon: "/icons/blackhole.svg",
            }))}
            selectedChallenge={selectedChallenge}
            onSelect={(name) => {
              setSelectedChallenge(name);
              setOpen(false);
            }}
          />
        )}
      </div>
    </>
  );
};

export default Sidebar;
