import { ProductData, ProductUpdateData } from "@/modules/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ProductApi from "./api";
import { productKeys } from "./queries";

// Create product mutation
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productData,
      lang,
    }: {
      productData: ProductData;
      lang?: "vi" | "en";
    }) => ProductApi.createProduct(productData, lang),
    onSuccess: () => {
      // Invalidate and refetch products list
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
    onError: (error) => {
      console.error("Failed to create product:", error);
    },
  });
};

// Update product mutation
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      updateData,
      lang,
    }: {
      id: string;
      updateData: ProductUpdateData;
      lang?: "vi" | "en";
    }) => ProductApi.updateProduct(id, updateData, lang),
    onSuccess: (data, variables) => {
      // Update the specific product in cache
      queryClient.setQueryData(
        productKeys.detail(variables.id, variables.lang),
        data
      );
      // Invalidate products list
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
    onError: (error) => {
      console.error("Failed to update product:", error);
    },
  });
};

// Delete product mutation
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ProductApi.deleteProduct(id),
    onSuccess: (_, deletedId) => {
      // Remove the product from cache
      queryClient.removeQueries({ queryKey: productKeys.detail(deletedId) });
      // Invalidate products list
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
    onError: (error) => {
      console.error("Failed to delete product:", error);
    },
  });
};

// Optimistic update for product
export const useOptimisticUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      updateData,
      lang,
    }: {
      id: string;
      updateData: ProductUpdateData;
      lang?: "vi" | "en";
    }) => ProductApi.updateProduct(id, updateData, lang),
    onMutate: async ({ id, updateData, lang }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: productKeys.detail(id, lang),
      });

      // Snapshot the previous value
      const previousProduct = queryClient.getQueryData(
        productKeys.detail(id, lang)
      );

      // Optimistically update to the new value
      queryClient.setQueryData(productKeys.detail(id, lang), (old: any) => ({
        ...old,
        data: {
          ...old?.data,
          ...updateData,
        },
      }));

      // Return a context object with the snapshotted value
      return { previousProduct };
    },
    onError: (err, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousProduct) {
        queryClient.setQueryData(
          productKeys.detail(variables.id, variables.lang),
          context.previousProduct
        );
      }
    },
    onSettled: (data, error, variables) => {
      // Always refetch after error or success
      queryClient.invalidateQueries({
        queryKey: productKeys.detail(variables.id, variables.lang),
      });
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });
};

// Bulk operations
export const useBulkDeleteProducts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ids: string[]) => {
      const results = await Promise.allSettled(
        ids.map((id) => ProductApi.deleteProduct(id))
      );

      const successful = results
        .map((result, index) => ({ result, id: ids[index] }))
        .filter(({ result }) => result.status === "fulfilled");

      const failed = results
        .map((result, index) => ({ result, id: ids[index] }))
        .filter(({ result }) => result.status === "rejected");

      return { successful, failed };
    },
    onSuccess: (data) => {
      // Remove deleted products from cache
      data.successful.forEach(({ id }) => {
        queryClient.removeQueries({ queryKey: productKeys.detail(id) });
      });
      // Invalidate products list
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
    onError: (error) => {
      console.error("Failed to bulk delete products:", error);
    },
  });
};

// Utility functions for mutations
export const productMutations = {
  create: useCreateProduct,
  update: useUpdateProduct,
  delete: useDeleteProduct,
  optimisticUpdate: useOptimisticUpdateProduct,
  bulkDelete: useBulkDeleteProducts,
};
