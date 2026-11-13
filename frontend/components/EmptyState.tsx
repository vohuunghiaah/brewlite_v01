interface EmptyStateProps {
  onReset: () => void;
  message?: string;
}

export default function EmptyState({
  onReset,
  message = 'Hiện chưa có món nào phù hợp với bộ lọc hoặc tìm kiếm của bạn.',
}: EmptyStateProps) {
  return (
    <div
      role="region"
      aria-label="Không có sản phẩm"
      className="text-center py-16 px-4 bg-white rounded-3xl border border-stone-200 shadow-sm max-w-xl mx-auto my-8 flex flex-col items-center"
    >
      <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center text-3xl mb-4 border border-amber-200">
        <span role="img" aria-label="cốc rỗng">
          ☕
        </span>
      </div>

      <h3 className="text-xl font-bold text-stone-900 mb-2">
        Không tìm thấy món nào
      </h3>

      <p className="text-sm sm:text-base text-stone-500 max-w-md mb-6 leading-relaxed">
        {message}
      </p>

      <button
        type="button"
        onClick={onReset}
        className="px-6 py-2.5 rounded-full bg-[#382218] hover:bg-[#4a2e21] text-white text-sm font-semibold transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 cursor-pointer"
      >
        Xem tất cả món (Tất cả)
      </button>
    </div>
  );
}
