'use client';

import * as React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useNextTheme } from '../providers/next';
import { useTanstackTheme } from '../providers/tanstack';
import { isLightTheme, isDarkTheme } from '@/lib/theme';
import type { ThemeName } from '@/lib/types';
import { cn } from '@/lib/utils';

// Unified hook that works with both providers
function useTheme() {
  // Try Next.js provider first
  try {
    return useNextTheme();
  } catch {
    // Fall back to TanStack provider
    try {
      return useTanstackTheme();
    } catch {
      throw new Error(
        'useTheme must be used within a ThemeProvider (NextThemeProvider or TanstackThemeProvider)',
      );
    }
  }
}

export interface ThemeSelectProps extends React.ComponentProps<typeof Select> {
  size?: 'sm' | 'default';
  className?: string;
}

export function ThemeSelect({
  size = 'default',
  className,
  ...props
}: ThemeSelectProps) {
  const { resolvedTheme, availableThemes, setSpecificTheme, setSystemTheme } =
    useTheme();

  const handleThemeChange = (value: string) => {
    const theme = value as ThemeName;

    // Determine if the theme is light or dark
    if (isLightTheme(theme)) {
      setSpecificTheme('light', theme);
      setSystemTheme('light');
    } else if (isDarkTheme(theme)) {
      setSpecificTheme('dark', theme);
      setSystemTheme('dark');
    }
  };

  // Format theme name for display (capitalize first letter, handle special cases)
  const formatThemeName = (theme: ThemeName): string => {
    if (theme === 'ekkoos-light') return 'EkkoOS Light';
    if (theme === 'ekkoos-dark') return 'EkkoOS Dark';
    if (theme === 'tokyo-night') return 'Tokyo Night';
    return theme.charAt(0).toUpperCase() + theme.slice(1);
  };

  return (
    <Select
      value={resolvedTheme}
      onValueChange={handleThemeChange}
      {...props}
    >
      <SelectTrigger
        size={size}
        className={cn(className)}
      >
        <SelectValue placeholder='Select theme' />
      </SelectTrigger>
      <SelectContent>
        {availableThemes.light.length > 0 && (
          <SelectGroup>
            <SelectLabel>Light Themes</SelectLabel>
            {availableThemes.light.map((theme) => (
              <SelectItem
                key={theme}
                value={theme}
              >
                {formatThemeName(theme)}
              </SelectItem>
            ))}
          </SelectGroup>
        )}
        {availableThemes.dark.length > 0 && (
          <SelectGroup>
            <SelectLabel>Dark Themes</SelectLabel>
            {availableThemes.dark.map((theme) => (
              <SelectItem
                key={theme}
                value={theme}
              >
                {formatThemeName(theme)}
              </SelectItem>
            ))}
          </SelectGroup>
        )}
      </SelectContent>
    </Select>
  );
}
