import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";

import { Calendar } from "./index";

const meta: Meta<React.ComponentProps<typeof Calendar>> = {
    title: "UI/Calendar",
    component: Calendar,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<React.ComponentProps<typeof Calendar>>;

export const Default: Story = {
    render: () => {
        const [date, setDate] = React.useState<Date | undefined>(new Date());
        return <Calendar mode="single" selected={date} onSelect={setDate} />;
    },
};

export const Multiple: Story = {
    render: () => {
        const [dates, setDates] = React.useState<Date[] | undefined>([]);
        return (
            <Calendar
                mode="multiple"
                selected={dates}
                onSelect={setDates}
            />
        );
    },
};

export const Range: Story = {
    render: () => {
        const [dateRange, setDateRange] = React.useState<
            { from: Date; to: Date } | undefined
        >();
        return (
            <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
            />
        );
    },
};
