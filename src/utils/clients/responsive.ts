export type ResponsiveClasses = {
  mobile?: string;
  tablet?: string;
  desktop?: string;
};

/**
 * Utility function to apply responsive classes based on device type
 * @param classes - Object with mobile, tablet, desktop classes
 * @param isMobile - Boolean indicating if device is mobile
 * @param isTablet - Boolean indicating if device is tablet
 * @returns Combined className string
 */
export function responsiveClass(
  classes: ResponsiveClasses,
  isMobile: boolean,
  isTablet: boolean
): string {
  if (isMobile && classes.mobile) {
    return classes.mobile;
  }
  if (isTablet && classes.tablet) {
    return classes.tablet;
  }
  return classes.desktop || "";
}

/**
 * Utility function to conditionally show/hide elements based on device type
 * @param isMobile - Boolean indicating if device is mobile
 * @param isTablet - Boolean indicating if device is tablet
 * @param showOnMobile - Whether to show on mobile
 * @param showOnTablet - Whether to show on tablet
 * @param showOnDesktop - Whether to show on desktop
 * @returns 'hidden' class if element should be hidden
 */
export function responsiveVisibility(
  isMobile: boolean,
  isTablet: boolean,
  showOnMobile: boolean = true,
  showOnTablet: boolean = true,
  showOnDesktop: boolean = true
): string {
  if (isMobile && !showOnMobile) return "hidden";
  if (isTablet && !showOnTablet) return "hidden";
  if (!isMobile && !isTablet && !showOnDesktop) return "hidden";
  return "";
}
