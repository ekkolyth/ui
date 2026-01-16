import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";

import { ScrollArea } from "./index";

const meta: Meta<React.ComponentProps<typeof ScrollArea>> = {
    title: "UI/ScrollArea",
    component: ScrollArea,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<React.ComponentProps<typeof ScrollArea>>;

export const Default: Story = {
    render: () => (
        <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
            <div className="space-y-2">
                {Array.from({ length: 20 }, (_, i) => (
                    <div key={i} className="text-sm">
                        Item {i + 1}
                    </div>
                ))}
            </div>
        </ScrollArea>
    ),
};

export const WithLongContent: Story = {
    render: () => (
        <ScrollArea className="h-[300px] w-[350px] rounded-md border p-4">
            <div className="space-y-4">
                {Array.from({ length: 50 }, (_, i) => (
                    <div key={i} className="text-sm">
                        <h4 className="font-semibold">Section {i + 1}</h4>
                        <p className="text-muted-foreground">
                            This is a longer content item that demonstrates scrolling
                            behavior.
                        </p>
                    </div>
                ))}
            </div>
        </ScrollArea>
    ),
};
