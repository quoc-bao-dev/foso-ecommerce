"use client";

import { useI18n, useToast } from "@/hooks";
import { useCartActions } from "@/modules/cart";
import { formatPrice } from "@/utils/clients";
import { useState } from "react";

interface ResultItemProps {
  id: string;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  brand?: string;
  category?: string;
  rating?: number;
  reviewCount?: number;
  inStock?: boolean;
  isHighlighted?: boolean;
}

const ResultItem = ({
  id,
  name,
  image,
  price,
  oldPrice,
  discount,
  brand,
  category,
  rating = 4.5,
  reviewCount = 128,
  inStock = true,
  isHighlighted = false,
}: ResultItemProps) => {
  const { t } = useI18n();
  const [isWishlist, setIsWishlist] = useState(false);

  const { addItem } = useCartActions();
  const { showCartSuccess, showCartError } = useToast();

  const handleAddToCart = () => {
    try {
      addItem({
        id,
        name,
        price,
        image,
        brand,
        category,
        inStock,
      });
      showCartSuccess(name);
    } catch (error) {
      showCartError(name);
    }
  };

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 hover:border-brand-500 transition-all duration-300 hover:shadow-md ${
        isHighlighted ? "ring-2 ring-brand-500" : ""
      }`}
    >
      <div className="p-4 relative">
        <div className="flex gap-4">
          {/* Product Image */}
          <div className="flex-shrink-0">
            <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Discount Badge */}
            {discount && discount > 0 && (
              <div className="absolute -top-1 -left-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded">
                -{discount}%
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            {/* Product Name */}
            <h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-2 hover:text-brand-500 transition-colors cursor-pointer">
              {name}
            </h3>

            {/* Brand and Category */}
            <div className="flex items-center gap-2 mb-2">
              {brand && (
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                  {brand}
                </span>
              )}
              {category && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                  {category}
                </span>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-gray-600">
                {rating} ({reviewCount})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg font-bold text-brand-500">
                {formatPrice(price)}
              </span>
              {oldPrice && oldPrice > price && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(oldPrice)}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center justify-between">
              <span
                className={`text-xs font-medium px-2 py-1 rounded ${
                  inStock
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {inStock ? t("product.inStock") : t("product.outOfStock")}
              </span>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsWishlist(!isWishlist)}
                  className={`p-2 rounded-full transition-colors ${
                    isWishlist
                      ? "bg-red-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <svg
                    className="w-4 h-4"
                    fill={isWishlist ? "currentColor" : "none"}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>

                <button
                  onClick={handleAddToCart}
                  className="bg-brand-500 text-white px-4 py-2 rounded-lg hover:bg-brand-600 transition-colors font-medium text-sm"
                >
                  {t("product.addToCart")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultItem;
