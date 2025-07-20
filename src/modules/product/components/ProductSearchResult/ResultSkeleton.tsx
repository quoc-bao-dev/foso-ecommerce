const ResultSkeleton = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 animate-pulse">
      <div className="p-4">
        <div className="flex gap-4">
          {/* Product Image Skeleton */}
          <div className="flex-shrink-0">
            <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
          </div>

          {/* Product Info Skeleton */}
          <div className="flex-1 min-w-0">
            {/* Product Name Skeleton */}
            <div className="space-y-2 mb-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>

            {/* Brand and Category Skeleton */}
            <div className="flex items-center gap-2 mb-2">
              <div className="h-5 bg-gray-200 rounded px-2 py-0.5 w-16"></div>
              <div className="h-5 bg-gray-200 rounded px-2 py-0.5 w-20"></div>
            </div>

            {/* Rating Skeleton */}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-3 h-3 bg-gray-200 rounded"></div>
                ))}
              </div>
              <div className="h-3 bg-gray-200 rounded w-12"></div>
            </div>

            {/* Price Skeleton */}
            <div className="flex items-center gap-2 mb-3">
              <div className="h-6 bg-gray-200 rounded w-24"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>

            {/* Stock Status and Actions Skeleton */}
            <div className="flex items-center justify-between">
              <div className="h-6 bg-gray-200 rounded px-2 py-1 w-16"></div>

              {/* Action Buttons Skeleton */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="h-8 bg-gray-200 rounded-lg w-20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultSkeleton;
