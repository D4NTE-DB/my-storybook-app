import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './index';
const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
};
export default meta;
type Story = StoryObj<typeof Button>;
export const Default: Story = { args: { id: 'btn-1', children: 'Click Me', style: 'primary' } };
export const Secondary: Story = { args: { id: 'btn-2', children: 'Secondary Action', style: 'secondary' } };
export const Disabled: Story = { args: { id: 'btn-3', children: 'Disabled Button', disabled: true } };
