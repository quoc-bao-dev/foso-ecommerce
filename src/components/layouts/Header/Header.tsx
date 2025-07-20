"use client";

import BottomHeader from "./BottomHeader";
import SmallOne from "./SmallOne";
import TopHeader from "./TopHeader";
import { useDevice } from "@/hooks/useDevice";

const Header = () => {
  const { isMobile, isTablet } = useDevice();

  return (
    <header className="bg-white">
      <SmallOne />
      <div className={`${isMobile ? "h-3" : isTablet ? "h-4" : "h-6"}`}></div>
      <TopHeader />
      <div className={`${isMobile ? "h-3" : isTablet ? "h-4" : "h-6"}`}></div>
      <BottomHeader />
      <div className={`${isMobile ? "h-2" : isTablet ? "h-3" : "h-4"}`}></div>
    </header>
  );
};

export default Header;
