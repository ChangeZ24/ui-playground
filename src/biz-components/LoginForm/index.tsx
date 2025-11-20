import { useState } from 'react';
import { Input, type InputValue } from "@/components/Input";
import { Button } from "@/components/Button";
import { MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import './index.less';

export interface LoginFormValues {
    username: InputValue;
    email: InputValue;
    password: InputValue;
}

export interface LoginFormProps {
    onSubmit?: (values: LoginFormValues) => void;
}

export const LoginForm = ({onSubmit}: LoginFormProps) => {
  const [username, setUsername] = useState<InputValue>('')
  
  const isEmpty = !username;

  const handleUsernameChange = (value: InputValue) => {
    const name = value ? (value as string).trim() : '';
    setUsername(name)
  }

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // 混合获取表单数据：重要字段用 state，其他字段用 FormData
    const formData = new FormData(event.currentTarget);
    const data: LoginFormValues = {
      username,
      email: formData.get('email') as InputValue,
      password: formData.get('password') as InputValue,
    };
    
    onSubmit?.(data);

    console.log('提交的表单数据:', data);
  }

  return (
    <form onSubmit={handleLogin} name="login-form" className="login-form">
        <div className="login-form-title">登录Form</div>
        <div className="login-form-item">
            <label className="login-form-item-label" htmlFor="username">
                用户名
            </label>
            <Input
                id="username"
                name="username"
                wrapperStyle={{ width: 250 }}
                value={username}
                status={isEmpty ? 'error' : undefined}
                onValueChange={handleUsernameChange}
                placeholder="请输入用户名"
                prefix={<UserOutlined />}
            />
        </div>
        <div className="login-form-item">
            <label className="login-form-item-label" htmlFor="email">
                邮箱
            </label>
            <Input
                id="email"
                name="email"
                wrapperStyle={{ width: 250 }}
                placeholder="请输入邮箱"
                type="email" 
                prefix={<MailOutlined />}
            />
        </div>
        <div className="login-form-item">
            <label className="login-form-item-label" htmlFor="password">
                密码
            </label>
            <Input
                id="password"
                name="password"
                wrapperStyle={{ width: 250 }}
                placeholder="请输入密码"
                type="password" 
                prefix={<LockOutlined />}
            />
        </div>
        <Button
            type="submit"
            variant="primary"
            style={{ marginTop: 12 }}
        >登录</Button>
    </form>
  )
}