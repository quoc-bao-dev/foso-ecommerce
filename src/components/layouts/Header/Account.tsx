"use client";

import { useHover } from "@/hooks";
import { UserMenu } from "@/modules/auth";

const Account = () => {
  const { isHover, handleMouseEnter, handleMouseLeave } = useHover();

  return (
    <div
      className="relative flex items-center gap-2 cursor-pointer p-2 hover:bg-brand-50 rounded-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src="/icon/user.png" alt="cart" className="w-8 h-8" />
      <span className="font-medium">Tài khoản</span>
      {isHover && (
        <div className="absolute top-full right-0 mt-2 z-50">
          <UserMenu />
        </div>
      )}
    </div>
  );
};

export default Account;
