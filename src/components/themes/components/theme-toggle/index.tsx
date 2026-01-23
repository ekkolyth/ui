'use client';

import * as React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';
import { useNextTheme } from '../providers/next';
import { useTanstackTheme } from '../providers/tanstack';
import type { SystemTheme } from '@/lib/types';
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

export interface ThemeToggleProps extends React.ComponentProps<typeof Toggle> {
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
}

export function ThemeToggle({
  variant = 'default',
  size = 'default',
  className,
  ...props
}: ThemeToggleProps) {
  const { systemTheme, setSystemTheme } = useTheme();

  const cycleTheme = () => {
    const cycle: SystemTheme[] = ['light', 'dark', 'system'];
    const currentIndex = cycle.indexOf(
      systemTheme === 'normal' ? 'light' : systemTheme,
    );
    const nextIndex = (currentIndex + 1) % cycle.length;
    setSystemTheme(cycle[nextIndex]);
  };

  const getIcon = () => {
    const normalizedTheme = systemTheme === 'normal' ? 'light' : systemTheme;
    switch (normalizedTheme) {
      case 'light':
        return <Sun className='size-4' />;
      case 'dark':
        return <Moon className='size-4' />;
      case 'system':
        return <Monitor className='size-4' />;
      default:
        return <Monitor className='size-4' />;
    }
  };

  return (
    <Toggle
      variant={variant}
      size={size}
      className={cn(className)}
      onClick={cycleTheme}
      aria-label={`Switch theme. Current: ${systemTheme}`}
      {...props}
    >
      {getIcon()}
    </Toggle>
  );
}
