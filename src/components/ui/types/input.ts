export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'
export type InputVariant = 'outlined' | 'filled' | 'solo'
export type InputColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
export type InputSize = 'small' | 'default' | 'large'

export interface InputProps {
  modelValue?: string | number
  label?: string
  placeholder?: string
  type?: InputType
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  clearable?: boolean
  error?: boolean
  errorMessage?: string
  hint?: string
  maxlength?: number
  minlength?: number
  pattern?: string
  prependIcon?: string
  appendIcon?: string
  size?: InputSize
  variant?: InputVariant
  color?: InputColor
  name?: string
  autocomplete?: string
  autofocus?: boolean
  counter?: boolean
  id?: string
}

export interface InputEmits {
  'update:modelValue': [value: string]
  input: [value: string, event: Event]
  change: [value: string, event: Event]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  clear: []
}

