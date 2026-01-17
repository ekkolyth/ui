import type { Preview } from '@storybook/nextjs-vite';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import '../src/components/theme/ekko/index.css';

const preview: Preview = {
  decorators: [
    withThemeByDataAttribute({
      themes: {
        'Ekko Light': 'light',
        'Ekko Dark': 'dark',
        'Catppuccin Latte': 'latte',
        'Catppuccin Frappe': 'frappe',
        'Catppuccin Macchiato': 'macchiato',
        'Catppuccin Mocha': 'mocha',
      },
      defaultTheme: 'Ekko Light',
      attributeName: 'data-theme',
    }),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      disable: true,
    },
  },
  tags: ['autodocs'],
};

export default preview;
