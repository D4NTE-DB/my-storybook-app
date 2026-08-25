import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './index';
const meta: Meta<typeof Avatar> = {
  title: 'Primitives/Avatar',
  component: Avatar,
};
export default meta;
type Story = StoryObj<typeof Avatar>;
export const Default: Story = { args: { id: 'avatar-1', text: 'JD', size: 'medium' } };
export const Small: Story = { args: { id: 'avatar-2', text: 'JD', size: 'small' } };
export const Icon: Story = { args: { id: 'avatar-3', type: 'icon', avatarIcon: 'account' } };
