"use client";

import React from "react";
import { Problem } from "../../../../types/problem";

type Props = {
  problem: Problem | null;
};

const ProblemHeader: React.FC<Props> = ({ problem }) => {
  return (
    <div className="text-center mb-8 space-y-4">
      {/* Event Header */}
      <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-indigo-400 to-purple-500 text-lg sm:text-xl font-mono font-bold tracking-[0.3em] uppercase">
        ACUMEN’25 – BACKTRACK
      </h1>

      {/* Problem Title */}
      <h2 className="text-3xl sm:text-4xl font-bold text-white/90">
        {problem ? problem.name : "No problem selected"}
      </h2>

      {/* Terminal Instruction */}
      <p className="text-sm sm:text-base text-gray-400">
        Type{" "}
        <code className="bg-white/5 border border-cyan-400/20 text-cyan-300 px-2 py-0.5 rounded-md font-mono shadow-sm">
          $clear
        </code>{" "}
        to clear the terminal.
      </p>
    </div>
  );
};

export default ProblemHeader;
