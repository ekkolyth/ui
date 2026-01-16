import type { Preview } from "@storybook/nextjs-vite";
import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import { ThemeProvider } from "next-themes";
import React, { useEffect } from "react";
import "../src/globals.css";
import "./docs.css";

// Theme objects for Storybook (next-themes uses string theme names)
// We create simple objects that contain the theme name
const lightTheme = { name: "light" } as const;
const darkTheme = { name: "dark" } as const;

// Wrapper component to configure ThemeProvider for Storybook
const StorybookThemeProvider = ({
    theme,
    children,
}: {
    theme?: { name?: string } | string;
    children: React.ReactNode;
}) => {
    // Extract theme name from theme object
    // withThemeFromJSXProvider passes the entire theme object
    let themeName = "light";
    if (typeof theme === "string") {
        themeName = theme;
    } else if (theme && typeof theme === "object") {
        // Check if it's our theme object by reference or by name property
        if (theme === darkTheme || theme.name === "dark") {
            themeName = "dark";
        } else if (theme === lightTheme || theme.name === "light") {
            themeName = "light";
        } else if (theme.name) {
            themeName = theme.name;
        }
    }

    // Manually apply the class to the HTML element to ensure it works
    // This is a fallback in case next-themes doesn't apply it correctly in Storybook
    useEffect(() => {
        const html = document.documentElement;
        if (themeName === "dark") {
            html.classList.add("dark");
        } else {
            html.classList.remove("dark");
        }
    }, [themeName]);

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            forcedTheme={themeName}
        >
            {children}
        </ThemeProvider>
    );
};

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        docs: {
            autodocs: "tag",
        },
    },
    tags: ["autodocs"],
    decorators: [
        withThemeFromJSXProvider({
            themes: {
                light: lightTheme,
                dark: darkTheme,
            },
            defaultTheme: "light",
            Provider: StorybookThemeProvider,
        }),
    ],
};

export default preview;
