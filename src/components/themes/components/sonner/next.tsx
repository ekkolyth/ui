'use client';

import { Toaster as BaseToaster } from '@/components/ui/sonner';
import { useNextTheme } from '../providers/next';
import { isDarkTheme } from '@/lib/theme';
import type { ToasterProps } from 'sonner';

/**
 * Theme-aware Toaster for Next.js apps using next-themes
 * Automatically syncs with NextThemeProvider
 */
export function NextToaster(props: ToasterProps) {
  try {
    const { resolvedTheme } = useNextTheme();
    const theme = isDarkTheme(resolvedTheme) ? 'dark' : 'light';
    return <BaseToaster theme={theme} {...props} />;
  } catch {
    // Fallback if provider is not available
    return <BaseToaster theme="system" {...props} />;
  }
}
