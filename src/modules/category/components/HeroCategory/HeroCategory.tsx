"use client";

import { Container } from "@/components/layouts";
import { useI18n } from "@/hooks";
import { useDevice } from "@/hooks/useDevice";
import { SidebarCategory, SubCategory } from "@/modules/category";
import { ProductCard, ProductCardSkeleton } from "@/modules/product";
import { useProductsByCategory } from "@/services/product";
import { useState } from "react";

const HeroCategory = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [categoryId, setCategoryId] = useState("1");
  const { isMobile } = useDevice();

  const handleActiveCategory = (idx: number) => {
    setActiveCategory(idx);
  };

  const { t, currentLocale } = useI18n();
  const { data: products, isLoading } = useProductsByCategory(
    categoryId,
    currentLocale
  );

  return (
    <div
      className={`bg-gray-200 py-6 relative z-40 ${isMobile ? "!py-4" : ""}`}
    >
      <Container className={`flex gap-6 ${isMobile ? "!flex-col !gap-4" : ""}`}>
        {/* Sidebar Category */}
        <div
          className={`w-[263.7px] hidden md:block ${isMobile ? "!hidden" : ""}`}
        >
          <SidebarCategory
            activeCategory={activeCategory}
            handleActiveCategory={handleActiveCategory}
            setCategoryId={setCategoryId}
          />
        </div>

        {/* Main Content */}
        <div
          className={`flex-1 flex flex-col gap-6 ${isMobile ? "!gap-4" : ""}`}
        >
          {/* Subcategory grid */}
          <SubCategory />
          <div
            className={`h-[1px] bg-gray-300 mt-2 ${isMobile ? "!mt-1" : ""}`}
          />
          {/* Best Seller */}
          <div className={`mt-2 ${isMobile ? "!mt-1" : ""}`}>
            <div
              className={`flex items-center justify-between mb-4 ${
                isMobile ? "!mb-3" : ""
              }`}
            >
              <h2
                className={`text-2xl font-bold text-gray-800 ${
                  isMobile ? "!text-lg" : ""
                }`}
              >
                {t("category.bestSeller")}
              </h2>
              <a
                href="#"
                className={`text-brand-500 font-semibold flex items-center gap-1 hover:underline ${
                  isMobile ? "!text-sm" : ""
                }`}
              >
                {t("category.viewAll")}{" "}
                <span className={`${isMobile ? "text-base" : "text-lg"}`}>
                  &raquo;
                </span>
              </a>
            </div>
            <div
              className={`grid grid-cols-2 md:grid-cols-5 gap-4 ${
                isMobile ? "!gap-3" : ""
              }`}
            >
              {products?.data?.map((prod, idx) => (
                <ProductCard
                  key={prod.id || prod.name + idx}
                  {...prod}
                  className={`min-w-[200px] ${isMobile ? "p-2" : "p-3"}`}
                />
              ))}
              {isLoading &&
                Array.from({ length: 5 }).map((_, idx) => (
                  <ProductCardSkeleton key={idx} />
                ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HeroCategory;
