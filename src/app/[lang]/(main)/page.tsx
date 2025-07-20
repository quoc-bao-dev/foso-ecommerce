import { ProductSectionServer } from "@/modules/product";
import { preloadFeaturedProducts } from "@/utils/staticGeneration";
import {
  GettingModal,
  HomeBreadcrumbs,
  ServiceFeatures,
  StoreLocatorBanner,
} from "./home/partials";
import HeroSection from "./home/partials/HeroSection";

// Generate static params for all languages
export async function generateStaticParams() {
  return [{ lang: "vi" }, { lang: "en" }];
}

const Page = async ({ params }: { params: Promise<{ lang: "vi" | "en" }> }) => {
  const { lang } = await params;
  // Pre-load products for static generation
  const initialProducts = await preloadFeaturedProducts(lang, 8);

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
