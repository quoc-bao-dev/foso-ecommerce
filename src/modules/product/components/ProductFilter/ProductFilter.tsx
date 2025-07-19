"use client";

import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

// Định nghĩa type cho option
interface FilterOption {
  label: string;
  count?: number;
}

interface FilterConfig {
  key: string;
  label: string;
  type: "checkbox" | "radio";
  options: FilterOption[];
  defaultOpen?: boolean;
}

const FILTERS: FilterConfig[] = [
  {
    key: "category",
    label: "Danh mục sản phẩm",
    type: "checkbox",
    options: [
      { label: "Lọc gió Động cơ - Air Filter", count: 24 },
      { label: "Lọc Nhiên Liệu - Fuel Filter", count: 24 },
      { label: "Bộ lọc dầu", count: 24 },
      { label: "Chưa phân loại", count: 24 },
      { label: "Khác", count: 24 },
    ],
    defaultOpen: true,
  },
  {
    key: "price",
    label: "Khoảng giá",
    type: "radio",
    options: [
      { label: "Dưới 100,000 đ" },
      { label: "100,000 đ – 300,000 đ" },
      { label: "300,000 đ – 500,000 đ" },
      { label: "Trên 500,000 đ" },
    ],
    defaultOpen: true,
  },
  {
    key: "brand",
    label: "Thương hiệu",
    type: "checkbox",
    options: [
      { label: "Asakashi", count: 24 },
      { label: "Bosch", count: 24 },
      { label: "Huyndai", count: 24 },
    ],
    defaultOpen: false,
  },
  {
    key: "year",
    label: "Năm sản xuất",
    type: "checkbox",
    options: [
      { label: "2021", count: 24 },
      { label: "2020", count: 24 },
      { label: "2019", count: 24 },
      { label: "2018", count: 24 },
    ],
    defaultOpen: false,
  },
  {
    key: "origin",
    label: "Xuất xứ",
    type: "checkbox",
    options: [
      { label: "Đức", count: 24 },
      { label: "Nhật Bản", count: 24 },
      { label: "Trung Quốc", count: 24 },
    ],
    defaultOpen: false,
  },
];

const ProductFilter = () => {
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
  };

  return (
    <div className="bg-white rounded-2xl shadow px-3 pt-6 pb-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        {/* <FaFilter className="text-blue-600 text-xl" /> */}
        <img src="/icon/filter.png" alt="filter" className="size-8" />
        <h2 className="text-blue-600 text-2xl font-bold">Bộ Lọc</h2>
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
