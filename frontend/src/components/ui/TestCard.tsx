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
    <div className="relative w-full max-w-lg">
      {/* Subtle cosmic gradient border */}
      <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-[#1e1a3d] via-[#2a2559] to-[#1a2b4a] opacity-60 group-hover:opacity-90 transition duration-300 ease-in-out">
        {/* Star-like glow effect on hover */}
        <div className="absolute inset-0 rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(150,150,255,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out" />
        </div>
      </div>

      <Card
        onClick={onClick}
        className="group relative w-full rounded-xl border border-[#2a2559]/30 
          bg-[#0f1226]/95 shadow-[0_0_10px_rgba(50,50,150,0.2)] cursor-pointer 
          transition-all duration-300 ease-in-out hover:scale-[1.005] hover:shadow-[0_0_15px_rgba(100,100,200,0.3)] pt-0"
      >
        {/* Banner with subtle cosmic overlay */}
        <div className="relative h-56 w-full rounded-t-xl overflow-hidden">
          <Image src={image} alt="Test Banner" fill className="object-cover opacity-95 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1226]/70 via-transparent to-transparent" />
          <div className="absolute top-3 right-3 bg-[#1e1a3d]/50 backdrop-blur-sm rounded-md p-1.5 group-hover:bg-[#2a2559]/60 transition-colors duration-300 ease-in-out">
            <Lock size={16} className="text-[#b0b5ff] group-hover:text-[#c5caff] transition-colors duration-300 ease-in-out" />
          </div>
        </div>

        {/* Content */}
        <CardContent className="px-6 py-3 flex flex-col space-y-4">
          <h3 className="text-xl font-semibold text-[#d5d8ff] tracking-wide group-hover:text-[#e0e5ff] transition-colors duration-300 ease-in-out">
            {name}
          </h3>
          <p className="text-[#a0a5ff] text-sm line-clamp-3 leading-relaxed group-hover:text-[#b5baff] transition-colors duration-300 ease-in-out">
            {description}
          </p>

          <Button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="mt-4 px-6 py-2 text-sm font-medium rounded-lg 
              border border-[#2a2559]/40 
              bg-gradient-to-r from-[#1e1a3d] to-[#1a2b4a] 
              hover:from-[#2a2559] hover:to-[#25356b] 
              text-[#d5d8ff] hover:text-[#e0e5ff] 
              transition-all duration-300 ease-in-out active:scale-95 relative overflow-hidden"
          >
            <span className="relative z-10">Enter Test</span>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(150,150,255,0.15),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestCard;