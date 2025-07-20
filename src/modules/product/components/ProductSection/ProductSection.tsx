"use client";

import { Container } from "@/components/layouts";
import { useI18n, useInView } from "@/hooks";
import { useDevice } from "@/hooks/useDevice";
import {
  ProductCard,
  ProductCardSkeletonList,
  ProductFilter,
  ProductSortBar,
} from "@/modules/product";
import { useInfiniteProducts } from "@/services/product";
import { useEffect, useMemo } from "react";
import { useProductSectionStore } from "../../store";

const ProductSection = () => {
  const { t, currentLocale } = useI18n();
  const { isMobile } = useDevice();
  const { sort, gtPrice, ltPrice } = useProductSectionStore();
  const {
    data: products,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteProducts({
    page: 1,
    limit: 8,
    sort,
    gtPrice,
    ltPrice,
    lang: currentLocale,
  });

  const { ref, inView } = useInView();

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

  const productsList = useMemo(() => {
    const list = products?.pages?.flatMap((page) => page.data) || [];

    return list;
  }, [products]);

  return (
    <Container>
      <div className={`flex gap-5 ${isMobile ? "!flex-col !gap-3" : ""}`}>
        {/* filter */}
        <div className={`w-[315px] ${isMobile ? "!hidden" : ""}`}>
          <div className="h-fit sticky top-[30px]">
            <ProductFilter />
          </div>
        </div>
        {/* product list */}
        <div className="flex-1">
          <div
            className={`flex justify-between items-center ${
              isMobile ? "!flex-col !gap-3 !items-start" : ""
            }`}
          >
            <h2
              className={`text-xl font-semibold ${isMobile ? "!text-lg" : ""}`}
            >
              {t("product.productList")}
            </h2>
            <ProductSortBar />
          </div>
          <div className={`pt-5 ${isMobile ? "!pt-3" : ""}`}>
            {isLoading ? (
              <ProductCardSkeletonList count={8} />
            ) : (
              <div
                className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5 ${
                  isMobile ? "!gap-3" : ""
                }`}
              >
                {productsList?.map((product) => (
                  <ProductCard
                    key={product.id}
                    {...product}
                    isSale={product.discount > 0}
                  />
                ))}
              </div>
            )}
          </div>
          {isFetchingNextPage && (
            <div className={`pt-5 ${isMobile ? "!pt-3" : ""}`}>
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
