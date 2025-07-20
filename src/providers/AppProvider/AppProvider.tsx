import { QueryProvider } from "../QueryProvider";
import { Toast } from "@/components/common";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      {children}
      <Toast />
    </QueryProvider>
  );
};

export default AppProvider;
