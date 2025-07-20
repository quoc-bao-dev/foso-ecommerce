"use client";

import { useDevice } from "@/hooks/useDevice";

export const DeviceDetector = () => {
  const { isMobile, isTablet, isDesktop, width, height } = useDevice();

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Device Detection Example</h2>

      <div className="space-y-2">
        <p className="text-sm">
          <span className="font-medium">Screen Size:</span> {width} x {height}
        </p>

        <div className="flex gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              isMobile ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            Mobile
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              isTablet ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            Tablet
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              isDesktop
                ? "bg-purple-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            Desktop
          </span>
        </div>
      </div>

      <div className="mt-4 p-3 bg-white rounded border">
        <h3 className="font-medium mb-2">Current Device:</h3>
        {isMobile && <p className="text-blue-600">📱 Mobile Device</p>}
        {isTablet && <p className="text-green-600">📱 Tablet Device</p>}
        {isDesktop && <p className="text-purple-600">💻 Desktop Device</p>}
      </div>
    </div>
  );
};
