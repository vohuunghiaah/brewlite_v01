'use client';

import type { Product } from '../types/product';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onCustomize: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export default function ProductGrid({
  products,
  onCustomize,
  onQuickAdd,
}: ProductGridProps) {
  return (
    <section aria-labelledby="menu-heading" className="w-full">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2
          id="menu-heading"
          className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight flex items-center gap-2"
        >
          <span>Thực đơn hôm nay</span>
          <span className="text-base sm:text-lg font-bold text-amber-700">
            ({products.length})
          </span>
        </h2>
      </div>

      {/* Grid of Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onCustomize={onCustomize}
            onQuickAdd={onQuickAdd}
          />
        ))}
      </div>
    </section>
  );
}
