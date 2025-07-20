import { ApiPaginationResponse, ApiResponse, httpClient } from "@/http";
import {
  Product,
  ProductData,
  ProductError,
  ProductFilters,
  ProductPaginationResponse,
  ProductResponse,
  ProductUpdateData,
  SingleProductResponse,
} from "@/modules/product/";

const BASE_URL = "/api/v1/product";

export class ProductApi {
  /**
   * Get all products with optional filters
   */
  static async getProducts(filters?: ProductFilters): Promise<Product[]> {
    try {
      const params = new URLSearchParams();

      if (filters?.id) params.append("id", filters.id);
      if (filters?.categoryId) params.append("categoryId", filters.categoryId);
      if (filters?.search) params.append("search", filters.search);
      if (filters?.lang) params.append("lang", filters.lang);
      if (filters?.page) params.append("page", filters.page.toString());
      if (filters?.limit) params.append("limit", filters.limit.toString());

      const url = `${BASE_URL}${
        params.toString() ? `?${params.toString()}` : ""
      }`;

      const response = await httpClient.get<Product[]>(url);
      return response.data;
    } catch (error) {
      throw error as ProductError;
    }
  }

  static async getProductsPagination(
    filters?: ProductFilters
  ): Promise<ApiPaginationResponse<Product[]>> {
    try {
      const params = new URLSearchParams();
      if (filters?.id) params.append("id", filters.id);
      if (filters?.categoryId) params.append("categoryId", filters.categoryId);
      if (filters?.search) params.append("search", filters.search);
      if (filters?.lang) params.append("lang", filters.lang);
      if (filters?.page) params.append("page", filters.page.toString());
      if (filters?.limit) params.append("limit", filters.limit.toString());

      const url = `${BASE_URL}?${params.toString()}`;
      const response = await httpClient.get<Product[]>(url);

      return response as ApiPaginationResponse<Product[]>;
    } catch (error) {
      throw error as ProductError;
    }
  }

  /**
   * Get a single product by ID
   */
  static async getProduct(
    id: string,
    lang?: "vi" | "en"
  ): Promise<ApiResponse<SingleProductResponse>> {
    try {
      const params = new URLSearchParams();
      params.append("id", id);
      if (lang) params.append("lang", lang);

      const url = `${BASE_URL}?${params.toString()}`;
      const response = await httpClient.get<SingleProductResponse>(url);
      return response;
    } catch (error) {
      throw error as ProductError;
    }
  }

  /**
   * Get products by category ID
   */
  static async getProductsByCategory(
    categoryId: string,
    lang?: "vi" | "en"
  ): Promise<ApiResponse<Product[]>> {
    try {
      const params = new URLSearchParams();
      params.append("categoryId", categoryId);
      if (lang) params.append("lang", lang);

      const url = `${BASE_URL}?${params.toString()}`;
      const response = await httpClient.get<Product[]>(url);
      return response;
    } catch (error) {
      throw error as ProductError;
    }
  }

  /**
   * Search products
   */
  static async searchProducts(
    search: string,
    lang?: "vi" | "en"
  ): Promise<ApiResponse<ProductResponse>> {
    try {
      const params = new URLSearchParams();
      params.append("search", search);
      if (lang) params.append("lang", lang);

      const url = `${BASE_URL}?${params.toString()}`;
      const response = await httpClient.get<ProductResponse>(url);
      return response;
    } catch (error) {
      throw error as ProductError;
    }
  }

  /**
   * Create a new product
   */
  static async createProduct(
    productData: ProductData,
    lang?: "vi" | "en"
  ): Promise<ApiResponse<SingleProductResponse>> {
    try {
      const params = new URLSearchParams();
      if (lang) params.append("lang", lang);

      const url = `${BASE_URL}${
        params.toString() ? `?${params.toString()}` : ""
      }`;
      const response = await httpClient.post<SingleProductResponse>(
        url,
        productData
      );
      return response;
    } catch (error) {
      throw error as ProductError;
    }
  }

  /**
   * Update an existing product
   */
  static async updateProduct(
    id: string,
    updateData: ProductUpdateData,
    lang?: "vi" | "en"
  ): Promise<ApiResponse<SingleProductResponse>> {
    try {
      const params = new URLSearchParams();
      params.append("id", id);
      if (lang) params.append("lang", lang);

      const url = `${BASE_URL}?${params.toString()}`;
      const response = await httpClient.put<SingleProductResponse>(
        url,
        updateData
      );
      return response;
    } catch (error) {
      throw error as ProductError;
    }
  }

  /**
   * Delete a product
   */
  static async deleteProduct(id: string): Promise<{ success: boolean }> {
    try {
      const params = new URLSearchParams();
      params.append("id", id);

      const url = `${BASE_URL}?${params.toString()}`;
      const response = await httpClient.delete<{ success: boolean }>(url);
      return response.data;
    } catch (error) {
      throw error as ProductError;
    }
  }

  /**
   * Get all products in Vietnamese (default)
   */
  static async getAllProductsVi(): Promise<Product[]> {
    return this.getProducts({ lang: "vi" });
  }

  /**
   * Get all products in English
   */
  static async getAllProductsEn(): Promise<Product[]> {
    return this.getProducts({ lang: "en" });
  }

  /**
   * Get products by category ID in Vietnamese
   */
  static async getProductsByCategoryVi(
    categoryId: string
  ): Promise<ApiResponse<Product[]>> {
    return this.getProductsByCategory(categoryId, "vi");
  }

  /**
   * Get products by category ID in English
   */
  static async getProductsByCategoryEn(
    categoryId: string
  ): Promise<ApiResponse<Product[]>> {
    return this.getProductsByCategory(categoryId, "en");
  }

  /**
   * Search products in Vietnamese
   */
  static async searchProductsVi(
    search: string
  ): Promise<ApiResponse<ProductResponse>> {
    return this.searchProducts(search, "vi");
  }

  /**
   * Search products in English
   */
  static async searchProductsEn(
    search: string
  ): Promise<ApiResponse<ProductResponse>> {
    return this.searchProducts(search, "en");
  }
}

// Export default instance
export default ProductApi;
