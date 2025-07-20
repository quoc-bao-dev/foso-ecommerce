"use client";

import { useHover } from "@/hooks";
import { HeroCategory } from "@/modules/category";
import { cn } from "@/utils/clients";
import { IoIosArrowDown } from "react-icons/io";

const CategoryGroup = () => {
  const { isHover, handleMouseEnter, handleMouseLeave } = useHover();

  return (
    <div
      className="flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="flex items-center justify-center w-[263.7px] bg-[#0155C6] text-white py-3 px-4 rounded-lg font-semibold text-base gap-2 hover:bg-[#004bb5] transition">
        {/* <MdMenu size={24} /> */}
        <img src="/icon/hamburger.png" alt="menu" className="size-[18px]" />
        <span className="font-bold">Danh Mục Sản Phẩm</span>
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
