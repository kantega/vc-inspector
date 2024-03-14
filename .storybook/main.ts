import type { StorybookConfig } from '@storybook/nextjs';

import { join, resolve, dirname } from 'path';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}
const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-interactions'),
    getAbsolutePath('@storybook/addon-a11y'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/nextjs'),
    options: {},
  },
  // webpackFinal from https://stackoverflow.com/questions/77080353/using-next-js-imports-with-storybook
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@/public': resolve(__dirname, '../public'),
        '@': resolve(__dirname, '../src/app'),
      };
    }
    return config;
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../public'],
};
export default config;
