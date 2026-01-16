import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";
import { toast } from "sonner";

import { Toaster } from "./index";
import { Button } from "@/src/components/ui/button";

const meta: Meta<React.ComponentProps<typeof Toaster>> = {
    title: "UI/Sonner",
    component: Toaster,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<React.ComponentProps<typeof Toaster>>;

export const Default: Story = {
    render: () => (
        <>
            <Toaster />
            <div className="space-x-2">
                <Button
                    onClick={() => toast("Event has been created", { description: "Sunday, December 03, 2023 at 9:00 AM" })}
                >
                    Show Toast
                </Button>
                <Button
                    variant="outline"
                    onClick={() => toast.success("Success!", { description: "Your changes have been saved." })}
                >
                    Success
                </Button>
                <Button
                    variant="destructive"
                    onClick={() => toast.error("Error!", { description: "Something went wrong." })}
                >
                    Error
                </Button>
            </div>
        </>
    ),
};
