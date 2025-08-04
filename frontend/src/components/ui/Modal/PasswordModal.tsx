"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PasswordModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (password: string) => void;
}

const PasswordModal: React.FC<PasswordModalProps> = ({ open, onClose, onSubmit }) => {
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (password.trim()) {
      onSubmit(password);
      setPassword("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#0b0f26] border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-cyan-400">Enter Password</DialogTitle>
        </DialogHeader>
        <Input
          type="password"
          placeholder="Enter test password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-white/10 border-white/20 text-white"
        />
        <Button onClick={handleSubmit} className="mt-2 bg-cyan-600 hover:bg-cyan-700 w-full cursor-pointer">
          Submit
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordModal;
