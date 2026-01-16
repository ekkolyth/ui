import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";

import { Kbd, KbdGroup } from "./index";

const meta: Meta<React.ComponentProps<typeof Kbd>> = {
    title: "UI/Kbd",
    component: Kbd,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<React.ComponentProps<typeof Kbd>>;

export const Default: Story = {
    args: {
        children: "⌘",
    },
};

export const Key: Story = {
    args: {
        children: "K",
    },
};

export const Shortcut: Story = {
    render: () => (
        <KbdGroup>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
        </KbdGroup>
    ),
};

export const MultipleKeys: Story = {
    render: () => (
        <KbdGroup>
            <Kbd>⌘</Kbd>
            <Kbd>⇧</Kbd>
            <Kbd>K</Kbd>
        </KbdGroup>
    ),
};
