"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface TestCardAdminProps {
  name: string;
  description: string | null;
  image: string;
  onStart: () => void;
  onDelete: () => void;
}

const TestCardAdmin: React.FC<TestCardAdminProps> = ({
  name,
  description,
  image,
  onStart,
  onDelete,
}) => {
  return (
    <Card className="group relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-[#0b0f26]/80 backdrop-blur-md shadow-md hover:shadow-cyan-500/10 transition cursor-default">
      {/* Banner */}
      <div className="relative h-52 w-full">
        <Image
          src={image}
          alt="Test Banner"
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <CardContent className="px-6 py-5 text-white space-y-4">
        <h3 className="text-xl font-semibold tracking-tight group-hover:text-cyan-400 transition-colors">
          {name}
        </h3>

        <p className="text-sm text-white/70 leading-relaxed line-clamp-3">
          {description || "No description provided."}
        </p>

        <div className="flex justify-between gap-3 pt-2">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onStart();
            }}
            className="bg-green-600 hover:bg-green-700 text-white rounded-md px-4 py-2 text-sm"
          >
            Start Test
          </Button>

          <Button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="bg-red-600 hover:bg-red-700 text-white rounded-md px-4 py-2 text-sm"
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestCardAdmin;
