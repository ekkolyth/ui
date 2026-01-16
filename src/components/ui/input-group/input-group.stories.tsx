import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";
import { Search, Mail, Lock } from "lucide-react";

import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
} from "./index";
import { Button } from "@/src/components/ui/button";

const meta: Meta<React.ComponentProps<typeof InputGroup>> = {
    title: "UI/InputGroup",
    component: InputGroup,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<React.ComponentProps<typeof InputGroup>>;

export const Default: Story = {
    render: () => (
        <InputGroup>
            <InputGroupAddon>
                <Search />
            </InputGroupAddon>
            <InputGroupInput placeholder="Search..." />
        </InputGroup>
    ),
};

export const WithButton: Story = {
    render: () => (
        <InputGroup>
            <InputGroupInput placeholder="Enter email..." />
            <InputGroupAddon align="inline-end">
                <InputGroupButton>
                    <Button>Send</Button>
                </InputGroupButton>
            </InputGroupAddon>
        </InputGroup>
    ),
};

export const WithIcon: Story = {
    render: () => (
        <InputGroup>
            <InputGroupAddon>
                <Mail />
            </InputGroupAddon>
            <InputGroupInput type="email" placeholder="Email" />
        </InputGroup>
    ),
};

export const Password: Story = {
    render: () => (
        <InputGroup>
            <InputGroupAddon>
                <Lock />
            </InputGroupAddon>
            <InputGroupInput type="password" placeholder="Password" />
        </InputGroup>
    ),
};
