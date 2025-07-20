"use client";

import {
  IoDocumentText,
  IoLogOut,
  IoPerson,
  IoPersonCircle,
} from "react-icons/io5";
import { useAuth } from "../../store/useAuth";
import { useI18n } from "@/hooks";
import { AppLoading } from "@/components/common";

// Mock user data - thay thế bằng context hoặc state management thực tế

const UserMenu = () => {
  const { user, isLoading, login, logout } = useAuth();
  const { t } = useI18n();

  const handleLogin = () => {
    login("user@example.com", "password");
  };

  return (
    <>
      <div className="w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
        {user ? (
          // Logged in user menu
          <div className="p-4">
            {/* User Info */}
            <div className="flex items-center gap-3 pb-3 border-b border-gray-200 mb-3">
              <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <IoPersonCircle className="text-2xl text-brand-500" />
                )}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>

            {/* Menu Items */}
            <div className="space-y-1">
              <button className="w-full flex items-center gap-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <IoPerson className="text-lg" />
                <span>{t("auth.personalInfo")}</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <IoDocumentText className="text-lg" />
                <span>{t("auth.myOrders")}</span>
              </button>
              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-3 py-2 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <IoLogOut className="text-lg" />
                <span>{t("auth.logout")}</span>
              </button>
            </div>
          </div>
        ) : (
          // Not logged in menu
          <div className="p-4">
            <p className="text-gray-600 text-sm mb-4">
              {t("auth.loginToViewPersonalInfoAndOrders")}
            </p>
            <button
              onClick={handleLogin}
              className="w-full bg-brand-500 text-white py-2 px-4 rounded-lg hover:bg-brand-600 transition-colors font-medium"
            >
              {t("auth.login")}
            </button>
          </div>
        )}
      </div>
      {isLoading && <AppLoading />}
    </>
  );
};

export default UserMenu;
