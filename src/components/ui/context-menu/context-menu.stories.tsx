import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";

import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuSeparator,
    ContextMenuTrigger,
} from "./index";

const meta: Meta<React.ComponentProps<typeof ContextMenu>> = {
    title: "UI/ContextMenu",
    component: ContextMenu,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<React.ComponentProps<typeof ContextMenu>>;

export const Default: Story = {
    render: () => (
        <ContextMenu>
            <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
                Right click here
            </ContextMenuTrigger>
            <ContextMenuContent className="w-64">
                <ContextMenuItem>Back</ContextMenuItem>
                <ContextMenuItem>Forward</ContextMenuItem>
                <ContextMenuItem>Reload</ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuLabel>More</ContextMenuLabel>
                <ContextMenuItem>Save Page As...</ContextMenuItem>
                <ContextMenuItem>Print...</ContextMenuItem>
                <ContextMenuItem>Cast...</ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    ),
};

export const WithDestructive: Story = {
    render: () => (
        <ContextMenu>
            <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
                Right click here
            </ContextMenuTrigger>
            <ContextMenuContent className="w-64">
                <ContextMenuItem>Edit</ContextMenuItem>
                <ContextMenuItem>Duplicate</ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    ),
};
