"use client";

import { toast } from "sonner";
import RequireAdmin from "@/components/auth/RequireAdmin";
import TestsForm from "@/components/ui/TestsForm";
import { TestFormData } from "../../../../../types/test";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { useRouter } from "next/navigation";
import { TESTS_API } from "@/lib/apiConfig";

export default function AddTestPage() {
  const router = useRouter();

  const handleAdd = async (formData: TestFormData) => {
    try {
      const res = await fetchWithAuth(TESTS_API.list, {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create test");
      }

      const result = await res.json();
      toast.success(`Test: ${result.slug} created successfully!`);
      router.push("/admin/tests");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <RequireAdmin>
      <div className="min-h-screen flex items-center justify-center px-4 py-10">
        <TestsForm onSubmit={handleAdd} mode="add" />
      </div>
    </RequireAdmin>
  );
}
