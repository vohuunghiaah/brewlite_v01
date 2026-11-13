'use client';

import { CATEGORIES, type CategoryFilter } from '../types/product';

interface CategoryFilterProps {
  selected: CategoryFilter;
  onSelect: (category: CategoryFilter) => void;
  counts?: Partial<Record<CategoryFilter, number>>;
}

export default function CategoryFilterComponent({
  selected,
  onSelect,
}: CategoryFilterProps) {
  return (
    <section aria-label="Bộ lọc danh mục đồ uống" id="categories">
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
        {CATEGORIES.map((category) => {
          const isActive = selected === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => onSelect(category)}
              aria-pressed={isActive}
              className={`shrink-0 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-1 ${
                isActive
                  ? 'bg-[#2D1B13] text-white shadow-md'
                  : 'bg-white text-stone-700 border border-stone-200 hover:border-stone-300 hover:bg-stone-50'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </section>
  );
}
