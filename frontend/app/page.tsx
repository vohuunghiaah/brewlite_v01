export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans">
      {/* Navigation Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl" role="img" aria-label="coffee">☕</span>
            <span className="text-xl font-bold tracking-tight text-amber-700 dark:text-amber-500">
              BrewLite
            </span>
          </div>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
            Sprint 1 • Task 1 (Initialized)
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-12 flex flex-col items-center justify-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 mb-6">
          <span>Assignment 1</span>
          <span>•</span>
          <span>Công nghệ Phần mềm</span>
          <span>•</span>
          <span>Agile Scrum</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
          Hello <span className="text-amber-600 dark:text-amber-500">BrewLite</span>
        </h1>

        <p className="max-w-2xl text-base sm:text-lg text-zinc-600 dark:text-zinc-400 mb-10 leading-relaxed">
          Ứng dụng đặt đồ uống và thanh toán không dùng tiền mặt (Cashless Coffee Ordering).
          Cấu trúc Monorepo tiêu chuẩn với <strong className="text-zinc-800 dark:text-zinc-200">Next.js App Router</strong> và{" "}
          <strong className="text-zinc-800 dark:text-zinc-200">NestJS REST API</strong>.
        </p>

        {/* Status / Architecture Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl text-left">
          {/* Frontend Card */}
          <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Frontend
              </span>
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 ring-4 ring-emerald-100 dark:ring-emerald-950" />
            </div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-1">
              Next.js 16 + Tailwind CSS
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
              TypeScript, App Router, tối ưu giao diện responsive cho thiết bị di động và web.
            </p>
            <div className="text-xs font-mono bg-zinc-100 dark:bg-zinc-800 px-3 py-2 rounded-lg text-zinc-700 dark:text-zinc-300">
              Host: http://localhost:3000
            </div>
          </div>

          {/* Backend Card */}
          <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                Backend
              </span>
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 ring-4 ring-emerald-100 dark:ring-emerald-950" />
            </div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-1">
              NestJS 12 REST API
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
              TypeScript, kiến trúc Modular, cổng 3001 mặc định (cấu hình qua PORT env).
            </p>
            <div className="text-xs font-mono bg-zinc-100 dark:bg-zinc-800 px-3 py-2 rounded-lg text-zinc-700 dark:text-zinc-300">
              API: http://localhost:3001/
            </div>
          </div>
        </div>

        {/* Verification Banner */}
        <div className="mt-8 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-500 dark:text-zinc-400 max-w-2xl w-full flex items-center justify-between">
          <span>Task 1 Status: <strong>Ready & Verified</strong></span>
          <span>GET /: <code>&quot;Hello BrewLite API&quot;</code></span>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-6 text-center text-xs text-zinc-500 dark:text-zinc-500">
        <p>BrewLite v1.0 • Khoa Công nghệ Thông tin — Trường Đại học Sài Gòn (SGU)</p>
      </footer>
    </div>
  );
}
