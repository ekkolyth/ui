export type ThemeName = 
  | "mocha" 
  | "frappe" 
  | "macchiato" 
  | "latte" 
  | "tokyo-night" 
  | "ekkoos-light" 
  | "ekkoos-dark"
  | "light"  // convergence light
  | "dark"   // convergence dark
  | "convergence"

const LIGHT_THEMES: ThemeName[] = ["light", "latte", "ekkoos-light", "convergence"]
const DARK_THEMES: ThemeName[] = ["dark", "mocha", "frappe", "macchiato", "tokyo-night", "ekkoos-dark", "convergence"]

/**
 * Check if a theme name is a light theme
 */
export function isLightTheme(theme: ThemeName): boolean {
  return LIGHT_THEMES.includes(theme)
}

/**
 * Check if a theme name is a dark theme
 */
export function isDarkTheme(theme: ThemeName): boolean {
  return DARK_THEMES.includes(theme)
}

/**
 * Validate that a theme name is valid
 */
export function isValidThemeName(theme: string): theme is ThemeName {
  const allThemes = new Set<ThemeName>([...LIGHT_THEMES, ...DARK_THEMES])
  return allThemes.has(theme as ThemeName)
}

/**
 * Get all available light themes
 */
export function getLightThemes(): ThemeName[] {
  return [...LIGHT_THEMES]
}

/**
 * Get all available dark themes
 */
export function getDarkThemes(): ThemeName[] {
  return [...DARK_THEMES]
}

/**
 * Default theme mappings for convenience
 */
export const DEFAULT_THEME_MAPPINGS = {
  light: ["light"] as ThemeName[],
  dark: ["dark"] as ThemeName[],
} as const
