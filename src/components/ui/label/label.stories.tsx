import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";

import { Label } from "./index";

const meta: Meta<React.ComponentProps<typeof Label>> = {
    title: "UI/Label",
    component: Label,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<React.ComponentProps<typeof Label>>;

export const Default: Story = {
    args: {
        children: "Label",
    },
};

export const WithInput: Story = {
    render: () => (
        <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="h-8 rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm"
            />
        </div>
    ),
};

export const Required: Story = {
    render: () => (
        <Label>
            Required Field <span className="text-destructive">*</span>
        </Label>
    ),
};
