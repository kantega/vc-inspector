import { StoryObj, Meta } from '@storybook/react';
import NoticeBox from '@/app/components/notices/NoticeBox';

const meta = {
  title: 'Notices/NoticeBox',
  component: NoticeBox,
  tags: ['autodocs'],
} satisfies Meta<typeof NoticeBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'NoticeBox Title',
    children: 'NoticeBox content',
  },
};
