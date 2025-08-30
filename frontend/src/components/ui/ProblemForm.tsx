"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UploadCloud, Rocket } from "lucide-react";
import { useProblemForm } from "@/hooks/useProblemForm";
import { ProblemFormData } from "../../../types/problem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
interface ProblemFormProps {
  initialData?: Partial<ProblemFormData>;
  onSubmit: (formData: ProblemFormData) => Promise<void>;
  mode?: "add" | "edit";
}

export default function ProblemForm({
  initialData,
  onSubmit,
  mode = "add",
}: ProblemFormProps) {
  const { uploadFile, uploadedExeFile, uploadedIconFile } = useProblemForm();

  const [form, setForm] = useState(
    initialData || {
      name: "",
      slug: "",
      difficulty: "EASY",
      points: 0,
      exePath: "",
      iconPath: "",
      description: "",
    }
  );

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (key: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileChange = async (
    key: "exePath" | "iconPath",
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      await uploadFile(file, key === "exePath" ? "exe" : "icon");
      setForm((prev) => ({
        ...prev,
        [key]: file.name,
      }));
    } catch (err) {
      console.error("File upload failed:", err);
      toast.error(`File Upload failed: ${err}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) {
      toast.error("Problem Name is required!!");
      return;
    } else if (!form.slug) {
      toast.error("Problem Name is required!!");
      return;
    } else if (!form.difficulty) {
      toast.error("Difficulty is required!!");
      return;
    } else if (!form.description) {
      toast.error("Description is required!!");
      return;
    } else if (!form.iconPath) {
      toast.error("Choose the icon file!");
      return;
    } else if (!form.exePath) {
      toast.error("Choose the exe file!");
      return;
    }

    const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugPattern.test(form.slug)) {
      toast.error("Slug must be lowercase and in kebab-case.");
      return;
    }

    try {
      const formData = {
        ...form,
        exePath: uploadedExeFile || form.exePath,
        iconPath: uploadedIconFile || form.iconPath,
      };
      await onSubmit(formData as ProblemFormData);
      if (mode === "add") {
        setForm({
          name: "",
          slug: "",
          difficulty: "EASY",
          points: 0,
          exePath: "",
          iconPath: "",
          description: "",
        });
      }
    } catch (err) {
      console.error("Error submitting problem:", err);
      toast.error("Submission failed");
    }
  };

  if (!isClient) return null;

  return (
    <Card className="w-full max-w-5xl shadow-lg border border-gray-200 rounded-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-gray-800">
          {mode === "add" ? "Add Problem" : "Edit Problem"}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6 p-6 sm:grid-cols-2">
        {/* Problem Name */}
        <div className="space-y-2 col-span-full sm:col-span-1">
          <Label htmlFor="name">Problem Name</Label>
          <Input
            id="name"
            placeholder="Enter problem name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>

        {/* Slug */}
        <div className="space-y-2 col-span-full sm:col-span-1">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            placeholder="slug-example"
            value={form.slug}
            onChange={(e) => handleChange("slug", e.target.value)}
          />
        </div>

        {/* Difficulty */}
        <div className="space-y-2">
          <Label htmlFor="difficulty">Difficulty</Label>
          <Select
            value={form.difficulty}
            onValueChange={(value) => handleChange("difficulty", value)}
          >
            <SelectTrigger id="difficulty" className="w-full">
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                value="EASY"
                className="text-green-600 hover:bg-green-50 focus:bg-green-100 focus:text-green-700"
              >
                Easy
              </SelectItem>
              <SelectItem
                value="MEDIUM"
                className="text-yellow-600 hover:bg-yellow-50 focus:bg-yellow-100 focus:text-yellow-700"
              >
                Medium
              </SelectItem>
              <SelectItem
                value="HARD"
                className="text-red-600 hover:bg-red-50 focus:bg-red-100 focus:text-red-700"
              >
                Hard
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Points */}
        <div className="space-y-2 sm:col-span-1">
          <Label htmlFor="points">Points</Label>
          <Input
            id="points"
            type="number"
            placeholder="Enter points"
            value={form.points}
            onChange={(e) => handleChange("points", Number(e.target.value))}
          />
        </div>

        {/* Executable File */}
        <div className="space-y-2 col-span-full">
          <Label htmlFor="exePath">Executable / C++ File</Label>
          <Input
            id="exePath"
            type="file"
            accept=".exe,.out,.cpp"
            className="hidden"
            onChange={(e) => handleFileChange("exePath", e)}
          />
          <Button
            variant="outline"
            onClick={() => document.getElementById("exePath")?.click()}
            className="w-full flex items-center justify-center gap-2"
          >
            <UploadCloud className="w-4 h-4" />
            {form.exePath || "Choose Executable (.exe / .out / .cpp)"}
          </Button>
        </div>

        {/* Icon File */}
        <div className="space-y-2 col-span-full">
          <Label htmlFor="iconPath">Icon File</Label>
          <Input
            id="iconPath"
            type="file"
            className="hidden"
            onChange={(e) => handleFileChange("iconPath", e)}
          />
          <Button
            variant="outline"
            onClick={() => document.getElementById("iconPath")?.click()}
            className="w-full flex items-center justify-center gap-2"
          >
            <UploadCloud className="w-4 h-4" />
            {form.iconPath || "Choose Icon File"}
          </Button>
        </div>

        {/* Description */}
        <div className="space-y-2 col-span-full">
          <Label htmlFor="description">
            Problem Description (Input Format, Constraints)
          </Label>
          <Textarea
            id="description"
            rows={10}
            placeholder={`Input Format:`}
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-full">
          <Button
            type="submit"
            onClick={handleSubmit}
            className="w-full flex items-center justify-center gap-3 py-3 text-lg font-semibold text-white bg-gray-800 hover:bg-gray-900 transition-all duration-300 rounded-md shadow-md ring-2 ring-gray-500/30 cursor-pointer"
          >
            <Rocket className="w-5 h-5" />
            {mode === "add" ? "Add Problem" : "Update Problem"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
