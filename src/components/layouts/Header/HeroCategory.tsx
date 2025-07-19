import React, { useState } from "react";
import Container from "../Container/Container";
import { ProductCard } from "@/modules/product";

const categories = [
  {
    name: "Bộ Lọc Dầu",
    image: "/image/logo.png",
    active: true,
  },
  { name: "Bộ Lọc Không Khí", image: "/image/logo.png" },
  { name: "Bộ Lọc Nhiên Liệu", image: "/image/logo.png" },
  { name: "Bộ Lọc Trong Cabin", image: "/image/logo.png" },
  { name: "Bộ Lọc Không Khí", image: "/image/logo.png" },
  { name: "Bộ Lọc Trong Cabin", image: "/image/logo.png" },
  { name: "Bộ Lọc Nhiên Liệu", image: "/image/logo.png" },
  { name: "Bộ Lọc Không Khí", image: "/image/logo.png" },
];

const subCategories = [
  { name: "Bộ lọc gió", image: "/image/logo.png" },
  { name: "Bộ lọc gió", image: "/image/logo.png" },
  { name: "Bộ lọc gió", image: "/image/logo.png" },
  { name: "Bộ lọc gió", image: "/image/logo.png" },
  { name: "Bộ lọc gió", image: "/image/logo.png" },
  { name: "Bộ lọc gió", image: "/image/logo.png" },
];

const products = [
  {
    name: "Lọc gió động cơ Air Filter – Chevrolet Co...",
    image: "/image/logo.png",
    price: 299000,
    oldPrice: 329000,
    discount: 10,
  },
  {
    name: "Lọc gió động cơ Air Filter – Chevrolet Co...",
    image: "/image/logo.png",
    price: 299000,
    oldPrice: 329000,
    discount: 10,
  },
  {
    name: "Lọc gió động cơ Air Filter – Chevrolet Co...",
    image: "/image/logo.png",
    price: 299000,
    oldPrice: 329000,
    discount: 10,
  },
  {
    name: "Lọc gió động cơ Air Filter – Chevrolet Co...",
    image: "/image/logo.png",
    price: 299000,
    oldPrice: 329000,
    discount: 10,
  },
  {
    name: "Lọc gió động cơ Air Filter – Chevrolet Co...",
    image: "/image/logo.png",
    price: 299000,
    oldPrice: 329000,
    discount: 10,
  },
];

const HeroCategory = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  const handleActiveCategory = (idx: number) => {
    setActiveCategory(idx);
  };

  return (
    <div className="bg-gray-200 py-6 relative z-40">
      <Container className="flex gap-6">
        {/* Sidebar Category */}
        <aside className="w-[263.7px] bg-white rounded-l-xl flex flex-col gap-1">
          {categories.map((cat, idx) => (
            <div
              onMouseEnter={() => handleActiveCategory(idx)}
              key={cat.name + idx}
              className={`flex items-center gap-3 px-4 h-[72px] border-l-3 border-transparent cursor-pointer transition text-base font-medium ${
                activeCategory === idx
                  ? "bg-gray-200 text-[#0155C6] border-brand-500!"
                  : "text-gray-700 hover:bg-[#F2F7FF]"
              }`}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-10 h-10 object-contain"
              />
              <span className="flex-1">{cat.name}</span>
              <span className="text-gray-300 text-xl">&gt;</span>
            </div>
          ))}
        </aside>
        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Subcategory grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {subCategories.map((sub, idx) => (
              <div
                key={sub.name + idx}
                className="flex items-center gap-4 h-[94px] bg-white rounded-xl px-6 cursor-pointer hover:shadow border border-transparent hover:border-[#0155C6] transition"
              >
                <img
                  src={sub.image}
                  alt={sub.name}
                  className="h-full w-auto aspect-square object-contain"
                />
                <span className="font-semibold text-lg">{sub.name}</span>
              </div>
            ))}
          </div>
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
              {products.map((prod, idx) => (
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
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HeroCategory;
