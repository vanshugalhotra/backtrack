'use client';

import React from "react";
import ChallengeCard from "./ChallengeCard";

type Challenge = {
  name: string;
  icon: string;
};

type Props = {
  challenges: Challenge[];
  selectedChallenge: string;
  onSelect: (name: string) => void;
};

const ChallengeList: React.FC<Props> = ({ challenges, selectedChallenge, onSelect }) => {
  return (
    <div className="space-y-4">
      {challenges.map((challenge) => (
        <ChallengeCard
          key={challenge.name}
          icon={challenge.icon}
          name={challenge.name}
          selected={selectedChallenge === challenge.name}
          onSelect={() => onSelect(challenge.name)}
        />
      ))}
    </div>
  );
};

export default ChallengeList;
