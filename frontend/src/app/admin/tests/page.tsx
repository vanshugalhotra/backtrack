"use client";

import RequireAdmin from "@/components/auth/RequireAdmin";
import useTests from "@/hooks/useTests";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TestCardAdmin from "@/components/ui/TestCardAdmin";

export default function AdminTestsPage() {
  const { tests } = useTests();

  const handleStartTest = () => {
    // TODO: Add API call or mutation here
    console.log("Starting test with ID:");
  };

  const handleDeleteTest = () => {
    // TODO: Add API call or mutation here
    console.log("Deleting test with ID:");
  };

  return (
    <RequireAdmin>
      <main className="min-h-screen px-6 py-10 text-white">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-bold tracking-tight">Manage Tests</h1>
          <Link href="/admin/tests/add">
            <Button className="flex items-center gap-2 bg-gradient-to-br from-cyan-600 to-blue-700 text-white font-medium px-5 py-2 rounded-lg shadow-md hover:from-cyan-500 hover:to-blue-600 transition-all duration-200 cursor-pointer">
              <span className="text-lg">+</span> Add New Test
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
                image={"/test.jpg"}
                onStart={() => handleStartTest()}
                onDelete={() => handleDeleteTest()}
              />
            ))}
          </div>
        )}
      </main>
    </RequireAdmin>
  );
}
