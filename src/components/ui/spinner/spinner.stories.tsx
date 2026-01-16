import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";

import { Spinner } from "./index";

const meta: Meta<React.ComponentProps<typeof Spinner>> = {
    title: "UI/Spinner",
    component: Spinner,
    tags: ["autodocs"],
    argTypes: {
        className: {
            control: "text",
        },
    },
};

export default meta;
type Story = StoryObj<React.ComponentProps<typeof Spinner>>;

export const Default: Story = {
    args: {},
};

export const Small: Story = {
    args: {
        className: "size-3",
    },
};

export const Medium: Story = {
    args: {
        className: "size-6",
    },
};

export const Large: Story = {
    args: {
        className: "size-8",
    },
};

export const ExtraLarge: Story = {
    args: {
        className: "size-12",
    },
};
