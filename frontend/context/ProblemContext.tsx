"use client";
import { createContext, useContext, useState } from "react";
import { Problem } from "../types/problem";

interface ProblemContextType {
  selectedProblem: Problem | null;
  setSelectedProblem: (problem: Problem) => void;
}

const ProblemContext = createContext<ProblemContextType | undefined>(undefined);

export const ProblemProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);

  return (
    <ProblemContext.Provider value={{ selectedProblem, setSelectedProblem }}>
      {children}
    </ProblemContext.Provider>
  );
};

export const useProblemContext = () => {
  const context = useContext(ProblemContext);
  if (!context)
    throw new Error("useProblemContext must be used within ProblemProvider");
  return context;
};
