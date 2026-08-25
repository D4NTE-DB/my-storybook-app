import type { Meta, StoryObj } from '@storybook/react';
import { BackToTop } from './index';
import React from 'react';
const meta: Meta<typeof BackToTop> = {
  title: 'Primitives/BackToTop',
  component: BackToTop,
};
export default meta;
type Story = StoryObj<typeof BackToTop>;
export const Default: Story = { 
  args: { id: 'btt-1' },
  render: (args) => (
    <div style={{ height: '200vh', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '10px' }}>Scroll down to see the button</div>
      <BackToTop {...args} />
    </div>
  )
};
