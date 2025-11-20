import type { Preview } from '@storybook/react-vite'
import React from 'react'

const preview: Preview = {
  parameters: {
    // 控制 actions（自动捕获 onXxx 这类事件）
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    // 这里还可以配 layout、主题、viewport 等
    layout: 'centered', // 先让组件默认居中展示，看起来舒服一点

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
  // decorators：相当于给所有 story 包一层壳子（比如 ThemeProvider）
  decorators: [
    (Story) => (
      <div style={{ padding: 16 }}>
        <Story />
      </div>
    ),
  ],
};

export default preview;