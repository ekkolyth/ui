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

const withCenteredLayout = (Story: any) => (
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

const preview: Preview = {
    decorators: [
        (Story) => (
            <>
                <style>{globalStyles}</style>
                <Story />
            </>
        ),
        withCenteredLayout,
        withThemeByDataAttribute({
            themes: {
                "Convergence - Light": "light",
                "Convergence - Dark": "dark",
                "EkkoOS - Light": "ekkoos-light",
                "EkkoOS - Dark": "ekkoos-dark",
                "Catppuccin - Latte": "latte",
                "Catppuccin - Frappe": "frappe",
                "Catppuccin - Macchiato": "macchiato",
                "Catppuccin - Mocha": "mocha",
                "Tokyo Night": "tokyo-night",
            },
            defaultTheme: "Convergence - Light",
            attributeName: "data-theme",
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
    tags: ["autodocs"],
};

export default preview;
