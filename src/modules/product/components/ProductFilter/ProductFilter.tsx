"use client";

import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useSetFilter } from "../../store";
import { useI18n } from "@/hooks";

// Định nghĩa type cho option
interface FilterOption {
  label: string;
  count?: number;
  gtPrice?: number;
  ltPrice?: number;
}

interface FilterConfig {
  key: string;
  label: string;
  type: "checkbox" | "radio";
  options: FilterOption[];
  defaultOpen?: boolean;
}

const ProductFilter = () => {
  const { t } = useI18n();

  const FILTERS: FilterConfig[] = [
    {
      key: "category",
      label: t("product.category"),
      type: "checkbox",
      options: [
        { label: t("product.categories.airFilter"), count: 24 },
        { label: t("product.categories.fuelFilter"), count: 24 },
        { label: t("product.categories.oilFilter"), count: 24 },
        { label: t("product.categories.uncategorized"), count: 24 },
        { label: t("product.categories.other"), count: 24 },
      ],
      defaultOpen: true,
    },
    {
      key: "price",
      label: t("product.priceRange"),
      type: "radio",
      options: [
        {
          label: t("product.priceRanges.under100k"),
          gtPrice: 0,
          ltPrice: 100000,
        },
        {
          label: t("product.priceRanges.100kTo300k"),
          gtPrice: 100000,
          ltPrice: 300000,
        },
        {
          label: t("product.priceRanges.300kTo500k"),
          gtPrice: 300000,
          ltPrice: 500000,
        },
        {
          label: t("product.priceRanges.over500k"),
          gtPrice: 500000,
          ltPrice: null,
        },
      ],
      defaultOpen: true,
    },
    {
      key: "brand",
      label: t("product.brand"),
      type: "checkbox",
      options: [
        { label: t("product.brands.asakashi"), count: 24 },
        { label: t("product.brands.bosch"), count: 24 },
        { label: t("product.brands.hyundai"), count: 24 },
      ],
      defaultOpen: false,
    },
    {
      key: "year",
      label: t("product.year"),
      type: "checkbox",
      options: [
        { label: t("product.years.2021"), count: 24 },
        { label: t("product.years.2020"), count: 24 },
        { label: t("product.years.2019"), count: 24 },
        { label: t("product.years.2018"), count: 24 },
      ],
      defaultOpen: false,
    },
    {
      key: "origin",
      label: t("product.origin"),
      type: "checkbox",
      options: [
        { label: t("product.origins.germany"), count: 24 },
        { label: t("product.origins.japan"), count: 24 },
        { label: t("product.origins.china"), count: 24 },
      ],
      defaultOpen: false,
    },
  ];

  // State cho collapse từng section
  const [openSections, setOpenSections] = useState(() =>
    FILTERS.reduce((acc, cur) => {
      acc[cur.key] = !!cur.defaultOpen;
      return acc;
    }, {} as Record<string, boolean>)
  );

  // State cho các lựa chọn filter (demo, chưa xử lý logic filter thực tế)
  const [selected, setSelected] = useState<Record<string, any>>({
    category: [0, 1, 2], // checked mặc định 3 mục đầu
    price: null,
    brand: [],
    year: [],
    origin: [],
  });

  const { setLtPrice, setGtPrice } = useSetFilter();

  const handleToggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCheckbox = (section: string, idx: number) => {
    setSelected((prev) => {
      const arr = prev[section] as number[];
      if (arr.includes(idx)) {
        return { ...prev, [section]: arr.filter((i) => i !== idx) };
      } else {
        return { ...prev, [section]: [...arr, idx] };
      }
    });
  };

  const handleRadio = (section: string, idx: number) => {
    setSelected((prev) => ({ ...prev, [section]: idx }));
    const option = FILTERS.find((filter) => filter.key === section);

    setGtPrice(option?.options[idx].gtPrice ?? null);
    setLtPrice(option?.options[idx].ltPrice ?? null);
  };

  return (
    <div className="bg-white rounded-2xl shadow px-3 pt-6 pb-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        {/* <FaFilter className="text-blue-600 text-xl" /> */}
        <img src="/icon/filter.png" alt="filter" className="size-8" />
        <h2 className="text-blue-600 text-2xl font-bold">
          {t("product.filter")}
        </h2>
      </div>
      {/* Filter Sections */}
      {FILTERS.map((filter) => (
        <div key={filter.key} className="mb-4 last:mb-0">
          <div className="h-[1px] bg-gray-200 -mx-3 mb-3"></div>

          {/* Section Header */}
          <button
            type="button"
            className="flex items-center justify-between w-full mb-4 focus:outline-none"
            onClick={() => handleToggleSection(filter.key)}
          >
            <span className="text-xl font-semibold text-gray-900">
              {filter.label}
            </span>
            <IoIosArrowDown
              className={`transition-transform duration-200 text-xl ${
                openSections[filter.key] ? "rotate-0" : "-rotate-90"
              }`}
            />
          </button>
          {/* Section Content */}
          {openSections[filter.key] && (
            <div className="pl-1 flex flex-col gap-[14px]">
              {filter.options.map((opt, idx) => {
                if (filter.type === "checkbox") {
                  return (
                    <label
                      key={opt.label}
                      className="flex items-center gap-2 cursor-pointer text-gray-800 text-sm"
                    >
                      <input
                        type="checkbox"
                        className="accent-blue-600 w-5 h-5 rounded-lg"
                        checked={selected[filter.key].includes(idx)}
                        onChange={() => handleCheckbox(filter.key, idx)}
                      />
                      <span>{opt.label}</span>
                      {typeof opt.count !== "undefined" && (
                        <span className="ml-auto text-gray-400 text-sm">
                          ({opt.count})
                        </span>
                      )}
                    </label>
                  );
                }
                if (filter.type === "radio") {
                  return (
                    <button
                      key={opt.label}
                      className={`relative w-full px-4 py-3 rounded-lg border transition-all text-left
                        ${
                          selected[filter.key] === idx
                            ? "border-blue-600 text-blue-600 bg-white"
                            : "border-gray-200 text-gray-800 bg-white hover:border-gray-300"
                        }
                      `}
                      onClick={() => handleRadio(filter.key, idx)}
                    >
                      {opt.label}
                      {selected[filter.key] === idx && (
                        <div className="absolute top-0 right-0 w-6 h-6 overflow-hidden rounded-tr-lg pointer-events-none">
                          <div
                            className="absolute -right-0 -top-0 w-6 h-6"
                            style={{
                              clipPath: "polygon(100% 0, 0 0, 100% 100%)",
                              background: "#0373F3",
                            }}
                          />
                          <svg
                            className="absolute right-0.5 top-0.5 w-3 h-3 text-white"
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
                  );
                }
                return null;
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductFilter;
