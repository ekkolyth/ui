import type { Preview } from "@storybook/nextjs-vite";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import React from "react";
import "../src/components/themes/index.css";

// Ensure Storybook canvas has the theme background
const globalStyles = `
  .sb-story,
  [data-storybook-canvas],
  #storybook-root,
  #storybook-root > div {
    background-color: var(--background, oklch(1 0 0)) !important;
    color: var(--foreground, oklch(0.141 0.005 285.823));
  }
`;

const withCenteredLayout = (Story: any, context: any) => {
    // In docs view, use a lighter layout without full viewport height
    if (context.viewMode === 'docs') {
        return (
            <div
                className="bg-background text-foreground"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "2rem",
                    boxSizing: "border-box",
                }}
            >
                <Story />
            </div>
        );
    }
    
    // In canvas/story view, use full viewport height
    return (
        <div
            className="bg-background text-foreground"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                padding: "1rem",
                boxSizing: "border-box",
            }}
        >
            <Story />
        </div>
    );
};

const preview: Preview = {
    decorators: [
        withThemeByDataAttribute({
            themes: {
                // Light Themes
                "Convergence - Light": "light",
                "Catppuccin - Latte": "latte",
                "EkkoOS - Light": "ekkoos-light",
                "Convergence": "convergence",
                // Dark Themes
                "Convergence - Dark": "dark",
                "Catppuccin - Mocha": "mocha",
                "Catppuccin - Frappe": "frappe",
                "Catppuccin - Macchiato": "macchiato",
                "Tokyo Night": "tokyo-night",
                "EkkoOS - Dark": "ekkoos-dark",
            },
            defaultTheme: "Convergence - Light",
            attributeName: "data-theme",
        }),
        (Story) => (
            <>
                <style>{globalStyles}</style>
                <Story />
            </>
        ),
        withCenteredLayout,
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
    tags: ["autodocs"],
};

export default preview;
