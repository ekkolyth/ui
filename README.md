# Ekko UI

Shared UI component library.

## Installation

```bash
npm install @ekkolyth/ui
```

## Peer Dependencies

- `react` ^19.2.3
- `react-dom` ^19.2.3
- `next-themes` ^0.4.6 (optional, for Next.js theme support)
- `@tanstack/react-router` ^1.150.0 (optional, for TanStack Router theme support)

## Exports

### Main Export (`@ekkolyth/ui`)

All UI components, hooks, and utilities.

```tsx
import { Button, Card, Dialog, useIsMobile, cn } from '@ekkolyth/ui'
```

**Components:**
Built on top of shadcn@latest.

### Next.js Theme Provider (`@ekkolyth/ui/next`)

Theme provider for Next.js applications using `next-themes`.

```tsx
import { ThemeProvider, useTheme } from '@ekkolyth/ui/next'
import type { ThemeProviderProps, SystemTheme, ThemeName } from '@ekkolyth/ui/next'
```

**ThemeProvider Props:**
- `defaultTheme?: SystemTheme` - Default system theme (`"light" | "dark" | "system" | "normal"`)
- `lightTheme?: ThemeName | ThemeName[]` - Light theme(s) to make available.
- `darkTheme?: ThemeName | ThemeName[]` - Dark theme(s) to make available.
- `storageKey?: string` - localStorage key prefix (default: `"ekko-ui"`) - most people won't need this, but if you're running something like "Micro-Frontends", it might be useful to customize per-frontend, despite running on the same domain. 

**useTheme Hook:**
Returns:
- `systemTheme: SystemTheme` - Current system theme mode
- `resolvedTheme: ThemeName` - Currently applied theme name
- `availableThemes: { light: ThemeName[], dark: ThemeName[] }` - Available themes
- `setSystemTheme: (theme: SystemTheme) => void` - Set system theme mode
- `setSpecificTheme: (mode: "light" | "dark", theme: ThemeName) => void` - Set specific theme

**ThemeName Types:**
- `"mocha" | "frappe" | "macchiato" | "latte"` - Catppuccin themes
- `"tokyo-night"` - Tokyo Night theme
- `"ekkoos-light" | "ekkoos-dark"` - Ekko OS themes
- `"ekkolyth-light" | "ekkolyth-dark"` - Ekkolyth themes
- `"ekko-playlist-light" | "ekko-playlist-dark"` - Ekko Playlist themes

### TanStack Router Theme Provider (`@ekkolyth/ui/tanstack`)

Theme provider for TanStack Router applications.

```tsx
import { ThemeProvider, useTheme } from '@ekkolyth/ui/tanstack'
import type { SystemTheme, ThemeName } from '@ekkolyth/ui/tanstack'
```

API matches Next.js provider 1:1

### Theme Components

**Theme Toggle** (`@ekkolyth/ui/themes/theme-toggle`)

```tsx
import { ThemeToggle } from '@ekkolyth/ui/themes/theme-toggle'
import type { ThemeToggleProps } from '@ekkolyth/ui/themes/theme-toggle'
```

**Theme Select** (`@ekkolyth/ui/themes/theme-select`)

```tsx
import { ThemeSelect } from '@ekkolyth/ui/themes/theme-select'
import type { ThemeSelectProps } from '@ekkolyth/ui/themes/theme-select'
```

### Theme Styles

Import theme CSS files:

```tsx
// All themes
import '@ekkolyth/ui/themes'

// Catppuccin themes
import '@ekkolyth/ui/catpuccin/latte'
import '@ekkolyth/ui/catpuccin/frappe'
import '@ekkolyth/ui/catpuccin/macchiato'
import '@ekkolyth/ui/catpuccin/mocha'

// Other themes
import '@ekkolyth/ui/tokyo-night'
import '@ekkolyth/ui/ekko-os'
import '@ekkolyth/ui/ekkolyth'
import '@ekkolyth/ui/ekko-playlist'
```

## Usage Example

### Next.js Setup

```tsx
// app/layout.tsx
import { ThemeProvider } from '@ekkolyth/ui/next'
import '@ekkolyth/ui/themes'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider
          defaultTheme="system"
          lightTheme={["latte", "ekkolyth-light"]}
          darkTheme={["mocha", "ekkolyth-dark"]}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

// app/page.tsx
'use client'
import { Button } from '@ekkolyth/ui'
import { ThemeToggle } from '@ekkolyth/ui/themes/theme-toggle'
import { useTheme } from '@ekkolyth/ui/next'

export default function Page() {
  const { systemTheme, setSystemTheme } = useTheme()
  
  return (
    <div>
      <ThemeToggle />
      <Button onClick={() => setSystemTheme('dark')}>
        Set Dark Mode
      </Button>
    </div>
  )
}
```

### TanStack Router Setup

```tsx
// router.tsx
import { ThemeProvider } from '@ekkolyth/ui/tanstack'
import '@ekkolyth/ui/themes'

function App() {
  return (
    <ThemeProvider
      defaultTheme="system"
      lightTheme={["latte"]}
      darkTheme={["mocha"]}
    >
      <Router />
    </ThemeProvider>
  )
}
```
