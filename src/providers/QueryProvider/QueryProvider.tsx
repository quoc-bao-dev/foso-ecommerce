"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Thời gian dữ liệu được coi là "fresh" (5 phút)
            staleTime: 5 * 60 * 1000,
            // Thời gian cache được giữ trong bộ nhớ (10 phút)
            gcTime: 10 * 60 * 1000,
            // Số lần retry khi request thất bại
            retry: 3,
            // Thời gian delay giữa các lần retry
            retryDelay: (attemptIndex) =>
              Math.min(1000 * 2 ** attemptIndex, 30000),
            // Tự động refetch khi window được focus
            refetchOnWindowFocus: false,
            // Tự động refetch khi reconnect
            refetchOnReconnect: true,
          },
          mutations: {
            // Số lần retry cho mutations
            retry: 1,
            // Thời gian delay giữa các lần retry
            retryDelay: 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* React Query Devtools - chỉ hiển thị trong development */}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
};

export default QueryProvider;
