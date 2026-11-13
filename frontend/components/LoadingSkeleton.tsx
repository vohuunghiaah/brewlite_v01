export default function LoadingSkeleton() {
  return (
    <div
      role="status"
      aria-label="Đang tải danh sách món ăn..."
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex flex-col animate-pulse"
        >
          {/* Image Placeholder */}
          <div className="w-full aspect-[4/3] bg-stone-200" />

          {/* Body Placeholder */}
          <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
            <div>
              {/* Category tag */}
              <div className="h-3 w-20 bg-stone-200 rounded mb-2" />
              {/* Title */}
              <div className="h-5 w-3/4 bg-stone-300 rounded mb-2" />
              {/* Description line 1 & 2 */}
              <div className="h-3 w-full bg-stone-200 rounded mb-1.5" />
              <div className="h-3 w-2/3 bg-stone-200 rounded" />
            </div>

            {/* Price & Action Row */}
            <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between">
              <div className="h-6 w-24 bg-stone-300 rounded" />
              <div className="flex items-center gap-2">
                <div className="h-4 w-16 bg-stone-200 rounded" />
                <div className="w-8 h-8 rounded-full bg-stone-200" />
              </div>
            </div>
          </div>
        </div>
      ))}
      <span className="sr-only">Đang tải dữ liệu thực đơn...</span>
    </div>
  );
}
