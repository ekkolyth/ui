import type { Meta, StoryObj } from "@storybook/react";
import { Mail } from "lucide-react";

import { Button } from "./index";

const meta: Meta<typeof Button> = {
    title: "UI/Button",
    component: Button,
    argTypes: {
        variant: {
            control: "select",
            options: [
                "default",
                "outline",
                "secondary",
                "ghost",
                "destructive",
                "link",
            ],
        },
        size: {
            control: "select",
            options: [
                "default",
                "xs",
                "sm",
                "lg",
                "icon",
                "icon-xs",
                "icon-sm",
                "icon-lg",
            ],
        },
        disabled: {
            control: "boolean",
        },
        asChild: {
            control: "boolean",
        },
        showIcon: {
            control: "boolean",
            description: "Show icon in button",
        },
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
    args: {
        variant: "default",
        children: "Button",
        showIcon: false,
    },
    render: ({ showIcon, ...args }) => (
        <Button {...args}>
            {showIcon && <Mail data-icon="inline-start" />}
            {args.children}
        </Button>
    ),
};

export const Outline: Story = {
    args: {
        variant: "outline",
        children: "Outline",
        showIcon: false,
    },
    render: ({ showIcon, ...args }) => (
        <Button {...args}>
            {showIcon && <Mail data-icon="inline-start" />}
            {args.children}
        </Button>
    ),
};

export const Secondary: Story = {
    args: {
        variant: "secondary",
        children: "Secondary",
        showIcon: false,
    },
    render: ({ showIcon, ...args }) => (
        <Button {...args}>
            {showIcon && <Mail data-icon="inline-start" />}
            {args.children}
        </Button>
    ),
};

export const Ghost: Story = {
    args: {
        variant: "ghost",
        children: "Ghost",
        showIcon: false,
    },
    render: ({ showIcon, ...args }) => (
        <Button {...args}>
            {showIcon && <Mail data-icon="inline-start" />}
            {args.children}
        </Button>
    ),
};

export const Destructive: Story = {
    args: {
        variant: "destructive",
        children: "Destructive",
        showIcon: false,
    },
    render: ({ showIcon, ...args }) => (
        <Button {...args}>
            {showIcon && <Mail data-icon="inline-start" />}
            {args.children}
        </Button>
    ),
};

export const Link: Story = {
    args: {
        variant: "link",
        children: "Link",
        showIcon: false,
    },
    render: ({ showIcon, ...args }) => (
        <Button {...args}>
            {showIcon && <Mail data-icon="inline-start" />}
            {args.children}
        </Button>
    ),
};

export const Icon: Story = {
    args: {
        size: "icon",
        children: <Mail />,
    },
};
