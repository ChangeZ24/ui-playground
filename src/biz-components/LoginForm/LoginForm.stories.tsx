// src/biz-components/LoginForm/LoginForm.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { LoginForm, type LoginFormValues } from './index';
import { useState } from 'react';

const meta: Meta<typeof LoginForm> = {
  title: 'Business/LoginForm',
  component: LoginForm,
  tags: ['autodocs'],
  
  argTypes: {
    onSubmit: { action: 'submitted' },
  },
  
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '登录表单组件，包含用户名、邮箱和密码输入框，支持表单验证和提交。'
      }
    }
  }
};

export default meta;

type Story = StoryObj<typeof LoginForm>;

// ==================== 基础用法 ====================

export const Basic: Story = {
  args: {
    onSubmit: (values) => {
      console.log('提交的数据:', values);
      alert(`登录成功！\n用户名: ${values.username}\n邮箱: ${values.email}`);
    }
  },
  parameters: {
    docs: {
      description: {
        story: '基础的登录表单，填写用户名、邮箱和密码后点击登录按钮。用户名有实时验证（trim 处理），为空时显示错误状态。'
      }
    }
  }
};

// ==================== 真实场景示例 ====================

// 带加载状态的登录表单
export const WithLoadingState: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    const handleSubmit = (values: LoginFormValues) => {
      setIsLoading(true);
      setError('');
      
      // 模拟 API 调用
      setTimeout(() => {
        setIsLoading(false);
        
        // 模拟登录失败
        if (values.username === 'error') {
          setError('用户名或密码错误');
        } else {
          alert(`登录成功！\n用户名: ${values.username}\n邮箱: ${values.email}`);
        }
      }, 1500);
    };
    
    return (
      <div style={{ width: 400 }}>
        <LoginForm onSubmit={handleSubmit} />
        
        {isLoading && (
          <div style={{ 
            marginTop: 16, 
            textAlign: 'center',
            color: '#1890ff',
            fontSize: 14
          }}>
            登录中...
          </div>
        )}
        
        {error && (
          <div style={{ 
            marginTop: 16, 
            padding: '8px 12px',
            backgroundColor: '#fff2f0',
            border: '1px solid #ffccc7',
            borderRadius: 4,
            color: '#cf1322',
            fontSize: 14
          }}>
            {error}
          </div>
        )}
        
        <div style={{ 
          marginTop: 16, 
          fontSize: 12, 
          color: '#999',
          textAlign: 'center'
        }}>
          提示：用户名输入 "error" 可以测试错误状态
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '带加载状态和错误提示的登录表单。提交后显示加载中状态，模拟 API 调用。可以测试成功和失败两种情况。'
      }
    }
  }
};

// 在页面布局中使用
export const InPageLayout: Story = {
  render: () => {
    const handleSubmit = (values: LoginFormValues) => {
      console.log('提交:', values);
      alert('登录成功！');
    };
    
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: 20
      }}>
        <div style={{
          width: 400,
          background: 'white',
          borderRadius: 12,
          padding: '40px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
        }}>
          <h1 style={{ 
            textAlign: 'center', 
            marginBottom: 32,
            fontSize: 28,
            color: '#333'
          }}>
            欢迎回来
          </h1>
          <LoginForm onSubmit={handleSubmit} />
          <div style={{
            marginTop: 24,
            textAlign: 'center',
            fontSize: 14,
            color: '#666'
          }}>
            还没有账号？ <a href="#" style={{ color: '#667eea' }}>立即注册</a>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: '在真实页面布局中使用登录表单，带渐变背景、卡片样式和注册链接。'
      }
    }
  }
};

