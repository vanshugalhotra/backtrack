"use client";

import { Button } from "@/components/ui/button"; 
import { LucideTrash } from "lucide-react";

type DeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  problemSlug: string;
};

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  problemSlug,
}: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg max-w-lg w-full p-8 space-y-6">
        <h3 className="text-2xl font-semibold text-gray-800">Confirm Deletion</h3>
        <p className="text-lg text-gray-600">
          Are you sure you want to delete the problem <span className="font-bold text-gray-900">&quot;{problemSlug}&quot;</span>? This action cannot be undone.
        </p>
        <div className="mt-6 flex justify-end space-x-6">
          <Button
            variant="outline"
            className="text-gray-700 border-gray-300 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 transition-all duration-200 px-6 py-2 rounded-lg cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-200 transition-all duration-200 px-6 py-2 rounded-lg flex items-center space-x-2 cursor-pointer"
            onClick={onConfirm}
          >
            <LucideTrash className="w-5 h-5" />
            <span>Delete</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
