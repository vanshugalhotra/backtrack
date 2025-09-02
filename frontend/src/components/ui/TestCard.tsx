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
      className="group relative w-full max-w-lg rounded-2xl border border-white/10 bg-[#0a0c14] shadow-sm transition-transform duration-300 hover:-translate-y-1 cursor-pointer"
    >
      {/* Banner */}
      <div className="relative h-44 w-full rounded-t-2xl overflow-hidden">
        <Image src={image} alt="Test Banner" fill className="object-cover" />
        <div className="absolute top-3 right-3 bg-black/60 rounded-md p-1">
          <Lock size={18} className="text-indigo-400" />
        </div>
      </div>

      {/* Content */}
      <CardContent className="px-6 py-6 flex flex-col space-y-3">
        <h3 className="text-xl font-semibold text-white">{name}</h3>
        <p className="text-gray-300 text-sm line-clamp-3">{description}</p>

        <Button
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="mt-2 px-5 py-2 border border-white/20 text-white text-sm font-medium rounded-md 
             bg-transparent hover:bg-white/90 hover:text-black hover:border-white transition-colors 
             shadow-none active:scale-95 cursor-pointer"
        >
          Enter Test
        </Button>
      </CardContent>
    </Card>
  );
};

export default TestCard;
