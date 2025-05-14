"use client";

import useProblems from "@/hooks/useProblems";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FilePlus2, Eye, Users, ListTodo } from "lucide-react";

export default function AdminDashboardPage() {
  const { problems } = useProblems();

  return (
    <div className="min-h-screen px-4 py-10 bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-white">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold">BackTrack Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Manage problems and users
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Total Problems</CardTitle>
              <ListTodo size={28} className="text-blue-500" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{problems?.length || 0}</p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Total Users</CardTitle>
              <Users size={28} className="text-green-500" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">0</p> {/* Static for now */}
            </CardContent>
          </Card>
        </div>

        {/* CTAs */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Add Problem */}
            <Link href="/admin/problems/add">
              <div className="border rounded-lg p-6 transition-colors duration-200 bg-white hover:bg-gray-100">
                <div className="flex items-center gap-4">
                  <FilePlus2 className="text-blue-600" size={24} />
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">
                      Add Problem
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Create a new problem.
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            {/* View Problems */}
            <Link href="/admin/problems">
              <div className="border rounded-lg p-6 transition-colors duration-200 bg-white hover:bg-gray-100">
                <div className="flex items-center gap-4">
                  <Eye className="text-indigo-600" size={24} />
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">
                      View Problems
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Browse all available problems.
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
