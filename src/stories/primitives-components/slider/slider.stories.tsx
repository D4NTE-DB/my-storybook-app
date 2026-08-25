import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from './index';
const meta: Meta<typeof Slider> = {
  title: 'Primitives/Slider',
  component: Slider,
};
export default meta;
type Story = StoryObj<typeof Slider>;
export const Default: Story = { args: { label: true, onChange: () => {} } };
