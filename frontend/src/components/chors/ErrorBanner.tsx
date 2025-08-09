import React, { useState } from "react";
import { XCircle } from "lucide-react";
import Link from "next/link";

const ErrorBanner = ({ message }: { message: string }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  return (
    isVisible && (
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="relative bg-gradient-to-br from-[#1a1333] to-[#2a1b4a] text-white px-10 py-8 rounded-2xl shadow-[0_0_30px_rgba(91,33,182,0.5)] max-w-lg w-full text-center space-y-6 border border-violet-500/30 animate-fade-in-up">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.05),transparent_60%)]" />
          <div className="flex justify-center relative z-10">
            <XCircle size={42} className="text-violet-300 drop-shadow cursor-pointer" onClick={handleDismiss}/>
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl font-semibold tracking-tight text-violet-100">{message}</h2>
            <p className="text-sm text-violet-300 mt-2">Something went wrong in this universe.</p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6 relative z-10">
            <Link
              href="/"
              className="bg-violet-200 text-[#2a1b4a] font-semibold px-5 py-2.5 rounded-md hover:bg-violet-100 transition"
            >
              Back to Home
            </Link>
            <button
              onClick={handleDismiss}
              className="border border-violet-300 text-violet-100 px-5 py-2.5 rounded-md hover:bg-violet-800/40 transition"
            >
              Vanish
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ErrorBanner;
