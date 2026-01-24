'use client';

import { Toaster as BaseToaster } from '@/components/ui/sonner';
import { useTanstackTheme } from '../providers/tanstack';
import { isDarkTheme } from '@/lib/theme';
import type { ToasterProps } from 'sonner';

/**
 * Theme-aware Toaster for TanStack Router apps
 * Automatically syncs with TanstackThemeProvider
 */
export function TanstackToaster(props: ToasterProps) {
  try {
    const { resolvedTheme } = useTanstackTheme();
    const theme = isDarkTheme(resolvedTheme) ? 'dark' : 'light';
    return <BaseToaster theme={theme} {...props} />;
  } catch {
    // Fallback if provider is not available
    return <BaseToaster theme="system" {...props} />;
  }
}
