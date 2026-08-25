import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './index';
const meta: Meta<typeof Checkbox> = {
  title: 'Primitives/Checkbox',
  component: Checkbox,
};
export default meta;
type Story = StoryObj<typeof Checkbox>;
export const Default: Story = { args: { id: 'cb-1', label: 'Accept Terms and Conditions' } };
export const Checked: Story = { args: { id: 'cb-2', label: 'Opt-in for newsletter', checked: true } };
export const Disabled: Story = { args: { id: 'cb-3', label: 'Unavailable option', disabled: true } };
