import type { Preview, Renderer } from '@storybook/nextjs-vite'
import { withThemeFromJSXProvider } from '@storybook/addon-themes'
import { ThemeProvider } from 'next-themes'
import '../src/globals.css'
import './docs.css'

// Theme objects for Storybook (next-themes uses string theme names)
// We create simple objects that contain the theme name
const lightTheme = { name: 'light' } as const
const darkTheme = { name: 'dark' } as const

// Wrapper component to configure ThemeProvider for Storybook
const StorybookThemeProvider = ({ 
  theme, 
  children 
}: { 
  theme?: { name?: string } | string
  children: React.ReactNode 
}) => {
  // Extract theme name from theme object
  const themeName = (typeof theme === 'object' && theme?.name) || (typeof theme === 'string' ? theme : 'light')
  
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      forcedTheme={themeName}
    >
      {children}
    </ThemeProvider>
  )
}

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
  decorators: [
    withThemeFromJSXProvider<Renderer>({
      themes: {
        light: lightTheme,
        dark: darkTheme,
      },
      defaultTheme: 'light',
      Provider: StorybookThemeProvider,
    }),
  ],
};

export default preview;
