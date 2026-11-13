'use client';

import Image from 'next/image';
import { useState } from 'react';
import { formatVND } from '../lib/api';
import type { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  onCustomize: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export default function ProductCard({
  product,
  onCustomize,
  onQuickAdd,
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  // Badge color mapping aligned with Figma design
  const getBadgeStyle = (badge?: string) => {
    switch (badge?.toLowerCase()) {
      case 'bán chạy':
        return 'bg-amber-600 text-white';
      case 'mới':
        return 'bg-emerald-600 text-white';
      case 'hot trend':
        return 'bg-rose-500 text-white';
      case 'yêu thích':
        return 'bg-amber-700 text-white';
      default:
        return 'bg-stone-800 text-white';
    }
  };

  return (
    <article
      className="group bg-white rounded-2xl border border-stone-200 hover:border-amber-400/60 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden"
      aria-labelledby={`product-title-${product.id}`}
    >
      {/* Image Area */}
      <div className="relative w-full aspect-[4/3] bg-stone-100 flex items-center justify-center overflow-hidden">
        {/* Product SVG Graphic */}
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={400}
          height={300}
          unoptimized
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        />

        {/* Top-Left Badge (if exists) */}
        {product.badge && (
          <div className="absolute top-3 left-3">
            <span
              className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase shadow-sm ${getBadgeStyle(
                product.badge,
              )}`}
            >
              {product.badge}
            </span>
          </div>
        )}

        {/* Top-Right Favorite Button */}
        <button
          type="button"
          onClick={() => setIsFavorite(!isFavorite)}
          className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 backdrop-blur transition-colors cursor-pointer ${
            isFavorite
              ? 'bg-rose-500 text-white shadow-sm'
              : 'bg-black/40 hover:bg-black/60 text-white'
          }`}
          aria-label={`Đánh dấu yêu thích ${product.name}`}
          title={isFavorite ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
        >
          <span className="text-amber-300">★</span>
          <span className="text-[11px]">{isFavorite ? 'Đã thích' : 'Yêu thích'}</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category Tag */}
          {product.category && (
            <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-700 mb-1">
              {product.category}
            </p>
          )}

          {/* Product Title */}
          <h3
            id={`product-title-${product.id}`}
            className="text-base sm:text-lg font-bold text-stone-900 group-hover:text-amber-800 transition-colors line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Product Description */}
          {product.description && (
            <p className="mt-1 text-xs sm:text-sm text-stone-500 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          )}
        </div>

        {/* Price & Action Row */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
          <span className="text-base sm:text-lg font-extrabold text-[#382218]">
            {formatVND(product.price)}
          </span>

          <div className="flex items-center gap-2">
            {/* Customize Button (Task 4 Scope) */}
            <button
              type="button"
              onClick={() => onCustomize(product)}
              className="inline-flex items-center gap-0.5 text-xs sm:text-sm font-semibold text-stone-600 hover:text-[#382218] px-2 py-1 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label={`Tùy chỉnh kích cỡ và topping cho ${product.name}`}
            >
              <span>Tùy chỉnh</span>
              <span className="text-xs">›</span>
            </button>

            {/* Quick Add Button */}
            <button
              type="button"
              onClick={() => onQuickAdd(product)}
              className="w-8 h-8 rounded-full bg-[#382218] hover:bg-[#4a2e21] text-white flex items-center justify-center transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-1 cursor-pointer"
              aria-label={`Thêm nhanh ${product.name} vào đơn`}
              title="Thêm món (Task 4 & 5)"
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
                  strokeWidth={2.5}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
