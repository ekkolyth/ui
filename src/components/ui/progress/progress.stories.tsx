import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";

import { Progress } from "./index";

const meta: Meta<React.ComponentProps<typeof Progress>> = {
    title: "UI/Progress",
    component: Progress,
    tags: ["autodocs"],
    argTypes: {
        value: {
            control: { type: "range", min: 0, max: 100, step: 1 },
        },
    },
};

export default meta;
type Story = StoryObj<React.ComponentProps<typeof Progress>>;

export const Default: Story = {
    args: {
        value: 50,
    },
};

export const Zero: Story = {
    args: {
        value: 0,
    },
};

export const Complete: Story = {
    args: {
        value: 100,
    },
};

export const Quarter: Story = {
    args: {
        value: 25,
    },
};

export const ThreeQuarters: Story = {
    args: {
        value: 75,
    },
};
