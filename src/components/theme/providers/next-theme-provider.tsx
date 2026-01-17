"use client"

import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme, type ThemeProviderProps } from "next-themes"

export type { ThemeProviderProps as NextThemeProviderProps }

export function NextThemeProvider({
  children,
  ...props
}: React.PropsWithChildren<ThemeProviderProps>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export { useNextTheme }
