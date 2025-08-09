import { Problem } from "./problem";

export interface TestDetail {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  password: string;
  hasStarted: boolean;
  createdAt: string;
  updatedAt: string;
  problems: Problem[];
}
export interface TestFormData {
  name: string;
  slug: string;
  description?: string;
  password: string;
  problems: string[];
}
