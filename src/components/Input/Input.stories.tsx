// src/components/Input/Input.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './index';
import { UserOutlined, SearchOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { useState, useRef } from 'react';
import { Button } from '../Button';

const meta: Meta<typeof Input> = {
  title: 'General/Input',
  component: Input,
  tags: ['autodocs'],

  argTypes: {
    onChange: { action: 'changed' },
    onValueChange: { action: 'valueChanged' },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    status: {
      control: { type: 'select' },
      options: [undefined, 'error', 'warning'],
    },
    allowClear: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

// 基础示例
export const Basic: Story = {
  args: {
    placeholder: '基础输入框',
  },
};

// 带默认值
export const WithDefaultValue: Story = {
  args: {
    defaultValue: '带默认值的输入框',
  },
};

// 不同尺寸
export const Small: Story = {
  args: {
    size: 'small',
    placeholder: 'Small 尺寸',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    placeholder: 'Medium 尺寸（默认）',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    placeholder: 'Large 尺寸',
  },
};

// 带前缀
export const WithPrefix: Story = {
  args: {
    prefix: <UserOutlined />,
    placeholder: '用户名',
  },
};

// 带后缀
export const WithSuffix: Story = {
  args: {
    suffix: <SearchOutlined />,
    placeholder: '搜索',
  },
};

// 前缀和后缀
export const WithPrefixAndSuffix: Story = {
  args: {
    prefix: <MailOutlined />,
    suffix: '@example.com',
    placeholder: '邮箱前缀',
  },
};

// 可清空
export const AllowClear: Story = {
  args: {
    allowClear: true,
    defaultValue: '可以清空的内容',
    placeholder: '可清空的输入框',
  },
  parameters: {
    docs: {
      description: {
        story: 'clear 时会触发 onChange，但事件对象是模拟的，仅建议读取 e.target.value'
      }
    }
  }
};

// 可清空带前缀
export const AllowClearWithPrefix: Story = {
  args: {
    allowClear: true,
    prefix: <SearchOutlined />,
    defaultValue: '搜索内容',
    placeholder: '带前缀的可清空输入框',
  },
};

// 错误状态
export const ErrorStatus: Story = {
  args: {
    status: 'error',
    value: '错误的输入内容',
    placeholder: '错误状态',
  },
};

// 警告状态
export const WarningStatus: Story = {
  args: {
    status: 'warning',
    value: '需要注意的内容',
    placeholder: '警告状态',
  },
};

// 错误状态带图标
export const ErrorWithIcon: Story = {
  args: {
    status: 'error',
    prefix: <MailOutlined />,
    value: 'invalid-email',
    placeholder: '邮箱格式错误',
  },
};

// 禁用状态
export const Disabled: Story = {
  args: {
    disabled: true,
    value: '禁用状态的输入框',
    placeholder: '禁用状态',
  },
};

// 禁用状态带前缀
export const DisabledWithPrefix: Story = {
  args: {
    disabled: true,
    prefix: <UserOutlined />,
    value: '禁用的用户名',
  },
};

// 密码输入框
export const Password: Story = {
  args: {
    type: 'password',
    prefix: <LockOutlined />,
    placeholder: '请输入密码',
  },
};

// 组合示例 - 大尺寸 + 前缀 + 可清空
export const CombinedLarge: Story = {
  args: {
    size: 'large',
    prefix: <SearchOutlined />,
    allowClear: true,
    defaultValue: '大尺寸搜索框',
    placeholder: '大尺寸、带前缀、可清空',
  },
};

// 组合示例 - 小尺寸 + 前后缀 + 可清空
export const CombinedSmall: Story = {
  args: {
    size: 'small',
    prefix: <MailOutlined />,
    suffix: '.com',
    allowClear: true,
    defaultValue: 'example',
    placeholder: '小尺寸、前后缀、可清空',
  },
};

// 网址输入
export const URLInput: Story = {
  args: {
    prefix: 'https://',
    suffix: <SearchOutlined />,
    allowClear: true,
    placeholder: 'www.example.com',
  },
};

// 数字输入
export const NumberInput: Story = {
  args: {
    type: 'number',
    placeholder: '请输入数字',
  },
};

// 邮箱输入
export const EmailInput: Story = {
  args: {
    type: 'email',
    prefix: <MailOutlined />,
    allowClear: true,
    placeholder: '请输入邮箱',
  },
};

// ==================== 特殊场景测试 ====================

// 非受控模式：defaultValue + allowClear
export const UncontrolledWithClear: Story = {
  args: {
    defaultValue: '非受控模式，可清空',
    allowClear: true,
    placeholder: 'defaultValue + allowClear',
  },
  parameters: {
    docs: {
      description: {
        story: '非受控模式使用 defaultValue，组件内部管理状态。点击清空按钮会清空内容。'
      }
    }
  }
};

// 受控模式：value + onChange + allowClear
export const ControlledWithClear: Story = {
  render: () => {
    const [value, setValue] = useState('受控模式，可清空');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          allowClear
          placeholder="value + onChange + allowClear"
        />
        <div style={{ fontSize: '12px', color: '#666' }}>
          当前值: "{value}"
        </div>
        <Button size="small" onClick={() => setValue('重置内容')}>
          重置为"重置内容"
        </Button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '受控模式使用 value + onChange，外部控制状态。清空按钮会触发 onChange 并清空内容。'
      }
    }
  }
};

// 有 suffix 时 allowClear 的表现（清空按钮优先级高于 suffix）
export const SuffixWithClearPriority: Story = {
  args: {
    prefix: <SearchOutlined />,
    suffix: <MailOutlined />,
    allowClear: true,
    defaultValue: '有值时清空按钮替代 suffix',
    placeholder: '输入内容后，suffix 被清空按钮替代',
  },
  parameters: {
    docs: {
      description: {
        story: '当 allowClear=true 且输入框有值时，清空按钮会替代 suffix 显示。清空后 suffix 重新出现。'
      }
    }
  }
};

// disabled + allowClear（清空按钮不应该显示/可点击）
export const DisabledWithAllowClear: Story = {
  args: {
    disabled: true,
    allowClear: true,
    defaultValue: '禁用状态，清空按钮不可用',
    placeholder: 'disabled + allowClear',
  },
  parameters: {
    docs: {
      description: {
        story: '禁用状态下，即使设置了 allowClear，清空按钮也不应该可点击（整个输入框都被禁用）。'
      }
    }
  }
};

// ref 示例：点击按钮自动 focus 到 Input
export const WithRefFocus: Story = {
  render: () => {
    const inputRef = useRef<HTMLInputElement>(null);
    
    const handleFocus = () => {
      inputRef.current?.focus();
    };
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Input
          ref={inputRef}
          prefix={<UserOutlined />}
          placeholder="点击下方按钮会自动 focus 到这里"
        />
        <Button onClick={handleFocus}>
          点击聚焦到输入框
        </Button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '使用 ref 可以获取输入框的 DOM 引用，从而进行 focus、blur 等操作。'
      }
    }
  }
};

// ref + 受控组件综合示例
export const RefWithControlled: Story = {
  render: () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState('');
    
    const handleFocus = () => {
      inputRef.current?.focus();
    };
    
    const handleClear = () => {
      setValue('');
      inputRef.current?.focus();
    };
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          prefix={<SearchOutlined />}
          allowClear
          placeholder="综合示例：ref + 受控"
        />
        <div style={{ fontSize: '12px', color: '#666' }}>
          当前值: "{value}" (长度: {value.length})
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button size="small" onClick={handleFocus}>
            聚焦
          </Button>
          <Button size="small" onClick={handleClear}>
            清空并聚焦
          </Button>
          <Button size="small" onClick={() => setValue('Hello World')}>
            设置为 "Hello World"
          </Button>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'ref 和受控模式结合使用，可以同时控制输入框的值和 DOM 行为。'
      }
    }
  }
};
