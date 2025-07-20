import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

// Environment variables for API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "/";
const API_TIMEOUT = parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || "10000");

// Custom error interface
export interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: any;
}

// Response wrapper interface
export interface ApiResponse<T = any> {
  data: T;
  success: boolean;
  message?: string;
}

export interface ApiPaginationResponse<T = any> {
  data: T;
  success: boolean;
  message?: string;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// Request configuration interface
export interface RequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
  retry?: boolean;
}

// Extended request config for internal use
interface InternalRequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
  retry?: boolean;
}

class HttpClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: API_BASE_URL,
      timeout: API_TIMEOUT,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        // Add authentication token if available
        const internalConfig = config as InternalRequestConfig;
        if (!internalConfig.skipAuth) {
          const token = this.getAuthToken();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }

        // Add request ID for tracking
        config.headers["X-Request-ID"] = this.generateRequestId();

        console.log(
          `🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`
        );
        return config;
      },
      (error) => {
        console.error("❌ Request Error:", error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log(
          `✅ API Response: ${response.status} ${response.config.url}`
        );
        return response;
      },
      (error: AxiosError) => {
        this.handleResponseError(error);
        return Promise.reject(this.formatError(error));
      }
    );
  }

  private getAuthToken(): string | null {
    // Get token from localStorage (client-side) or cookies
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("auth_token") ||
        sessionStorage.getItem("auth_token")
      );
    }
    return null;
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private handleResponseError(error: AxiosError): void {
    const status = error.response?.status;
    const message = (error.response?.data as any)?.message || error.message;

    switch (status) {
      case 401:
        // Handle unauthorized - redirect to login
        this.handleUnauthorized();
        break;
      case 403:
        // Handle forbidden
        console.error("❌ Access forbidden:", message);
        break;
      case 404:
        // Handle not found
        console.error("❌ Resource not found:", message);
        break;
      case 422:
        // Handle validation errors
        console.error("❌ Validation error:", message);
        break;
      case 500:
        // Handle server error
        console.error("❌ Server error:", message);
        break;
      default:
        console.error("❌ API Error:", message);
    }
  }

  private handleUnauthorized(): void {
    // Clear auth tokens
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
      sessionStorage.removeItem("auth_token");

      // Redirect to login page
      window.location.href = "/auth/login";
    }
  }

  private formatError(error: AxiosError): ApiError {
    const status = error.response?.status || 0;
    const message =
      (error.response?.data as any)?.message ||
      error.message ||
      "An error occurred";
    const code = (error.response?.data as any)?.code || error.code;

    return {
      message,
      status,
      code,
      details: error.response?.data,
    };
  }

  // HTTP Methods
  async get<T = any>(
    url: string,
    config?: RequestConfig
  ): Promise<ApiResponse<T> | ApiPaginationResponse<T>> {
    try {
      const response = await this.instance.get<ApiResponse<T>>(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async post<T = any>(
    url: string,
    data?: any,
    config?: RequestConfig
  ): Promise<ApiResponse<T> | ApiPaginationResponse<T>> {
    try {
      const response = await this.instance.post<ApiResponse<T>>(
        url,
        data,
        config
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async put<T = any>(
    url: string,
    data?: any,
    config?: RequestConfig
  ): Promise<ApiResponse<T> | ApiPaginationResponse<T>> {
    try {
      const response = await this.instance.put<ApiResponse<T>>(
        url,
        data,
        config
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async patch<T = any>(
    url: string,
    data?: any,
    config?: RequestConfig
  ): Promise<ApiResponse<T> | ApiPaginationResponse<T>> {
    try {
      const response = await this.instance.patch<ApiResponse<T>>(
        url,
        data,
        config
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async delete<T = any>(
    url: string,
    config?: RequestConfig
  ): Promise<ApiResponse<T> | ApiPaginationResponse<T>> {
    try {
      const response = await this.instance.delete<ApiResponse<T>>(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // File upload method
  async upload<T = any>(
    url: string,
    file: File,
    config?: RequestConfig
  ): Promise<ApiResponse<T> | ApiPaginationResponse<T>> {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await this.instance.post<ApiResponse<T>>(url, formData, {
        ...config,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Set auth token
  setAuthToken(token: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", token);
    }
  }

  // Clear auth token
  clearAuthToken(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
      sessionStorage.removeItem("auth_token");
    }
  }

  // Get raw axios instance for advanced usage
  getInstance(): AxiosInstance {
    return this.instance;
  }
}

// Create and export singleton instance
export const httpClient = new HttpClient();

// Export types for external use
export type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError };

// Default export
export default httpClient;
