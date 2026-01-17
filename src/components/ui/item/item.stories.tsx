import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";
import { User, Settings } from "lucide-react";

import {
    Item,
    ItemMedia,
    ItemContent,
    ItemTitle,
    ItemDescription,
    ItemGroup,
    ItemActions,
} from "./index";
import { Button } from "@/components/ui/button";

const meta: Meta<React.ComponentProps<typeof Item>> = {
    title: "UI/Item",
    component: Item,
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: "select",
            options: ["default", "outline", "muted"],
        },
        size: {
            control: "select",
            options: ["default", "sm", "xs"],
        },
    },
};

export default meta;
type Story = StoryObj<React.ComponentProps<typeof Item>>;

export const Default: Story = {
    render: () => (
        <Item>
            <ItemMedia>
                <User />
            </ItemMedia>
            <ItemContent>
                <ItemTitle>John Doe</ItemTitle>
                <ItemDescription>Software Engineer</ItemDescription>
            </ItemContent>
        </Item>
    ),
};

export const WithActions: Story = {
    render: () => (
        <Item>
            <ItemMedia>
                <User />
            </ItemMedia>
            <ItemContent>
                <ItemTitle>John Doe</ItemTitle>
                <ItemDescription>Software Engineer</ItemDescription>
            </ItemContent>
            <ItemActions>
                <Button variant="ghost" size="icon-sm">
                    <Settings />
                </Button>
            </ItemActions>
        </Item>
    ),
};

export const Outline: Story = {
    render: () => (
        <Item variant="outline">
            <ItemMedia>
                <User />
            </ItemMedia>
            <ItemContent>
                <ItemTitle>John Doe</ItemTitle>
                <ItemDescription>Software Engineer</ItemDescription>
            </ItemContent>
        </Item>
    ),
};

export const Group: Story = {
    render: () => (
        <ItemGroup>
            <Item>
                <ItemMedia>
                    <User />
                </ItemMedia>
                <ItemContent>
                    <ItemTitle>John Doe</ItemTitle>
                    <ItemDescription>Software Engineer</ItemDescription>
                </ItemContent>
            </Item>
            <Item>
                <ItemMedia>
                    <User />
                </ItemMedia>
                <ItemContent>
                    <ItemTitle>Jane Smith</ItemTitle>
                    <ItemDescription>Product Manager</ItemDescription>
                </ItemContent>
            </Item>
        </ItemGroup>
    ),
};
