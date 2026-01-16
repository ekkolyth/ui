import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";
import { Search } from "lucide-react";

import {
    Command,
    CommandDialog,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
} from "./index";
import { Button } from "@/src/components/ui/button";

const meta: Meta<React.ComponentProps<typeof Command>> = {
    title: "UI/Command",
    component: Command,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<React.ComponentProps<typeof Command>>;

export const Default: Story = {
    render: () => (
        <Command className="rounded-lg border shadow-md max-w-[450px]">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                    <CommandItem>Calendar</CommandItem>
                    <CommandItem>Search Emoji</CommandItem>
                    <CommandItem>Calculator</CommandItem>
                </CommandGroup>
            </CommandList>
        </Command>
    ),
};

export const Dialog: Story = {
    render: () => {
        const [open, setOpen] = React.useState(false);
        return (
            <>
                <Button onClick={() => setOpen(true)}>Open Command</Button>
                <CommandDialog open={open} onOpenChange={setOpen}>
                    <CommandInput placeholder="Type a command or search..." />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading="Suggestions">
                            <CommandItem>Calendar</CommandItem>
                            <CommandItem>Search Emoji</CommandItem>
                            <CommandItem>Calculator</CommandItem>
                        </CommandGroup>
                    </CommandList>
                </CommandDialog>
            </>
        );
    },
};
