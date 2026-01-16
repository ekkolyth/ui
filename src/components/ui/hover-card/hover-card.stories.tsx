import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "./index";

const meta: Meta<React.ComponentProps<typeof HoverCard>> = {
    title: "UI/HoverCard",
    component: HoverCard,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<React.ComponentProps<typeof HoverCard>>;

export const Default: Story = {
    render: () => (
        <HoverCard>
            <HoverCardTrigger asChild>
                <a href="#" className="text-sm font-medium underline">
                    @nextjs
                </a>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
                <div className="flex justify-between space-x-4">
                    <div className="space-y-1">
                        <h4 className="text-sm font-semibold">@nextjs</h4>
                        <p className="text-sm">
                            The React Framework – created and maintained by @vercel.
                        </p>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    ),
};
