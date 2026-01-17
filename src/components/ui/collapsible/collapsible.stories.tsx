import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./index";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";

const meta: Meta<React.ComponentProps<typeof Collapsible>> = {
    title: "UI/Collapsible",
    component: Collapsible,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<React.ComponentProps<typeof Collapsible>>;

export const Default: Story = {
    render: () => {
        const [open, setOpen] = React.useState(false);
        return (
            <Collapsible
                open={open}
                onOpenChange={setOpen}
                className="w-[350px] space-y-2"
            >
                <div className="flex items-center justify-between space-x-4 px-4">
                    <h4 className="text-sm font-semibold">
                        @peduarte starred 3 repositories
                    </h4>
                    <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="icon-sm">
                            <ChevronDownIcon className="h-4 w-4" />
                            <span className="sr-only">Toggle</span>
                        </Button>
                    </CollapsibleTrigger>
                </div>
                <div className="rounded-md border px-4 py-3 font-mono text-sm">
                    @radix-ui/primitives
                </div>
                <CollapsibleContent className="space-y-2">
                    <div className="rounded-md border px-4 py-3 font-mono text-sm">
                        @radix-ui/colors
                    </div>
                    <div className="rounded-md border px-4 py-3 font-mono text-sm">
                        @stitches/react
                    </div>
                </CollapsibleContent>
            </Collapsible>
        );
    },
};
