'use client';

import React from "react";
import ChallengeCard from "./ChallengeCard";

type Challenge = {
  name: string;
  icon: string;
  slug: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
};

type Props = {
  challenges: Challenge[];
  selectedSlug: string;
  onSelect: (slug: string) => void;
};

const ChallengeList: React.FC<Props> = ({ challenges, selectedSlug, onSelect }) => {
  return (
    <div className="space-y-4">
      {challenges.map((challenge) => (
        <ChallengeCard
          key={challenge.name}
          icon={challenge.icon}
          name={challenge.name}
          difficulty={challenge.difficulty}
          selected={selectedSlug === challenge.slug}
          onSelect={() => onSelect(challenge.slug)}
        />
      ))}
    </div>
  );
};

export default ChallengeList;
