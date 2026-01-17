import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
    PopoverHeader,
    PopoverTitle,
    PopoverDescription,
} from "./index";
import { Button } from "@/components/ui/button";

const meta: Meta<React.ComponentProps<typeof Popover>> = {
    title: "UI/Popover",
    component: Popover,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<React.ComponentProps<typeof Popover>>;

export const Default: Story = {
    render: () => (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline">Open popover</Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverHeader>
                    <PopoverTitle>Are you absolutely sure?</PopoverTitle>
                    <PopoverDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                    </PopoverDescription>
                </PopoverHeader>
            </PopoverContent>
        </Popover>
    ),
};

export const Simple: Story = {
    render: () => (
        <Popover>
            <PopoverTrigger asChild>
                <Button>Open</Button>
            </PopoverTrigger>
            <PopoverContent>
                <p>Simple popover content</p>
            </PopoverContent>
        </Popover>
    ),
};
