import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";

import { AspectRatio } from "./index";

const meta: Meta<React.ComponentProps<typeof AspectRatio>> = {
    title: "UI/AspectRatio",
    component: AspectRatio,
    tags: ["autodocs"],
    argTypes: {
        ratio: {
            control: "number",
        },
    },
};

export default meta;
type Story = StoryObj<React.ComponentProps<typeof AspectRatio>>;

export const Default: Story = {
    args: {
        ratio: 16 / 9,
    },
    render: (args) => (
        <AspectRatio {...args} className="bg-muted rounded-lg overflow-hidden">
            <img
                src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                alt="Photo"
                className="h-full w-full object-cover"
            />
        </AspectRatio>
    ),
};

export const Square: Story = {
    args: {
        ratio: 1,
    },
    render: (args) => (
        <AspectRatio {...args} className="bg-muted rounded-lg overflow-hidden">
            <div className="flex h-full w-full items-center justify-center">
                <span>1:1</span>
            </div>
        </AspectRatio>
    ),
};

export const Portrait: Story = {
    args: {
        ratio: 3 / 4,
    },
    render: (args) => (
        <AspectRatio {...args} className="bg-muted rounded-lg overflow-hidden">
            <div className="flex h-full w-full items-center justify-center">
                <span>3:4</span>
            </div>
        </AspectRatio>
    ),
};

export const Wide: Story = {
    args: {
        ratio: 21 / 9,
    },
    render: (args) => (
        <AspectRatio {...args} className="bg-muted rounded-lg overflow-hidden">
            <div className="flex h-full w-full items-center justify-center">
                <span>21:9</span>
            </div>
        </AspectRatio>
    ),
};
