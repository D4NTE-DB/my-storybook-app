import type { Meta, StoryObj } from '@storybook/react';
import { Spacer } from './index';
import React from 'react';
const meta: Meta<typeof Spacer> = {
  title: 'Primitives/Spacer',
  component: Spacer,
};
export default meta;
type Story = StoryObj<typeof Spacer>;
export const Default: Story = { 
  args: { size: '16' },
  render: (args) => (
    <div>
      <div style={{background: 'lightgray', padding: '10px'}}>Item 1</div>
      <Spacer {...args} />
      <div style={{background: 'lightgray', padding: '10px'}}>Item 2</div>
    </div>
  )
};
