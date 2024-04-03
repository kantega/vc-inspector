import ValidityDates from '@/components/vc-inspection/validity/ValidityDates';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'VC Inspection/Validity/Validity Dates',
  component: ValidityDates,
  tags: ['autodocs'],
} satisfies Meta<typeof ValidityDates>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    valid: true,
  },
};
