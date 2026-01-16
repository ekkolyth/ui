import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";
import { Bold } from "lucide-react";

import { Toggle } from "./index";

const meta: Meta<React.ComponentProps<typeof Toggle>> = {
    title: "UI/Toggle",
    component: Toggle,
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: "select",
            options: ["default", "outline"],
        },
        size: {
            control: "select",
            options: ["default", "sm", "lg"],
        },
        pressed: {
            control: "boolean",
        },
        disabled: {
            control: "boolean",
        },
    },
};

export default meta;
type Story = StoryObj<React.ComponentProps<typeof Toggle>>;

export const Default: Story = {
    args: {
        children: "Toggle",
    },
};

export const Outline: Story = {
    args: {
        variant: "outline",
        children: "Toggle",
    },
};

export const WithIcon: Story = {
    args: {
        children: <Bold />,
        "aria-label": "Toggle bold",
    },
};

export const Small: Story = {
    args: {
        size: "sm",
        children: "Small",
    },
};

export const Large: Story = {
    args: {
        size: "lg",
        children: "Large",
    },
};

export const Pressed: Story = {
    args: {
        pressed: true,
        children: "Pressed",
    },
};
