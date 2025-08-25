export type CardVariant = 'elevated' | 'outlined' | 'flat' | 'tonal'
export type CardColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
export type CardSize = 'small' | 'default' | 'large'

export interface CardProps {
  title?: string
  subtitle?: string
  image?: string
  imageAlt?: string
  variant?: CardVariant
  color?: CardColor
  size?: CardSize
  flat?: boolean
  rounded?: boolean
  loading?: boolean
  imageHeight?: string | number
  imageWidth?: string | number
  href?: string
  target?: string
  rel?: string
  tag?: string
  elevation?: number | boolean
}

