import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";

import { Combobox, ComboboxTrigger, ComboboxValue, ComboboxContent, ComboboxItem } from "./index";
import { Button } from "@/src/components/ui/button";

const meta: Meta<React.ComponentProps<typeof Combobox>> = {
    title: "UI/Combobox",
    component: Combobox,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<React.ComponentProps<typeof Combobox>>;

export const Default: Story = {
    render: () => (
        <Combobox>
            <ComboboxTrigger asChild>
                <Button variant="outline">
                    <ComboboxValue placeholder="Select framework..." />
                </Button>
            </ComboboxTrigger>
            <ComboboxContent>
                <ComboboxItem value="react">React</ComboboxItem>
                <ComboboxItem value="vue">Vue</ComboboxItem>
                <ComboboxItem value="angular">Angular</ComboboxItem>
            </ComboboxContent>
        </Combobox>
    ),
};
