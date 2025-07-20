import { cn } from "@/utils/clients";

type ProductCardSkeletonProps = {
  className?: string;
};

const ProductCardSkeleton = ({ className }: ProductCardSkeletonProps) => {
  return (
    <div
      className={cn(
        `bg-white rounded-xl p-6 flex flex-col items-start min-w-[220px] shadow animate-pulse ${className}`
      )}
    >
      {/* Image skeleton */}
      <div className="w-full flex justify-center mb-2">
        <div className="w-full aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
      </div>

      {/* Sale badge skeleton */}
      <div className="rounded-full bg-gray-200 h-[25px] w-24 mb-2 animate-pulse"></div>

      {/* Product name skeleton */}
      <div className="w-full mb-1">
        <div className="h-4 bg-gray-200 rounded mb-1 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
      </div>

      {/* Price skeleton */}
      <div className="h-6 bg-gray-200 rounded w-20 mb-1 animate-pulse"></div>

      {/* Old price and discount skeleton */}
      <div className="flex items-center gap-2 mb-2">
        <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
        <div className="h-3 bg-gray-200 rounded w-8 animate-pulse"></div>
      </div>

      {/* Button skeleton */}
      <div className="w-full h-10 bg-gray-200 rounded-lg mt-auto animate-pulse"></div>
    </div>
  );
};

export default ProductCardSkeleton;
