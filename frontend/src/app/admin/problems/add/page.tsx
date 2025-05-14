"use client";

import { toast } from "sonner";
import { useProblemForm } from "@/hooks/useProblemForm";
import ProblemForm from "@/components/ui/ProblemForm";
import { ProblemFormData } from "../../../../../types/problem";

export default function AddProblemPage() {
  const { submitProblemForm } = useProblemForm();

  const handleAdd = async (formData: ProblemFormData) => {
    const result = await submitProblemForm(formData);
    toast.success(`Problem: ${result.slug} added successfully!`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <ProblemForm onSubmit={handleAdd} mode="add" />
    </div>
  );
}
