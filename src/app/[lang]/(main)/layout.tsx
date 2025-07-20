import { ButtonScrollToTop } from "@/components/common/ButtonScrollToTop";
import { Header } from "@/components/layouts";
import { Footer } from "@/components/layouts/Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gray-200">
      <Header />
      {children}
      <Footer />
      <ButtonScrollToTop />
    </div>
  );
};

export default Layout;
