import React, { useState } from "react";
import { XCircle } from "lucide-react"; // Import an error icon

const ErrorBanner = ({ message }: { message: string }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  return (
    isVisible && (
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-8 py-4 rounded-lg shadow-lg z-50 flex items-center justify-between max-w-lg w-full transition-all duration-300 ease-in-out">
        <div className="flex items-center space-x-4">
          <div className="flex flex-col">
            <span className="font-semibold text-lg">{message}</span>
            <span className="text-sm opacity-80 mt-1">
              Please check your internet connection or try again later.
            </span>
          </div>
        </div>

        <button
          onClick={handleDismiss}
          className="text-white hover:text-gray-200 transition-all ml-4"
          aria-label="Close"
        >
          <XCircle size={20} />
        </button>
      </div>
    )
  );
};

export default ErrorBanner;
