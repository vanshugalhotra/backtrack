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
      className="group relative w-full max-w-3xl overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-[#0b0f26] to-[#0e122d] backdrop-blur-lg shadow-lg hover:shadow-cyan-500/20 transition duration-300 cursor-pointer"
    >
      {/* Banner */}
      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt="Test Banner"
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-black/50 rounded-full p-1 backdrop-blur-sm">
          <Lock size={18} className="text-cyan-300" />
        </div>
      </div>

      {/* Content */}
      <CardContent className="px-6 py-5 text-white space-y-4">
        <h3 className="text-xl font-semibold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
          {name}
        </h3>

        <p className="text-sm text-white/70 leading-relaxed line-clamp-3">
          {description}
        </p>

        <div className="pt-2">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="w-full bg-cyan-700 hover:bg-cyan-800 text-white font-medium rounded-md transition-colors duration-200 shadow"
            size="sm"
          >
            Enter Test
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestCard;
