'use client';

import React from 'react';
import { Problem } from '../../../../types/problem';

type Props = {
  problem: Problem | null;
};

const ProblemHeader: React.FC<Props> = ({problem}) => {
  return (
    <div className="text-center mb-6">
      <h1 className="text-xl text-cyan-400 font-semibold tracking-widest uppercase">
        INFOTREK&apos;25 - BACKTRACK
      </h1>
      <h2 className="text-3xl text-white font-bold mt-2">
        {problem ? problem.name : "No problem selected"}
      </h2>
      <p className="text-sm text-gray-400 mt-2">
        Solve the challenge by decoding the pattern.
      </p>
    </div>
  );
};

export default ProblemHeader;
