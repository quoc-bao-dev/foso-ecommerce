import { ProductSectionServer } from "@/modules/product";
import {
  HomeBreadcrumbs,
  ServiceFeatures,
  StoreLocatorBanner,
  GettingModal,
} from "./home/partials";
import HeroSection from "./home/partials/HeroSection";
import { preloadFeaturedProducts } from "@/utils/staticGeneration";

// Generate static params for all languages
export async function generateStaticParams() {
  return [{ lang: "vi" }, { lang: "en" }];
}

const Page = async ({ params }: { params: { lang: "vi" | "en" } }) => {
  // Pre-load products for static generation
  const initialProducts = await preloadFeaturedProducts(params.lang, 8);

  return (
    <div>
      <div className="h-6"></div>
      <HomeBreadcrumbs />
      <div className="h-9"></div>
      <HeroSection />
      <div className="h-9"></div>
      <ProductSectionServer initialProducts={initialProducts} />
      <ServiceFeatures />
      <StoreLocatorBanner />
      <div className="h-9"></div>
      <GettingModal />
    </div>
  );
};

export default Page;
