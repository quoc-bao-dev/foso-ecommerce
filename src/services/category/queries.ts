import { CategoryFilters } from "@/modules/category";
import { useQuery } from "@tanstack/react-query";
import CategoryApi from "./api";

// Query keys
export const categoryKeys = {
  all: ["categories"] as const,
  lists: () => [...categoryKeys.all, "list"] as const,
  list: (filters: CategoryFilters) =>
    [...categoryKeys.lists(), filters] as const,
  details: () => [...categoryKeys.all, "detail"] as const,
  detail: (id: string, lang?: string) =>
    [...categoryKeys.details(), id, lang] as const,
  search: (search: string, lang?: string) =>
    [...categoryKeys.all, "search", search, lang] as const,
  withProductCount: (lang?: string) =>
    [...categoryKeys.all, "withProductCount", lang] as const,
};

// Get all categories
export const useCategories = (filters?: CategoryFilters) => {
  return useQuery({
    queryKey: categoryKeys.list(filters || {}),
    queryFn: () => CategoryApi.getCategories(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get all categories in Vietnamese
export const useCategoriesVi = () => {
  return useQuery({
    queryKey: categoryKeys.list({ lang: "vi" }),
    queryFn: () => CategoryApi.getAllCategoriesVi(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Get all categories in English
export const useCategoriesEn = () => {
  return useQuery({
    queryKey: categoryKeys.list({ lang: "en" }),
    queryFn: () => CategoryApi.getAllCategoriesEn(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Get single category by ID
export const useCategory = (id: string, lang?: "vi" | "en") => {
  return useQuery({
    queryKey: categoryKeys.detail(id, lang),
    queryFn: () => CategoryApi.getCategory(id, lang),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Get category by name
export const useCategoryByName = (name: string, lang?: "vi" | "en") => {
  return useQuery({
    queryKey: categoryKeys.detail(name, lang),
    queryFn: () => CategoryApi.getCategoryByName(name, lang),
    enabled: !!name,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Search categories
export const useSearchCategories = (search: string, lang?: "vi" | "en") => {
  return useQuery({
    queryKey: categoryKeys.search(search, lang),
    queryFn: () => CategoryApi.searchCategories(search, lang),
    enabled: !!search && search.length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutes for search results
    gcTime: 5 * 60 * 1000,
  });
};

// Search categories in Vietnamese
export const useSearchCategoriesVi = (search: string) => {
  return useQuery({
    queryKey: categoryKeys.search(search, "vi"),
    queryFn: () => CategoryApi.searchCategoriesVi(search),
    enabled: !!search && search.length > 0,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

// Search categories in English
export const useSearchCategoriesEn = (search: string) => {
  return useQuery({
    queryKey: categoryKeys.search(search, "en"),
    queryFn: () => CategoryApi.searchCategoriesEn(search),
    enabled: !!search && search.length > 0,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

// Get categories with product count
export const useCategoriesWithProductCount = (lang?: "vi" | "en") => {
  return useQuery({
    queryKey: categoryKeys.withProductCount(lang),
    queryFn: () => CategoryApi.getCategoriesWithProductCount(lang),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Get categories with product count in Vietnamese
export const useCategoriesWithProductCountVi = () => {
  return useQuery({
    queryKey: categoryKeys.withProductCount("vi"),
    queryFn: () => CategoryApi.getCategoriesWithProductCountVi(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Get categories with product count in English
export const useCategoriesWithProductCountEn = () => {
  return useQuery({
    queryKey: categoryKeys.withProductCount("en"),
    queryFn: () => CategoryApi.getCategoriesWithProductCountEn(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Prefetch functions for better UX
export const prefetchCategory = async (
  queryClient: any,
  id: string,
  lang?: "vi" | "en"
) => {
  await queryClient.prefetchQuery({
    queryKey: categoryKeys.detail(id, lang),
    queryFn: () => CategoryApi.getCategory(id, lang),
    staleTime: 5 * 60 * 1000,
  });
};

export const prefetchCategories = async (
  queryClient: any,
  filters?: CategoryFilters
) => {
  await queryClient.prefetchQuery({
    queryKey: categoryKeys.list(filters || {}),
    queryFn: () => CategoryApi.getCategories(filters),
    staleTime: 5 * 60 * 1000,
  });
};

export const prefetchCategoriesWithProductCount = async (
  queryClient: any,
  lang?: "vi" | "en"
) => {
  await queryClient.prefetchQuery({
    queryKey: categoryKeys.withProductCount(lang),
    queryFn: () => CategoryApi.getCategoriesWithProductCount(lang),
    staleTime: 5 * 60 * 1000,
  });
};
