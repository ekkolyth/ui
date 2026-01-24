import {
  LIGHT_THEMES,
  DARK_THEMES,
  type ThemeName,
  type LightThemes,
  type DarkThemes,
} from './types';

/**
 * Check if a theme name is a light theme
 */
export function isLightTheme(theme: ThemeName): theme is LightThemes {
  return (LIGHT_THEMES as readonly string[]).includes(theme);
}

/**
 * Check if a theme name is a dark theme
 */
export function isDarkTheme(theme: ThemeName): theme is DarkThemes {
  return (DARK_THEMES as readonly string[]).includes(theme);
}

/**
 * Validate that a theme name is valid
 */
export function isValidThemeName(theme: string): theme is ThemeName {
  const allThemes = new Set<ThemeName>([...LIGHT_THEMES, ...DARK_THEMES]);
  return allThemes.has(theme as ThemeName);
}

/**
 * Get all available light themes
 */
export function getLightThemes(): LightThemes[] {
  return [...LIGHT_THEMES];
}

/**
 * Get all available dark themes
 */
export function getDarkThemes(): DarkThemes[] {
  return [...DARK_THEMES];
}

/**
 * Default theme mappings for convenience
 */
export const DEFAULT_THEME_MAPPINGS = {
  light: ['ekkolyth-light'] as LightThemes[],
  dark: ['ekkolyth-dark'] as DarkThemes[],
} as const;
