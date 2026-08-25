import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './index';
const meta: Meta<typeof Link> = {
  title: 'Primitives/Link',
  component: Link,
};
export default meta;
type Story = StoryObj<typeof Link>;
export const Default: Story = { args: { id: 'link-1', label: 'Learn more about this feature', url: '#' } };
export const Disabled: Story = { args: { id: 'link-2', label: 'Unavailable link', url: '#', disabled: true } };
