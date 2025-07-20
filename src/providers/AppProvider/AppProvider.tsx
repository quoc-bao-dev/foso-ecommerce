import { LanguageProvider } from "@/contexts";
import { QueryProvider } from "../QueryProvider";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </QueryProvider>
  );
};

export default AppProvider;
