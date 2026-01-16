import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "./index";

const meta: Meta<React.ComponentProps<typeof Tabs>> = {
    title: "UI/Tabs",
    component: Tabs,
    tags: ["autodocs"],
    argTypes: {
        orientation: {
            control: "select",
            options: ["horizontal", "vertical"],
        },
    },
};

export default meta;
type Story = StoryObj<React.ComponentProps<typeof Tabs>>;

export const Default: Story = {
    render: () => (
        <Tabs defaultValue="account" className="w-[400px]">
            <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
                Make changes to your account here.
            </TabsContent>
            <TabsContent value="password">
                Change your password here.
            </TabsContent>
        </Tabs>
    ),
};

export const Line: Story = {
    render: () => (
        <Tabs defaultValue="account" className="w-[400px]">
            <TabsList variant="line">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
                Make changes to your account here.
            </TabsContent>
            <TabsContent value="password">
                Change your password here.
            </TabsContent>
            <TabsContent value="settings">
                Update your settings here.
            </TabsContent>
        </Tabs>
    ),
};

export const Vertical: Story = {
    render: () => (
        <Tabs defaultValue="account" orientation="vertical" className="w-[400px]">
            <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
                Make changes to your account here.
            </TabsContent>
            <TabsContent value="password">
                Change your password here.
            </TabsContent>
        </Tabs>
    ),
};
