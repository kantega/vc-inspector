import { StoryObj, Meta } from '@storybook/react';
import InfoBox from '@/components/notices/InfoBox';

const meta = {
  title: 'Notices/NoticeBox',
  component: InfoBox,
  tags: ['autodocs'],
} satisfies Meta<typeof InfoBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Information Title',
    children: 'Information box content',
  },
};

export const Neutral: Story = {
  args: {
    title: 'NoticeBox Title',
    children: 'NoticeBox content',
    messageType: 'neutral',
  },
};

export const Warning: Story = {
  args: {
    title: 'Warning about something',
    children: (
      <ul className="list-inside list-disc">
        <li>First item</li>
        <li>Second item</li>
      </ul>
    ),
    messageType: 'warning',
  },
};

export const Error: Story = {
  args: {
    title: 'Error message',
    children: 'An error appeared',
    messageType: 'error',
  },
};

export const Success: Story = {
  args: {
    title: 'Successful event message',
    children: 'Information on what went well',
    messageType: 'success',
  },
};
