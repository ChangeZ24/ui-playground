import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/Button'
import { Input } from './components/Input'
import { UserOutlined, SearchOutlined, MailOutlined, LockOutlined } from '@ant-design/icons'
import { LoginForm } from './biz-components/LoginForm'

function App() {
  const [count, setCount] = useState(0)
  const [value, setValue] = useState('')

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      
      <div className="card">
        <Button variant="primary" color="#99823f" size="small" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        
        <div style={{ marginTop: '40px', maxWidth: '600px', margin: '40px auto' }}>
          <h2>Input 组件示例</h2>
          
          {/* 基础用法 */}
          <section style={{ marginBottom: '30px' }}>
            <h3>基础用法</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Input placeholder="基础输入框" />
              <Input defaultValue="带默认值的输入框" />
            </div>
          </section>

          {/* 不同尺寸 */}
          <section style={{ marginBottom: '30px' }}>
            <h3>不同尺寸</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Input size="small" placeholder="Small 尺寸" />
              <Input size="medium" placeholder="Medium 尺寸（默认）" />
              <Input size="large" placeholder="Large 尺寸" />
              <Input size={48} placeholder="自定义高度 48px" />
            </div>
          </section>

          {/* 前缀和后缀 */}
          <section style={{ marginBottom: '30px' }}>
            <h3>前缀和后缀</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Input prefix={<UserOutlined />} placeholder="用户名" />
              <Input suffix={<SearchOutlined />} placeholder="搜索" />
              <Input 
                prefix={<MailOutlined />} 
                suffix="@example.com" 
                placeholder="邮箱前缀" 
              />
              <Input 
                prefix={<LockOutlined />} 
                type="password"
                placeholder="密码" 
              />
            </div>
          </section>

          {/* 可清空 */}
          <section style={{ marginBottom: '30px' }}>
            <h3>可清空</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Input allowClear placeholder="输入内容后显示清空按钮" />
              <Input 
                allowClear 
                defaultValue="有默认值，可以清空"
                placeholder="可清空的输入框" 
              />
              <Input 
                allowClear 
                prefix={<SearchOutlined />}
                placeholder="带前缀的可清空输入框"
              />
            </div>
          </section>

          {/* 受控组件 */}
          <section style={{ marginBottom: '30px' }}>
            <h3>受控组件</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Input 
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="受控输入框"
              />
              <div style={{ color: '#666', fontSize: '14px' }}>
                当前值: {value || '(空)'}
              </div>
              <Button size="small" onClick={() => setValue('')}>
                清空
              </Button>
            </div>
          </section>

          {/* 状态 */}
          <section style={{ marginBottom: '30px' }}>
            <h3>状态</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Input status="error" placeholder="错误状态" />
              <Input status="error" value="邮箱格式错误" prefix={<MailOutlined />} />
              <Input status="warning" placeholder="警告状态" />
              <Input status="warning" value="密码强度较弱" prefix={<LockOutlined />} />
            </div>
          </section>

          {/* 禁用状态 */}
          <section style={{ marginBottom: '30px' }}>
            <h3>禁用状态</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Input disabled placeholder="禁用状态" />
              <Input disabled value="禁用状态的输入框" />
              <Input 
                disabled 
                prefix={<UserOutlined />}
                value="带前缀的禁用输入框"
              />
            </div>
          </section>

          {/* 组合示例 */}
          <section style={{ marginBottom: '30px' }}>
            <h3>组合示例</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Input 
                size="large"
                prefix={<SearchOutlined />}
                allowClear
                placeholder="大尺寸、带前缀、可清空"
              />
              <Input 
                size="small"
                prefix={<MailOutlined />}
                suffix=".com"
                allowClear
                placeholder="小尺寸、前后缀、可清空"
              />
              <Input 
                prefix="https://"
                suffix={<SearchOutlined />}
                allowClear
                placeholder="网址输入"
              />
            </div>
          </section>

          {/* 事件回调 */}
          <section style={{ marginBottom: '30px' }}>
            <h3>事件回调</h3>
            <Input 
              prefix={<UserOutlined />}
              allowClear
              placeholder="输入时查看控制台"
              onChange={(e) => console.log('onChange:', e.target.value)}
              onValueChange={(val) => console.log('onValueChange:', val)}
            />
            <div style={{ color: '#666', fontSize: '12px', marginTop: '8px' }}>
              打开控制台查看 onChange 和 onValueChange 回调
            </div>
          </section>
        </div>

        <div style={{ marginTop: '40px', maxWidth: '600px', margin: '40px auto' }}>
          <LoginForm />
        </div>
        
      </div>
      
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
