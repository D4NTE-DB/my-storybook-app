import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './index';
const meta: Meta<typeof Toast> = {
  title: 'Primitives/Toast',
  component: Toast,
};
export default meta;
type Story = StoryObj<typeof Toast>;
export const Default: Story = { args: { message: 'Action completed successfully!' } };
export const ErrorToast: Story = { args: { message: 'An error occurred during save.' } };
