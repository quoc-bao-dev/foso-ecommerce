"use client";

import { useI18n } from "@/hooks";
import { useDevice } from "@/hooks/useDevice";
import { useCartActions } from "@/modules/cart";
import { cn } from "@/utils/clients";
import { useState } from "react";

type ProductCardProps = {
  id: string;
  name: string;
  image: string;
  price: number;
  oldPrice: number;
  discount: number;
  isSale?: boolean;
  className?: string;
  category?: string;
  brand?: string;
  unit?: string;
  inStock?: boolean;
};

const ProductCard = ({
  id,
  name,
  image,
  price,
  oldPrice,
  discount,
  isSale,
  className,
  category,
  brand,
  unit,
  inStock = true,
}: ProductCardProps) => {
  const { t } = useI18n();
  const { isMobile, isTablet } = useDevice();
  const { addItem } = useCartActions();
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToCart = async () => {
    if (!inStock) return;

    setIsAdding(true);
    try {
      addItem({
        id,
        name,
        image,
        price,
        oldPrice,
        discount,
        category,
        brand,
        unit,
        inStock,
      });

      // Show success feedback
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    } catch (error) {
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div
      className={cn(
        `bg-white rounded-xl flex flex-col items-start min-w-[220px] shadow hover:shadow-lg transition ${
          isMobile ? "p-4" : "p-6"
        } ${className}`
      )}
    >
      <div className="w-full flex justify-center mb-2">
        <img
          src={image}
          alt={name}
          className="w-full aspect-square object-contain"
        />
      </div>
      {isSale && (
        <div
          className={`rounded-full bg-gradient-to-r from-warning-light to-warning-main flex items-center justify-center gap-1.5 px-2.5 mb-2 ${
            isMobile ? "h-[20px]" : "h-[25px]"
          }`}
        >
          <img
            src="/icon/fire.png"
            alt="fire"
            className={`${isMobile ? "w-3 h-3" : "w-4 h-4"}`}
          />
          <span
            className={`font-semibold text-error-darker ${
              isMobile ? "text-[10px]" : "text-xs"
            }`}
          >
            {t("product.sale")}
          </span>
        </div>
      )}
      <div
        className={`font-semibold text-gray-800 mb-1 line-clamp-2 min-h-[40px] ${
          isMobile ? "text-xs" : "text-sm"
        }`}
      >
        {name}
      </div>
      <div
        className={`font-bold text-[#B71D18] mb-1 ${
          isMobile ? "text-base" : "text-lg"
        }`}
      >
        {price.toLocaleString()} đ
      </div>
      <div className="flex items-center gap-2 mb-2">
        <span
          className={`text-gray-400 line-through ${
            isMobile ? "text-[10px]" : "text-xs"
          }`}
        >
          {oldPrice.toLocaleString()} đ
        </span>
        <span
          className={`text-[#B71D18] font-semibold ${
            isMobile ? "text-[10px]" : "text-xs"
          }`}
        >
          -{discount}%
        </span>
      </div>
      <button
        onClick={handleAddToCart}
        disabled={!inStock || isAdding}
        className={cn(
          `w-full font-semibold rounded-lg py-2 mt-auto transition-all duration-300 ${
            isMobile ? "text-sm" : ""
          }`,
          inStock
            ? showSuccess
              ? "bg-green-600 text-white scale-105"
              : "bg-brand-50 text-[#0a5adf] hover:bg-[#d0e3fa] hover:scale-105"
            : "bg-gray-100 text-gray-400 cursor-not-allowed",
          isAdding && "opacity-75 cursor-wait"
        )}
      >
        {isAdding ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-[#0a5adf] border-t-transparent rounded-full animate-spin"></div>
            {t("cart.addingToCart")}
          </div>
        ) : showSuccess ? (
          <div className="flex items-center justify-center gap-2">
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
                d="M5 13l4 4L19 7"
              />
            </svg>
            {t("cart.addedToCart")}
          </div>
        ) : (
          t("product.buyNow")
        )}
      </button>
    </div>
  );
};

export default ProductCard;
