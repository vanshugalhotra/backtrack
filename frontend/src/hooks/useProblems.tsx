import { useEffect, useState } from "react";
import { Problem } from "../../types/problem";

const useProblems = () => {
  const [problems, setProblems] = useState<Problem[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await fetch("/api/v1/problems"); // uses the proxy to hit backend
        if (!response.ok) {
          throw new Error("Failed to fetch problems");
        }
        const data = await response.json();
        setProblems(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  return { problems, loading, error };
};
export default useProblems;
