import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";

import { RadioGroup, RadioGroupItem } from "./index";

const meta: Meta<React.ComponentProps<typeof RadioGroup>> = {
    title: "UI/RadioGroup",
    component: RadioGroup,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<React.ComponentProps<typeof RadioGroup>>;

export const Default: Story = {
    render: () => (
        <RadioGroup defaultValue="option-one">
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-one" id="option-one" />
                <label
                    htmlFor="option-one"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Option One
                </label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-two" id="option-two" />
                <label
                    htmlFor="option-two"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Option Two
                </label>
            </div>
        </RadioGroup>
    ),
};

export const Vertical: Story = {
    render: () => (
        <RadioGroup defaultValue="option-one" className="flex flex-col gap-4">
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-one" id="r1" />
                <label
                    htmlFor="r1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Option One
                </label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-two" id="r2" />
                <label
                    htmlFor="r2"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Option Two
                </label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-three" id="r3" />
                <label
                    htmlFor="r3"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Option Three
                </label>
            </div>
        </RadioGroup>
    ),
};

export const Disabled: Story = {
    render: () => (
        <RadioGroup defaultValue="option-one" disabled>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-one" id="d1" />
                <label
                    htmlFor="d1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Option One
                </label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-two" id="d2" />
                <label
                    htmlFor="d2"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Option Two
                </label>
            </div>
        </RadioGroup>
    ),
};
