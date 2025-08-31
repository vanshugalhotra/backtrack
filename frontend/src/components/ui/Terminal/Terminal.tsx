"use client";

import React, { useState, useRef, useEffect } from "react";
import ProblemHeader from "./ProblemHeader";
import { useStarfield } from "@/hooks/useStarField";
import { useProblemContext } from "../../../../context/ProblemContext";
import { useExecute } from "@/hooks/useExecutor";
import { inconsolata } from "../../../../fonts/fonts";

const Terminal: React.FC = () => {
  const [history, setHistory] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { selectedProblem } = useProblemContext();

  const { executeCommand } = useExecute();
  const prompt = `infotrek$`;

  const handleExecute = async () => {
    if (input === "$clear") {
      setHistory([]);
      setInput("");
      return;
    }
    if (!input.trim()) {
      setHistory((prev) => [...prev, "Error: Command cannot be empty!"]);
      return;
    }

    if (!selectedProblem) {
      setHistory((prev) => [...prev, "Error: No Problem Selected!"]);
      return;
    }

    try {
      const exePath = `./uploads/executables/${
        selectedProblem?.exePath || "dummy.exe"
      }`;

      const response = await executeCommand(exePath, input);

      setHistory((prev) => [
        ...prev,
        `> ${input}`,
        response?.output || "No output received",
      ]);
    } catch (error) {
      setHistory((prev) => [
        ...prev,
        `> ${input}`,
        error instanceof Error ? error.message : "An unknown error occurred",
      ]);
    } finally {
      setInput("");
    }
  };

  useStarfield(canvasRef);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [history]);

  useEffect(() => {
    setInput("");
    setHistory([]);
  }, [selectedProblem]);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl shadow-2xl border border-white/10 backdrop-blur-2xl">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0"
      ></canvas>

      <div className="relative z-10 p-4 text-white font-mono h-full space-y-4 bg-[#0b0f26]/60">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
        </div>

        <ProblemHeader problem={selectedProblem} />
        {selectedProblem?.description && (
          <div className="bg-white/5 border border-white/10 p-3 rounded-md text-sm text-white/80">
            <span className="text-cyan-400 font-semibold">Input Format:</span>{" "}
            <span>{selectedProblem.description}</span>
          </div>
        )}

        <div
          ref={scrollRef}
          className={`${inconsolata.className} h-80 overflow-y-auto pr-2 custom-scrollbar space-y-3 text-lg`}
        >
          {history.map((line, idx) => {
            let lineClass = "text-emerald-400";

            if (line.startsWith(prompt)) {
              lineClass = "text-cyan-400";
            } else if (line.toLowerCase().includes("error")) {
              lineClass = "text-red-400";
            } else if (line.toLowerCase().includes("warning")) {
              lineClass = "text-yellow-400";
            }

            return (
              <div key={idx} className={`whitespace-pre-wrap ${lineClass}`}>
                {line}
              </div>
            );
          })}

          <div className="flex items-center">
            <span className="text-emerald-500 mr-2">{prompt}</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleExecute()}
              className="bg-transparent outline-none border-none text-white flex-1"
              autoFocus
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
