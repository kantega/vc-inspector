import type { Preview } from '@storybook/react';
import { Inter } from 'next/font/google';
import '../src/app/globals.css';
import React from 'react';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const preview: Preview = {
  decorators: [
    (Story) => (
      <div className={inter.className}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
