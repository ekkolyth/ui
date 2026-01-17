import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";

import { Tooltip, TooltipContent, TooltipTrigger } from "./index";
import { Button } from "@/components/ui/button";

const meta: Meta<React.ComponentProps<typeof Tooltip>> = {
    title: "UI/Tooltip",
    component: Tooltip,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<React.ComponentProps<typeof Tooltip>>;

export const Default: Story = {
    render: () => (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant="outline">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>This is a tooltip</p>
            </TooltipContent>
        </Tooltip>
    ),
};

export const WithText: Story = {
    render: () => (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button>Hover for tooltip</Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>Add to library</p>
            </TooltipContent>
        </Tooltip>
    ),
};

export const LongContent: Story = {
    render: () => (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant="outline">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>
                    This is a longer tooltip message that wraps to multiple
                    lines
                </p>
            </TooltipContent>
        </Tooltip>
    ),
};
