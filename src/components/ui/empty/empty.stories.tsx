import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";
import { Inbox } from "lucide-react";

import {
    Empty,
    EmptyHeader,
    EmptyTitle,
    EmptyDescription,
    EmptyContent,
    EmptyMedia,
} from "./index";

const meta: Meta<React.ComponentProps<typeof Empty>> = {
    title: "UI/Empty",
    component: Empty,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<React.ComponentProps<typeof Empty>>;

export const Default: Story = {
    render: () => (
        <Empty>
            <EmptyHeader>
                <EmptyMedia>
                    <Inbox />
                </EmptyMedia>
                <EmptyTitle>No items found</EmptyTitle>
                <EmptyDescription>
                    Get started by creating a new item.
                </EmptyDescription>
            </EmptyHeader>
        </Empty>
    ),
};

export const WithIcon: Story = {
    render: () => (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <Inbox />
                </EmptyMedia>
                <EmptyTitle>No items found</EmptyTitle>
                <EmptyDescription>
                    Get started by creating a new item.
                </EmptyDescription>
            </EmptyHeader>
        </Empty>
    ),
};
