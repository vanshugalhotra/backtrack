"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

interface PasswordModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (password: string) => void;
}

const PasswordModal: React.FC<PasswordModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    if (password.trim()) {
      onSubmit(password);
      setPassword("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-xl bg-gradient-to-br from-[#0b0f26] to-[#131a3a] border border-cyan-500/20 text-white shadow-2xl backdrop-blur-lg animate-fade-in-up rounded-2xl px-8 py-6 space-y-6">
        <DialogHeader>
          <DialogTitle className="text-cyan-400 text-2xl font-semibold tracking-wide text-center">
            Enter Test Password
          </DialogTitle>
          <DialogDescription className="text-sm text-white/60 text-center">
            This test is protected. Please enter the password to access it.
          </DialogDescription>
        </DialogHeader>

        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white/5 border border-white/20 text-white placeholder-white/40 h-12 px-4 pr-12 text-base rounded-md focus-visible:ring-2 focus-visible:ring-cyan-600"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-white/60 hover:text-white cursor-pointer"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full h-11 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-md transition-colors"
        >
          Submit
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordModal;
