"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type UIContextType = {
  loading: boolean;
  setLoading: (val: boolean) => void;
  error: string | null;
  setError: (msg: string | null) => void;
};

const GlobalUIContext = createContext<UIContextType | undefined>(undefined);

export const GlobalUIProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <GlobalUIContext.Provider value={{ loading, setLoading, error, setError }}>
      {children}
    </GlobalUIContext.Provider>
  );
};

export const useGlobalUI = () => {
  const context = useContext(GlobalUIContext);
  if (!context) throw new Error("useGlobalUI must be used inside GlobalUIProvider");
  return context;
};
