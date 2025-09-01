import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { useGlobalUI } from "../../context/GlobalUIContext"; 
import { PROBLEMS_API } from "@/lib/apiConfig";

const useDeleteProblem = () => {
  const { setLoading, setError } = useGlobalUI();

  const deleteProblem = async (slug: string) => {
    setLoading(true); // Trigger global loading state
    setError(null); // Clear previous errors

    try {
      const response = await fetchWithAuth(PROBLEMS_API.detail(slug), {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json(); // Parse error response
        throw new Error(errorData.message || "Failed to delete the problem");
      }

      const problemData = await response.json(); // Get problem data after successful deletion
      return { success: true, problem: problemData }; // Return success and the deleted problem data
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message); // Set global error message
      } else {
        setError("An unexpected error occurred");
      }
      return { success: false, error: "Failed to delete problem" }; // Return failure message
    } finally {
      setLoading(false); // Reset global loading state
    }
  };

  return { deleteProblem }; // Return only the deleteProblem function
};

export default useDeleteProblem;
