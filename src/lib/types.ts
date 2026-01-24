export type SystemTheme = 'light' | 'dark' | 'system' | 'normal';

export const LIGHT_THEMES = [
  'latte',
  'ekkoos-light',
  'ekkolyth-light',
  'ekko-playlist-light',
] as const;

export const DARK_THEMES = [
  'mocha',
  'frappe',
  'macchiato',
  'tokyo-night',
  'ekkoos-dark',
  'ekkolyth-dark',
  'ekko-playlist-dark',
] as const;

export type LightThemes = (typeof LIGHT_THEMES)[number];
export type DarkThemes = (typeof DARK_THEMES)[number];
export type ThemeName = LightThemes | DarkThemes;
