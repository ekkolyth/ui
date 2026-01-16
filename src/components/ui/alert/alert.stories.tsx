import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";
import { AlertCircle } from "lucide-react";

import { Alert, AlertTitle, AlertDescription, AlertAction } from "./index";

const meta: Meta<React.ComponentProps<typeof Alert>> = {
    title: "UI/Alert",
    component: Alert,
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: "select",
            options: ["default", "destructive"],
        },
    },
};

export default meta;
type Story = StoryObj<React.ComponentProps<typeof Alert>>;

export const Default: Story = {
    render: () => (
        <Alert>
            <AlertTitle>Alert Title</AlertTitle>
            <AlertDescription>
                This is a default alert with a title and description.
            </AlertDescription>
        </Alert>
    ),
};

export const Destructive: Story = {
    render: () => (
        <Alert variant="destructive">
            <AlertCircle />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                This is a destructive alert indicating an error.
            </AlertDescription>
        </Alert>
    ),
};

export const WithIcon: Story = {
    render: () => (
        <Alert>
            <AlertCircle />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
                You can add components to your app using the cli.
            </AlertDescription>
        </Alert>
    ),
};

export const WithAction: Story = {
    render: () => (
        <Alert>
            <AlertTitle>Alert Title</AlertTitle>
            <AlertDescription>
                This alert has an action button.
            </AlertDescription>
            <AlertAction>
                <button className="text-sm underline">Action</button>
            </AlertAction>
        </Alert>
    ),
};
