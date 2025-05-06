"use client";

import React, { useState } from "react";
import Image from "next/image";

const Sidebar: React.FC = () => {
  const [selectedChallenge, setSelectedChallenge] =
    useState("Binary Black Hole");

  const challenges = [
    { name: "Binary Black Hole", icon: "/icons/blackhole.svg" },
    { name: "Nebula Cipher", icon: "/icons/nebula.svg" },
    { name: "Star Code", icon: "/icons/star.svg" },
    { name: "Galactic Crack", icon: "/icons/galaxy.svg" },
  ];

  return (
    <aside className="w-[300px] bg-[#0b0f26]/50 backdrop-blur-xl border-r border-white/10 px-6 py-10 text-white shadow-xl">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-lg tracking-[0.2em] text-cyan-400 font-bold">
          INFOTREK
        </h1>
        <h2 className="text-3xl font-extrabold mt-3 leading-tight text-white">
          BackTrack
        </h2>
      </div>

      {/* Challenge List */}
      <div className="space-y-4">
        {challenges.map((challenge) => (
          <div
            key={challenge.name}
            tabIndex={0}
            className={`flex items-center gap-4 px-6 py-4 rounded-xl cursor-pointer text-base font-medium transition-all
              ${
                selectedChallenge === challenge.name
                  ? "bg-cyan-500/10 border border-cyan-400 shadow-md backdrop-blur-sm"
                  : "hover:bg-white/5 border border-transparent hover:backdrop-blur-sm"
              }`}
            onClick={() => setSelectedChallenge(challenge.name)}
            onKeyDown={(e) =>
              e.key === "Enter" && setSelectedChallenge(challenge.name)
            }
          >
            <Image
              src={challenge.icon}
              alt={`${challenge.name} icon`}
              width={32}
              height={32}
            />
            <span>{challenge.name}</span>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
