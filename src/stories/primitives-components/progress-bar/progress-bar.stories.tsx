import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from './index';
const meta: Meta<typeof ProgressBar> = {
  title: 'Primitives/ProgressBar',
  component: ProgressBar,
};
export default meta;
type Story = StoryObj<typeof ProgressBar>;
export const Default: Story = { args: { id: 'pb-1', progress: 50 } };
export const Complete: Story = { args: { id: 'pb-2', progress: 100 } };
