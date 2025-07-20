import { ProductSection } from "@/modules/product";
import {
  HomeBreadcrumbs,
  ServiceFeatures,
  StoreLocatorBanner,
} from "./home/partials";
import HeroSection from "./home/partials/HeroSection";

const Page = () => {
  return (
    <div>
      <div className="h-6"></div>
      <HomeBreadcrumbs />
      <div className="h-9"></div>
      <HeroSection />
      <div className="h-9"></div>
      <ProductSection />
      <ServiceFeatures />
      <StoreLocatorBanner />
    </div>
  );
};

export default Page;
