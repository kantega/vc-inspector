import LabeledValueCard, { nested, node } from '@/components/data-lists/LabeledValueCard';
import type { Meta, StoryObj } from '@storybook/react';
import { CircleUser, FilePenLine } from 'lucide-react';

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
        value: node('Identifier A'),
      },
      {
        label: 'ID',
        value: node('123456'),
      },
    ],
  },
};

export const NoValues: Story = {
  args: {
    titleIcon: FilePenLine,
    title: 'Issuer',
    values: [],
  },
};

export const TwiceNested: Story = {
  args: {
    titleIcon: CircleUser,
    title: 'Subject',
    values: [
      {
        label: 'Name',
        value: node('Bob'),
      },
      {
        label: 'Degree',
        value: nested([
          {
            label: 'Type',
            value: node('Bachelor of Science'),
          },
          {
            label: 'Study',
            value: node('Computer Science'),
          },
        ]),
      },
      {
        label: 'Driving licence',
        value: nested([
          {
            label: 'Class',
            value: node('B'),
          },
          {
            label: 'Information',
            value: nested([
              {
                label: 'Issued',
                value: node('2015-01-01'),
              },
              {
                label: 'Expires',
                value: node('2025-01-01'),
              },
            ]),
          },
        ]),
      },
    ],
  },
};
