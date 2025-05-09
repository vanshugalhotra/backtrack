'use client';

import React from "react";
import Image from "next/image";

type Props = {
  icon: string;
  name: string;
  selected: boolean;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  onSelect: () => void;
};

const difficultyDotColors = {
  EASY: "bg-green-400",
  MEDIUM: "bg-yellow-400",
  HARD: "bg-red-400",
};

const ChallengeCard: React.FC<Props> = ({ icon, name, selected, difficulty, onSelect }) => {
  return (
    <div
      tabIndex={0}
      className={`flex items-center gap-4 px-6 py-4 rounded-xl cursor-pointer text-base font-medium transition-all
        ${selected
          ? "bg-cyan-500/10 border border-cyan-400 shadow-md backdrop-blur-sm"
          : "hover:bg-white/5 border border-transparent hover:backdrop-blur-sm"
        }`}
      onClick={onSelect}
      onKeyDown={(e) => e.key === "Enter" && onSelect()}
    >
      <Image src={icon} alt={`${name} icon`} width={45} height={45} />
      <div className="flex flex-col">
        <span className="flex items-center gap-2">
          {name}
          <span
            className={`w-2.5 h-2.5 rounded-full ${difficultyDotColors[difficulty]}`}
            title={difficulty}
          ></span>
        </span>
      </div>
    </div>
  );
};

export default ChallengeCard;
