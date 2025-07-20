import { ProductCardSkeleton } from "./index";

type ProductCardSkeletonListProps = {
  count?: number;
  className?: string;
};

const ProductCardSkeletonList = ({
  count = 8,
  className,
}: ProductCardSkeletonListProps) => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5 ${className}`}
    >
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default ProductCardSkeletonList;
