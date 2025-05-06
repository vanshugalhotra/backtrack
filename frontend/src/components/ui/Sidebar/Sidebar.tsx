'use client';

import React, { useState } from "react";
import ChallengeList from "./ChallengeList";

const Sidebar: React.FC = () => {
  const [selectedChallenge, setSelectedChallenge] = useState("Binary Black Hole");

  const challenges = [
    { name: "Binary Black Hole", icon: "/icons/blackhole.svg" },
    { name: "Nebula Cipher", icon: "/icons/nebula.svg" },
    { name: "Star Code", icon: "/icons/star.svg" },
    { name: "Galactic Crack", icon: "/icons/galaxy.svg" },
  ];

  return (
    <aside className="w-[300px] bg-[#0b0f26]/50 backdrop-blur-xl border-r border-white/10 px-6 py-10 text-white shadow-xl">
      <div className="mb-12 text-center">
        <h1 className="text-lg tracking-[0.2em] text-cyan-400 font-bold">INFOTREK</h1>
        <h2 className="text-3xl font-extrabold mt-3 leading-tight text-white">BackTrack</h2>
      </div>

      <ChallengeList
        challenges={challenges}
        selectedChallenge={selectedChallenge}
        onSelect={setSelectedChallenge}
      />
    </aside>
  );
};

export default Sidebar;
