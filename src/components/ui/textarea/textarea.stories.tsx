import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";

import { Textarea } from "./index";

const meta: Meta<React.ComponentProps<typeof Textarea>> = {
    title: "UI/Textarea",
    component: Textarea,
    tags: ["autodocs"],
    argTypes: {
        disabled: {
            control: "boolean",
        },
        placeholder: {
            control: "text",
        },
        rows: {
            control: "number",
        },
    },
};

export default meta;
type Story = StoryObj<React.ComponentProps<typeof Textarea>>;

export const Default: Story = {
    args: {
        placeholder: "Enter your message...",
    },
};

export const WithValue: Story = {
    args: {
        defaultValue: "This is a sample textarea with some content.",
    },
};

export const Disabled: Story = {
    args: {
        placeholder: "Disabled textarea",
        disabled: true,
    },
};

export const CustomRows: Story = {
    args: {
        placeholder: "Enter your message...",
        rows: 6,
    },
};
