"use client"

import { createContext, use, useEffect, useMemo, useState } from "react"
import { ScriptOnce } from "@tanstack/react-router"

export type ResolvedTheme = "dark" | "light"
export type Theme = ResolvedTheme | "system"

interface TanstackThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

interface TanstackThemeProviderState {
  theme: Theme
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
}

const initialState: TanstackThemeProviderState = {
  theme: "system",
  resolvedTheme: "light",
  setTheme: () => null,
}

const TanstackThemeProviderContext = createContext<TanstackThemeProviderState>(initialState)

const isBrowser = typeof window !== "undefined"

function FunctionOnce<T = unknown>({
  children,
  param,
}: {
  children: (param: T) => unknown
  param?: T
}) {
  return <ScriptOnce>{`(${children.toString()})(${JSON.stringify(param)})`}</ScriptOnce>
}

export function TanstackThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "ekko-ui.theme",
}: TanstackThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(
    () => (isBrowser ? (localStorage.getItem(storageKey) as Theme) : defaultTheme) || defaultTheme,
  )
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("light")

  useEffect(() => {
    const root = window.document.documentElement
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    function updateTheme() {
      root.classList.remove("light", "dark")

      if (theme === "system") {
        const systemTheme = mediaQuery.matches ? "dark" : "light"
        setResolvedTheme(systemTheme)
        root.classList.add(systemTheme)
        return
      }

      setResolvedTheme(theme as ResolvedTheme)
      root.classList.add(theme)
    }

    mediaQuery.addEventListener("change", updateTheme)
    updateTheme()

    return () => mediaQuery.removeEventListener("change", updateTheme)
  }, [theme])

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme: (newTheme: Theme) => {
        localStorage.setItem(storageKey, newTheme)
        setThemeState(newTheme)
      },
    }),
    [theme, resolvedTheme, storageKey],
  )

  return (
    <TanstackThemeProviderContext.Provider value={value}>
      <FunctionOnce param={storageKey}>
        {(storageKey) => {
          const theme: string | null = localStorage.getItem(storageKey)

          if (
            theme === "dark" ||
            ((theme === null || theme === "system") &&
              window.matchMedia("(prefers-color-scheme: dark)").matches)
          ) {
            document.documentElement.classList.add("dark")
          }
        }}
      </FunctionOnce>
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
