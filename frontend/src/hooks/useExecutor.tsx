import { useGlobalUI } from "../../context/GlobalUIContext";
import { ExecutorRequest } from "../../types/executorRequest";
import { ExecutorResponse } from "../../types/executorResponse";
import { EXECUTE_API } from "@/lib/apiConfig";

export const useExecute = () => {
  const { setLoading, setError } = useGlobalUI();

  const executeCommand = async (exePath: string, input: string) => {
    setLoading(true); // Set loading to true
    setError(null); // Clear previous error

    const requestData: ExecutorRequest = { exePath, input };

    try {
      const res = await fetch(EXECUTE_API.run, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData), // Pass the request data
      });

      const data: ExecutorResponse = await res.json(); // Define the response type

      if (!res.ok) {
        throw new Error(data?.message || "Execution failed");
      }

      return data;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      throw err; // Rethrow the error so it can be handled by the caller
    } finally {
      setLoading(false);
    }
  };

  return { executeCommand };
};
