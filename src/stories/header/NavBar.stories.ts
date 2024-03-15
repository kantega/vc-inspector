import type { Meta, StoryObj } from '@storybook/react';
import NavBar from '@/components/header/NavBar';

const meta = {
  title: 'Header/NavBar',
  component: NavBar,
  tags: ['autodocs'],
} satisfies Meta<typeof NavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPath: '/',
    links: [
      {
        to: '/',
        label: 'Home',
      },
      {
        to: '/about',
        label: 'About',
      },
    ],
  },
} satisfies Story;
