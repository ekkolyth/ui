import type { Preview } from '@storybook/nextjs-vite';
import React, { useEffect, useMemo, useState } from 'react';
import { DocsContainer } from '@storybook/addon-docs/blocks';
import { themes } from 'storybook/theming';
import { withThemeByClassName } from '@storybook/addon-themes';
import { addons } from 'storybook/preview-api';
import { NextThemeProvider } from '../src/components/theme';
import '../src/components/theme/ekko/index.css';
import './docs.css';

// Import scoped theme CSS files
import './themes/catpuccin-mocha.css';
import './themes/catpuccin-latte.css';
import './themes/catpuccin-frappe.css';
import './themes/catpuccin-macchiato.css';

// Theme configuration
const THEME_CONFIG = {
  'ekko-light': {
    label: 'Ekko Light',
    class: '',
    darkMode: false,
  },
  'ekko-dark': {
    label: 'Ekko Dark',
    class: 'dark',
    darkMode: true,
  },
  'catpuccin-mocha': {
    label: 'Catppuccin Mocha',
    class: 'theme-catpuccin-mocha',
    darkMode: true,
  },
  'catpuccin-latte': {
    label: 'Catppuccin Latte',
    class: 'theme-catpuccin-latte',
    darkMode: false,
  },
  'catpuccin-frappe': {
    label: 'Catppuccin Frappe',
    class: 'theme-catpuccin-frappe',
    darkMode: false,
  },
  'catpuccin-macchiato': {
    label: 'Catppuccin Macchiato',
    class: 'theme-catpuccin-macchiato',
    darkMode: true,
  },
} as const;

type ThemeName = keyof typeof THEME_CONFIG;

// Theme loader component that manages CSS and dark mode
function ThemeLoader({ children, themeName }: { children: React.ReactNode; themeName: ThemeName }) {
  const theme = THEME_CONFIG[themeName] || THEME_CONFIG['ekko-light'];

  useEffect(() => {
    const htmlEl = document.documentElement;
    const iframe = document.querySelector('iframe[title*="storybook"]') as HTMLIFrameElement;
    const previewHtml = iframe?.contentDocument?.documentElement || htmlEl;
    const previewBody = iframe?.contentDocument?.body || document.body;

    // Handle ekko themes with dark class
    if (themeName === 'ekko-dark') {
      htmlEl.classList.add('dark');
      previewHtml.classList.add('dark');
    } else if (themeName === 'ekko-light') {
      htmlEl.classList.remove('dark');
      previewHtml.classList.remove('dark');
    }

    // For catpuccin themes, remove dark class
    if (themeName.startsWith('catpuccin-')) {
      htmlEl.classList.remove('dark');
      previewHtml.classList.remove('dark');
    }

    // Manage theme classes on preview HTML
    // Remove all catpuccin theme classes
    const catpuccinThemes = Object.entries(THEME_CONFIG).filter(([name]) =>
      name.startsWith('catpuccin-')
    );
    catpuccinThemes.forEach(([_, config]) => {
      if (config.class) {
        previewHtml.classList.remove(config.class);
        previewBody.classList.remove(config.class);
      }
    });

    // Apply current theme class (for catpuccin themes)
    if (theme.class && themeName.startsWith('catpuccin-')) {
      previewHtml.classList.add(theme.class);
      previewBody.classList.add(theme.class);
    }

    // Note: Since all CSS files target :root, they all apply at once.
    // The catpuccin CSS variables will override ekko variables when catpuccin themes are active.
    // This is acceptable since we're switching between complete theme systems.
  }, [themeName, theme]);

  const nextThemeValue = useMemo(() => {
    return theme.darkMode ? 'dark' : 'light';
  }, [theme]);

  return (
    <NextThemeProvider
      attribute='class'
      defaultTheme={nextThemeValue}
      forcedTheme={nextThemeValue}
    >
      {children}
    </NextThemeProvider>
  );
}

// Themed docs container - theme is managed by withThemeByClassName
function ThemedDocsContainer(props: React.ComponentProps<typeof DocsContainer>) {
  // Check if dark class is on html to determine theme
  const [isDark, setIsDark] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    // Listen for theme changes via class changes
    const observer = new MutationObserver(() => {
      const dark = document.documentElement.classList.contains('dark');
      setIsDark(dark);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <DocsContainer
      {...props}
      theme={isDark ? themes.dark : themes.light}
    />
  );
}

const preview: Preview = {
  decorators: [
    withThemeByClassName({
      themes: {
        'Ekko Light': '',
        'Ekko Dark': 'dark',
        'Catppuccin Mocha': 'theme-catpuccin-mocha',
        'Catppuccin Latte': 'theme-catpuccin-latte',
        'Catppuccin Frappe': 'theme-catpuccin-frappe',
        'Catppuccin Macchiato': 'theme-catpuccin-macchiato',
      },
      defaultTheme: 'Ekko Light',
      parentSelector: 'html',
    }),
    (Story, context) => {
      // Get theme from globals
      const themeValue = (context.globals?.theme as string) || 'Ekko Light';
      // Map display name to internal theme name
      const themeName =
        (Object.entries(THEME_CONFIG).find(
          ([_, config]) => config.label === themeValue
        )?.[0] as ThemeName) || 'ekko-light';

      return (
        <ThemeLoader themeName={themeName}>
          <Story />
        </ThemeLoader>
      );
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      autodocs: 'tag',
      container: ThemedDocsContainer,
    },
    backgrounds: {
      disable: true,
    },
  },
  tags: ['autodocs'],
};

export default preview;
