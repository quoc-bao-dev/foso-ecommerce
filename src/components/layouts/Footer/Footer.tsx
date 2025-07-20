import { LanguageSwitcher } from "@/components/common";
import { IoIosArrowDown } from "react-icons/io";
import { Container } from "../Container";

const Footer = () => {
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
        <div className="flex justify-between py-24">
          {/* Column 1: Company Information */}
          <div className="w-[600px]">
            <h3 className="text-brand-800 font-bold text-lg uppercase mb-4">
              VIET HUNG AUTO PRODUCTION TRADING JOINT STOCK COMPANY
            </h3>
            <div className="mt-6 text-text-secondary text-sm flex flex-col gap-2">
              <p>
                Tax code: <span className="font-bold">0305094228</span>
              </p>
              <p>
                Address:{" "}
                <span className="font-bold">
                  13 Nghia Thuc, Ward 05, District 5, Ho Chi Minh City, Viet
                  Nam.
                </span>
              </p>
              <p>
                Phone number: <span className="font-bold">0283 760 7607</span>
              </p>
              <p>
                Opening hour:{" "}
                <span className="font-bold">09:00 - 22:00 from Mon - Fri</span>
              </p>
            </div>

            {/* Certification Badge */}
            <div className="mt-9">
              <img
                src="/image/certification.png"
                alt="certification"
                className="w-[200px]"
              />
            </div>
          </div>

          {/* Column 2: Sitemap */}
          <div className="w-[100px]">
            <h3 className="text-brand-800 font-bold text-lg uppercase mb-4">
              Sitemap
            </h3>
            <ul className="mt-6 space-y-2 text-gray-600 text-sm">
              <li>
                <a href="#" className="hover:text-blue-600 transition">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition">
                  Article
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition">
                  Cart
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div className="w-[200px]">
            <h3 className="text-brand-800 font-bold text-lg uppercase mb-4">
              Legal
            </h3>
            <ul className="mt-6 space-y-2 text-gray-600 text-sm">
              <li>
                <a href="#" className="hover:text-blue-600 transition">
                  — Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition">
                  Cookie policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition">
                  Delivery policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Download App */}
          <div className="w-[230px]">
            <h3 className="text-brand-800 font-bold text-lg uppercase mb-4">
              Download App
            </h3>
            <div className="mt-6 space-y-3">
              {/* Google Play Store Button */}
              <a href="#" className="block">
                <img
                  src="/image/google-play.png"
                  alt="google-play"
                  className="w-[230px]"
                />
              </a>

              {/* Apple App Store Button */}
              <a href="#" className="block">
                <img
                  src="/image/app-store.png"
                  alt="app-store"
                  className="w-[230px]"
                />
              </a>
              {/* Language Selector */}
              <div className="flex justify-end">
                <div className="flex items-center gap-2 cursor-pointer rounded-lg pt-8 transition">
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
