import Container from "../Container/Container";
import CategoryGroup from "./CategoryGroup";

type NavItemProps = {
  label: string;
  href: string;
};

const navItems: NavItemProps[] = [
  { label: "Về Chúng Tôi", href: "#" },
  { label: "Bài Viết", href: "#" },
  { label: "Catalog", href: "#" },
  { label: "Liên Hệ", href: "#" },
];

type ServiceItemProps = {
  icon: string;
  label: string;
};

const serviceItems: ServiceItemProps[] = [
  { icon: "/icon/clock.png", label: "Hỗ trợ 24/7" },
  { icon: "/icon/free-delivery.png", label: "Miễn Phí Vận Chuyển" },
  { icon: "/icon/shipping.png", label: "Giao Hàng Nhanh 2h" },
  { icon: "/icon/sync.png", label: "30 Ngày Đổi Trả" },
];

const BottomHeader = () => {
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
              <NavItem key={item.label} {...item} />
            ))}
          </nav>
        </div>
        {/* Right: Service Info */}
        <div className="flex items-center gap-1">
          {serviceItems.map((item) => (
            <ServiceItem key={item.label} {...item} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default BottomHeader;
