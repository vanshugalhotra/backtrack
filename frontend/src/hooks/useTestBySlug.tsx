"use client";

import { useEffect, useState } from "react";
import { TestDetail } from "../../types/test";
import { useGlobalUI } from "../../context/GlobalUIContext";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { useSearchParams, useParams } from "next/navigation";

const useTestBySlug = () => {
  const [test, setTest] = useState<TestDetail | null>(null);
  const { setLoading, setError } = useGlobalUI();

  const params = useParams(); // for slug
  const searchParams = useSearchParams(); // for ?password=xxx

  useEffect(() => {
    const fetchTest = async () => {
      const slug = params?.slug;
      const password = searchParams?.get("password");

      if (!slug || Array.isArray(slug)) return;

      setLoading(true);
      setError(null);

      try {
        const url = password
          ? `/api/v1/tests/${slug}?password=${encodeURIComponent(password)}`
          : `/api/v1/tests/${slug}`;

        const response = await fetchWithAuth(url);

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
  }, [params?.slug, searchParams, setLoading, setError]);

  return { test };
};

export default useTestBySlug;
