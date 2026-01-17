import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./index";
import { Button } from "@/components/ui/button";

const meta: Meta<React.ComponentProps<typeof Dialog>> = {
    title: "UI/Dialog",
    component: Dialog,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<React.ComponentProps<typeof Dialog>>;

export const Default: Story = {
    render: () => (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button type="submit">Confirm</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    ),
};

export const Simple: Story = {
    render: () => (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Open</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Simple Dialog</DialogTitle>
                    <DialogDescription>
                        This is a simple dialog with minimal content.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    ),
};
