"use client";

import useProblems from "@/hooks/useProblems"; // Import the custom hook
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns"; // For formatting the date
import Image from "next/image"; // Import next/image for optimized image handling
import { LucideEdit, LucideTrash } from "lucide-react"; // Icons for 'Update' and 'Delete'

export default function ProblemsListPage() {
  const { problems } = useProblems(); // Use the hook to get the problems

  return (
    <div className="min-h-screen py-6 px-4 bg-gradient-to-b from-gray-900 to-black">
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
              <Card
                key={problem.slug}
                className="bg-transparent border border-gray-800 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-b hover:from-gray-800 hover:to-black"
              >
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white hover:text-indigo-400 transition-all duration-300 ease-in-out">
                    {problem.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span
                      className={`${
                        problem.difficulty === "EASY"
                          ? "text-green-400"
                          : problem.difficulty === "MEDIUM"
                          ? "text-yellow-400"
                          : "text-red-400"
                      } text-sm font-medium`}
                    >
                      Difficulty: {problem.difficulty}
                    </span>
                    <span className="text-gray-400 text-sm">
                      Points: {problem.points}
                    </span>
                  </div>

                  <p className="text-sm text-gray-300">{problem.description}</p>

                  <div className="flex justify-start space-x-4 text-xs text-gray-500 mt-4">
                    <span>
                      Created At:{" "}
                      {format(new Date(problem.createdAt), "MMM dd, yyyy")}
                    </span>
                  </div>

                  <div className="flex justify-between mt-4 space-x-4">
                    <Button
                      variant="destructive"
                      className="group flex items-center justify-center space-x-2 transition-all duration-300 ease-in-out bg-red-500 text-white hover:bg-white hover:text-red-500 focus:outline-none rounded-md px-4 py-2 cursor-pointer"
                    >
                      <LucideTrash className="w-5 h-5 text-white group-hover:text-red-600 transition-all" />
                      <span>Delete</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="group flex items-center justify-center space-x-2 transition-all duration-300 ease-in-out bg-blue-500 text-white hover:bg-white hover:text-blue-500 focus:outline-none rounded-md px-4 py-2 cursor-pointer"
                    >
                      <LucideEdit className="w-5 h-5 text-white group-hover:text-blue-600 transition-all" />
                      <span>Update</span>
                    </Button>
                  </div>

                  {/* Display icon if available */}
                  {problem.iconPath && (
                    <div className="mt-4 flex justify-center">
                      <Image
                        src={`/icons/${problem.iconPath}`}
                        alt={problem.name}
                        width={72}
                        height={72}
                        className="rounded-full shadow-2xl border-4 border-gray-600 transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
      </div>
    </div>
  );
}
