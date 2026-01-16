import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";

import { Skeleton } from "./index";

const meta: Meta<React.ComponentProps<typeof Skeleton>> = {
    title: "UI/Skeleton",
    component: Skeleton,
    tags: ["autodocs"],
    argTypes: {
        className: {
            control: "text",
        },
    },
};

export default meta;
type Story = StoryObj<React.ComponentProps<typeof Skeleton>>;

export const Default: Story = {
    args: {
        className: "h-4 w-[250px]",
    },
};

export const Circle: Story = {
    args: {
        className: "h-12 w-12 rounded-full",
    },
};

export const Rectangle: Story = {
    args: {
        className: "h-20 w-full",
    },
};

export const Card: Story = {
    render: () => (
        <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
    ),
};
