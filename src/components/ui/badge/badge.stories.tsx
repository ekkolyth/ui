import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";

import { Badge } from "./index";

const meta: Meta<React.ComponentProps<typeof Badge>> = {
    title: "UI/Badge",
    component: Badge,
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: "select",
            options: [
                "default",
                "secondary",
                "destructive",
                "outline",
                "ghost",
                "link",
            ],
        },
    },
};

export default meta;
type Story = StoryObj<React.ComponentProps<typeof Badge>>;

export const Default: Story = {
    args: {
        children: "Badge",
    },
};

export const Secondary: Story = {
    args: {
        variant: "secondary",
        children: "Secondary",
    },
};

export const Destructive: Story = {
    args: {
        variant: "destructive",
        children: "Destructive",
    },
};

export const Outline: Story = {
    args: {
        variant: "outline",
        children: "Outline",
    },
};

export const Ghost: Story = {
    args: {
        variant: "ghost",
        children: "Ghost",
    },
};

export const Link: Story = {
    args: {
        variant: "link",
        children: "Link",
    },
};
