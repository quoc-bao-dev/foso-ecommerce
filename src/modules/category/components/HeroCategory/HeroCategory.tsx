"use client";

import { Container } from "@/components/layouts";
import { SidebarCategory, SubCategory } from "@/modules/category";
import { ProductCard, ProductCardSkeleton } from "@/modules/product";
import { useProductsByCategory } from "@/services/product";
import { useState } from "react";

const HeroCategory = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [categoryId, setCategoryId] = useState("1");

  const handleActiveCategory = (idx: number) => {
    setActiveCategory(idx);
  };

  const { data: products, isLoading } = useProductsByCategory(categoryId);

  return (
    <div className="bg-gray-200 py-6 relative z-40">
      <Container className="flex gap-6">
        {/* Sidebar Category */}
        <div className="w-[263.7px] hidden md:block">
          <SidebarCategory
            activeCategory={activeCategory}
            handleActiveCategory={handleActiveCategory}
            setCategoryId={setCategoryId}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Subcategory grid */}
          <SubCategory />
          <div className="h-[1px] bg-gray-300 mt-2" />
          {/* Best Seller */}
          <div className="mt-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Sản Phẩm Bán Chạy
              </h2>
              <a
                href="#"
                className="text-brand-500 font-semibold flex items-center gap-1 hover:underline"
              >
                Xem tất cả <span className="text-lg">&raquo;</span>
              </a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {products?.data?.map((prod, idx) => (
                <ProductCard
                  key={prod.name + idx}
                  name={prod.name}
                  image={prod.image}
                  price={prod.price}
                  oldPrice={prod.oldPrice}
                  discount={prod.discount}
                  className="min-w-[200px] p-3"
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
