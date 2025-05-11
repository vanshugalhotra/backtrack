"use client";

import { Button } from "@/components/ui/button";
import { LucideEdit, LucideTrash } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import Image from "next/image";

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
  onUpdate: (slug: string) => void;
};

export default function ProblemCard({
  problem,
  onDelete,
  onUpdate,
}: ProblemCardProps) {
  return (
    <Card
      key={problem.slug}
      className="bg-gradient-to-br from-gray-900/80 to-black border border-gray-700 rounded-2xl shadow-lg hover:shadow-indigo-700/40 transition-transform duration-300 hover:scale-[1.03]"
    >
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-white tracking-wide hover:text-indigo-400 transition-colors duration-200">
          {problem.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <span
            className={`text-sm font-medium ${
              problem.difficulty === "EASY"
                ? "text-green-400"
                : problem.difficulty === "MEDIUM"
                ? "text-yellow-400"
                : "text-red-400"
            }`}
          >
            {problem.difficulty}
          </span>
          <span className="text-sm text-gray-400">Points: {problem.points}</span>
        </div>

        <p className="text-gray-300 text-sm leading-relaxed">{problem.description}</p>

        <div className="text-xs text-gray-500 mt-4">
          Created At: {format(new Date(problem.createdAt), "MMM dd, yyyy")}
        </div>

        <div className="flex justify-between mt-6 space-x-3">
          <Button
            variant="destructive"
            className="group flex items-center gap-2 bg-red-600 text-white hover:bg-white hover:text-red-600 transition-all duration-200 rounded-lg px-4 py-2 cursor-pointer"
            onClick={() => onDelete(problem.slug)}
          >
            <LucideTrash className="w-5 h-5 group-hover:text-red-700" />
            <span>Delete</span>
          </Button>
          <Button
            variant="outline"
            className="group flex items-center gap-2 bg-blue-600 text-white hover:bg-white hover:text-blue-600 transition-all duration-200 rounded-lg px-4 py-2 cursor-pointer"
            onClick={() => onUpdate(problem.slug)}
          >
            <LucideEdit className="w-5 h-5 group-hover:text-blue-700" />
            <span>Update</span>
          </Button>
        </div>

        {problem.iconPath && (
          <div className="mt-6 flex justify-center">
            <Image
              src={`/icons/${problem.iconPath}`}
              alt={problem.name}
              width={64}
              height={64}
              className="rounded-full border-2 border-gray-500 shadow-lg transition-transform duration-300 hover:scale-110"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
