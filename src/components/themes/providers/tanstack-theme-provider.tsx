"use client"

import { createContext, use, useEffect, useMemo, useState } from "react"

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

interface TanstackThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: SystemTheme
  lightTheme?: ThemeName | ThemeName[]
  darkTheme?: ThemeName | ThemeName[]
  storageKey?: string
}

interface TanstackThemeProviderState {
  systemTheme: SystemTheme
  resolvedTheme: ThemeName
  availableThemes: {
    light: ThemeName[]
    dark: ThemeName[]
  }
  setSystemTheme: (theme: SystemTheme) => void
  setSpecificTheme: (mode: "light" | "dark", theme: ThemeName) => void
}

const initialState: TanstackThemeProviderState = {
  systemTheme: "system",
  resolvedTheme: "light",
  availableThemes: {
    light: ["light"],
    dark: ["dark"],
  },
  setSystemTheme: () => null,
  setSpecificTheme: () => null,
}

const TanstackThemeProviderContext = createContext<TanstackThemeProviderState>(initialState)

const resolveSystemTheme = (systemTheme: SystemTheme): "light" | "dark" => {
  if (systemTheme === "system" || systemTheme === "normal") {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    }
    return "light"
  }
  return systemTheme
}

export function TanstackThemeProvider({
  children,
  defaultTheme = "system",
  lightTheme = ["light"],
  darkTheme = ["dark"],
  storageKey = "ekko-ui",
}: TanstackThemeProviderProps) {
  // Normalize theme arrays
  const lightThemes = Array.isArray(lightTheme) ? lightTheme : [lightTheme]
  const darkThemes = Array.isArray(darkTheme) ? darkTheme : [darkTheme]

  // Initialize state from localStorage
  const [systemTheme, setSystemThemeState] = useState<SystemTheme>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(`${storageKey}.theme-mode`) as SystemTheme | null
      return stored || defaultTheme
    }
    return defaultTheme
  })

  const [selectedLightTheme, setSelectedLightThemeState] = useState<ThemeName>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(`${storageKey}.theme-light`) as ThemeName | null
      return stored && lightThemes.includes(stored) ? stored : lightThemes[0]
    }
    return lightThemes[0]
  })

  const [selectedDarkTheme, setSelectedDarkThemeState] = useState<ThemeName>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(`${storageKey}.theme-dark`) as ThemeName | null
      return stored && darkThemes.includes(stored) ? stored : darkThemes[0]
    }
    return darkThemes[0]
  })

  // Resolve the actual theme name to apply
  const resolvedTheme = useMemo(() => {
    const resolvedSystem = resolveSystemTheme(systemTheme)
    return resolvedSystem === "light" ? selectedLightTheme : selectedDarkTheme
  }, [systemTheme, selectedLightTheme, selectedDarkTheme])

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const updateTheme = () => {
      const resolvedSystem = resolveSystemTheme(systemTheme)
      const themeToApply = resolvedSystem === "light" ? selectedLightTheme : selectedDarkTheme
      root.setAttribute("data-theme", themeToApply)
    }

    updateTheme()
    
    if (systemTheme === "system" || systemTheme === "normal") {
      mediaQuery.addEventListener("change", updateTheme)
      return () => mediaQuery.removeEventListener("change", updateTheme)
    }
  }, [systemTheme, selectedLightTheme, selectedDarkTheme])

  const value = useMemo(
    () => ({
      systemTheme,
      resolvedTheme,
      availableThemes: {
        light: lightThemes,
        dark: darkThemes,
      },
      setSystemTheme: (newTheme: SystemTheme) => {
        if (typeof window !== "undefined") {
          localStorage.setItem(`${storageKey}.theme-mode`, newTheme)
        }
        setSystemThemeState(newTheme)
      },
      setSpecificTheme: (mode: "light" | "dark", theme: ThemeName) => {
        if (typeof window !== "undefined") {
          const key = mode === "light" ? `${storageKey}.theme-light` : `${storageKey}.theme-dark`
          localStorage.setItem(key, theme)
        }
        if (mode === "light") {
          setSelectedLightThemeState(theme)
        } else {
          setSelectedDarkThemeState(theme)
        }
      },
    }),
    [systemTheme, resolvedTheme, lightThemes, darkThemes, storageKey],
  )

  return (
    <TanstackThemeProviderContext.Provider value={value}>
      {children}
    </TanstackThemeProviderContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTanstackTheme() {
  const context = use(TanstackThemeProviderContext)
  if (context === undefined) {
    throw new Error("useTanstackTheme must be used within a TanstackThemeProvider")
  }
  return context
}
