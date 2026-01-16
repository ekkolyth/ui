import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarProvider,
} from "./index";

const meta: Meta<React.ComponentProps<typeof Sidebar>> = {
    title: "UI/Sidebar",
    component: Sidebar,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<React.ComponentProps<typeof Sidebar>>;

export const Default: Story = {
    render: () => (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader>
                    <div className="px-4 py-2">
                        <h2 className="text-lg font-semibold">Sidebar</h2>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton>Home</SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton>Settings</SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton>Profile</SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarContent>
            </Sidebar>
        </SidebarProvider>
    ),
};
