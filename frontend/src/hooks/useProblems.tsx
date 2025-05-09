import { useEffect, useState } from "react";
import { Problem } from "../../types/problem";
import { useGlobalUI } from "../../context/GlobalUIContext"; // Import the context

const useProblems = () => {
  const [problems, setProblems] = useState<Problem[] | null>(null);
  const { setLoading, setError } = useGlobalUI(); // Access global state handlers

  useEffect(() => {
    const fetchProblems = async () => {
      setLoading(true); // Trigger global loading state
      setError(null); // Clear previous errors

      try {
        const response = await fetch("/api/v1/problems");

        if (!response.ok) {
          const message = await response.text();
          throw new Error(message || "Failed to fetch problems");
        }

        const data = await response.json();
        setProblems(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message); // Set global error message
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false); // Reset global loading state
      }
    };

    fetchProblems();
  }, [setLoading, setError]); // Include the setters in the dependency array

  return { problems };
};

export default useProblems;
