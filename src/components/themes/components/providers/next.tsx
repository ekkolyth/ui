'use client';

import {
  ThemeProvider as NextThemesProvider,
  useTheme as useNextThemeInternal,
} from 'next-themes';
import { createContext, use, useEffect, useMemo, useState } from 'react';
import type { ThemeProviderProps as NextThemesProviderProps } from 'next-themes';

export type {
  SystemTheme,
  ThemeName,
  LightThemes,
  DarkThemes,
} from '@/lib/types';

import type {
  SystemTheme,
  ThemeName,
  LightThemes,
  DarkThemes,
} from '@/lib/types';

interface NextThemeProviderPropsExtended extends Omit<
  NextThemesProviderProps,
  'themes' | 'defaultTheme'
> {
  defaultTheme?: SystemTheme;
  lightTheme?: LightThemes | LightThemes[];
  darkTheme?: DarkThemes | DarkThemes[];
  storageKey?: string;
}

export type { NextThemeProviderPropsExtended as NextThemeProviderProps };

interface NextThemeProviderState {
  systemTheme: SystemTheme;
  resolvedTheme: ThemeName;
  availableThemes: {
    light: LightThemes[];
    dark: DarkThemes[];
  };
  setSystemTheme: (theme: SystemTheme) => void;
  setSpecificTheme: (
    mode: 'light' | 'dark',
    theme: LightThemes | DarkThemes,
  ) => void;
}

const initialState: NextThemeProviderState = {
  systemTheme: 'system',
  resolvedTheme: 'ekkolyth-light',
  availableThemes: {
    light: ['ekkolyth-light'],
    dark: ['ekkolyth-dark'],
  },
  setSystemTheme: () => null,
  setSpecificTheme: () => null,
};

const NextThemeProviderContext =
  createContext<NextThemeProviderState>(initialState);

const resolveSystemTheme = (systemTheme: SystemTheme): 'light' | 'dark' => {
  if (systemTheme === 'system' || systemTheme === 'normal') {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    return 'light';
  }
  return systemTheme;
};

export function NextThemeProvider({
  children,
  defaultTheme = 'system',
  lightTheme = ['ekkolyth-light'],
  darkTheme = ['ekkolyth-dark'],
  storageKey = 'ekko-ui',
  ...props
}: React.PropsWithChildren<NextThemeProviderPropsExtended>) {
  // Normalize theme arrays
  const lightThemes = Array.isArray(lightTheme) ? lightTheme : [lightTheme];
  const darkThemes = Array.isArray(darkTheme) ? darkTheme : [darkTheme];

  // Map next-themes defaultTheme (light/dark/system) to our SystemTheme
  const nextThemesDefaultTheme =
    defaultTheme === 'normal' ? 'light' : defaultTheme;

  return (
    <NextThemesProvider
      {...props}
      defaultTheme={nextThemesDefaultTheme}
      attribute='data-theme'
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
  );
}

function ThemeMapper({
  children,
  lightThemes,
  darkThemes,
  storageKey,
}: {
  children: React.ReactNode;
  lightThemes: LightThemes[];
  darkThemes: DarkThemes[];
  storageKey: string;
}) {
  const { theme: nextTheme, setTheme: setNextTheme } = useNextThemeInternal();

  // Initialize state from localStorage (same pattern as TanStack)
  const [systemTheme, setSystemThemeState] = useState<SystemTheme>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(
        `${storageKey}.theme-mode`,
      ) as SystemTheme | null;
      return stored || 'system';
    }
    return 'system';
  });

  const [selectedLightTheme, setSelectedLightThemeState] =
    useState<LightThemes>(() => {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(
          `${storageKey}.theme-light`,
        ) as LightThemes | null;
        return stored && lightThemes.includes(stored) ? stored : lightThemes[0];
      }
      return lightThemes[0];
    });

  const [selectedDarkTheme, setSelectedDarkThemeState] = useState<DarkThemes>(
    () => {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(
          `${storageKey}.theme-dark`,
        ) as DarkThemes | null;
        return stored && darkThemes.includes(stored) ? stored : darkThemes[0];
      }
      return darkThemes[0];
    },
  );

  // Sync initial state: if we have localStorage, sync next-themes to match
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(
        `${storageKey}.theme-mode`,
      ) as SystemTheme | null;
      if (stored) {
        const nextThemesValue = stored === 'normal' ? 'light' : stored;
        setNextTheme(nextThemesValue);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  // Sync systemTheme with next-themes when it changes externally (but not from our own updates)
  useEffect(() => {
    if (nextTheme) {
      const currentSystemTheme =
        nextTheme === 'system' ? 'system' : (nextTheme as SystemTheme);
      if (currentSystemTheme !== systemTheme) {
        setSystemThemeState(currentSystemTheme);
        if (typeof window !== 'undefined') {
          localStorage.setItem(`${storageKey}.theme-mode`, currentSystemTheme);
        }
      }
    }
  }, [nextTheme, storageKey, systemTheme]);

  // Resolve the actual theme name to apply
  const resolvedTheme = useMemo(() => {
    const resolvedSystem = resolveSystemTheme(systemTheme);
    return resolvedSystem === 'light' ? selectedLightTheme : selectedDarkTheme;
  }, [systemTheme, selectedLightTheme, selectedDarkTheme]);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const updateTheme = () => {
      const resolvedSystem = resolveSystemTheme(systemTheme);
      const themeToApply =
        resolvedSystem === 'light' ? selectedLightTheme : selectedDarkTheme;
      root.setAttribute('data-theme', themeToApply);
    };

    updateTheme();

    if (systemTheme === 'system' || systemTheme === 'normal') {
      mediaQuery.addEventListener('change', updateTheme);
      return () => mediaQuery.removeEventListener('change', updateTheme);
    }
  }, [systemTheme, selectedLightTheme, selectedDarkTheme]);

  const value = useMemo(
    () => ({
      systemTheme,
      resolvedTheme,
      availableThemes: {
        light: lightThemes,
        dark: darkThemes,
      },
      setSystemTheme: (newTheme: SystemTheme) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem(`${storageKey}.theme-mode`, newTheme);
        }
        setSystemThemeState(newTheme);
        // Update next-themes internal state
        const nextThemesValue = newTheme === 'normal' ? 'light' : newTheme;
        setNextTheme(nextThemesValue);
      },
      setSpecificTheme: (
        mode: 'light' | 'dark',
        theme: LightThemes | DarkThemes,
      ) => {
        if (typeof window !== 'undefined') {
          const key =
            mode === 'light'
              ? `${storageKey}.theme-light`
              : `${storageKey}.theme-dark`;
          localStorage.setItem(key, theme);
        }
        if (mode === 'light' && lightThemes.includes(theme as LightThemes)) {
          setSelectedLightThemeState(theme as LightThemes);
        } else if (
          mode === 'dark' &&
          darkThemes.includes(theme as DarkThemes)
        ) {
          setSelectedDarkThemeState(theme as DarkThemes);
        }
        // Update systemTheme to match the selected theme's mode
        setSystemThemeState(mode);
        // Update next-themes internal state
        setNextTheme(mode);
      },
    }),
    [
      systemTheme,
      resolvedTheme,
      lightThemes,
      darkThemes,
      storageKey,
      setNextTheme,
    ],
  );

  return (
    <NextThemeProviderContext.Provider value={value}>
      {children}
    </NextThemeProviderContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useNextTheme() {
  const context = use(NextThemeProviderContext);
  if (context === undefined) {
    throw new Error('useNextTheme must be used within a NextThemeProvider');
  }
  return context;
}
