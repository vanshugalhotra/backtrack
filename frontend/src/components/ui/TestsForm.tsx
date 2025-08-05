"use client";

import { useState } from "react";
import { toast } from "sonner";
import useProblems from "@/hooks/useProblems";
import { TestFormData } from "../../../types/test";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
interface TestsFormProps {
  mode: "add" | "edit";
  onSubmit: (formData: TestFormData) => void;
}

const TestsForm: React.FC<TestsFormProps> = ({ mode, onSubmit }) => {
  const { problems } = useProblems();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [selectedProblems, setSelectedProblems] = useState<number[]>([]);

  const handleToggleProblem = (id: number) => {
    setSelectedProblems((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !slug || !password) {
      toast.error("Name, slug, and password are required.");
      return;
    }
    if (!problems) {
      toast.error("Problems list is still loading. Please try again.");
      return;
    }

    const selectedSlugs = problems
      .filter((p) => selectedProblems.includes(p.id))
      .map((p) => p.slug);

    const formData: TestFormData = {
      name,
      slug,
      description,
      password,
      problems: selectedSlugs,
    };

    onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-5xl shadow-lg border border-gray-200 rounded-2xl text-gray-800 mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold">
          {mode === "add" ? "Create New Test" : "Edit Test"}
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="grid gap-6 p-6 sm:grid-cols-2">
          {/* Name */}
          <div className="space-y-2 sm:col-span-1">
            <Label htmlFor="name">Test Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter test name"
              required
            />
          </div>

          {/* Slug */}
          <div className="space-y-2 sm:col-span-1">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="test-slug"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2 col-span-full">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a short description of the test..."
              rows={4}
            />
          </div>

          {/* Password */}
          <div className="space-y-2 col-span-full sm:col-span-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Test access password"
              required
            />
          </div>

          {/* Select Problems */}
          <div className="space-y-2 col-span-full">
            <Label className="text-base font-semibold">Select Problems</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-72 overflow-y-auto">
              {problems?.map((problem) => {
                const difficultyColor = {
                  EASY: "text-green-500 border-green-300",
                  MEDIUM: "text-yellow-600 border-yellow-400",
                  HARD: "text-red-600 border-red-400",
                };

                return (
                  <label
                    key={problem.id}
                    className={`relative flex flex-col gap-1 bg-white p-4 rounded-lg shadow-sm border-2 ${
                      selectedProblems.includes(problem.id)
                        ? "border-cyan-500 ring-2 ring-cyan-200"
                        : "border-gray-200"
                    } cursor-pointer transition-all`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedProblems.includes(problem.id)}
                      onChange={() => handleToggleProblem(problem.id)}
                      className="absolute top-3 right-3 w-4 h-4 text-cyan-600 accent-cyan-600"
                    />

                    {/* Header: Title and Difficulty */}
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-lg text-gray-800">
                        {problem.name}
                      </h3>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full border ${
                          difficultyColor[problem.difficulty]
                        }`}
                      >
                        {problem.difficulty}
                      </span>
                    </div>

                    {/* Slug & Points */}
                    <div className="text-sm text-gray-500">
                      <p className="truncate">/{problem.slug}</p>
                      <p className="font-medium mt-1">
                        Points: {problem.points}
                      </p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Submit */}
          <div className="col-span-full">
            <Button
              type="submit"
              className="w-full flex items-center justify-center gap-3 py-3 text-lg font-semibold text-white bg-gray-800 hover:bg-gray-900 transition-all duration-300 rounded-md shadow-md ring-2 ring-gray-500/30 cursor-pointer"
            >
              {mode === "add" ? "Create Test" : "Update Test"}
            </Button>
          </div>
        </CardContent>
      </form>
    </Card>
  );
};

export default TestsForm;
