'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import useLogin from "@/hooks/useLogin";
import { decodeToken } from "@/lib/auth";
import { useGlobalUI } from "../../../context/GlobalUIContext";

export default function LoginPage() {
  const { login } = useLogin();
  const { error } = useGlobalUI();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const success = await login(email, password);

    if (success) {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const decoded = decodeToken(token);
          router.push(decoded.role === "ADMIN" ? "/admin" : "/");
        } catch {
          localStorage.removeItem("token"); // corrupted or invalid token
        }
      }
    }

    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1f2937] p-8 rounded-2xl shadow-lg w-full max-w-sm space-y-5"
      >
        <h1 className="text-2xl font-bold text-white text-center">🚀 Login to BackTrack</h1>

        <Input
          type="email"
          placeholder="Email"
          className="bg-[#2e2e3e] text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          type="password"
          placeholder="Password"
          className="bg-[#2e2e3e] text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <Button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
          disabled={submitting}
        >
          {submitting ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
}
