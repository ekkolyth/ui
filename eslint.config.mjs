import { dirname } from "path";
import { fileURLToPath } from "url";
import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import storybookPlugin from "eslint-plugin-storybook";
import tailwindPlugin from "eslint-plugin-tailwindcss";
import tseslint from "typescript-eslint";
import globals from "globals";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default [
    // Base recommended configs
    js.configs.recommended,
    ...tseslint.configs.recommended,
    ...tailwindPlugin.configs["flat/recommended"],

    // Tailwind config
    {
        settings: {
            tailwindcss: {
                callees: ["classnames", "clsx", "ctl"],
                config: __dirname + "/src/globals.css",
                cssFiles: [
                    "**/*.css",
                    "!**/node_modules",
                    "!**/dist",
                    "!**/build",
                ],
                cssFilesRefreshRate: 5_000,
                removeDuplicates: true,
                skipClassAttribute: false,
                whitelist: [],
                tags: [], // can be set to e.g. ['tw'] for use in tw`bg-blue`
                classRegex: "^class(Name)?$", // can be modified to support custom attributes. E.g. "^tw$" for `twin.macro`
            },
        },
    },
    // React config
    {
        files: ["**/*.{ts,tsx,js,jsx}"],
        plugins: {
            react: reactPlugin,
            "react-hooks": reactHooksPlugin,
        },
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                ...globals.browser,
                ...globals.es2021,
            },
        },
        settings: {
            react: {
                version: "detect",
            },
        },
        rules: {
            ...reactPlugin.configs.recommended.rules,
            ...reactHooksPlugin.configs.recommended.rules,
            "react/react-in-jsx-scope": "off", // Not needed in React 19
            "react/prop-types": "off", // Using TypeScript
        },
    },

    // Storybook config
    ...storybookPlugin.configs["flat/recommended"],

    // Ignores
    {
        ignores: [
            "node_modules/**",
            ".next/**",
            "out/**",
            "build/**",
            "storybook-static/**",
            ".storybook/storybook-static/**",
            "next-env.d.ts",
        ],
    },
];
