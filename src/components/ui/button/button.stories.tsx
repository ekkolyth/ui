import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";
import { Mail } from "lucide-react";
import { toast } from "sonner";

import { Button } from "./index";
import { Toaster } from "@/components/ui/sonner";

// Extend Button props with Storybook-only controls
type ButtonStoryArgs = React.ComponentProps<typeof Button> & {
    showIcon?: boolean;
};

const meta: Meta<ButtonStoryArgs> = {
    title: "UI/Button",
    component: Button,
    tags: ["autodocs"],
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
type Story = StoryObj<ButtonStoryArgs>;

export const Default: Story = {
    args: {
        variant: "default",
        children: "Button",
        showIcon: false,
    },
    render: (args) => {
        const { showIcon, ...buttonProps } = args;
        return (
            <>
                <Toaster position="bottom-right" />
                <Button
                    {...buttonProps}
                    onClick={() =>
                        toast("Achievement Unlocked! Clicked the button 50G")
                    }
                >
                    {showIcon && <Mail data-icon="inline-start" />}
                    {args.children}
                </Button>
            </>
        );
    },
};

export const Outline: Story = {
    args: {
        variant: "outline",
        children: "Outline",
        showIcon: false,
    },
    render: (args) => {
        const { showIcon, ...buttonProps } = args;
        return (
            <>
                <Toaster position="bottom-right" />
                <Button
                    {...buttonProps}
                    onClick={() =>
                        toast("Achievement Unlocked! Clicked the button 50G")
                    }
                >
                    {showIcon && <Mail data-icon="inline-start" />}
                    {args.children}
                </Button>
            </>
        );
    },
};

export const Secondary: Story = {
    args: {
        variant: "secondary",
        children: "Secondary",
        showIcon: false,
    },
    render: (args) => {
        const { showIcon, ...buttonProps } = args;
        return (
            <>
                <Toaster position="bottom-right" />
                <Button
                    {...buttonProps}
                    onClick={() =>
                        toast("Achievement Unlocked! Clicked the button 50G")
                    }
                >
                    {showIcon && <Mail data-icon="inline-start" />}
                    {args.children}
                </Button>
            </>
        );
    },
};

export const Ghost: Story = {
    args: {
        variant: "ghost",
        children: "Ghost",
        showIcon: false,
    },
    render: (args) => {
        const { showIcon, ...buttonProps } = args;
        return (
            <>
                <Toaster position="bottom-right" />
                <Button
                    {...buttonProps}
                    onClick={() =>
                        toast("Achievement Unlocked! Clicked the button 50G")
                    }
                >
                    {showIcon && <Mail data-icon="inline-start" />}
                    {args.children}
                </Button>
            </>
        );
    },
};

export const Destructive: Story = {
    args: {
        variant: "destructive",
        children: "Destructive",
        showIcon: false,
    },
    render: (args) => {
        const { showIcon, ...buttonProps } = args;
        return (
            <>
                <Toaster position="bottom-right" />
                <Button
                    {...buttonProps}
                    onClick={() =>
                        toast("Achievement Unlocked! Clicked the button 50G")
                    }
                >
                    {showIcon && <Mail data-icon="inline-start" />}
                    {args.children}
                </Button>
            </>
        );
    },
};

export const Link: Story = {
    args: {
        variant: "link",
        children: "Link",
        showIcon: false,
    },
    render: (args) => {
        const { showIcon, ...buttonProps } = args;
        return (
            <>
                <Toaster position="bottom-right" />
                <Button
                    {...buttonProps}
                    onClick={() =>
                        toast("Achievement Unlocked! Clicked the button 50G")
                    }
                >
                    {showIcon && <Mail data-icon="inline-start" />}
                    {args.children}
                </Button>
            </>
        );
    },
};

export const Icon: Story = {
    args: {
        size: "icon",
        children: <Mail />,
    },
    render: (args) => (
        <>
            <Toaster position="bottom-right" />
            <Button
                {...args}
                onClick={() =>
                    toast("Achievement Unlocked! Clicked the button 50G")
                }
            />
        </>
    ),
};
