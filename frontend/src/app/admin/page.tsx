"use client";

import useProblems from "@/hooks/useProblems";
import useTests from "@/hooks/useTests";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FilePlus2,
  Eye,
  Users,
  ListTodo,
  ClipboardList,
  FileClock,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { problems } = useProblems();
  const { tests } = useTests();

  return (
    <div className="min-h-screen px-6 py-12 text-white">
      <div className="max-w-7xl mx-auto space-y-14">
        {/* Header */}
        <div className="space-y-2">
          <h1 data-testid="dashboard-title" className="text-5xl font-extrabold tracking-tight">BackTrack Admin</h1>
          <p className="text-zinc-400 text-lg">
            Centralized management for problems, tests, and users
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Total Problems */}
          <Card className="bg-gradient-to-br from-zinc-800/60 to-zinc-900/60 border border-white/10 shadow-md rounded-xl" data-testid="stat-total-problems">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-white">Total Problems</CardTitle>
              <ListTodo size={28} className="text-blue-400" />
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-white">{problems?.length || 0}</p>
            </CardContent>
          </Card>

          {/* Total Tests */}
          <Card className="bg-gradient-to-br from-zinc-800/60 to-zinc-900/60 border border-white/10 shadow-md rounded-xl" data-testid="stat-total-tests">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-white">Total Tests</CardTitle>
              <ClipboardList size={28} className="text-purple-400" />
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-white">{tests?.length || 0}</p>
            </CardContent>
          </Card>

          {/* Total Users */}
          <Card className="bg-gradient-to-br from-zinc-800/60 to-zinc-900/60 border border-white/10 shadow-md rounded-xl" data-testid="stat-total-users">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-white">Total Users</CardTitle>
              <Users size={28} className="text-green-400" />
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-white">0</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-3xl font-semibold mb-8">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/admin/problems/add">
              <div className="border border-white/10 rounded-xl p-6 bg-zinc-800/50 hover:border-cyan-500 hover:shadow-cyan-700/10 transition-all duration-200">
                <div className="flex items-center gap-4">
                  <FilePlus2 className="text-blue-500" size={28} />
                  <div>
                    <h3 className="text-xl font-medium text-white">Add Problem</h3>
                    <p className="text-sm text-zinc-400 mt-1">Create a new coding problem.</p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/admin/problems">
              <div className="border border-white/10 rounded-xl p-6 bg-zinc-800/50 hover:border-indigo-500 hover:shadow-indigo-700/10 transition-all duration-200">
                <div className="flex items-center gap-4">
                  <Eye className="text-indigo-400" size={28} />
                  <div>
                    <h3 className="text-xl font-medium text-white">View Problems</h3>
                    <p className="text-sm text-zinc-400 mt-1">Browse and edit existing problems.</p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/admin/tests">
              <div className="border border-white/10 rounded-xl p-6 bg-zinc-800/50 hover:border-purple-500 hover:shadow-purple-700/10 transition-all duration-200">
                <div className="flex items-center gap-4">
                  <FileClock className="text-purple-400" size={28} />
                  <div>
                    <h3 className="text-xl font-medium text-white">Manage Tests</h3>
                    <p className="text-sm text-zinc-400 mt-1">Create, schedule, and manage tests.</p>
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
