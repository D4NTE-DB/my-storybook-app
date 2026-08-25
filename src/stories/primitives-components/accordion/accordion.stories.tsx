import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './index';
const meta: Meta<typeof Accordion> = {
  title: 'Primitives/Accordion',
  component: Accordion,
};
export default meta;
type Story = StoryObj<typeof Accordion>;
export const Default: Story = { args: { id: 'accordion-1', title: 'Section Title', children: 'Accordion content goes here.' } };
export const Expanded: Story = { args: { id: 'accordion-2', title: 'Expanded Accordion', expanded: true, children: 'This is already expanded.' } };
export const Disabled: Story = { args: { id: 'accordion-3', title: 'Disabled Accordion', disabled: true, children: 'Cannot see this.' } };
