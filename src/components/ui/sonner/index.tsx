import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from 'lucide-react';
import { Toaster as Sonner, type ToasterProps } from 'sonner';
import { useEffect, useState } from 'react';
import { LIGHT_THEMES, DARK_THEMES } from '@/lib/types';

const getSonnerTheme = (dataTheme: string | null): 'light' | 'dark' => {
  if (!dataTheme) {
    // Fallback: check for dark class or system preference
    if (typeof window !== 'undefined') {
      const hasDarkClass =
        document.documentElement.classList.contains('dark') ||
        document.body.classList.contains('dark');
      if (hasDarkClass) return 'dark';

      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      return prefersDark ? 'dark' : 'light';
    }
    return 'dark';
  }

  if ((DARK_THEMES as readonly string[]).includes(dataTheme)) return 'dark';
  if ((LIGHT_THEMES as readonly string[]).includes(dataTheme)) return 'light';

  // Default to dark for unknown themes
  return 'dark';
};

const Toaster = ({ ...props }: ToasterProps) => {
  const [sonnerTheme, setSonnerTheme] = useState<'light' | 'dark' | 'system'>(
    'dark',
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const detectTheme = () => {
      const dataTheme = document.documentElement.getAttribute('data-theme');
      return getSonnerTheme(dataTheme);
    };

    setSonnerTheme(detectTheme());

    // Watch for data-theme attribute changes
    const observer = new MutationObserver(() => {
      setSonnerTheme(detectTheme());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'class'],
    });

    // Also watch for class changes (for backward compatibility with class-based themes)
    return () => observer.disconnect();
  }, []);

  return (
    <Sonner
      theme={sonnerTheme}
      className='toaster group'
      icons={{
        success: <CircleCheckIcon className='size-4' />,
        info: <InfoIcon className='size-4' />,
        warning: <TriangleAlertIcon className='size-4' />,
        error: <OctagonXIcon className='size-4' />,
        loading: <Loader2Icon className='size-4 animate-spin' />,
      }}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--border-radius': 'var(--radius)',
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
