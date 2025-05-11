"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AddProblemPage() {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    difficulty: "EASY",
    points: 0,
    exePath: "",
    description: "",
    iconPath: "",
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (key: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileChange = (
    key: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      setForm((prev) => ({
        ...prev,
        [key]: event.target.files?.[0]?.name || "",
      }));
    }
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen flex items-center justify-center py-6 px-3">
      <Card className="w-full max-w-5xl shadow-xl bg-white border border-gray-200 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-gray-800">
            Add Problem
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Problem Name */}
          <div className="space-y-1">
            <Label
              htmlFor="name"
              className="text-base font-medium text-gray-700"
            >
              Problem Name
            </Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Problem Name"
              className="p-3"
            />
          </div>

          {/* Slug */}
          <div className="space-y-1">
            <Label
              htmlFor="slug"
              className="text-base font-medium text-gray-700"
            >
              Slug
            </Label>
            <Input
              id="slug"
              value={form.slug}
              onChange={(e) => handleChange("slug", e.target.value)}
              placeholder="slug-example"
              className="p-3"
            />
          </div>

          {/* Difficulty */}
          <div className="space-y-1">
            <Label
              htmlFor="difficulty"
              className="text-base font-medium text-gray-700"
            >
              Difficulty
            </Label>
            <Select
              value={form.difficulty}
              onValueChange={(value) => handleChange("difficulty", value)}
            >
              <SelectTrigger id="difficulty" className="p-3">
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent className="bg-white border rounded-md">
                <SelectItem
                  value="EASY"
                  className="text-green-600 hover:bg-green-50 focus:bg-green-200 focus:text-green-700"
                >
                  Easy
                </SelectItem>
                <SelectItem
                  value="MEDIUM"
                  className="text-yellow-600 hover:bg-yellow-50 focus:bg-yellow-200 focus:text-yellow-700"
                >
                  Medium
                </SelectItem>
                <SelectItem
                  value="HARD"
                  className="text-red-600 hover:bg-red-50 focus:bg-red-200 focus:text-red-700"
                >
                  Hard
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Points */}
          <div className="space-y-1">
            <Label
              htmlFor="points"
              className="text-base font-medium text-gray-700"
            >
              Points
            </Label>
            <Input
              id="points"
              type="number"
              value={form.points}
              onChange={(e) => handleChange("points", Number(e.target.value))}
              placeholder="Enter points"
              className="p-3"
            />
          </div>

          {/* Executable Path */}
          <div className="space-y-1">
            <Label
              htmlFor="exePath"
              className="text-base font-medium text-gray-700"
            >
              Executable File
            </Label>
            <Input
              id="exePath"
              type="file"
              className="hidden"
              onChange={(e) => handleFileChange("exePath", e)}
            />
            <Button
              type="button"
              variant="outline"
              className="w-full p-3"
              onClick={() => document.getElementById("exePath")?.click()}
            >
              {form.exePath || "Choose Executable File"}
            </Button>
          </div>

          {/* Icon Path */}
          <div className="space-y-1">
            <Label
              htmlFor="iconPath"
              className="text-base font-medium text-gray-700"
            >
              Icon File (Optional)
            </Label>
            <Input
              id="iconPath"
              type="file"
              className="hidden"
              onChange={(e) => handleFileChange("iconPath", e)}
            />
            <Button
              type="button"
              variant="outline"
              className="w-full p-3"
              onClick={() => document.getElementById("iconPath")?.click()}
            >
              {form.iconPath || "Choose Icon File"}
            </Button>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <Label
              htmlFor="description"
              className="text-base font-medium text-gray-700"
            >
              Problem Description
            </Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={6}
              className="p-3"
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg rounded-md cursor-pointer"
          >
            Add Problem
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
