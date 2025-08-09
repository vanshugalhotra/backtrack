import React from "react";

const LoadingSpinner = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="relative w-16 h-16">
      {/* Glowing spinning ring */}
      <div className="absolute inset-0 rounded-full border-[3px] border-t-transparent border-r-cyan-400 border-b-indigo-500 border-l-purple-500 animate-spin shadow-[0_0_20px_rgba(99,102,241,0.4)]" />

      {/* Pulsing dot in the center */}
      <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-cyan-300 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-ping opacity-80" />
    </div>
  </div>
);

export default LoadingSpinner;
