"use client";

import { useGlobalUI } from "../../context/GlobalUIContext";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { useCallback } from "react";

const useStartTest = () => {
  const { setLoading, setError } = useGlobalUI();

  const startTest = useCallback(async (slug: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const url = `/api/v1/tests/${slug}/start?password=${encodeURIComponent(password)}`;

      const response = await fetchWithAuth(url, {
        method: "POST",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to start test");
      }

      return { success: true };
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        return { success: false, error: err.message };
      } else {
        setError("Unexpected error occurred");
        return { success: false, error: "Unexpected error occurred" };
      }
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError]);

  return { startTest };
};

export default useStartTest;
