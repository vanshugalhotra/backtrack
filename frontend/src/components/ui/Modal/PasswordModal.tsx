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
      <DialogContent className="w-full max-w-md bg-gradient-to-br from-[#0c0f33] via-[#0b0f26] to-[#10132f] border border-white/20 shadow-2xl backdrop-blur-md animate-fade-in-up rounded-2xl px-8 py-8 space-y-6 text-white">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl font-bold tracking-wide text-center">
            Enter Test Password
          </DialogTitle>
          <DialogDescription className="text-sm text-white/50 text-center mt-1">
            This test is protected. Please enter the password to access it.
          </DialogDescription>
        </DialogHeader>

        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white/10 border border-white/30 text-white placeholder-white/50 h-12 px-4 pr-12 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/70 transition-all duration-200 shadow-sm hover:bg-white/20"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-white/40 hover:text-cyan-400 transition-colors duration-200"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full h-12 rounded-xl text-white text-sm font-semibold
             bg-gradient-to-r from-teal-600 to-indigo-700
             hover:from-teal-500 hover:to-indigo-600
             shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
        >
          Submit
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordModal;
