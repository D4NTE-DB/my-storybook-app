import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './index';
import React from 'react';
const meta: Meta<typeof Tooltip> = {
  title: 'Primitives/Tooltip',
  component: Tooltip,
};
export default meta;
type Story = StoryObj<typeof Tooltip>;
export const Default: Story = { 
  args: { text: 'This is a helpful tooltip' },
  render: (args) => (
    <div style={{ padding: '100px' }}>
      <Tooltip {...args}>
        <button style={{ padding: '8px 16px', cursor: 'pointer' }}>Hover Me</button>
      </Tooltip>
    </div>
  )
};
