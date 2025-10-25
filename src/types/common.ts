// 기본 색상 타입
export type Color = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'

// 기본 크기 타입
export type Size = 'x-small' | 'small' | 'default' | 'large' | 'x-large'

// 기본 변형 타입
export type Variant = 'filled' | 'outlined' | 'text' | 'tonal' | 'elevated' | 'flat'

// 아이콘 위치 타입
export type IconPosition = 'left' | 'right'

// 버튼 타입
export type ButtonType = 'button' | 'submit' | 'reset'

// 링크 타겟 타입
export type LinkTarget = '_blank' | '_self' | '_parent' | '_top'

// 상태 타입
export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

// 테마 타입
export type Theme = 'light' | 'dark'

// 언어 타입
export type Locale = 'ko' | 'en'

// 정렬 타입
export type Alignment = 'left' | 'center' | 'right' | 'justify'

// 방향 타입
export type Direction = 'horizontal' | 'vertical'

// 애니메이션 타입
export type Animation = 'fade' | 'slide' | 'scale' | 'rotate'

// 반응형 브레이크포인트
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

// API 응답 타입
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

// 페이지네이션 타입
export interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

// 정렬 타입
export interface SortConfig {
  field: string
  direction: 'asc' | 'desc'
}

// 필터 타입
export interface Filter {
  field: string
  value: string | number | boolean
  operator: 'eq' | 'ne' | 'gt' | 'lt' | 'gte' | 'lte' | 'contains' | 'startsWith' | 'endsWith'
}

// 검색 타입
export interface SearchConfig {
  query: string
  fields: string[]
}

// 파일 업로드 타입
export interface FileUpload {
  file: File
  progress: number
  status: 'pending' | 'uploading' | 'success' | 'error'
  url?: string
  error?: string
}

// 사용자 타입
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'admin' | 'user' | 'moderator'
  createdAt: string
  updatedAt: string
}

// 메뉴 아이템 타입
export interface MenuItem {
  id: string
  label: string
  icon?: string
  href?: string
  children?: MenuItem[]
  disabled?: boolean
  badge?: string | number
}

// 알림 타입
export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}


