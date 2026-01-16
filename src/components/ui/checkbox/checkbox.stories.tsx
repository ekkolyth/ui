import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";

import { Checkbox } from "./index";

const meta: Meta<React.ComponentProps<typeof Checkbox>> = {
    title: "UI/Checkbox",
    component: Checkbox,
    tags: ["autodocs"],
    argTypes: {
        checked: {
            control: "boolean",
        },
        disabled: {
            control: "boolean",
        },
    },
};

export default meta;
type Story = StoryObj<React.ComponentProps<typeof Checkbox>>;

export const Default: Story = {
    args: {},
};

export const Checked: Story = {
    args: {
        checked: true,
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
            <Checkbox id="terms" />
            <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                Accept terms and conditions
            </label>
        </div>
    ),
};
