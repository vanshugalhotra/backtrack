export interface Problem {
  id: number;
  name: string;
  slug: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  points: number;
  exePath: string;
  description: string;
  iconPath?: string;
  createdAt: string; // We'll use string for dates
  updatedAt: string; // We'll use string for dates
}

export interface ProblemFormData {
  name: string;
  slug: string;
  difficulty: string;
  points: number;
  exePath: string;
  iconPath: string;
  description: string;
}
