"use client";

import { useHover, useI18n } from "@/hooks";
import { useDevice } from "@/hooks/useDevice";
import { HeroCategory } from "@/modules/category";
import { cn } from "@/utils/clients";
import { IoIosArrowDown } from "react-icons/io";

const CategoryGroup = () => {
  const { isHover, handleMouseEnter, handleMouseLeave } = useHover();
  const { t } = useI18n();
  const { isMobile, isTablet } = useDevice();

  return (
    <div
      className="flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`flex items-center justify-center bg-[#0155C6] text-white py-3 px-4 rounded-lg font-semibold text-base gap-2 hover:bg-[#004bb5] transition ${
          isMobile ? "w-full" : isTablet ? "w-[200px]" : "w-[263.7px]"
        }`}
      >
        {/* <MdMenu size={24} /> */}
        <img src="/icon/hamburger.png" alt="menu" className="size-[18px]" />
        <span className="font-bold">{t("category.title")}</span>
        <IoIosArrowDown size={18} className="ml-auto" />
      </button>
      <div
        className={cn("absolute top-full left-0 hidden", isHover && "block")}
      >
        <HeroCategory />
      </div>
    </div>
  );
};

export default CategoryGroup;
