import { useState, useEffect } from "react";

interface DeviceState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
  height: number;
}

// Breakpoint definitions
const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
} as const;

export const useDevice = (): DeviceState => {
  const [deviceState, setDeviceState] = useState<DeviceState>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // Function to update device state
    const updateDeviceState = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      const isMobile = width < BREAKPOINTS.mobile;
      const isTablet =
        width >= BREAKPOINTS.mobile && width < BREAKPOINTS.tablet;
      const isDesktop = width >= BREAKPOINTS.tablet;

      setDeviceState({
        isMobile,
        isTablet,
        isDesktop,
        width,
        height,
      });
    };

    // Set initial state
    updateDeviceState();

    // Add event listener for window resize
    window.addEventListener("resize", updateDeviceState);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", updateDeviceState);
    };
  }, []);

  return deviceState;
};

// Export breakpoints for external use
export { BREAKPOINTS };
