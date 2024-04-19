import ValidityDates from '@/components/vc-inspection/validity/ValidityDates';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'VC Inspection/Validity/Validity Dates',
  component: ValidityDates,
  tags: ['autodocs'],
} satisfies Meta<typeof ValidityDates>;

export default meta;
type Story = StoryObj<typeof meta>;

const dateBefore = new Date(2022, 0, 1, 10, 20);
const dateAfter = new Date(2025, 10, 2, 0, 4);

export const Default: Story = {
  args: {
    withinDates: true,
    validFrom: dateBefore,
    validUntil: dateAfter,
  },
};

export const NoDateBefore: Story = {
  args: {
    withinDates: true,
    validUntil: dateAfter,
  },
};

export const NoDateAfter: Story = {
  args: {
    withinDates: true,
    validFrom: dateBefore,
  },
};

export const NoDates: Story = {
  args: {
    withinDates: true,
  },
};

export const Invalid: Story = {
  args: {
    withinDates: false,
    validFrom: dateAfter,
  },
};
