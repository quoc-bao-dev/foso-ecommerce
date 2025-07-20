"use client";

import { useI18n } from "@/hooks";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useProductSectionStore } from "../../store";

const ProductSortBar = () => {
  const { t } = useI18n();
  const { setSort } = useProductSectionStore();

  const SORT_OPTIONS = [
    { label: t("product.sortOptions.relevant") },
    { label: t("product.sortOptions.bestSeller") },
    { label: t("product.sortOptions.newest") },
    { label: t("product.sortOptions.featured") },
  ];

  const PRICE_OPTIONS = [
    { label: t("product.priceOptions.lowToHigh"), value: "price-asc" },
    { label: t("product.priceOptions.highToLow"), value: "price-desc" },
  ];

  const [activeSort, setActiveSort] = useState(0);
  const [showPrice, setShowPrice] = useState(false);
  const [activePrice, setActivePrice] = useState(0);

  const handleSort = (idx: number) => {
    setSort(PRICE_OPTIONS[idx].value);
    setShowPrice(false);
    setActivePrice(idx);
  };

  return (
    <div className="flex items-center gap-6 px-2 py-4 w-fit">
      <span className="text-lg font-medium text-gray-700 mr-2">
        {t("product.sortBy")}
      </span>
      <div className="flex gap-2">
        {SORT_OPTIONS.map((opt, idx) => (
          <button
            key={opt.label}
            className={`relative px-4 h-[40px] rounded-lg font-bold text-base border transition-all flex items-center justify-center
              ${
                activeSort === idx
                  ? "border-brand-500 text-brand-500 bg-white z-10"
                  : "border-transparent text-gray-800 bg-white hover:border-brand-200"
              }
            `}
            onClick={() => setActiveSort(idx)}
          >
            {opt.label}
            {activeSort === idx && (
              <div className="absolute top-0 right-0 w-[25px] h-[24px] overflow-hidden rounded-tr-lg pointer-events-none">
                <div
                  className="absolute -right-0 -top-0 w-[25px] h-[24px]"
                  style={{
                    clipPath: "polygon(100% 0, 0 0, 100% 100%)",
                    background: "#0373F3",
                  }}
                />
                <svg
                  className="absolute right-0 top-0 w-4 h-4 text-white"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M6 10.5L9 13.5L14 8.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
      <div className="relative flex items-center">
        <button
          className="flex items-center gap-1 text-base font-medium text-gray-700 px-2 py-1 rounded hover:bg-gray-100 transition"
          onClick={() => setShowPrice((v) => !v)}
        >
          {t("product.price")}:{" "}
          <span className="font-semibold">
            {PRICE_OPTIONS[activePrice].label}
          </span>
          <IoIosArrowDown className="ml-1 text-lg" />
        </button>
        {showPrice && (
          <div className="absolute right-0 top-full mt-2 bg-white rounded shadow z-20 min-w-[140px]">
            {PRICE_OPTIONS.map((opt, idx) => (
              <button
                key={opt.label}
                className={`block w-full text-left px-6 py-2 text-base hover:bg-blue-50 ${
                  activePrice === idx
                    ? "text-brand-500 font-semibold"
                    : "text-gray-800"
                }`}
                onClick={() => handleSort(idx)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSortBar;
