import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import storybookPlugin from "eslint-plugin-storybook";
import tseslint from "typescript-eslint";
import globals from "globals";

export default [
    // Base recommended configs
    js.configs.recommended,
    ...tseslint.configs.recommended,

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
