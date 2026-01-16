import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";

import {
    Avatar,
    AvatarImage,
    AvatarFallback,
    AvatarGroup,
    AvatarBadge,
} from "./index";

const meta: Meta<React.ComponentProps<typeof Avatar>> = {
    title: "UI/Avatar",
    component: Avatar,
    tags: ["autodocs"],
    argTypes: {
        size: {
            control: "select",
            options: ["sm", "default", "lg"],
        },
    },
};

export default meta;
type Story = StoryObj<React.ComponentProps<typeof Avatar>>;

export const Default: Story = {
    render: () => (
        <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    ),
};

export const Small: Story = {
    render: () => (
        <Avatar size="sm">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    ),
};

export const Large: Story = {
    render: () => (
        <Avatar size="lg">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    ),
};

export const Fallback: Story = {
    render: () => (
        <Avatar>
            <AvatarFallback>JD</AvatarFallback>
        </Avatar>
    ),
};

export const WithBadge: Story = {
    render: () => (
        <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
            <AvatarBadge />
        </Avatar>
    ),
};

export const Group: Story = {
    render: () => (
        <AvatarGroup>
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
                <AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
                <AvatarFallback>VC</AvatarFallback>
            </Avatar>
            <Avatar>
                <AvatarFallback>+3</AvatarFallback>
            </Avatar>
        </AvatarGroup>
    ),
};
