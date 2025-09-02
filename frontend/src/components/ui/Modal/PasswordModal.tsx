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
      <DialogContent className="w-full max-w-md bg-[#0b0f26] border border-white/10 shadow-xl backdrop-blur-md animate-fade-in-up rounded-xl px-6 py-6 space-y-6 text-white">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl font-semibold tracking-tight text-center">
            Enter Test Password
          </DialogTitle>
          <DialogDescription className="text-sm text-white/50 text-center">
            This test is protected. Please enter the password to access it.
          </DialogDescription>
        </DialogHeader>

        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white/5 border border-white/20 text-white placeholder-white/40 h-12 px-4 pr-12 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 transition"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-white/40 hover:text-white transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full h-11 rounded-lg text-white text-sm font-medium
                     bg-white/10 hover:bg-white hover:text-black border border-white/20
                     shadow-none transition-all duration-200 active:scale-95 cursor-pointer"
        >
          Submit
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordModal;
