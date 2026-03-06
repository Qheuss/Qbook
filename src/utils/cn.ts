/**
 * Utility function to conditionally join classNames together
 */
export function cn(
  ...classes: (string | boolean | undefined | null)[]
): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Returns theme-specific text color classes
 */
export function getTextColor(
  theme: 'light' | 'dark',
  variant: 'primary' | 'secondary' = 'primary',
): string {
  if (variant === 'primary') {
    return theme === 'dark' ? 'text-fontDark' : 'text-fontLight';
  }
  return theme === 'dark' ? 'text-fontDarker' : 'text-fontLighter';
}

/**
 * Returns theme-specific background color classes
 */
export function getBgColor(
  theme: 'light' | 'dark',
  variant: 'header' | 'search' | 'comments' = 'header',
): string {
  const variants = {
    header: theme === 'dark' ? 'bg-headerDark' : 'bg-headerLight',
    search: theme === 'dark' ? 'bg-searchDark' : 'bg-searchLight',
    comments: theme === 'dark' ? 'bg-headerDark' : 'bg-commentsLight',
  };
  return variants[variant];
}

/**
 * Returns theme-specific hover background classes
 */
export function getHoverBg(theme: 'light' | 'dark'): string {
  return theme === 'dark' ? 'hover:bg-iconsDark' : 'hover:bg-iconsLight';
}

/**
 * Returns theme-specific button hover background classes
 */
export function getButtonHoverBg(theme: 'light' | 'dark'): string {
  return theme === 'dark'
    ? 'hover:bg-buttonHoverDark'
    : 'hover:bg-buttonHoverLight';
}

/**
 * Returns theme-specific border color classes
 */
export function getBorderColor(theme: 'light' | 'dark'): string {
  return theme === 'dark' ? 'border-iconsDark' : 'border-iconsLight';
}

/**
 * Returns theme-specific divider border color classes
 */
export function getDividerBorder(theme: 'light' | 'dark'): string {
  return theme === 'dark' ? 'border-[#ffffff13]' : 'border-[#e2e2e2]';
}
