import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";

import {
    Combobox,
    ComboboxInput,
    ComboboxContent,
    ComboboxList,
    ComboboxItem,
} from "./index";

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
            <ComboboxInput placeholder="Select framework..." />
            <ComboboxContent>
                <ComboboxList>
                    <ComboboxItem value="react">React</ComboboxItem>
                    <ComboboxItem value="vue">Vue</ComboboxItem>
                    <ComboboxItem value="angular">Angular</ComboboxItem>
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    ),
};
