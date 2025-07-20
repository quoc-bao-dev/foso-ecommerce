"use client";

import { Container } from "@/components/layouts";
import { useI18n } from "@/hooks";
import { useDevice } from "@/hooks/useDevice";

const StoreLocatorBanner = () => {
  const { t } = useI18n();
  const { isMobile } = useDevice();

  return (
    <div className={`bg-brand-50 py-8 ${isMobile ? "!py-6" : ""}`}>
      <Container>
        <div
          className={`flex items-center justify-between ${
            isMobile ? "!flex-col !gap-4" : ""
          }`}
        >
          {/* Left side: Location info */}
          <div
            className={`flex items-center gap-3 ${isMobile ? "!gap-2" : ""}`}
          >
            <img
              src="/icon/location.png"
              alt="location"
              className={`rounded-full ${isMobile ? "size-8" : "size-10"}`}
            />
            <span
              className={`text-gray-700 font-medium ${
                isMobile ? "text-lg" : "text-[28px]"
              }`}
            >
              {t("home.storeLocatorBanner.title")}
            </span>
          </div>

          {/* Right side: View now button */}
          <button
            className={`bg-white text-brand-500 rounded-full font-semibold flex items-center gap-3 hover:bg-gray-50 transition-colors ${
              isMobile ? "px-4 py-3 text-base" : "px-6 py-4 text-2xl"
            }`}
          >
            <span>{t("home.storeLocatorBanner.viewNow")}</span>
            <img
              src="/icon/arrow-right.png"
              alt="arrow-right"
              className={`${isMobile ? "size-6" : "size-8"}`}
            />
          </button>
        </div>
      </Container>
    </div>
  );
};

export default StoreLocatorBanner;
