import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
    '@storybook/addon-links',       // 在 Storybook 里跳转到其他 story
    '@storybook/addon-essentials',  // 包一堆常用的（controls、actions、docs、viewport 等）
    '@storybook/addon-interactions' // 交互测试用的，可以先不管
  ],
  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  },
  // 同步 Vite 的路径别名配置
  viteFinal: async (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(__dirname, '../src'),
    };
    return config;
  },
};
export default config;