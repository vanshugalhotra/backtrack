"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lock } from "lucide-react";
import Image from "next/image";

interface TestCardProps {
  name: string;
  description: string;
  image: string;
  onClick: () => void;
}

const TestCard: React.FC<TestCardProps> = ({
  name,
  description,
  image,
  onClick,
}) => {
  return (
    <Card
      onClick={onClick}
      className="group relative w-full max-w-[40rem] overflow-hidden rounded-2xl border border-white/10 bg-[#0b0f26]/80 backdrop-blur-md shadow-md transition hover:shadow-cyan-500/20 cursor-auto"
    >
      {/* Banner */}
      <div className="relative h-52 w-full">
        <Image
          src={image}
          alt="Test Banner"
          fill
          className="object-cover transition duration-300 group-hover:scale-[1.015]"
        />
        <div className="absolute top-3 right-3">
          <Lock size={20} className="text-cyan-300" />
        </div>
      </div>

      {/* Content */}
      <CardContent className="px-6 py-5 text-white space-y-4">
        <h3 className="text-2xl font-semibold tracking-tight group-hover:text-cyan-400 transition-colors">
          {name}
        </h3>

        <div className="space-y-1">
          <p className="text-sm text-white/70 leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>

        <Button
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="cursor-pointer w-full bg-cyan-700 hover:bg-cyan-800 text-white font-medium rounded-md transition-colors duration-200"
          size="sm"
        >
          Enter Test
        </Button>
      </CardContent>
    </Card>
  );
};

export default TestCard;
