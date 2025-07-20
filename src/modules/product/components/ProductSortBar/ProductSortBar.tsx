"use client";

import { useI18n } from "@/hooks";
import { useDevice } from "@/hooks/useDevice";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useProductSectionStore } from "../../store";

const ProductSortBar = () => {
  const { t } = useI18n();
  const { isMobile } = useDevice();
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
    <div
      className={`flex items-center gap-6 px-2 py-4 w-fit ${
        isMobile ? "!flex-col !gap-3 !items-start !w-full" : ""
      }`}
    >
      <span
        className={`text-lg font-medium text-gray-700 mr-2 ${
          isMobile ? "!text-base !mr-0" : ""
        }`}
      >
        {t("product.sortBy")}
      </span>
      <div className={`flex gap-2 ${isMobile ? "!flex-wrap !gap-1" : ""}`}>
        {SORT_OPTIONS.map((opt, idx) => (
          <button
            key={opt.label}
            className={`relative px-4 h-[40px] rounded-lg font-bold text-base border transition-all flex items-center justify-center
              ${isMobile ? "!px-3 !h-[36px] !text-sm" : ""}
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
              <div
                className={`absolute top-0 right-0 overflow-hidden rounded-tr-lg pointer-events-none ${
                  isMobile ? "w-[20px] h-[20px]" : "w-[25px] h-[24px]"
                }`}
              >
                <div
                  className={`absolute -right-0 -top-0 ${
                    isMobile ? "w-[20px] h-[20px]" : "w-[25px] h-[24px]"
                  }`}
                  style={{
                    clipPath: "polygon(100% 0, 0 0, 100% 100%)",
                    background: "#0373F3",
                  }}
                />
                <svg
                  className={`absolute right-0 top-0 text-white ${
                    isMobile ? "w-3 h-3" : "w-4 h-4"
                  }`}
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
      <div
        className={`relative flex items-center ${isMobile ? "!w-full" : ""}`}
      >
        <button
          className={`flex items-center gap-1 text-base font-medium text-gray-700 px-2 py-1 rounded hover:bg-gray-100 transition ${
            isMobile ? "!text-sm !w-full !justify-between" : ""
          }`}
          onClick={() => setShowPrice((v) => !v)}
        >
          {t("product.price")}:{" "}
          <span className="font-semibold">
            {PRICE_OPTIONS[activePrice].label}
          </span>
          <IoIosArrowDown
            className={`ml-1 text-lg ${isMobile ? "!text-base" : ""}`}
          />
        </button>
        {showPrice && (
          <div
            className={`absolute right-0 top-full mt-2 bg-white rounded shadow z-20 min-w-[140px] ${
              isMobile ? "!right-0 !left-0 !min-w-full" : ""
            }`}
          >
            {PRICE_OPTIONS.map((opt, idx) => (
              <button
                key={opt.label}
                className={`block w-full text-left px-6 py-2 text-base hover:bg-blue-50 ${
                  isMobile ? "!text-sm" : ""
                } ${
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
