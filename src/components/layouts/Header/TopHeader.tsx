"use client";

import { LanguageSwitcher } from "@/components/common";
import { ProductSearchBar } from "@/modules/product";
import { Container } from "../Container";
import { useDevice } from "@/hooks";
import Account from "./Account";
import CartHeader from "./CartHeader";

const TopHeader = () => {
  const { isMobile, isTablet } = useDevice();

  return (
    <Container>
      <div
        className={`flex items-center justify-between bg-white ${
          isMobile ? "!flex-col !gap-4" : ""
        }`}
      >
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/image/logo.png"
            alt="Sunfil Logo"
            className={`h-[111px] w-[250px] object-contain ${
              isMobile
                ? "!h-[80px] !w-[180px]"
                : isTablet
                ? "!h-[100px] !w-[220px]"
                : ""
            }`}
          />
        </div>

        {/* Search Bar */}
        <div
          className={`flex-1 flex justify-center ${isMobile ? "!w-full" : ""}`}
        >
          <ProductSearchBar />
        </div>

        {/* Right Section */}
        <div
          className={`flex items-center gap-8 ml-8 ${
            isMobile ? "!gap-4 !w-full !justify-center !ml-0" : ""
          }`}
        >
          {/* Language */}
          <LanguageSwitcher />
          {/* Cart */}
          <CartHeader />

          {/* Account */}
          <Account />
        </div>
      </div>
    </Container>
  );
};

export default TopHeader;
