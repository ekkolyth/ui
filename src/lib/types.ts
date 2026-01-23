export type SystemTheme = 'light' | 'dark' | 'system' | 'normal';

export const LIGHT_THEMES = [
  'latte',
  'ekkoos-light',
  'convergence-light',
] as const;

export const DARK_THEMES = [
  'mocha',
  'frappe',
  'macchiato',
  'tokyo-night',
  'ekkoos-dark',
  'convergence-dark',
] as const;

export type LightThemes = (typeof LIGHT_THEMES)[number];
export type DarkThemes = (typeof DARK_THEMES)[number];
export type ThemeName = LightThemes | DarkThemes;
