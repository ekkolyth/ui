import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as React from 'react';

import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './index';

const meta: Meta<React.ComponentProps<typeof ResizablePanelGroup>> = {
  title: 'UI/Resizable',
  component: ResizablePanelGroup,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<React.ComponentProps<typeof ResizablePanelGroup>>;

export const Default: Story = {
  render: () => (
    <ResizablePanelGroup className='max-w-md rounded-lg border'>
      <ResizablePanel defaultSize={50}>
        <div className='flex h-[200px] items-center justify-center p-6'>
          <span className='font-semibold'>One</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <div className='flex h-[200px] items-center justify-center p-6'>
          <span className='font-semibold'>Two</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const Vertical: Story = {
  render: () => (
    <ResizablePanelGroup
      direction='vertical'
      className='max-w-md rounded-lg border'
    >
      <ResizablePanel defaultSize={50}>
        <div className='flex h-[200px] items-center justify-center p-6'>
          <span className='font-semibold'>One</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <div className='flex h-[200px] items-center justify-center p-6'>
          <span className='font-semibold'>Two</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const WithHandle: Story = {
  render: () => (
    <ResizablePanelGroup
      direction='horizontal'
      className='max-w-md rounded-lg border'
    >
      <ResizablePanel defaultSize={50}>
        <div className='flex h-[200px] items-center justify-center p-6'>
          <span className='font-semibold'>One</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div className='flex h-[200px] items-center justify-center p-6'>
          <span className='font-semibold'>Two</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};
