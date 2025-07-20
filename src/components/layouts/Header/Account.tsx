"use client";

import { useHover, useI18n } from "@/hooks";
import { useDevice } from "@/hooks/useDevice";
import { UserMenu } from "@/modules/auth";

const Account = () => {
  const { isHover, handleMouseEnter, handleMouseLeave } = useHover();
  const { t } = useI18n();
  const { isMobile, isTablet } = useDevice();

  return (
    <div
      className={`relative flex items-center gap-2 cursor-pointer hover:bg-brand-50 rounded-full ${
        isMobile ? "p-1 min-w-[100px]" : "p-2 min-w-[127px]"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src="/icon/user.png"
        alt="cart"
        className={`${isMobile ? "w-6 h-6" : "w-8 h-8"}`}
      />
      <span className={`font-medium ${isMobile ? "text-sm" : ""}`}>
        {t("auth.account")}
      </span>
      {isHover && (
        <div className="absolute top-full right-0 mt-2 z-50">
          <UserMenu />
        </div>
      )}
    </div>
  );
};

export default Account;
