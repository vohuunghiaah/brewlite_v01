'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import { AuthProvider, useAuth } from '../../context/AuthContext';
import { fetchMyOrders, formatVND, type OrderHistory } from '../../lib/api';

const STATUS_LABELS: Record<OrderHistory['status'], string> = {
  PENDING: 'Chờ thanh toán',
  PAID: 'Đã thanh toán',
  PAYMENT_FAILED: 'Thanh toán thất bại',
  PREPARING: 'Đang chuẩn bị',
  READY: 'Sẵn sàng nhận',
  COMPLETED: 'Hoàn tất',
  CANCELLED: 'Đã hủy',
};

function OrderHistoryContent() {
  const { isReady, isAuthenticated, token } = useAuth();
  const [orders, setOrders] = useState<OrderHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isReady) return;
    if (!isAuthenticated || !token) {
      return;
    }

    let active = true;
    fetchMyOrders(token)
      .then((result) => {
        if (active) setOrders(result);
      })
      .catch((reason: unknown) => {
        if (active) {
          setError(
            reason instanceof Error
              ? reason.message
              : 'Không thể tải lịch sử đơn hàng.',
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [isAuthenticated, isReady, token]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-stone-900 font-sans antialiased">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4">
          <Link
            href="/"
            className="inline-flex items-baseline text-2xl leading-none font-black tracking-tight text-[#382218]"
          >
            <span>Brew</span>
            <span className="font-bold text-amber-600">Lite</span>
          </Link>
          <Link
            href="/"
            className="text-sm leading-5 font-semibold text-[#6b4936] hover:text-amber-700"
          >
            ← Quay lại thực đơn
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6">
        <h1 className="font-sans text-3xl leading-tight font-black tracking-tight text-[#382218]">
          Lịch sử đơn hàng
        </h1>
        <p className="mt-2 font-sans text-base leading-6 text-stone-600">
          Theo dõi trạng thái và chi tiết các đơn của bạn.
        </p>

        {!isReady || (isAuthenticated && loading) ? (
          <p className="mt-8 rounded-xl bg-white p-6 text-stone-600">Đang tải đơn hàng...</p>
        ) : !isAuthenticated ? (
          <section className="mt-8 rounded-xl bg-white p-6 shadow-sm">
            <h2 className="font-bold">Đăng nhập để xem đơn hàng</h2>
            <p className="mt-2 text-sm text-stone-600">
              Lịch sử chỉ hiển thị các đơn gắn với tài khoản hiện tại.
            </p>
            <Link href="/" className="mt-4 inline-block font-semibold text-amber-700 hover:underline">
              Về trang chủ để đăng nhập
            </Link>
          </section>
        ) : error ? (
          <p role="alert" className="mt-8 rounded-xl border border-red-200 bg-red-50 p-6 text-red-800">
            {error}
          </p>
        ) : orders.length === 0 ? (
          <p className="mt-8 rounded-xl bg-white p-6 text-stone-600">
            Bạn chưa có đơn hàng nào.
          </p>
        ) : (
          <ul className="mt-8 space-y-4">
            {orders.map((order) => (
              <li key={order.id} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-100">
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-stone-100 pb-4">
                  <div>
                    <h2 className="font-bold text-[#382218]">{order.id}</h2>
                    <time className="mt-1 block text-sm text-stone-500" dateTime={order.createdAt}>
                      {new Date(order.createdAt).toLocaleString('vi-VN')}
                    </time>
                  </div>
                  <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-900">
                    {STATUS_LABELS[order.status] ?? order.status}
                  </span>
                </div>

                <ul className="space-y-3 py-4">
                  {order.items.map((item, index) => (
                    <li key={`${item.productId}-${index}`} className="flex justify-between gap-4 text-sm">
                      <div>
                        <p className="font-semibold">{item.qty} × {item.productName} (size {item.size})</p>
                        {item.toppings.length > 0 && (
                          <p className="mt-1 text-stone-500">Topping: {item.toppings.join(', ')}</p>
                        )}
                      </div>
                      <span className="whitespace-nowrap">{formatVND(item.lineTotal)}</span>
                    </li>
                  ))}
                </ul>

                {order.note && (
                  <p className="border-t border-stone-100 pt-3 text-sm text-stone-600">
                    Ghi chú: {order.note}
                  </p>
                )}
                <p className="border-t border-stone-100 pt-3 text-right font-bold text-[#382218]">
                  Tổng cộng: {formatVND(order.total)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default function OrderHistoryPage() {
  return (
    <AuthProvider>
      <OrderHistoryContent />
    </AuthProvider>
  );
}
