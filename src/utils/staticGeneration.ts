import { ProductService } from "@/server/product-service/productService";
import { Product } from "@/modules/product/types/types";

/**
 * Preload products for static generation
 */
export async function preloadProducts(lang: "vi" | "en" = "vi") {
  try {
    const products = ProductService.getStaticProducts(lang);
    return products;
  } catch (error) {
    console.error("Error preloading products:", error);
    return [];
  }
}

/**
 * Preload featured products for static generation
 */
export async function preloadFeaturedProducts(
  lang: "vi" | "en" = "vi",
  limit: number = 8
) {
  try {
    const products = ProductService.getStaticFeaturedProducts(lang, limit);
    return products;
  } catch (error) {
    console.error("Error preloading featured products:", error);
    return [];
  }
}

/**
 * Preload product by ID for static generation
 */
export async function preloadProductById(id: string, lang: "vi" | "en" = "vi") {
  try {
    const product = ProductService.getStaticProductById(id, lang);
    return product;
  } catch (error) {
    console.error("Error preloading product by ID:", error);
    return null;
  }
}

/**
 * Preload products by category for static generation
 */
export async function preloadProductsByCategory(
  categoryId: string,
  lang: "vi" | "en" = "vi"
) {
  try {
    const products = ProductService.getStaticProductsByCategory(
      categoryId,
      lang
    );
    return products;
  } catch (error) {
    console.error("Error preloading products by category:", error);
    return [];
  }
}

/**
 * Generate static paths for all products
 */
export async function generateProductPaths(lang: "vi" | "en" = "vi") {
  try {
    const products = ProductService.getStaticProducts(lang);
    return products.map((product) => ({
      id: product.id,
      lang,
    }));
  } catch (error) {
    console.error("Error generating product paths:", error);
    return [];
  }
}

/**
 * Generate static paths for all categories
 */
export async function generateCategoryPaths(lang: "vi" | "en" = "vi") {
  try {
    const products = ProductService.getStaticProducts(lang);
    const categories = [
      ...new Set(products.map((product) => product.category)),
    ];
    return categories.map((category) => ({
      category,
      lang,
    }));
  } catch (error) {
    console.error("Error generating category paths:", error);
    return [];
  }
}
