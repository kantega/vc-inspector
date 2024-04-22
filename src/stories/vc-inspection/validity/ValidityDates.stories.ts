import ValidityDates from '@/components/vc-inspection/validity/ValidityDates';
import { Meta, StoryObj } from '@storybook/react';
import { toSome, toNone } from '@inspector/calculatedAttributes/types';

const meta = {
  title: 'VC Inspection/Validity/Validity Dates',
  component: ValidityDates,
  tags: ['autodocs'],
} satisfies Meta<typeof ValidityDates>;

export default meta;
type Story = StoryObj<typeof meta>;

const dateBefore = toSome(new Date(2022, 0, 1, 10, 20));
const dateAfter = toSome(new Date(2025, 10, 2, 0, 4));

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
    validFrom: toNone('No date before'),
    validUntil: dateAfter,
  },
};

export const NoDateAfter: Story = {
  args: {
    withinDates: true,
    validFrom: dateBefore,
    validUntil: toNone('No date after'),
  },
};

export const NoDates: Story = {
  args: {
    withinDates: true,
    validFrom: toNone('No date before'),
    validUntil: toNone('No date after'),
  },
};

export const Invalid: Story = {
  args: {
    withinDates: false,
    validFrom: dateBefore,
    validUntil: dateAfter,
  },
};
