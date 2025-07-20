"use client";

import { LanguageSwitcher } from "@/components/common";
import { useDevice } from "@/hooks/useDevice";
import { IoIosArrowDown } from "react-icons/io";
import { Container } from "../Container";

const Footer = () => {
  const { isMobile, isTablet } = useDevice();

  return (
    <footer className="relative">
      <div className="absolute inset-0 bg-black opacity-35">
        <img
          src="/image/footer.jpg"
          alt="footer"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <Container className="relative z-10">
        {/* Main Footer Content */}
        <div
          className={`flex justify-between py-24 ${
            isMobile ? "!flex-col !gap-8 !py-12" : ""
          }`}
        >
          {/* Column 1: Company Information */}
          <div className={`w-[600px] ${isMobile ? "!w-full" : ""}`}>
            <h3
              className={`text-brand-800 font-bold text-lg uppercase mb-4 ${
                isMobile ? "!text-base" : ""
              }`}
            >
              VIET HUNG AUTO PRODUCTION TRADING JOINT STOCK COMPANY
            </h3>
            <div
              className={`mt-6 text-text-secondary text-sm flex flex-col gap-2 ${
                isMobile ? "!mt-4 !gap-1" : ""
              }`}
            >
              <p className={isMobile ? "!text-xs" : ""}>
                Tax code: <span className="font-bold">0305094228</span>
              </p>
              <p className={isMobile ? "!text-xs" : ""}>
                Address:{" "}
                <span className="font-bold">
                  13 Nghia Thuc, Ward 05, District 5, Ho Chi Minh City, Viet
                  Nam.
                </span>
              </p>
              <p className={isMobile ? "!text-xs" : ""}>
                Phone number: <span className="font-bold">0283 760 7607</span>
              </p>
              <p className={isMobile ? "!text-xs" : ""}>
                Opening hour:{" "}
                <span className="font-bold">09:00 - 22:00 from Mon - Fri</span>
              </p>
            </div>

            {/* Certification Badge */}
            <div className={`mt-9 ${isMobile ? "!mt-6" : ""}`}>
              <img
                src="/image/certification.png"
                alt="certification"
                className={`${isMobile ? "w-[150px]" : "w-[200px]"}`}
              />
            </div>
          </div>

          {/* Column 2: Sitemap */}
          <div className={`w-[100px] ${isMobile ? "!w-full" : ""}`}>
            <h3
              className={`text-brand-800 font-bold text-lg uppercase mb-4 ${
                isMobile ? "!text-base" : ""
              }`}
            >
              Sitemap
            </h3>
            <ul
              className={`mt-6 space-y-2 text-gray-600 text-sm ${
                isMobile ? "!mt-4 !space-y-1" : ""
              }`}
            >
              <li>
                <a
                  href="#"
                  className={`hover:text-blue-600 transition ${
                    isMobile ? "!text-xs" : ""
                  }`}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`hover:text-blue-600 transition ${
                    isMobile ? "!text-xs" : ""
                  }`}
                >
                  Article
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`hover:text-blue-600 transition ${
                    isMobile ? "!text-xs" : ""
                  }`}
                >
                  Cart
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`hover:text-blue-600 transition ${
                    isMobile ? "!text-xs" : ""
                  }`}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div className={`w-[200px] ${isMobile ? "!w-full" : ""}`}>
            <h3
              className={`text-brand-800 font-bold text-lg uppercase mb-4 ${
                isMobile ? "!text-base" : ""
              }`}
            >
              Legal
            </h3>
            <ul
              className={`mt-6 space-y-2 text-gray-600 text-sm ${
                isMobile ? "!mt-4 !space-y-1" : ""
              }`}
            >
              <li>
                <a
                  href="#"
                  className={`hover:text-blue-600 transition ${
                    isMobile ? "!text-xs" : ""
                  }`}
                >
                  — Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`hover:text-blue-600 transition ${
                    isMobile ? "!text-xs" : ""
                  }`}
                >
                  Cookie policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`hover:text-blue-600 transition ${
                    isMobile ? "!text-xs" : ""
                  }`}
                >
                  Delivery policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`hover:text-blue-600 transition ${
                    isMobile ? "!text-xs" : ""
                  }`}
                >
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Download App */}
          <div className={`w-[230px] ${isMobile ? "!w-full" : ""}`}>
            <h3
              className={`text-brand-800 font-bold text-lg uppercase mb-4 ${
                isMobile ? "!text-base" : ""
              }`}
            >
              Download App
            </h3>
            <div
              className={`mt-6 space-y-3 ${isMobile ? "!mt-4 !space-y-2" : ""}`}
            >
              {/* Google Play Store Button */}
              <a href="#" className="block">
                <img
                  src="/image/google-play.png"
                  alt="google-play"
                  className={`${isMobile ? "w-[180px]" : "w-[230px]"}`}
                />
              </a>

              {/* Apple App Store Button */}
              <a href="#" className="block">
                <img
                  src="/image/app-store.png"
                  alt="app-store"
                  className={`${isMobile ? "w-[180px]" : "w-[230px]"}`}
                />
              </a>
              {/* Language Selector */}
              <div
                className={`flex justify-end ${
                  isMobile ? "!justify-start" : ""
                }`}
              >
                <div
                  className={`flex items-center gap-2 cursor-pointer rounded-lg pt-8 transition ${
                    isMobile ? "!pt-4" : ""
                  }`}
                >
                  {/* Placeholder for Vietnamese flag - replace with actual image */}
                  <LanguageSwitcher />
                  <IoIosArrowDown className="text-gray-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Language Selector and Scroll to Top */}
      </Container>
    </footer>
  );
};

export default Footer;
