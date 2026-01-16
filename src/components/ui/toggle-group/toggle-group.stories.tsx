import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";
import { Bold, Italic, Underline } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "./index";

const meta: Meta<React.ComponentProps<typeof ToggleGroup>> = {
    title: "UI/ToggleGroup",
    component: ToggleGroup,
    tags: ["autodocs"],
    argTypes: {
        type: {
            control: "select",
            options: ["single", "multiple"],
        },
        variant: {
            control: "select",
            options: ["default", "outline"],
        },
        size: {
            control: "select",
            options: ["default", "sm", "lg"],
        },
    },
};

export default meta;
type Story = StoryObj<React.ComponentProps<typeof ToggleGroup>>;

export const Default: Story = {
    render: () => (
        <ToggleGroup type="single">
            <ToggleGroupItem value="bold" aria-label="Toggle bold">
                <Bold />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Toggle italic">
                <Italic />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Toggle underline">
                <Underline />
            </ToggleGroupItem>
        </ToggleGroup>
    ),
};

export const Multiple: Story = {
    render: () => (
        <ToggleGroup type="multiple">
            <ToggleGroupItem value="bold" aria-label="Toggle bold">
                <Bold />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Toggle italic">
                <Italic />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Toggle underline">
                <Underline />
            </ToggleGroupItem>
        </ToggleGroup>
    ),
};

export const Outline: Story = {
    render: () => (
        <ToggleGroup type="single" variant="outline">
            <ToggleGroupItem value="bold" aria-label="Toggle bold">
                <Bold />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Toggle italic">
                <Italic />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Toggle underline">
                <Underline />
            </ToggleGroupItem>
        </ToggleGroup>
    ),
};
