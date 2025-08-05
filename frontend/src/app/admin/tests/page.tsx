"use client";

import RequireAdmin from "@/components/auth/RequireAdmin";
import useTests from "@/hooks/useTests";
import useDeleteTest from "@/hooks/useDeleteTest";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TestCardAdmin from "@/components/ui/TestCardAdmin";
import DeleteModal from "@/components/ui/Modal/DeleteModal";
import { toast } from "sonner";
import { useState } from "react";

export default function AdminTestsPage() {
  const { tests } = useTests();
  const { deleteTest } = useDeleteTest();

  const [isModalOpen, setModalOpen] = useState(false);
  const [testToDelete, setTestToDelete] = useState<string | null>(null);

  const handleConfirmDelete = async () => {
    if (!testToDelete) return;

    const result = await deleteTest(testToDelete);

    if (result.success) {
      toast.success("Test deleted successfully");
    } else {
      toast.error(result.error || "Error deleting the test");
    }

    setModalOpen(false);
  };

  const handleDeleteRequest = (slug: string) => {
    setTestToDelete(slug);
    setModalOpen(true);
  };

  return (
    <RequireAdmin>
      <main className="min-h-screen px-6 py-10 text-white">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-bold tracking-tight">Manage Tests</h1>
          <Link href="/admin/tests/add">
            <Button className="bg-gradient-to-br from-cyan-600 to-blue-700 text-white px-5 py-2 rounded-lg hover:from-cyan-500 hover:to-blue-600 transition-all">
              + Add New Test
            </Button>
          </Link>
        </div>

        {!tests || tests.length === 0 ? (
          <p className="text-gray-400 text-lg">No tests available.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tests.map((test) => (
              <TestCardAdmin
                key={test.id}
                name={test.name}
                description={test.description}
                image="/test.png"
                hasStarted={test.hasStarted}
                onStart={() => console.log("Start test not implemented")}
                onDelete={() => handleDeleteRequest(test.slug)}
              />
            ))}
          </div>
        )}

        <DeleteModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={handleConfirmDelete}
          slug={testToDelete ?? ""}
          type="test"
        />
      </main>
    </RequireAdmin>
  );
}
