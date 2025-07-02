'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import useLogin from "@/hooks/useLogin";
import { decodeToken } from "@/lib/auth";
import { useGlobalUI } from "../../../context/GlobalUIContext";
import Image from "next/image";
import { useAuth } from "../../../context/AuthContext";

export default function LoginPage() {
  const { login } = useLogin();
  const { error } = useGlobalUI();
  const router = useRouter();
  const {setUserFromToken} = useAuth();

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
          setUserFromToken(token);
          const decoded = decodeToken(token);
          router.push(decoded.role === "ADMIN" ? "/" : "/");
        } catch {
          localStorage.removeItem("token");
        }
      }
    }

    setSubmitting(false);
  };

  return (
    <div className="relative w-full h-screen">
      {/* Background Image */}
      <Image
        src="/bg.png"
        alt="Cosmos background"
        fill
        priority
        className="object-cover z-0"
      />

      {/* Login Form */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <form
          onSubmit={handleSubmit}
          className="bg-black/60 backdrop-blur-xl px-12 py-10 rounded-3xl shadow-2xl w-full max-w-lg space-y-6"
        >
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white mb-3">🌌 BackTrack Portal</h1>
            <p className="text-gray-300 text-base">Please login to continue</p>
          </div>

          <Input
            type="email"
            placeholder="Email"
            className="h-14 text-lg bg-[#1e1e2e] text-white border border-gray-600 placeholder-gray-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            type="password"
            placeholder="Password"
            className="h-14 text-lg bg-[#1e1e2e] text-white border border-gray-600 placeholder-gray-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <Button
            type="submit"
            className="w-full h-14 text-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition-all duration-200 cursor-pointer"
            disabled={submitting}
          >
            {submitting ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}
