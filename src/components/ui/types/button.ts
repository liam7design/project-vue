export type ButtonVariant = 'filled' | 'outlined' | 'text' | 'tonal' | 'elevated' | 'flat'
export type ButtonColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
export type ButtonSize = 'x-small' | 'small' | 'default' | 'large' | 'x-large'
export type ButtonType = 'button' | 'submit' | 'reset'
export type IconPosition = 'left' | 'right'

export interface ButtonProps {
  variant?: ButtonVariant
  color?: ButtonColor
  size?: ButtonSize
  disabled?: boolean
  loading?: boolean
  rounded?: boolean
  block?: boolean
  flat?: boolean
  elevation?: number | boolean
  icon?: string
  iconPosition?: IconPosition
  href?: string
  target?: string
  rel?: string
  type?: ButtonType
  ripple?: boolean
  exact?: boolean
}

export interface ButtonEmits {
  click: [event: MouseEvent | KeyboardEvent]
}

