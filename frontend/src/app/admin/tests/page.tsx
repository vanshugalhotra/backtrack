"use client";

import RequireAdmin from "@/components/auth/RequireAdmin";
import useTests from "@/hooks/useTests";
import useDeleteTest from "@/hooks/useDeleteTest";
import useStartTest from "@/hooks/useStartTest";
import useStopTest from "@/hooks/useStopTest";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TestCardAdmin from "@/components/ui/TestCardAdmin";
import DeleteModal from "@/components/ui/Modal/DeleteModal";
import PasswordModal from "@/components/ui/Modal/PasswordModal";
import { toast } from "sonner";
import { useState } from "react";

export default function AdminTestsPage() {
  const { tests } = useTests();
  const { deleteTest } = useDeleteTest();
  const { startTest } = useStartTest();
  const { stopTest } = useStopTest();

  const [isModalOpen, setModalOpen] = useState(false);
  const [testToDelete, setTestToDelete] = useState<string | null>(null);

  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [testToStart, setTestToStart] = useState<string | null>(null);
  const [isStopFlow, setIsStopFlow] = useState(false);

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

  const handleStartRequest = (slug: string) => {
    setIsStopFlow(false);
    setTestToStart(slug);
    setPasswordModalOpen(true);
  };

  const handleConfirmStart = async (password: string) => {
    if (!testToStart) return;

    const result = isStopFlow
      ? await stopTest(testToStart, password)
      : await startTest(testToStart, password);

    if (result.success) {
      toast.success(`Test ${isStopFlow ? "ended" : "started"} successfully`);
    } else {
      toast.error(
        result.error || `Error ${isStopFlow ? "ending" : "starting"} the test`
      );
    }

    setPasswordModalOpen(false);
    setTestToStart(null);
    setIsStopFlow(false);
  };

  const handleStopRequest = (slug: string) => {
    setIsStopFlow(true);
    setTestToStart(slug);
    setPasswordModalOpen(true);
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
                onStart={() => handleStartRequest(test.slug)}
                onDelete={() => handleDeleteRequest(test.slug)}
                onStop={() => handleStopRequest(test.slug)}
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

        <PasswordModal
          open={isPasswordModalOpen}
          onClose={() => setPasswordModalOpen(false)}
          onSubmit={handleConfirmStart}
        />
      </main>
    </RequireAdmin>
  );
}
