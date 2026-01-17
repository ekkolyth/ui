import type { Preview } from '@storybook/nextjs-vite';
import React, { useEffect, useState, useCallback } from 'react';
import { DocsContainer } from '@storybook/addon-docs/blocks';
import { themes } from 'storybook/theming';
import { addons } from 'storybook/preview-api';
import { DARK_MODE_EVENT_NAME } from '@vueless/storybook-dark-mode';
import { NextThemeProvider } from '../src/components/theme';
import '../src/components/theme/ekko/index.css';
import './docs.css';

const channel = addons.getChannel();

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const handleColorScheme = useCallback((value: boolean) => {
    setIsDarkMode(value);
  }, []);

  useEffect(() => {
    channel.on(DARK_MODE_EVENT_NAME, handleColorScheme);
    return () => {
      channel.off(DARK_MODE_EVENT_NAME, handleColorScheme);
    };
  }, [handleColorScheme]);

  return (
    <NextThemeProvider
      attribute='class'
      defaultTheme={isDarkMode ? 'dark' : 'light'}
      forcedTheme={isDarkMode ? 'dark' : 'light'}
    >
      {children}
    </NextThemeProvider>
  );
}

function ThemedDocsContainer(props: React.ComponentProps<typeof DocsContainer>) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const handleColorScheme = useCallback((value: boolean) => {
    setIsDarkMode(value);
  }, []);

  useEffect(() => {
    channel.on(DARK_MODE_EVENT_NAME, handleColorScheme);
    return () => {
      channel.off(DARK_MODE_EVENT_NAME, handleColorScheme);
    };
  }, [handleColorScheme]);

  return (
    <DocsContainer
      {...props}
      theme={isDarkMode ? themes.dark : themes.light}
    />
  );
}

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeWrapper>
        <Story />
      </ThemeWrapper>
    ),
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
    darkMode: {
      classTarget: 'html',
      stylePreview: true,
      darkClass: 'dark',
    },
  },
  tags: ['autodocs'],
};

export default preview;
