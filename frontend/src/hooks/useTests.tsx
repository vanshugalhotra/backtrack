import { useEffect, useState } from "react";
import { useGlobalUI } from "../../context/GlobalUIContext";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { TESTS_API } from "@/lib/apiConfig";

type Test = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  password: string;
  hasStarted: boolean;
  createdAt: string;
  updatedAt: string;
};

const useTests = () => {
  const [tests, setTests] = useState<Test[] | null>(null);
  const { setLoading, setError } = useGlobalUI();

  useEffect(() => {
    const fetchTests = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchWithAuth(TESTS_API.list);

        if (!response.ok) {
          const error = await response.json();
          if (error?.message?.includes("FORBIDDEN")) {
            window.location.href = "/login";
            return;
          }
          throw new Error(error.message || "Failed to fetch tests");
        }

        const data = await response.json();
        setTests(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, [setLoading, setError]);

  return { tests };
};

export default useTests;
