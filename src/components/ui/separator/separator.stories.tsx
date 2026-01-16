import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";

import { Separator } from "./index";

const meta: Meta<React.ComponentProps<typeof Separator>> = {
    title: "UI/Separator",
    component: Separator,
    tags: ["autodocs"],
    argTypes: {
        orientation: {
            control: "select",
            options: ["horizontal", "vertical"],
        },
        decorative: {
            control: "boolean",
        },
    },
};

export default meta;
type Story = StoryObj<React.ComponentProps<typeof Separator>>;

export const Horizontal: Story = {
    args: {
        orientation: "horizontal",
    },
};

export const Vertical: Story = {
    args: {
        orientation: "vertical",
    },
    render: (args) => (
        <div className="flex h-20 items-center gap-4">
            <div>Left</div>
            <Separator {...args} />
            <div>Right</div>
        </div>
    ),
};

export const InContent: Story = {
    render: () => (
        <div className="space-y-4">
            <div>Content above</div>
            <Separator />
            <div>Content below</div>
        </div>
    ),
};
