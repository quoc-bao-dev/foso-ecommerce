"use client";

import { useCategories } from "@/services/category";

type SidebarCategoryProps = {
  activeCategory: number;
  setCategoryId: (id: string) => void;
  handleActiveCategory: (idx: number) => void;
};

const SidebarCategory = ({
  activeCategory,
  setCategoryId,
  handleActiveCategory,
}: SidebarCategoryProps) => {
  const { data: categories } = useCategories();

  const handleMouseEnter = (idx: number) => {
    setCategoryId(categories?.[idx]?.id || "");
    handleActiveCategory(idx);
  };

  return (
    <aside className=" bg-white rounded-l-xl flex flex-col gap-1">
      {categories?.map((cat, idx) => (
        <div
          onMouseEnter={() => handleMouseEnter(idx)}
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
  );
};

export default SidebarCategory;
