import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './index';
const meta: Meta<typeof Radio> = {
  title: 'Primitives/Radio',
  component: Radio,
};
export default meta;
type Story = StoryObj<typeof Radio>;
export const Default: Story = { args: { id: 'radio-1', name: 'option', label: 'Option A' } };
export const Checked: Story = { args: { id: 'radio-2', name: 'option', label: 'Option B', checked: true } };
export const Disabled: Story = { args: { id: 'radio-3', name: 'option', label: 'Option C', disabled: true } };
