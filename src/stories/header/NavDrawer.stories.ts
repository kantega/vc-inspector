import type { Meta, StoryObj } from '@storybook/react';
import NavDrawer from '@/components/header/NavDrawer';

const meta = {
  title: 'Header/NavDrawer',
  component: NavDrawer,
  tags: ['autodocs'],
} satisfies Meta<typeof NavDrawer>;

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
};

export const Empty: Story = {
  args: {
    currentPath: '/',
    links: [],
  },
};

export const NoPathMatch: Story = {
  args: {
    currentPath: '/no-match',
    links: [
      {
        to: '/',
        label: 'Home',
      },
      {
        to: '/about',
        label: 'About',
      },
      {
        to: '/info',
        label: 'Info',
      },
      {
        to: '/contact',
        label: 'Contact',
      },
    ],
  },
};
