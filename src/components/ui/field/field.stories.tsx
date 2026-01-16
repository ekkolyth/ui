import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";

import {
    Field,
    FieldLabel,
    FieldDescription,
    FieldError,
    FieldContent,
} from "./index";
import { Input } from "@/src/components/ui/input";
import { Checkbox } from "@/src/components/ui/checkbox";

const meta: Meta<React.ComponentProps<typeof Field>> = {
    title: "UI/Field",
    component: Field,
    tags: ["autodocs"],
    argTypes: {
        orientation: {
            control: "select",
            options: ["vertical", "horizontal", "responsive"],
        },
    },
};

export default meta;
type Story = StoryObj<React.ComponentProps<typeof Field>>;

export const Default: Story = {
    render: () => (
        <Field>
            <FieldLabel>Email</FieldLabel>
            <FieldContent>
                <Input type="email" placeholder="Enter your email" />
                <FieldDescription>
                    We&apos;ll never share your email with anyone else.
                </FieldDescription>
            </FieldContent>
        </Field>
    ),
};

export const Horizontal: Story = {
    render: () => (
        <Field orientation="horizontal">
            <FieldLabel>Email</FieldLabel>
            <FieldContent>
                <Input type="email" placeholder="Enter your email" />
            </FieldContent>
        </Field>
    ),
};

export const WithError: Story = {
    render: () => (
        <Field>
            <FieldLabel>Email</FieldLabel>
            <FieldContent>
                <Input type="email" aria-invalid="true" />
                <FieldError>Please enter a valid email address</FieldError>
            </FieldContent>
        </Field>
    ),
};

export const WithCheckbox: Story = {
    render: () => (
        <Field>
            <FieldLabel>
                <Checkbox id="terms" />
                Accept terms and conditions
            </FieldLabel>
        </Field>
    ),
};
