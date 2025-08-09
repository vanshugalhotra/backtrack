"use client";
import { useEffect, useState } from "react";
import SvgLoading from "@/components/chors/SvgLoading";

export default function LoaderGate({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 4500);
    return () => clearTimeout(t);
  }, []);

  if (show) return <SvgLoading />;
  return <>{children}</>;
}
