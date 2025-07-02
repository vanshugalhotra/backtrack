import { useEffect, useState } from "react";
import { Problem } from "../../types/problem";
import { useGlobalUI } from "../../context/GlobalUIContext";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

const useProblem = (slug: string | undefined) => {
  const [problem, setProblem] = useState<Problem | null>(null);
  const { setLoading, setError } = useGlobalUI();


  useEffect(() => {
    if (!slug) return;

    const fetchProblem = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchWithAuth(`/api/v1/problems/${slug}`);

        const data = await response.json();
        if (!response.ok || "statusCode" in data) {
          const message = await response.text();
          throw new Error(message || "Failed to fetch the problem");
        }

        setProblem(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProblem();
  }, [slug, setLoading, setError]);

  return { problem };
};

export default useProblem;
