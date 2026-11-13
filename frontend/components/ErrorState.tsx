interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export default function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className="text-center py-12 px-6 bg-red-50/70 border border-red-200 rounded-3xl max-w-xl mx-auto my-8 shadow-sm flex flex-col items-center"
    >
      <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>

      <h3 className="text-lg sm:text-xl font-bold text-red-900 mb-2">
        Không thể kết nối đến máy chủ thực đơn
      </h3>

      <p className="text-sm text-red-700 max-w-md mb-2 leading-relaxed">
        {error}
      </p>

      <p className="text-xs text-stone-500 mb-6 bg-white/80 px-3 py-1.5 rounded-lg border border-red-200/50">
        Đảm bảo backend NestJS đang chạy: <code className="font-mono text-stone-800">npm run dev:backend</code> (Cổng 3001)
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="px-6 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 cursor-pointer flex items-center gap-2"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        <span>Thử lại kết nối</span>
      </button>
    </div>
  );
}
