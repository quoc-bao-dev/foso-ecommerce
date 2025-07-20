"use client";

import { useHover, useI18n } from "@/hooks";
import { useDevice } from "@/hooks/useDevice";
import { CartHover, useCartStore } from "@/modules/cart";
import { cn } from "@/utils/clients";

const CartHeader = () => {
  const { isHover, handleMouseEnter, handleMouseLeave } = useHover();
  const { t } = useI18n();
  const { isMobile, isTablet } = useDevice();
  const { getTotalItems } = useCartStore();

  const totalItems = getTotalItems();

  return (
    <div
      className={cn(
        `relative flex items-center gap-2 cursor-pointer rounded-full ${
          isMobile ? "p-1 min-w-[100px]" : "p-2 min-w-[121px]"
        }`,
        isHover && "bg-brand-50"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative rounded-full">
        <img
          src="/icon/cart.png"
          alt="cart"
          className={`${isMobile ? "w-6 h-6" : "w-8 h-8"}`}
        />
        {totalItems > 0 && (
          <span
            className={`absolute bg-error-main text-white rounded-full flex items-center justify-center ${
              isMobile
                ? "-top-2.5 -right-2 text-[10px] w-5 h-5"
                : "-top-3.5 -right-3 text-xs w-6 h-6"
            }`}
          >
            {totalItems > 99 ? "99+" : totalItems}
          </span>
        )}
      </div>
      <span className={`font-medium ${isMobile ? "text-sm" : ""}`}>
        {t("auth.cart")}
      </span>
      {isHover && (
        <div className="absolute top-full right-0 mt-2 z-50">
          <CartHover />
        </div>
      )}
    </div>
  );
};

export default CartHeader;
