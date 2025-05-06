'use client';

import React from "react";
import Image from "next/image";

type Props = {
  icon: string;
  name: string;
  selected: boolean;
  onSelect: () => void;
};

const ChallengeCard: React.FC<Props> = ({ icon, name, selected, onSelect }) => {
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
      <Image src={icon} alt={`${name} icon`} width={32} height={32} />
      <span>{name}</span>
    </div>
  );
};

export default ChallengeCard;
