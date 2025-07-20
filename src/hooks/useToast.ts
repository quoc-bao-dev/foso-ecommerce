import toast from "react-hot-toast";
import { useI18n } from "./useI18n";

export const useToast = () => {
  const { t } = useI18n();

  const showSuccess = (message?: string) => {
    toast.success(message || t("toast.success"));
  };

  const showError = (message?: string) => {
    toast.error(message || t("toast.error"));
  };

  const showLoading = (message?: string) => {
    return toast.loading(message || t("toast.loading"));
  };

  const showInfo = (message: string) => {
    toast(message, {});
  };

  const dismiss = (toastId?: string) => {
    if (toastId) {
      toast.dismiss(toastId);
    } else {
      toast.dismiss();
    }
  };

  const showCartSuccess = (productName: string) => {
    toast.success(t("toast.addedToCart"), {
      duration: 2000,
    });
  };

  const showCartError = (productName: string) => {
    toast.error(t("toast.addToCartError"), {
      duration: 3000,
    });
  };

  return {
    showSuccess,
    showError,
    showLoading,
    showInfo,
    dismiss,
    showCartSuccess,
    showCartError,
  };
};
