import type { Meta, StoryObj } from '@storybook/react';
import { QuantityStepper } from './index';
const meta: Meta<typeof QuantityStepper> = {
  title: 'Primitives/QuantityStepper',
  component: QuantityStepper,
};
export default meta;
type Story = StoryObj<typeof QuantityStepper>;
export const Default: Story = { args: { id: 'qs-1' } };
export const Disabled: Story = { args: { id: 'qs-2', disabled: true } };
