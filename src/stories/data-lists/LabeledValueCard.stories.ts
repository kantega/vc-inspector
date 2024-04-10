import LabeledValueCard from '@/components/data-lists/LabeledValueCard';
import type { Meta, StoryObj } from '@storybook/react';
import { CircleUser } from 'lucide-react';

const meta = {
  title: 'DataLists/LabeledValueCard',
  component: LabeledValueCard,
  tags: ['autodocs'],
} satisfies Meta<typeof LabeledValueCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    titleIcon: CircleUser,
    title: 'Subject',
    values: [
      {
        label: 'Name',
        value: 'Person A',
      },
      {
        label: 'ID',
        value: 'Identifier A',
      },
    ],
  },
};

export const NoValues: Story = {
  args: {
    title: 'Issuer',
    values: [],
  },
};
