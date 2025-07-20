"use client";

import { Container } from "@/components/layouts";
import { useInView } from "@/hooks";
import {
  ProductCard,
  ProductCardSkeletonList,
  ProductFilter,
  ProductSortBar,
} from "@/modules/product";
import { useInfiniteProducts } from "@/services/product";
import { useEffect } from "react";

const ProductSection = () => {
  const {
    data: products,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteProducts({
    page: 1,
    limit: 8,
  });

  const { ref, inView } = useInView();

  console.log("[ProductSection] products", products);

  useEffect(() => {
    const handleScroll = () => {
      if (!inView) return;
      if (!products?.pages[products?.pages?.length - 1]?.hasNextPage) return;
      if (
        products?.pages[products?.pages?.length - 1]?.hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <Container>
      <div className="flex gap-5">
        {/* filter */}
        <div className="w-[315px]">
          <div className="h-fit sticky top-[30px]">
            <ProductFilter />
          </div>
        </div>
        {/* product list */}
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Danh sách sản phẩm</h2>
            <ProductSortBar />
          </div>
          <div className="pt-5">
            {isLoading ? (
              <ProductCardSkeletonList count={8} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5">
                {products?.pages?.map((page) =>
                  page?.data?.map((product) => (
                    <ProductCard
                      key={product.id}
                      {...product}
                      isSale={product.discount > 0}
                    />
                  ))
                )}
              </div>
            )}
          </div>
          {isFetchingNextPage && (
            <div className="pt-5">
              <ProductCardSkeletonList count={4} />
            </div>
          )}
        </div>
      </div>
      <div ref={ref as React.RefObject<HTMLDivElement>}></div>
    </Container>
  );
};

export default ProductSection;
