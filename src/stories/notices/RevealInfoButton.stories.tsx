import { StoryObj, Meta } from '@storybook/react';
import RevealInfoButton from '@/components/notices/RevealInfoButton';
import { Eye } from 'lucide-react';

const meta = {
  title: 'Notices/RevealInfoButton',
  component: RevealInfoButton,
  tags: ['autodocs'],
} satisfies Meta<typeof RevealInfoButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Show content',
    children: 'Content is now showing',
  },
};

export const WithHideButton: Story = {
  args: {
    label: 'Show content',
    children: 'Content is now showing',
    showHideButton: true,
  },
};

export const LabelWithIcon: Story = {
  args: {
    className: 'font-bold',
    label: (
      <div className="flex gap-2">
        <Eye />
        Show
      </div>
    ),
    children: 'Content is now showing',
    showHideButton: true,
  },
};
