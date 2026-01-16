import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "./index";

const meta: Meta<React.ComponentProps<typeof NavigationMenu>> = {
    title: "UI/NavigationMenu",
    component: NavigationMenu,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<React.ComponentProps<typeof NavigationMenu>>;

export const Default: Story = {
    render: () => (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <NavigationMenuLink>Introduction</NavigationMenuLink>
                        <NavigationMenuLink>Installation</NavigationMenuLink>
                        <NavigationMenuLink>Components</NavigationMenuLink>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <NavigationMenuLink>Button</NavigationMenuLink>
                        <NavigationMenuLink>Input</NavigationMenuLink>
                        <NavigationMenuLink>Card</NavigationMenuLink>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    ),
};
