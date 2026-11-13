'use client';

import { useCallback, useEffect, useState } from 'react';
import { fetchProducts, filterProducts } from '../lib/api';
import type { CategoryFilter, Product } from '../types/product';
import CategoryFilterComponent from './CategoryFilter';
import EmptyState from './EmptyState';
import ErrorState from './ErrorState';
import HeroBanner from './HeroBanner';
import LoadingSkeleton from './LoadingSkeleton';
import ProductGrid from './ProductGrid';
import SearchBar from './SearchBar';
import ToastNotice from './ToastNotice';

export interface MenuPageProps {
  onNotice?: (message: string) => void;
}

export default function MenuPage({ onNotice }: MenuPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>('Tất cả');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [localNotice, setLocalNotice] = useState<string | null>(null);

  const showNotice = useCallback(
    (msg: string) => {
      if (onNotice) {
        onNotice(msg);
      } else {
        setLocalNotice(msg);
      }
    },
    [onNotice],
  );

  const executeFetch = useCallback(async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
      setError(null);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'Không thể kết nối đến máy chủ thực đơn';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch products on initial mount
  useEffect(() => {
    let isSubscribed = true;

    fetchProducts()
      .then((data) => {
        if (isSubscribed) {
          setProducts(data);
          setError(null);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (isSubscribed) {
          const message =
            err instanceof Error
              ? err.message
              : 'Không thể kết nối đến máy chủ thực đơn';
          setError(message);
          setLoading(false);
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, []);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    executeFetch();
  };

  const filteredProducts = filterProducts(
    products,
    selectedCategory,
    searchQuery,
  );

  const handleCustomize = (product: Product) => {
    showNotice(
      `Tính năng tùy chỉnh Size (S/M/L) và Topping cho món "${product.name}" sẽ được triển khai ở Task 4.`,
    );
  };

  const handleQuickAdd = (product: Product) => {
    showNotice(
      `Tính năng thêm nhanh món "${product.name}" vào Giỏ hàng sẽ được triển khai ở Task 5.`,
    );
  };

  const handleResetFilters = () => {
    setSelectedCategory('Tất cả');
    setSearchQuery('');
  };

  return (
    <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Search Bar */}
      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      {/* Category Filter Pills */}
      <CategoryFilterComponent
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* Main Content States */}
      <div id="menu" className="pt-2">
        {loading && <LoadingSkeleton />}

        {!loading && error && (
          <ErrorState error={error} onRetry={handleRetry} />
        )}

        {!loading && !error && filteredProducts.length === 0 && (
          <EmptyState
            onReset={handleResetFilters}
            message={
              searchQuery.trim().length > 0
                ? `Không có món nào khớp với từ khóa "${searchQuery}".`
                : `Danh mục "${selectedCategory}" hiện chưa có món nào.`
            }
          />
        )}

        {!loading && !error && filteredProducts.length > 0 && (
          <ProductGrid
            products={filteredProducts}
            onCustomize={handleCustomize}
            onQuickAdd={handleQuickAdd}
          />
        )}
      </div>

      {/* Fallback Toast Notice if onNotice is not provided */}
      {!onNotice && (
        <ToastNotice
          message={localNotice}
          onClose={() => setLocalNotice(null)}
        />
      )}
    </main>
  );
}
