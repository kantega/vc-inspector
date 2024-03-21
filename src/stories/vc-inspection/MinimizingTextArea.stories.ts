import type { Meta, StoryObj } from '@storybook/react';
import MinimizingTextArea from '@/components/vc-inspection/MinimizingTextArea';

const meta = {
  title: 'VC Inspection/MinimizingTextArea',
  component: MinimizingTextArea,
  tags: ['autodocs'],
} satisfies Meta<typeof MinimizingTextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    startHeight: 200,
    className: 'w-full',
  },
};

export const DefaultStartHeight: Story = {};

export const HeightFromClassNames: Story = {
  args: {
    className: 'h-20 w-full',
  },
};