// 多步骤表单中的一部分
export const InMultiStepForm: Story = {
  render: () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<LoginFormValues | null>(null);
    
    const handleLoginSubmit = (values: LoginFormValues) => {
      setFormData(values);
      setStep(2);
    };
    
    const handlePrevious = () => {
      setStep(1);
    };
    
    const handleComplete = () => {
      alert('注册完成！');
      setStep(1);
      setFormData(null);
    };
    
    return (
      <div style={{ width: 500, padding: 20 }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          marginBottom: 30
        }}>
          <div style={{ 
            flex: 1, 
            height: 4, 
            background: step >= 1 ? '#1890ff' : '#e8e8e8',
            borderRadius: 2
          }} />
          <div style={{ width: 10 }} />
          <div style={{ 
            flex: 1, 
            height: 4, 
            background: step >= 2 ? '#1890ff' : '#e8e8e8',
            borderRadius: 2
          }} />
        </div>
        
        {step === 1 && (
          <div>
            <h2 style={{ marginBottom: 24 }}>步骤 1: 基本信息</h2>
            <LoginForm onSubmit={handleLoginSubmit} />
          </div>
        )}
        
        {step === 2 && (
          <div>
            <h2 style={{ marginBottom: 24 }}>步骤 2: 确认信息</h2>
            <div style={{
              padding: 20,
              background: '#f5f5f5',
              borderRadius: 8,
              marginBottom: 20
            }}>
              <p><strong>用户名:</strong> {formData?.username}</p>
              <p><strong>邮箱:</strong> {formData?.email}</p>
              <p><strong>密码:</strong> ******</p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button 
                onClick={handlePrevious}
                style={{
                  flex: 1,
                  padding: '10px 20px',
                  border: '1px solid #d9d9d9',
                  borderRadius: 4,
                  background: 'white',
                  cursor: 'pointer'
                }}
              >
                上一步
              </button>
              <button 
                onClick={handleComplete}
                style={{
                  flex: 1,
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: 4,
                  background: '#1890ff',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                完成注册
              </button>
            </div>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '作为多步骤表单的一部分使用。第一步填写登录信息，第二步确认并提交。'
      }
    }
  }
};

// 带实时验证的表单
export const WithRealTimeValidation: Story = {
  render: () => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    
    const handleSubmit = (values: LoginFormValues) => {
      const newErrors: Record<string, string> = {};
      
      // 验证规则
      if (!values.username || String(values.username).trim().length < 3) {
        newErrors.username = '用户名至少需要3个字符';
      }
      
      if (!values.email || !String(values.email).includes('@')) {
        newErrors.email = '请输入有效的邮箱地址';
      }
      
      if (!values.password || String(values.password).length < 6) {
        newErrors.password = '密码至少需要6个字符';
      }
      
      setErrors(newErrors);
      
      if (Object.keys(newErrors).length === 0) {
        alert('验证通过，登录成功！');
        setErrors({});
      }
    };
    
    return (
      <div style={{ width: 400 }}>
        <LoginForm onSubmit={handleSubmit} />
        
        {Object.keys(errors).length > 0 && (
          <div style={{
            marginTop: 16,
            padding: 12,
            background: '#fff2f0',
            border: '1px solid #ffccc7',
            borderRadius: 4
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: 8, color: '#cf1322' }}>
              请修正以下错误：
            </div>
            {Object.entries(errors).map(([field, error]) => (
              <div key={field} style={{ fontSize: 14, color: '#cf1322', marginBottom: 4 }}>
                • {error}
              </div>
            ))}
          </div>
        )}
        
        <div style={{
          marginTop: 16,
          fontSize: 12,
          color: '#999',
          padding: 12,
          background: '#f0f0f0',
          borderRadius: 4
        }}>
          <strong>验证规则：</strong>
          <ul style={{ margin: '8px 0', paddingLeft: 20 }}>
            <li>用户名: 至少3个字符</li>
            <li>邮箱: 必须包含 @</li>
            <li>密码: 至少6个字符</li>
          </ul>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '带实时验证的登录表单。提交时会进行验证，并显示错误信息。'
      }
    }
  }
};

// 带记住密码功能
export const WithRememberMe: Story = {
  render: () => {
    const [rememberMe, setRememberMe] = useState(false);
    
    const handleSubmit = (values: LoginFormValues) => {
      console.log('登录数据:', values);
      console.log('记住密码:', rememberMe);
      alert(`登录成功！\n记住密码: ${rememberMe ? '是' : '否'}`);
    };
    
    return (
      <div style={{ width: 400 }}>
        <LoginForm onSubmit={handleSubmit} />
        
        <div style={{
          marginTop: 16,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              style={{ marginRight: 8 }}
            />
            <span style={{ fontSize: 14, color: '#666' }}>记住密码</span>
          </label>
          <a href="#" style={{ fontSize: 14, color: '#1890ff', textDecoration: 'none' }}>
            忘记密码？
          </a>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '带记住密码和忘记密码功能的登录表单。'
      }
    }
  }
};

