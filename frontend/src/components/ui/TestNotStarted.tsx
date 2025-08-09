"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function TestNotStarted() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center px-6 space-y-6 bg-opacity-50 rounded-lg">
      <div className="flex items-center gap-2 text-cyan-400 text-4xl sm:text-5xl font-extrabold tracking-wide">
        <Sparkles className="w-8 h-8 animate-pulse" />
        Test Not Started
      </div>

      <p className="text-lg sm:text-xl text-gray-300 max-w-2xl">
        The test has not yet started. Please wait for the event organizers to
        begin the test.
      </p>

      <div className="flex flex-wrap justify-center gap-4 pt-4">
        <Button
          onClick={() => window.location.reload()}
          size="lg"
          className="transition-colors duration-200 hover:bg-cyan-600 hover:text-white cursor-pointer"
        >
          Reload Page
        </Button>
        <Button
          variant="outline"
          onClick={() => window.history.back()}
          size="lg"
          className="transition-colors duration-200 hover:bg-cyan-900/20 hover:border-cyan-400 hover:text-cyan-300 cursor-pointer"
        >
          Go Back
        </Button>
        <Button
          variant="secondary"
          onClick={() => window.open("/", "_blank")}
          size="lg"
          className="transition-colors duration-200 hover:bg-cyan-100 hover:text-black cursor-pointer"
        >
          Visit Event Site
        </Button>
      </div>
    </div>
  );
}
