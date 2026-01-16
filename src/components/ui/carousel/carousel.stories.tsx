import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "./index";

const meta: Meta<React.ComponentProps<typeof Carousel>> = {
    title: "UI/Carousel",
    component: Carousel,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<React.ComponentProps<typeof Carousel>>;

export const Default: Story = {
    render: () => (
        <Carousel className="w-full max-w-xs">
            <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index}>
                        <div className="p-1">
                            <div className="flex aspect-square items-center justify-center p-6 border rounded-md">
                                <span className="text-4xl font-semibold">{index + 1}</span>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    ),
};

export const Vertical: Story = {
    render: () => (
        <Carousel orientation="vertical" className="w-full max-w-xs">
            <CarouselContent className="-mt-1 h-[200px]">
                {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index} className="pt-1 md:basis-1/2">
                        <div className="p-1">
                            <div className="flex aspect-square items-center justify-center p-6 border rounded-md">
                                <span className="text-4xl font-semibold">{index + 1}</span>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    ),
};
