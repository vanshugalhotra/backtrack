import { useEffect, useState } from "react";
import { Problem } from "../../types/problem";
import { useGlobalUI } from "../../context/GlobalUIContext"; // Import the context
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { PROBLEMS_API } from "@/lib/apiConfig";

const useProblems = () => {
  const [problems, setProblems] = useState<Problem[] | null>(null);
  const { setLoading, setError } = useGlobalUI(); // Access global state handlers

  useEffect(() => {
    const fetchProblems = async () => {
      setLoading(true); // Trigger global loading state
      setError(null); // Clear previous errors

      try {
        const response = await fetchWithAuth(PROBLEMS_API.list);

        if (!response.ok) {
          const error = await response.json();
          if (error?.message === "FORBIDDEN: Please log in to access this resource") {
            window.location.href = "/login";
            return;
          }
          throw new Error(error?.message || "Failed to fetch problems");
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
