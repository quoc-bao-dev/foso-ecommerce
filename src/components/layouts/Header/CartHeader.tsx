"use client";

import { useHover, useI18n } from "@/hooks";
import { CartHover, useCartStore } from "@/modules/cart";
import { cn } from "@/utils/clients";

const CartHeader = () => {
  const { isHover, handleMouseEnter, handleMouseLeave } = useHover();
  const { t } = useI18n();
  const { getTotalItems } = useCartStore();

  const totalItems = getTotalItems();

  return (
    <div
      className={cn(
        "relative flex items-center gap-2 cursor-pointer p-2 rounded-full min-w-[121px]",
        isHover && "bg-brand-50"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative rounded-full">
        <img src="/icon/cart.png" alt="cart" className="w-8 h-8" />
        {totalItems > 0 && (
          <span className="absolute -top-3.5 -right-3 bg-error-main text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
            {totalItems > 99 ? "99+" : totalItems}
          </span>
        )}
      </div>
      <span className="font-medium">{t("auth.cart")}</span>
      {isHover && (
        <div className="absolute top-full right-0 mt-2 z-50">
          <CartHover />
        </div>
      )}
    </div>
  );
};

export default CartHeader;
