import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";

import { Slider } from "./index";

const meta: Meta<React.ComponentProps<typeof Slider>> = {
    title: "UI/Slider",
    component: Slider,
    tags: ["autodocs"],
    argTypes: {
        defaultValue: {
            control: { type: "range", min: 0, max: 100, step: 1 },
        },
        min: {
            control: "number",
        },
        max: {
            control: "number",
        },
    },
};

export default meta;
type Story = StoryObj<React.ComponentProps<typeof Slider>>;

export const Default: Story = {
    args: {
        defaultValue: [50],
        max: 100,
    },
};

export const WithValue: Story = {
    args: {
        value: [75],
        max: 100,
    },
};

export const Range: Story = {
    args: {
        defaultValue: [25, 75],
        max: 100,
    },
};

export const CustomRange: Story = {
    args: {
        defaultValue: [5],
        min: 0,
        max: 10,
    },
};

export const Disabled: Story = {
    args: {
        defaultValue: [50],
        disabled: true,
        max: 100,
    },
};
