import { ProductCard } from "@/modules/product";
import {
  generateCategoryPaths,
  preloadProductsByCategory,
} from "@/utils/staticGeneration";

// Generate static params for all categories
export async function generateStaticParams() {
  const viPaths = await generateCategoryPaths("vi");
  const enPaths = await generateCategoryPaths("en");
  return [...viPaths, ...enPaths];
}

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ category: string; lang: "vi" | "en" }>;
}) => {
  const { category, lang } = await params;

  const products = await preloadProductsByCategory(category, lang);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Category: {decodeURIComponent(category)}
      </h1>

      {products.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No products found in this category.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              isSale={product.discount > 0}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
