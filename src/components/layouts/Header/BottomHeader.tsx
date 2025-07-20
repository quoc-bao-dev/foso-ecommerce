"use client";

import { useI18n } from "@/hooks";
import Container from "../Container/Container";
import CategoryGroup from "./CategoryGroup";

type NavItemProps = {
  label: string;
  href: string;
};

const navItems: NavItemProps[] = [
  { label: "header.about", href: "#" },
  { label: "header.blog", href: "#" },
  { label: "header.catalog", href: "#" },
  { label: "header.contact", href: "#" },
];

type ServiceItemProps = {
  icon: string;
  label: string;
};

const serviceItems: ServiceItemProps[] = [
  { icon: "/icon/clock.png", label: "header.support" },
  { icon: "/icon/free-delivery.png", label: "header.freeDelivery" },
  { icon: "/icon/shipping.png", label: "header.fastShipping" },
  { icon: "/icon/sync.png", label: "header.30DaysReturn" },
];

const BottomHeader = () => {
  const { t } = useI18n();
  const NavItem = ({ label, href }: NavItemProps) => {
    return (
      <a
        href={href}
        className="hover:text-[#0057C6] transition p-2 hover:bg-brand-50 rounded-lg"
      >
        {label}
      </a>
    );
  };

  const ServiceItem = ({ icon, label }: ServiceItemProps) => {
    return (
      <div className="flex items-center gap-2 text-brand-500 font-medium p-2 hover:bg-brand-50 rounded-lg">
        <img src={icon} alt={label} className="size-[20px]" />
        <span className="text-gray-800">{label}</span>
      </div>
    );
  };

  return (
    <div className="bg-white">
      <Container className="flex items-center justify-between relative">
        <div className="flex gap-6">
          {/* Left: Danh Mục Sản Phẩm */}
          <CategoryGroup />
          {/* Center: Menu */}
          <nav className="flex items-center gap-1 text-base font-medium text-gray-800">
            {navItems.map((item) => (
              <NavItem
                key={item.label}
                label={t(item.label)}
                href={item.href}
              />
            ))}
          </nav>
        </div>
        {/* Right: Service Info */}
        <div className="flex items-center gap-1">
          {serviceItems.map((item) => (
            <ServiceItem
              key={item.label}
              icon={item.icon}
              label={t(item.label)}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default BottomHeader;
