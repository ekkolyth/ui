"use client"

import { ThemeProvider as NextThemesProvider, useTheme as useNextThemeInternal } from "next-themes"
import { useEffect, useMemo } from "react"
import type { ThemeProviderProps as NextThemesProviderProps } from "next-themes"

export type SystemTheme = "light" | "dark" | "system" | "normal"
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

interface NextThemeProviderPropsExtended extends Omit<NextThemesProviderProps, "themes" | "defaultTheme"> {
  defaultTheme?: SystemTheme
  lightTheme?: ThemeName | ThemeName[]
  darkTheme?: ThemeName | ThemeName[]
  storageKey?: string
}

export type { NextThemeProviderPropsExtended as NextThemeProviderProps }

const resolveSystemTheme = (systemTheme: SystemTheme | undefined): "light" | "dark" => {
  if (!systemTheme || systemTheme === "system" || systemTheme === "normal") {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    }
    return "light"
  }
  return systemTheme
}

export function NextThemeProvider({
  children,
  defaultTheme = "system",
  lightTheme = ["light"],
  darkTheme = ["dark"],
  storageKey = "ekko-ui",
  ...props
}: React.PropsWithChildren<NextThemeProviderPropsExtended>) {
  // Normalize theme arrays
  const lightThemes = Array.isArray(lightTheme) ? lightTheme : [lightTheme]
  const darkThemes = Array.isArray(darkTheme) ? darkTheme : [darkTheme]

  // Map next-themes defaultTheme (light/dark/system) to our SystemTheme
  const nextThemesDefaultTheme = defaultTheme === "normal" ? "light" : defaultTheme

  return (
    <NextThemesProvider
      {...props}
      defaultTheme={nextThemesDefaultTheme}
      attribute="data-theme"
      enableSystem
    >
      <ThemeMapper
        lightThemes={lightThemes}
        darkThemes={darkThemes}
        storageKey={storageKey}
      >
        {children}
      </ThemeMapper>
    </NextThemesProvider>
  )
}

function ThemeMapper({
  children,
  lightThemes,
  darkThemes,
  storageKey,
}: {
  children: React.ReactNode
  lightThemes: ThemeName[]
  darkThemes: ThemeName[]
  storageKey: string
}) {
  const { theme: nextTheme, setTheme: setNextTheme } = useNextThemeInternal()

  // Get selected themes from localStorage
  const selectedLightTheme = useMemo(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(`${storageKey}.theme-light`) as ThemeName | null
      return stored && lightThemes.includes(stored) ? stored : lightThemes[0]
    }
    return lightThemes[0]
  }, [lightThemes, storageKey])

  const selectedDarkTheme = useMemo(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(`${storageKey}.theme-dark`) as ThemeName | null
      return stored && darkThemes.includes(stored) ? stored : darkThemes[0]
    }
    return darkThemes[0]
  }, [darkThemes, storageKey])

  // Resolve the actual theme name to apply
  const resolvedTheme = useMemo(() => {
    const systemTheme = resolveSystemTheme(nextTheme as SystemTheme | undefined)
    return systemTheme === "light" ? selectedLightTheme : selectedDarkTheme
  }, [nextTheme, selectedLightTheme, selectedDarkTheme])

  // Apply resolved theme to document
  useEffect(() => {
    const root = document.documentElement
    root.setAttribute("data-theme", resolvedTheme)
  }, [resolvedTheme])

  // Listen for system theme changes
  useEffect(() => {
    if (nextTheme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
      const updateTheme = () => {
        const systemTheme = mediaQuery.matches ? "dark" : "light"
        const themeToApply = systemTheme === "light" ? selectedLightTheme : selectedDarkTheme
        document.documentElement.setAttribute("data-theme", themeToApply)
      }
      mediaQuery.addEventListener("change", updateTheme)
      return () => mediaQuery.removeEventListener("change", updateTheme)
    }
  }, [nextTheme, selectedLightTheme, selectedDarkTheme])

  return <>{children}</>
}

export function useNextTheme() {
  return useNextThemeInternal()
}
