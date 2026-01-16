import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";

import { Input } from "./index";

const meta: Meta<React.ComponentProps<typeof Input>> = {
    title: "UI/Input",
    component: Input,
    tags: ["autodocs"],
    argTypes: {
        type: {
            control: "select",
            options: [
                "text",
                "email",
                "password",
                "number",
                "tel",
                "url",
                "search",
            ],
        },
        disabled: {
            control: "boolean",
        },
        placeholder: {
            control: "text",
        },
    },
};

export default meta;
type Story = StoryObj<React.ComponentProps<typeof Input>>;

export const Default: Story = {
    args: {
        type: "text",
        placeholder: "Enter text...",
    },
};

export const Email: Story = {
    args: {
        type: "email",
        placeholder: "Enter email...",
    },
};

export const Password: Story = {
    args: {
        type: "password",
        placeholder: "Enter password...",
    },
};

export const Disabled: Story = {
    args: {
        type: "text",
        placeholder: "Disabled input",
        disabled: true,
    },
};

export const WithValue: Story = {
    args: {
        type: "text",
        defaultValue: "Sample text",
    },
};
