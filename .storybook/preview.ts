import type { Preview } from '@storybook/nextjs-vite'
import '../src/globals.css'
import './docs.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    docs: {
      autodocs: 'tag',
    },
  },
  tags: ['autodocs'],
};

export default preview;