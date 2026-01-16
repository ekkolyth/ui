import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";

import { InputOTP, InputOTPGroup, InputOTPSlot } from "./index";

const meta: Meta<React.ComponentProps<typeof InputOTP>> = {
    title: "UI/InputOTP",
    component: InputOTP,
    tags: ["autodocs"],
    argTypes: {
        maxLength: {
            control: "number",
        },
    },
};

export default meta;
type Story = StoryObj<React.ComponentProps<typeof InputOTP>>;

export const Default: Story = {
    render: () => (
        <InputOTP maxLength={6}>
            <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
            </InputOTPGroup>
        </InputOTP>
    ),
};

export const FourDigits: Story = {
    render: () => (
        <InputOTP maxLength={4}>
            <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
            </InputOTPGroup>
        </InputOTP>
    ),
};
