import type { FC, CSSProperties, ButtonHTMLAttributes} from 'react'

export interface ButtonProps  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary'
  size?: 'small' | 'medium' | 'large'
}

export const Button: FC<ButtonProps> = ({
  color = '#007bff',
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  ...rest
}) => {
  // 根据variant定义不同的样式
  const variantStyles: Record<string, CSSProperties> = {
    primary: {
      backgroundColor: color || '#007bff',
      color: 'white',
      border: 'none',
      fontWeight: 'bold'
    },
    secondary: {
      backgroundColor: color || '#6c757d',
      color: 'white',
      border: 'none'
    },
    tertiary: {
      backgroundColor: 'transparent',
      color: color || '#007bff',
      border: `2px solid ${color || '#007bff'}`
    }
  }

  // 根据size定义不同的尺寸
  const sizeStyles: Record<string, CSSProperties> = {
    small: {
      padding: '6px 12px',
      fontSize: '14px'
    },
    medium: {
      padding: '10px 20px',
      fontSize: '16px'
    },
    large: {
      padding: '14px 28px',
      fontSize: '18px'
    }
  }

  const buttonStyle: CSSProperties = {
    ...rest.style,
    ...variantStyles[variant],
    ...sizeStyles[size],
    borderRadius: '4px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    transition: 'all 0.2s ease'
  }

  return  <button {...rest} style={buttonStyle} />
}