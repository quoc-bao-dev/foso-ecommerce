import { useEffect, useState } from "react";

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

const isClient = () => typeof window !== "undefined";

export const useDevice = (): DeviceState => {
  const [deviceState, setDeviceState] = useState<DeviceState>({
    isMobile: isClient() ? window.innerWidth < BREAKPOINTS.mobile : false,
    isTablet:
      isClient() &&
      window.innerWidth >= BREAKPOINTS.mobile &&
      window.innerWidth < BREAKPOINTS.tablet,
    isDesktop: isClient() ? window.innerWidth >= BREAKPOINTS.tablet : true,
    width: isClient() ? window.innerWidth : 0,
    height: isClient() ? window.innerHeight : 0,
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

    updateDeviceState();

    window.addEventListener("resize", updateDeviceState);

    return () => {
      window.removeEventListener("resize", updateDeviceState);
    };
  }, []);

  return deviceState;
};

// Export breakpoints for external use
export { BREAKPOINTS };
