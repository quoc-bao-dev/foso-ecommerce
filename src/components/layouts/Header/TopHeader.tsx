"use client";

import { LanguageSwitcher } from "@/components/common";
import { useI18n } from "@/hooks";
import { Container } from "../Container";
import Account from "./Account";
import CartHeader from "./CartHeader";

const TopHeader = () => {
  const { t } = useI18n();

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
          <div className="flex items-center w-full max-w-2xl rounded-full border-2 border-brand-500 h-[64px] pr-2 pl-5">
            <input
              type="text"
              placeholder={t("auth.search")}
              className="flex-1 outline-none bg-transparent text-lg"
            />
            <button className="mr-6">
              <img src="/icon/camera.png" alt="search" className="w-7 h-7" />
            </button>
            <button className="bg-brand-500 rounded-full w-[76px] h-[48px] flex items-center justify-center">
              <img src="/icon/search.png" alt="search" className="w-7 h-7" />
            </button>
          </div>
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
