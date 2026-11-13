export default function Footer() {
  return (
    <footer className="mt-16 border-t border-stone-200 bg-white py-8 text-center text-xs text-stone-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#382218]">BrewLite</span>
          <span>—</span>
          <span>Cà phê không dùng tiền mặt (Cashless Coffee POS)</span>
        </div>

        <div className="flex items-center gap-2 text-stone-400">
          <span>Assignment 1</span>
          <span>•</span>
          <span>Công nghệ Phần mềm</span>
          <span>•</span>
          <span className="text-amber-700 font-medium">Sprint 1 / Task 3</span>
        </div>
      </div>
    </footer>
  );
}
