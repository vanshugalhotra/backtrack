"use client";

import { Button } from "@/components/ui/button";
import { LucideEdit, LucideTrash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import Image from "next/image";
import { ICONS_API } from "@/lib/apiConfig";

type ProblemCardProps = {
  problem: {
    slug: string;
    name: string;
    difficulty: string;
    points: number;
    description: string;
    createdAt: string;
    iconPath?: string;
  };
  onDelete: (slug: string) => void;
};

export default function ProblemCard({ problem, onDelete }: ProblemCardProps) {
  return (
    <Card
      key={problem.slug}
      className="w-full max-w-md rounded-xl border border-white/10 bg-zinc-900/80 backdrop-blur-md shadow-md hover:shadow-lg transition-transform hover:scale-[1.01]"
    >
      <CardHeader className="flex flex-row items-center justify-between px-6 pt-6 pb-2">
        <div>
          <CardTitle className="text-xl font-semibold text-white">
            {problem.name}
          </CardTitle>
          <div className="mt-1 text-xs text-gray-400">
            {format(new Date(problem.createdAt), "MMM dd, yyyy")}
          </div>
        </div>
        {problem.iconPath && (
          <Image
            src={ICONS_API.public(problem.iconPath)}
            alt={problem.name}
            width={48}
            height={48}
            className="rounded-md border border-white/10 bg-white/5 p-1"
          />
        )}
      </CardHeader>

      <CardContent className="px-6 pb-6 pt-2 space-y-5">
        <div className="flex items-center justify-between text-sm">
          <span
            className={`px-2 py-0.5 rounded text-xs font-semibold border ${
              problem.difficulty === "EASY"
                ? "text-green-400 border-green-400/40"
                : problem.difficulty === "MEDIUM"
                ? "text-yellow-400 border-yellow-400/40"
                : "text-red-400 border-red-400/40"
            }`}
          >
            {problem.difficulty}
          </span>
          <span className="text-gray-400">Points: {problem.points}</span>
        </div>

        <p className="text-sm text-gray-300 leading-relaxed line-clamp-4">
          {problem.description}
        </p>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
            onClick={() => onDelete(problem.slug)}
          >
            <LucideTrash className="w-4 h-4" />
            Delete
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition"
          >
            <LucideEdit className="w-4 h-4" />
            Update
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
