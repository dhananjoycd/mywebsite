"use client";

import { AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type DangerConfirmModalProps = {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function DangerConfirmModal({
  isOpen,
  title,
  message,
  confirmText = "Delete Permanently",
  cancelText = "Cancel",
  isLoading = false,
  onConfirm,
  onCancel,
}: DangerConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md rounded-3xl border border-red-500/20 bg-slate-950 p-6 sm:p-7 shadow-[0_20px_60px_rgba(239,68,68,0.15)] ring-1 ring-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/10 text-red-400">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-white">{title}</h3>
            <p className="mt-2 text-xs leading-5 text-slate-300">{message}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            {cancelText}
          </Button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-red-950/50 transition hover:bg-red-500 disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

