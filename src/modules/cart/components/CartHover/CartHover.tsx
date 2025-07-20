"use client";

import { useI18n } from "@/hooks";
import { formatPrice } from "@/utils/clients";
import { useCartActions, useCartItems, useCartTotals } from "../../store";
import CartItem from "../CartItem/CartItem";

const CartHover = () => {
  const { t } = useI18n();
  const items = useCartItems();
  const { totalItems, totalPrice, totalDiscount, finalPrice } = useCartTotals();
  const { clearCart } = useCartActions();

  const handleCheckout = () => {
    console.log("Proceeding to checkout...");
  };

  const handleViewCart = () => {
    console.log("Navigating to cart page...");
  };

  return (
    <div className="shadow-lg shadow-[#0375F329] rounded-lg bg-white w-[400px] max-h-[700px] overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">
            {t("cart.cartTotal")} ({totalItems} {t("cart.items")})
          </h3>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-sm text-red-500 hover:text-red-700 transition-colors"
            >
              {t("cart.removeItem")}
            </button>
          )}
        </div>
      </div>

      {/* Cart Items */}
      <div className="max-h-[400px] overflow-y-auto">
        {items.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <p className="text-gray-500 font-medium">{t("cart.emptyCart")}</p>
            <p className="text-sm text-gray-400 mt-1">
              {t("cart.emptyCartDescription")}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {items.map((item) => (
              <div key={item.id} className="p-4">
                <CartItem item={item} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer - Only show if cart has items */}
      {items.length > 0 && (
        <div className="border-t border-gray-200 bg-gray-50">
          {/* Price Summary */}
          <div className="p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{t("cart.total")}:</span>
              <span className="font-medium">{formatPrice(totalPrice)}</span>
            </div>

            {totalDiscount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t("cart.discount")}:</span>
                <span className="font-medium text-green-600">
                  -{formatPrice(totalDiscount)}
                </span>
              </div>
            )}

            <div className="flex justify-between text-base font-semibold border-t border-gray-200 pt-2">
              <span className="text-gray-900">{t("cart.finalPrice")}:</span>
              <span className="text-brand-500">{formatPrice(finalPrice)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-4 space-y-2">
            <button
              onClick={handleCheckout}
              className="w-full bg-brand-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-brand-600 transition-colors"
            >
              {t("cart.checkout")}
            </button>

            <button
              onClick={handleViewCart}
              className="w-full bg-white text-brand-500 py-2 px-4 rounded-lg font-medium border border-brand-500 hover:bg-brand-50 transition-colors"
            >
              {t("cart.viewCart")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartHover;
