'use client';

import { useEffect } from 'react';

interface ToastNoticeProps {
  message: string | null;
  onClose: () => void;
}

export default function ToastNotice({ message, onClose }: ToastNoticeProps) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 max-w-sm bg-[#2D1B13] text-white p-4 rounded-2xl shadow-xl border border-amber-500/30 flex items-start gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200"
    >
      <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 text-xs">
        ℹ️
      </div>

      <div className="flex-1 text-xs sm:text-sm text-stone-200 leading-snug">
        {message}
      </div>

      <button
        type="button"
        onClick={onClose}
        className="text-stone-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
        aria-label="Đóng thông báo"
      >
        ✕
      </button>
    </div>
  );
}
