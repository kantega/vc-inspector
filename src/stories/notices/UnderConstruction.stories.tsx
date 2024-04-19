import UnderConstruction from '@/components/notices/UnderConstruction';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Notices/UnderConstruction',
  component: UnderConstruction,
  tags: ['autodocs'],
} satisfies Meta<typeof UnderConstruction>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Small: Story = {
  args: {
    size: 'small',
  },
};
export const Medium: Story = {
  args: {
    size: 'medium',
  },
};
export const Large: Story = {
  args: {
    size: 'large',
  },
};
