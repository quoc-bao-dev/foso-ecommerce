import { ApiResponse, httpClient } from "@/http";
import {
  Category,
  CategoryData,
  CategoryError,
  CategoryFilters,
  CategoryResponse,
  CategoryUpdateData,
  SingleCategoryResponse,
} from "@/modules/category";

const BASE_URL = "/api/v1/category";

export class CategoryApi {
  /**
   * Get all categories with optional filters
   */
  static async getCategories(filters?: CategoryFilters): Promise<Category[]> {
    try {
      const params = new URLSearchParams();

      if (filters?.id) params.append("id", filters.id);
      if (filters?.search) params.append("search", filters.search);
      if (filters?.lang) params.append("lang", filters.lang);
      if (filters?.page) params.append("page", filters.page.toString());
      if (filters?.limit) params.append("limit", filters.limit.toString());

      const url = `${BASE_URL}${
        params.toString() ? `?${params.toString()}` : ""
      }`;
      const response = await httpClient.get<Category[]>(url);
      return response.data;
    } catch (error) {
      throw error as CategoryError;
    }
  }

  /**
   * Get a single category by ID
   */
  static async getCategory(
    id: string,
    lang?: "vi" | "en"
  ): Promise<ApiResponse<SingleCategoryResponse>> {
    try {
      const params = new URLSearchParams();
      params.append("id", id);
      if (lang) params.append("lang", lang);

      const url = `${BASE_URL}?${params.toString()}`;
      const response = await httpClient.get<SingleCategoryResponse>(url);
      return response;
    } catch (error) {
      throw error as CategoryError;
    }
  }

  /**
   * Search categories
   */
  static async searchCategories(
    search: string,
    lang?: "vi" | "en"
  ): Promise<ApiResponse<CategoryResponse>> {
    try {
      const params = new URLSearchParams();
      params.append("search", search);
      if (lang) params.append("lang", lang);

      const url = `${BASE_URL}?${params.toString()}`;
      const response = await httpClient.get<CategoryResponse>(url);
      return response;
    } catch (error) {
      throw error as CategoryError;
    }
  }

  /**
   * Create a new category
   */
  static async createCategory(
    categoryData: CategoryData,
    lang?: "vi" | "en"
  ): Promise<ApiResponse<SingleCategoryResponse>> {
    try {
      const params = new URLSearchParams();
      if (lang) params.append("lang", lang);

      const url = `${BASE_URL}${
        params.toString() ? `?${params.toString()}` : ""
      }`;
      const response = await httpClient.post<SingleCategoryResponse>(
        url,
        categoryData
      );
      return response;
    } catch (error) {
      throw error as CategoryError;
    }
  }

  /**
   * Update an existing category
   */
  static async updateCategory(
    id: string,
    updateData: CategoryUpdateData,
    lang?: "vi" | "en"
  ): Promise<ApiResponse<SingleCategoryResponse>> {
    try {
      const params = new URLSearchParams();
      params.append("id", id);
      if (lang) params.append("lang", lang);

      const url = `${BASE_URL}?${params.toString()}`;
      const response = await httpClient.put<SingleCategoryResponse>(
        url,
        updateData
      );
      return response;
    } catch (error) {
      throw error as CategoryError;
    }
  }

  /**
   * Delete a category
   */
  static async deleteCategory(id: string): Promise<{ success: boolean }> {
    try {
      const params = new URLSearchParams();
      params.append("id", id);

      const url = `${BASE_URL}?${params.toString()}`;
      const response = await httpClient.delete<{ success: boolean }>(url);
      return response.data;
    } catch (error) {
      throw error as CategoryError;
    }
  }

  /**
   * Get category by name (localized)
   */
  static async getCategoryByName(
    name: string,
    lang?: "vi" | "en"
  ): Promise<ApiResponse<SingleCategoryResponse>> {
    try {
      const params = new URLSearchParams();
      params.append("name", name);
      if (lang) params.append("lang", lang);

      const url = `${BASE_URL}?${params.toString()}`;
      const response = await httpClient.get<SingleCategoryResponse>(url);
      return response;
    } catch (error) {
      throw error as CategoryError;
    }
  }

  /**
   * Get categories with product count
   */
  static async getCategoriesWithProductCount(
    lang?: "vi" | "en"
  ): Promise<ApiResponse<CategoryResponse>> {
    try {
      const params = new URLSearchParams();
      params.append("withProductCount", "true");
      if (lang) params.append("lang", lang);

      const url = `${BASE_URL}?${params.toString()}`;
      const response = await httpClient.get<CategoryResponse>(url);
      return response;
    } catch (error) {
      throw error as CategoryError;
    }
  }

  /**
   * Get all categories in Vietnamese (default)
   */
  static async getAllCategoriesVi(): Promise<Category[]> {
    return this.getCategories({ lang: "vi" });
  }

  /**
   * Get all categories in English
   */
  static async getAllCategoriesEn(): Promise<Category[]> {
    return this.getCategories({ lang: "en" });
  }

  /**
   * Get category by ID in Vietnamese
   */
  static async getCategoryVi(
    id: string
  ): Promise<ApiResponse<SingleCategoryResponse>> {
    return this.getCategory(id, "vi");
  }

  /**
   * Get category by ID in English
   */
  static async getCategoryEn(
    id: string
  ): Promise<ApiResponse<SingleCategoryResponse>> {
    return this.getCategory(id, "en");
  }

  /**
   * Search categories in Vietnamese
   */
  static async searchCategoriesVi(
    search: string
  ): Promise<ApiResponse<CategoryResponse>> {
    return this.searchCategories(search, "vi");
  }

  /**
   * Search categories in English
   */
  static async searchCategoriesEn(
    search: string
  ): Promise<ApiResponse<CategoryResponse>> {
    return this.searchCategories(search, "en");
  }

  /**
   * Get categories with product count in Vietnamese
   */
  static async getCategoriesWithProductCountVi(): Promise<
    ApiResponse<CategoryResponse>
  > {
    return this.getCategoriesWithProductCount("vi");
  }

  /**
   * Get categories with product count in English
   */
  static async getCategoriesWithProductCountEn(): Promise<
    ApiResponse<CategoryResponse>
  > {
    return this.getCategoriesWithProductCount("en");
  }
}

// Export default instance
export default CategoryApi;
