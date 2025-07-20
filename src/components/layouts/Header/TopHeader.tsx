"use client";

import { LanguageSwitcher } from "@/components/common";
import { ProductSearchBar } from "@/modules/product";
import { Container } from "../Container";
import Account from "./Account";
import CartHeader from "./CartHeader";

const TopHeader = () => {
  return (
    <Container>
      <div className="flex items-center justify-between bg-white">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/image/logo.png"
            alt="Sunfil Logo"
            className="h-[111px] w-[250px] object-contain"
          />
        </div>

        {/* Search Bar */}
        <div className="flex-1 flex justify-center">
          <ProductSearchBar />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-8 ml-8">
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
