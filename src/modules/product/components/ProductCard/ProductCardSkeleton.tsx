"use client";

import { useDevice } from "@/hooks/useDevice";
import { cn } from "@/utils/clients";

type ProductCardSkeletonProps = {
  className?: string;
};

const ProductCardSkeleton = ({ className }: ProductCardSkeletonProps) => {
  const { isMobile, isTablet } = useDevice();

  return (
    <div
      className={cn(
        `bg-white rounded-xl flex flex-col items-start min-w-[220px] shadow animate-pulse ${
          isMobile ? "p-4" : "p-6"
        } ${className}`
      )}
    >
      {/* Image skeleton */}
      <div className="w-full flex justify-center mb-2">
        <div className="w-full aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
      </div>

      {/* Sale badge skeleton */}
      <div
        className={`rounded-full bg-gray-200 w-24 mb-2 animate-pulse ${
          isMobile ? "h-[20px]" : "h-[25px]"
        }`}
      ></div>

      {/* Product name skeleton */}
      <div className="w-full mb-1">
        <div
          className={`bg-gray-200 rounded mb-1 animate-pulse ${
            isMobile ? "h-3" : "h-4"
          }`}
        ></div>
        <div
          className={`bg-gray-200 rounded w-3/4 animate-pulse ${
            isMobile ? "h-3" : "h-4"
          }`}
        ></div>
      </div>

      {/* Price skeleton */}
      <div
        className={`bg-gray-200 rounded w-20 mb-1 animate-pulse ${
          isMobile ? "h-5" : "h-6"
        }`}
      ></div>

      {/* Old price and discount skeleton */}
      <div className="flex items-center gap-2 mb-2">
        <div
          className={`bg-gray-200 rounded w-16 animate-pulse ${
            isMobile ? "h-2.5" : "h-3"
          }`}
        ></div>
        <div
          className={`bg-gray-200 rounded w-8 animate-pulse ${
            isMobile ? "h-2.5" : "h-3"
          }`}
        ></div>
      </div>

      {/* Button skeleton */}
      <div
        className={`w-full bg-gray-200 rounded-lg mt-auto animate-pulse ${
          isMobile ? "h-8" : "h-10"
        }`}
      ></div>
    </div>
  );
};

export default ProductCardSkeleton;
