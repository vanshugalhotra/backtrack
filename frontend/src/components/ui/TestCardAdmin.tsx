"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface TestCardAdminProps {
  name: string;
  description: string | null;
  image: string;
  onStart: () => void;
  onDelete: () => void;
  hasStarted: boolean;
}

const TestCardAdmin: React.FC<TestCardAdminProps> = ({
  name,
  description,
  image,
  onStart,
  onDelete,
  hasStarted,
}) => {
  return (
    <Card className="group relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-[#0b0f26]/80 backdrop-blur-md shadow-md hover:shadow-cyan-500/10 transition">
      {/* Banner */}
      <div className="relative h-56 w-full">
        <Image
          src={image}
          alt="Test Banner"
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <CardContent className="px-6 py-5 text-white space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold tracking-tight group-hover:text-cyan-400 transition-colors">
            {name}
          </h3>
          <Badge
            className={`text-xs px-2 py-1 rounded-full border font-medium ${
              hasStarted
                ? "border-green-500 text-green-400"
                : "border-yellow-500 text-yellow-400"
            }`}
            variant="outline"
          >
            {hasStarted ? "Started" : "Not Started"}
          </Badge>
        </div>

        <p className="text-sm text-white/70 leading-relaxed line-clamp-3">
          {description || "No description provided."}
        </p>

        <div className="flex justify-between gap-3 pt-3">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              if (!hasStarted) onStart();
            }}
            disabled={hasStarted}
            className={`rounded-md cursor-pointer px-4 py-2 text-sm font-medium transition-all duration-200 ${
              hasStarted
                ? "bg-gray-600 text-white cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {hasStarted ? "Already Started" : "Start Test"}
          </Button>

          <Button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="bg-red-600 hover:bg-red-700 cursor-pointer text-white rounded-md px-4 py-2 text-sm font-medium"
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestCardAdmin;
