import { useEffect, useState } from "react";
import { TestDetail } from "../../types/test";
import { useGlobalUI } from "../../context/GlobalUIContext";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { useParams } from "next/navigation";

const useTestBySlug = () => {
  const [test, setTest] = useState<TestDetail | null>(null);
  const { setLoading, setError } = useGlobalUI();
  const params = useParams();

  useEffect(() => {
    const fetchTest = async () => {
      const slug = params?.slug;
      if (!slug || Array.isArray(slug)) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetchWithAuth(`/api/v1/tests/${slug}`);
        if (!response.ok) {
          const error = await response.json();
          if (error?.message?.includes("FORBIDDEN")) {
            window.location.href = "/login";
            return;
          }
          throw new Error(error.message || "Failed to fetch test");
        }

        const data: TestDetail = await response.json();
        setTest(data);
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

    fetchTest();
  }, [params?.slug, setLoading, setError]);

  return { test };
};

export default useTestBySlug;
