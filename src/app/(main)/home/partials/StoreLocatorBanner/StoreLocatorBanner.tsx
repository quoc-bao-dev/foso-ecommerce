"use client";

import { Container } from "@/components/layouts";

const StoreLocatorBanner = () => {
  return (
    <div className="bg-brand-50 py-8">
      <Container>
        <div className="flex items-center justify-between">
          {/* Left side: Location info */}
          <div className="flex items-center gap-3">
            <img
              src="/icon/location.png"
              alt="location"
              className="size-10 rounded-full"
            />
            <span className="text-gray-700 text-[28px] font-medium">
              Xem hệ thống 88 cửa hàng trên toàn quốc
            </span>
          </div>

          {/* Right side: View now button */}
          <button className="bg-white text-brand-500 px-6 py-4 text-2xl rounded-full font-semibold flex items-center gap-3 hover:bg-gray-50 transition-colors">
            <span>Xem ngay</span>
            <img
              src="/icon/arrow-right.png"
              alt="arrow-right"
              className="size-8"
            />
          </button>
        </div>
      </Container>
    </div>
  );
};

export default StoreLocatorBanner;
