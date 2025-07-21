"use client";

import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

interface AutoPopupModalProps {
  title?: string;
  content?: React.ReactNode;
  onClose?: () => void;
  delay?: number; // Delay in milliseconds
  showCloseButton?: boolean;
  className?: string;
}

const AutoPopup: React.FC<AutoPopupModalProps> = ({
  title = "Chào mừng bạn!",
  content = "Đây là modal tự động nổi bật sau 3 giây.",
  onClose,
  delay = 3000,
  showCloseButton = true,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setIsAnimating(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={`relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 ${
          isAnimating
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-95 opacity-0 translate-y-4"
        } ${className}`}
      >
        {/* Close button */}
        {showCloseButton && (
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 z-10"
            aria-label="Close modal"
          >
            <IoClose className="w-5 h-5 text-gray-500" />
          </button>
        )}

        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          <div className="text-gray-600 leading-relaxed whitespace-pre-line">
            {content}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <button
            onClick={handleClose}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default AutoPopup;
