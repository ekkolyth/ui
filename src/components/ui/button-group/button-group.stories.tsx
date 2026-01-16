import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";

import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "./index";
import { Button } from "@/src/components/ui/button";

const meta: Meta<React.ComponentProps<typeof ButtonGroup>> = {
    title: "UI/ButtonGroup",
    component: ButtonGroup,
    tags: ["autodocs"],
    argTypes: {
        orientation: {
            control: "select",
            options: ["horizontal", "vertical"],
        },
    },
};

export default meta;
type Story = StoryObj<React.ComponentProps<typeof ButtonGroup>>;

export const Default: Story = {
    render: () => (
        <ButtonGroup>
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
        </ButtonGroup>
    ),
};

export const WithSeparator: Story = {
    render: () => (
        <ButtonGroup>
            <Button>One</Button>
            <ButtonGroupSeparator />
            <Button>Two</Button>
            <ButtonGroupSeparator />
            <Button>Three</Button>
        </ButtonGroup>
    ),
};

export const WithText: Story = {
    render: () => (
        <ButtonGroup>
            <Button>Action</Button>
            <ButtonGroupSeparator />
            <ButtonGroupText>Text</ButtonGroupText>
        </ButtonGroup>
    ),
};

export const Vertical: Story = {
    render: () => (
        <ButtonGroup orientation="vertical">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
        </ButtonGroup>
    ),
};
