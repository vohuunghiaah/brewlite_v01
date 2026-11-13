export default function HeroBanner() {
  return (
    <section
      aria-label="Khẩu hiệu BrewLite"
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#382218] via-[#2F1C14] to-[#25150E] text-white p-6 sm:p-10 shadow-lg border border-[#4A2E21]"
    >
      {/* Decorative background curves */}
      <div
        className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -left-16 -top-16 w-60 h-60 rounded-full bg-amber-700/15 blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-2xl">
        {/* Sub-badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase mb-4">
          <span role="img" aria-label="flame" className="text-sm">
            ☕
          </span>
          <span>Hôm nay tại BrewLite</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight sm:leading-tight mb-3">
          Mỗi ly cà phê,
          <br />
          <span className="text-amber-400">một khoảnh khắc.</span>
        </h1>

        {/* Tagline / Positioning */}
        <p className="text-stone-300 text-sm sm:text-base font-medium tracking-wide">
          Cashierless · Cashless · Cà phê thật ngon
        </p>
      </div>
    </section>
  );
}
