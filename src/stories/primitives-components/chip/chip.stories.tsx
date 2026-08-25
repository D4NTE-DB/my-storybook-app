import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from './index';
const meta: Meta<typeof Chip> = {
  title: 'Primitives/Chip',
  component: Chip,
};
export default meta;
type Story = StoryObj<typeof Chip>;
export const Default: Story = { args: { id: 'chip-1', children: 'Category' } };
export const Outline: Story = { args: { id: 'chip-2', children: 'Filter', variant: 'outline' } };
export const Disabled: Story = { args: { id: 'chip-3', children: 'Disabled', disabled: true } };
