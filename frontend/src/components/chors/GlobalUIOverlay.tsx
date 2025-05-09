"use client";

import { useGlobalUI } from "../../../context/GlobalUIContext";
import LoadingSpinner from "@/components/chors/LoadingSpinner";
import ErrorBanner from "@/components/chors/ErrorBanner";

export function GlobalUIOverlay() {
  const { loading, error } = useGlobalUI();
  return (
    <>
      {loading && <LoadingSpinner />}
      {error && <ErrorBanner message={error} />}
    </>
  );
}
