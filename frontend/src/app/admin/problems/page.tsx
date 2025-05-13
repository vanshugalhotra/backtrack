"use client";

import useProblems from "@/hooks/useProblems";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ProblemCard from "@/components/ui/ProblemCard";
import DeleteModal from "@/components/ui/Modal/DeleteModal";
import { toast } from "sonner";
import useDeleteProblem from "@/hooks/useDeleteProblem";

export default function ProblemsListPage() {
  const { problems } = useProblems();
  const { deleteProblem } = useDeleteProblem();
  const [isModalOpen, setModalOpen] = useState(false);
  const [problemToDelete, setProblemToDelete] = useState<string | null>(null); // To store the problem's slug to delete

  const handleDelete = async () => {
    if (!problemToDelete) return;

    const result = await deleteProblem(problemToDelete);

    if (result.success) {
      toast.success("Problem deleted successfully");
    } else {
      toast.error(result.error || "Error deleting the problem");
    }
    setModalOpen(false);
  };
  return (
    <div className="min-h-screen py-6 px-4 bg-transparent">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Show skeletons until problems are fetched */}
        {problems === null
          ? Array(3)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="space-y-4">
                  <Skeleton className="w-full h-48 rounded-lg shadow-xl bg-gray-800" />
                  <Skeleton className="w-3/4 h-8 bg-gray-700" />
                  <Skeleton className="w-1/2 h-6 bg-gray-700" />
                  <Skeleton className="w-full h-6 bg-gray-700" />
                </div>
              ))
          : problems.map((problem) => (
              <ProblemCard
                key={problem.slug}
                problem={problem}
                onDelete={(slug) => {
                  setProblemToDelete(slug);
                  setModalOpen(true);
                }}
              />
            ))}
      </div>
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)} 
        onConfirm={handleDelete} 
        problemSlug={problemToDelete ? problemToDelete : ""}
      />
    </div>
  );
}
