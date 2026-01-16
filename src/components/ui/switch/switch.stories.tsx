import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";

import { Switch } from "./index";

const meta: Meta<React.ComponentProps<typeof Switch>> = {
    title: "UI/Switch",
    component: Switch,
    tags: ["autodocs"],
    argTypes: {
        size: {
            control: "select",
            options: ["sm", "default"],
        },
        checked: {
            control: "boolean",
        },
        disabled: {
            control: "boolean",
        },
    },
};

export default meta;
type Story = StoryObj<React.ComponentProps<typeof Switch>>;

export const Default: Story = {
    args: {},
};

export const Checked: Story = {
    args: {
        checked: true,
    },
};

export const Small: Story = {
    args: {
        size: "sm",
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
};

export const WithLabel: Story = {
    render: () => (
        <div className="flex items-center space-x-2">
            <Switch id="airplane-mode" />
            <label
                htmlFor="airplane-mode"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                Airplane Mode
            </label>
        </div>
    ),
};
