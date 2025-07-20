"use client";

import { useI18n, useToast } from "@/hooks";
import { formatPrice } from "@/utils/clients";
import { useState } from "react";
import { useCartActions } from "../../store";
import { CartItemType } from "../../types";

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { t } = useI18n();
  const { updateQuantity, removeItem } = useCartActions();
  const { showSuccess } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity === item.quantity) return;

    setIsUpdating(true);
    try {
      updateQuantity(item.id, newQuantity);
      showSuccess(t("toast.quantityUpdated"));
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = () => {
    removeItem(item.id);
    showSuccess(t("toast.removedFromCart", { product: item.name }));
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:border-brand-500 transition-colors">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-1">
          {item.name}
        </h3>

        {item.brand && (
          <p className="text-xs text-gray-500 mb-1">{item.brand}</p>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mt-5">
          <span className="text-sm font-semibold text-brand-500">
            {formatPrice(item.price)}
          </span>
          {item.oldPrice && item.oldPrice > item.price && (
            <span className="text-xs text-gray-500 line-through">
              {formatPrice(item.oldPrice)}
            </span>
          )}
          {item.unit && (
            <span className="text-xs text-gray-500">/ {item.unit}</span>
          )}
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          disabled={isUpdating || item.quantity <= 1}
          className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 12H4"
            />
          </svg>
        </button>

        <span className="w-12 text-center text-sm font-medium">
          {isUpdating ? "..." : item.quantity}
        </span>

        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          disabled={isUpdating}
          className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>

      {/* Total Price */}
      <div className="text-right min-w-0">
        <div className="text-sm font-semibold text-gray-900">
          {formatPrice(item.price * item.quantity)}
        </div>
        {item.oldPrice && item.oldPrice > item.price && (
          <div className="text-xs text-gray-500 line-through">
            {formatPrice(item.oldPrice * item.quantity)}
          </div>
        )}
      </div>

      {/* Remove Button */}
      <button
        onClick={handleRemove}
        className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 transition-colors"
        title={t("cart.removeItem")}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
};

export default CartItem;
