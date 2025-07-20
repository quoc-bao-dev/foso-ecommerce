import { ProductFilters } from "@/modules/product";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import ProductApi from "./api";
import { Product } from "@/modules/product/types/types";

// Query keys
export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (filters: ProductFilters) => [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, "detail"] as const,
  detail: (id: string, lang?: string) =>
    [...productKeys.details(), id, lang] as const,
  categories: () => [...productKeys.all, "categories"] as const,
  category: (category: string, lang?: string) =>
    [...productKeys.categories(), category, lang] as const,
  search: (search: string, lang?: string) =>
    [...productKeys.all, "search", search, lang] as const,
};

// Get all products with initial data support
export const useProducts = (
  filters?: ProductFilters,
  initialData?: Product[]
) => {
  return useQuery({
    queryKey: productKeys.list(filters || {}),
    queryFn: () => ProductApi.getProducts(filters),
    initialData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get all products in Vietnamese with initial data support
export const useProductsVi = (initialData?: Product[]) => {
  return useQuery({
    queryKey: productKeys.list({ lang: "vi" }),
    queryFn: () => ProductApi.getAllProductsVi(),
    initialData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Get all products in English with initial data support
export const useProductsEn = (initialData?: Product[]) => {
  return useQuery({
    queryKey: productKeys.list({ lang: "en" }),
    queryFn: () => ProductApi.getAllProductsEn(),
    initialData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Get single product by ID with initial data support
export const useProduct = (
  id: string,
  lang?: "vi" | "en",
  initialData?: any
) => {
  return useQuery({
    queryKey: productKeys.detail(id, lang),
    queryFn: () => ProductApi.getProduct(id, lang),
    enabled: !!id,
    initialData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Get products by category ID
export const useProductsByCategory = (
  categoryId: string,
  lang?: "vi" | "en"
) => {
  return useQuery({
    queryKey: productKeys.category(categoryId, lang),
    queryFn: () => ProductApi.getProductsByCategory(categoryId, lang),
    enabled: !!categoryId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Get products by category ID in Vietnamese
export const useProductsByCategoryVi = (categoryId: string) => {
  return useQuery({
    queryKey: productKeys.category(categoryId, "vi"),
    queryFn: () => ProductApi.getProductsByCategoryVi(categoryId),
    enabled: !!categoryId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Get products by category ID in English
export const useProductsByCategoryEn = (categoryId: string) => {
  return useQuery({
    queryKey: productKeys.category(categoryId, "en"),
    queryFn: () => ProductApi.getProductsByCategoryEn(categoryId),
    enabled: !!categoryId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Search products
export const useSearchProducts = (search: string, lang?: "vi" | "en") => {
  return useQuery({
    queryKey: productKeys.search(search, lang),
    queryFn: () => ProductApi.searchProducts(search, lang),
    enabled: !!search && search.length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutes for search results
    gcTime: 5 * 60 * 1000,
  });
};

// Search products in Vietnamese
export const useSearchProductsVi = (search: string) => {
  return useQuery({
    queryKey: productKeys.search(search, "vi"),
    queryFn: () => ProductApi.searchProductsVi(search),
    enabled: !!search && search.length > 0,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

// Search products in English
export const useSearchProductsEn = (search: string) => {
  return useQuery({
    queryKey: productKeys.search(search, "en"),
    queryFn: () => ProductApi.searchProductsEn(search),
    enabled: !!search && search.length > 0,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

// Infinite query for pagination (if API supports it)
export const useInfiniteProducts = (filters?: ProductFilters) => {
  return useInfiniteQuery({
    queryKey: productKeys.list(filters || {}),
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      ProductApi.getProductsPagination({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage?.page;
      const hasNextPage = lastPage?.hasNextPage;

      return hasNextPage ? currentPage + 1 : false;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Prefetch functions for better UX
export const prefetchProduct = async (
  queryClient: any,
  id: string,
  lang?: "vi" | "en"
) => {
  await queryClient.prefetchQuery({
    queryKey: productKeys.detail(id, lang),
    queryFn: () => ProductApi.getProduct(id, lang),
    staleTime: 5 * 60 * 1000,
  });
};

export const prefetchProducts = async (
  queryClient: any,
  filters?: ProductFilters
) => {
  await queryClient.prefetchQuery({
    queryKey: productKeys.list(filters || {}),
    queryFn: () => ProductApi.getProducts(filters),
    staleTime: 5 * 60 * 1000,
  });
};
