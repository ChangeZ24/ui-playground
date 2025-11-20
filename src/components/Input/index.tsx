import type { InputHTMLAttributes, ChangeEvent, ReactNode, CSSProperties } from 'react'
import { forwardRef } from 'react'
import { CloseCircleOutlined } from '@ant-design/icons'
import { useMergedState } from '../../hooks/useMergedState'
import './index.less'

export type InputValue = InputHTMLAttributes<HTMLInputElement>['value'];

interface BaseInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange' | 'size' | 'prefix'> {}

interface InputProps extends BaseInputProps {
  size?: 'small' | 'medium' | 'large' | number,
  prefix?: ReactNode,
  suffix?: ReactNode,
  allowClear?: boolean,
  status?: 'error' | 'warning',
  /** 外层容器的 className */
  wrapperClassName?: string,
  /** 外层容器的 style */
  wrapperStyle?: CSSProperties,
  value?: InputValue
  defaultValue?: InputValue
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  onValueChange?: (value: InputValue) => void
}

export const Input = forwardRef<HTMLInputElement, InputProps>((options, ref) => {
    console.log('render input')
    const { 
      value, 
      defaultValue, 
      onChange, 
      onValueChange,
      size,
      prefix,
      suffix,
      allowClear,
      status,
      wrapperClassName,
      wrapperStyle,
      ...rest 
    } = options;

    // 当外层传入value且value不为空时，认为组件处于受控状态
    // 更贴近原生 <input> 的感觉
    // value={undefined} 时可能悄悄变回非受控，不容易发现
    // const isControlled = value !== undefined;

    // 当options对象中包含value属性时，认为组件处于受控状态。
    // 严格、可预期、防止误切换受控/非受控模式。
    const isControlled = "value" in options;

    const [mergedValue, setMergedValue] = useMergedState<InputValue>({
        value,
        defaultValue,
        isControlled,
    })
    
    const handleClear = () => {
      setMergedValue('')
      // 构造一个模拟的事件对象
      // clear 时会触发 onChange，但事件对象是模拟的，仅建议读取 e.target.value
      const mockEvent = {
        target: { value: '' },
        currentTarget: { value: '' }
      } as ChangeEvent<HTMLInputElement>
      onChange?.(mockEvent)
      onValueChange?.('')
    }
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const data = e.target.value as InputValue
      console.log(data)
      setMergedValue(data)
      onChange?.(e)
      onValueChange?.(data)
    }
    
    // 获取 size 的 className 和自定义样式
    const getSizeClassName = () => {
      if (typeof size === 'number') {
        return ''
      }
      return `ui-input-${size || 'medium'}`
    }
    
    // 获取自定义尺寸的样式（仅当 size 为数字时）
    const getCustomSizeStyle = (): CSSProperties | undefined => {
      if (typeof size === 'number') {
        return {
          height: `${size}px`,
          padding: '0 12px',
          fontSize: `${Math.max(12, size * 0.35)}px`
        }
      }
      return undefined
    }
    
    // 渲染 suffix 的逻辑
    const renderSuffix = () => {
      // 判断是否有值（需要显示清空按钮）
      const hasValue = mergedValue !== undefined && mergedValue !== '' && mergedValue !== null
      
      // 如果 allowClear 为 true 且有值，优先展示清空按钮
      if (allowClear && hasValue) {
        return (
          <span className="ui-input-clear" onClick={handleClear}>
            <CloseCircleOutlined />
          </span>
        )
      }
      
      // 如果 allowClear 为 false 或没有值，展示自定义 suffix
      if (suffix) {
        return suffix
      }
      
      return null
    }
    
    const sizeClassName = getSizeClassName()
    const customSizeStyle = getCustomSizeStyle()
    const statusClassName = status ? `ui-input-${status}` : ''
    const containerClassName = `ui-input ${sizeClassName} ${statusClassName} ${rest.disabled ? 'ui-input-disabled' : ''} ${wrapperClassName || ''}`.trim()
    const suffixNode = renderSuffix();
  
    return (
      <div 
        className={containerClassName}
        style={{ ...customSizeStyle, ...wrapperStyle }}
      >
        {prefix && (
          <span className="ui-input-prefix">
            {prefix}
          </span>
        )}
        <input
          ref={ref} 
          {...rest} 
          className="ui-input-inner"
          value={mergedValue ?? ''} 
          onChange={handleChange}
        />
        {suffixNode && (
          <span className="ui-input-suffix">
            {suffixNode}
          </span>
        )}
      </div>
    )
})
Input.displayName = 'Input';