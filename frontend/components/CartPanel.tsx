
'use client';

import Image from 'next/image';
import { useState } from 'react';
import {
  formatVND,
  createOrder,
  processPayment,
} from '../lib/api';
import type { PaymentMethod } from '../lib/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

interface CartPanelProps {
  onClose: () => void;
}

export default function CartPanel({ onClose }: CartPanelProps) {
  const {
    items,
    total,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const { token, isAuthenticated } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>('WALLET');

  const [isPaying, setIsPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [successOrder, setSuccessOrder] = useState<{
    orderId: string;
    transactionId: string;
    amount: number;
  } | null>(null);

  const handlePayment = async () => {
    if (items.length === 0 || isPaying) return;

    if (!isAuthenticated) {
      setIsAuthOpen(true);
      return;
    }

    setIsPaying(true);
    setError(null);

    try {
      // 1. Chuyển dữ liệu giỏ hàng sang định dạng backend
      const orderData = {
        items: items.map((item) => ({
          productId: item.product.id,
          size: item.size,
          qty: item.quantity,
          toppings: item.toppings.map((topping) => topping.name),
        })),
      };

      // 2. Tạo đơn hàng (gửi kèm token xác thực)
      const order = await createOrder(orderData, token ?? undefined);

      // 3. Thực hiện thanh toán
      const payment = await processPayment(
        order.id,
        paymentMethod,
        `checkout:${order.id}:${paymentMethod}`,
      );

      // 4. Kiểm tra kết quả thanh toán
      if (payment.status === 'SUCCESS') {
        setSuccessOrder({
          orderId: order.id,
          transactionId: payment.transactionId,
          amount: payment.amount,
        });

        // Chỉ xóa giỏ hàng khi thanh toán thành công
        clearCart();
      } else {
        setError(
          'Thanh toán thất bại. Giỏ hàng của bạn vẫn được giữ nguyên.',
        );
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Đã xảy ra lỗi khi thanh toán.',
      );
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Đóng giỏ hàng"
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-heading"
        className="relative z-10 flex h-full w-full max-w-lg flex-col bg-white shadow-2xl"
      >
        <header className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
          <div>
            <h2
              id="cart-heading"
              className="text-xl font-black text-[#382218]"
            >
              {successOrder ? 'Thanh toán thành công' : 'Giỏ hàng'}
            </h2>

            <p className="text-sm text-stone-500">
              {successOrder
                ? 'Đơn hàng của bạn đã được xác nhận.'
                : `${items.reduce((count, item) => count + item.quantity, 0)} món`}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng"
            className="rounded-full p-2 text-stone-500 hover:bg-stone-100"
          >
            ✕
          </button>
        </header>

        {successOrder ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <span className="text-6xl" aria-hidden="true">
              🎉
            </span>

            <h3 className="mt-5 text-xl font-black text-green-700">
              Thanh toán thành công!
            </h3>

            <p className="mt-2 text-sm text-stone-500">
              Cảm ơn bạn đã đặt hàng tại BrewLite.
            </p>

            <div className="mt-6 w-full rounded-2xl bg-stone-50 p-5 text-left">
              <div className="flex justify-between gap-3">
                <span className="text-sm text-stone-500">
                  Mã đơn hàng
                </span>

                <span className="break-all text-right font-bold text-[#382218]">
                  {successOrder.orderId}
                </span>
              </div>

              <div className="mt-3 flex justify-between gap-3">
                <span className="text-sm text-stone-500">
                  Mã giao dịch
                </span>

                <span className="break-all text-right text-sm font-semibold">
                  {successOrder.transactionId}
                </span>
              </div>

              <div className="mt-3 flex justify-between">
                <span className="text-sm text-stone-500">
                  Tổng thanh toán
                </span>

                <span className="font-black text-[#382218]">
                  {formatVND(successOrder.amount)}
                </span>
              </div>

              <div className="mt-3 flex justify-between">
                <span className="text-sm text-stone-500">
                  Trạng thái
                </span>

                <span className="font-bold text-green-700">
                  PAID
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="mt-6 w-full rounded-full bg-[#382218] px-5 py-3 font-bold text-white hover:bg-[#513323]"
            >
              Hoàn tất
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <span className="text-5xl" aria-hidden="true">
              ☕
            </span>

            <p className="mt-4 font-bold text-stone-800">
              Giỏ hàng đang trống
            </p>

            <p className="mt-1 text-sm text-stone-500">
              Hãy chọn món yêu thích từ thực đơn nhé.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="mt-5 rounded-full bg-[#382218] px-5 py-2.5 text-sm font-bold text-white"
            >
              Tiếp tục chọn món
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-4 overflow-y-auto p-5">
              {items.map((item) => (
                <li
                  key={item.key}
                  className="flex gap-3 border-b border-stone-100 pb-4"
                >
                  <Image
                    src={item.product.imageUrl}
                    alt=""
                    width={72}
                    height={72}
                    unoptimized
                    className="h-[72px] w-[72px] rounded-xl bg-stone-50 object-contain"
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-stone-900">
                          {item.product.name}
                        </h3>

                        <p className="text-xs text-stone-500">
                          Size {item.size}
                          {item.toppings.length > 0 &&
                            ` · ${item.toppings.map((topping) => topping.name).join(', ')}`}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.key)}
                        aria-label={`Xóa ${item.product.name} khỏi giỏ`}
                        className="text-xs font-semibold text-rose-700 hover:text-rose-900"
                      >
                        Xóa
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-stone-200">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.key, item.quantity - 1)
                          }
                          aria-label={`Giảm số lượng ${item.product.name}`}
                          className="h-8 w-8 rounded-l-full hover:bg-stone-100"
                        >
                          −
                        </button>

                        <span className="min-w-7 text-center text-sm font-bold">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.key, item.quantity + 1)
                          }
                          aria-label={`Tăng số lượng ${item.product.name}`}
                          className="h-8 w-8 rounded-r-full hover:bg-stone-100"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-bold text-[#382218]">
                        {formatVND(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="border-t border-stone-200 bg-stone-50 p-5">
              <h3 className="mb-3 font-bold text-[#382218]">
                Phương thức thanh toán
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('WALLET')}
                  className={`rounded-xl border p-3 text-sm font-bold ${
                    paymentMethod === 'WALLET'
                      ? 'border-[#382218] bg-[#382218] text-white'
                      : 'border-stone-300 bg-white text-stone-700'
                  }`}
                >
                  Ví điện tử
                  <span className="mt-1 block text-xs font-normal">
                    WALLET
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('CARD')}
                  className={`rounded-xl border p-3 text-sm font-bold ${
                    paymentMethod === 'CARD'
                      ? 'border-[#382218] bg-[#382218] text-white'
                      : 'border-stone-300 bg-white text-stone-700'
                  }`}
                >
                  Thẻ ngân hàng
                  <span className="mt-1 block text-xs font-normal">
                    CARD
                  </span>
                </button>
              </div>

              {error && (
                <p
                  role="alert"
                  className="mt-3 rounded-lg bg-rose-50 p-3 text-sm text-rose-700"
                >
                  {error}
                </p>
              )}

              <div className="mt-4 flex items-center justify-between">
                <span className="font-semibold text-stone-700">
                  Tổng tiền
                </span>

                <span className="text-xl font-black text-[#382218]">
                  {formatVND(total)}
                </span>
              </div>

              <p className="mt-2 text-xs text-stone-500">
                Kiểm tra đơn hàng và cập nhật số lượng trước khi tiếp tục.
              </p>

              <button
                type="button"
                onClick={handlePayment}
                disabled={isPaying || items.length === 0}
                className="mt-4 w-full rounded-full bg-[#382218] px-5 py-3 font-bold text-white transition hover:bg-[#513323] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isPaying
                  ? 'Đang xử lý thanh toán...'
                  : `Thanh toán ${formatVND(total)}`}
              </button>
            </footer>
          </>
        )}
      </section>

      {isAuthOpen && (
        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onSuccess={() => {
            setIsAuthOpen(false);
          }}
        />
      )}
    </div>
  );
}
