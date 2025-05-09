import React from "react";

const LoadingSpinner = () => (
  <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default LoadingSpinner;
