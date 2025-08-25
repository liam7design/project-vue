<template>
  <div
    class="v-icon"
    :class="iconWrapperClasses"
    :style="iconStyles"
    @click="handleClick"
  >
    <Icon
      :name="name"
      :class="iconClasses"
      :style="svgStyles"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Props 정의
interface Props {
  // 기본 속성
  name: string

  // 스타일
  size?: 'x-small' | 'small' | 'default' | 'large' | 'x-large' | number
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'inherit' | string
  variant?: 'filled' | 'outlined' | 'round' | 'sharp' | 'two-tone'

  // 기능
  clickable?: boolean
  disabled?: boolean
  loading?: boolean

  // 상태
  error?: boolean

  // 기타
}

const props = withDefaults(defineProps<Props>(), {
  name: '',
  size: 'default',
  color: 'inherit',
  variant: 'filled',
  clickable: false,
  disabled: false,
  loading: false,
  error: false
})

// Emits 정의
const emit = defineEmits<{
  'click': [event: MouseEvent]
}>()

// Computed 속성들
const iconWrapperClasses = computed(() => {
  return [
    'v-icon',
    `v-icon--${props.size}`,
    `v-icon--${props.variant}`,
    {
      'v-icon--clickable': props.clickable,
      'v-icon--disabled': props.disabled,
      'v-icon--loading': props.loading,
      'v-icon--error': props.error
    }
  ]
})

const iconClasses = computed(() => {
  return [
    'v-icon__svg',
    {
      'v-icon__svg--error': props.error
    }
  ]
})

const iconStyles = computed(() => {
  const styles: Record<string, string> = {}

  // 커스텀 크기
  if (typeof props.size === 'number') {
    styles.width = `${props.size}px`
    styles.height = `${props.size}px`
  }

  // 커스텀 색상
  if (props.color && !['primary', 'secondary', 'success', 'warning', 'error', 'info', 'inherit'].includes(props.color)) {
    styles.color = props.color
  }

  return styles
})

const svgStyles = computed(() => {
  const styles: Record<string, string> = {}

  // 로딩 애니메이션
  if (props.loading) {
    styles.animation = 'icon-spin 1s linear infinite'
  }

  return styles
})

// Methods
const handleClick = (event: MouseEvent) => {
  if (props.clickable && !props.disabled) {
    emit('click', event)
  }
}
</script>

<style scoped>
.v-icon {
  @apply inline-flex items-center justify-center;
  @apply transition-all duration-200;
}

/* 기본 크기 */
.v-icon--x-small {
  @apply w-4 h-4;
}

.v-icon--small {
  @apply w-5 h-5;
}

.v-icon--default {
  @apply w-6 h-6;
}

.v-icon--large {
  @apply w-8 h-8;
}

.v-icon--x-large {
  @apply w-10 h-10;
}

/* 변형 */
.v-icon--filled {
  @apply font-bold;
}

.v-icon--outlined {
  @apply font-normal;
}

.v-icon--round {
  @apply rounded-full;
}

.v-icon--sharp {
  @apply font-bold;
}

.v-icon--two-tone {
  @apply opacity-75;
}

/* SVG */
.v-icon__svg {
  @apply w-full h-full;
  @apply text-current;
}

.v-icon__svg--error {
  @apply text-red-500;
}

/* 색상 */
.v-icon--primary .v-icon__svg {
  @apply text-primary-500;
}

.v-icon--secondary .v-icon__svg {
  @apply text-gray-500;
}

.v-icon--success .v-icon__svg {
  @apply text-green-500;
}

.v-icon--warning .v-icon__svg {
  @apply text-yellow-500;
}

.v-icon--error .v-icon__svg {
  @apply text-red-500;
}

.v-icon--info .v-icon__svg {
  @apply text-blue-500;
}

.v-icon--inherit .v-icon__svg {
  @apply text-inherit;
}

/* 클릭 가능 */
.v-icon--clickable {
  @apply cursor-pointer;
}

.v-icon--clickable:hover {
  @apply transform scale-110;
}

.v-icon--clickable:active {
  @apply transform scale-95;
}

/* 비활성화 */
.v-icon--disabled {
  @apply cursor-not-allowed opacity-50;
}

.v-icon--disabled:hover {
  @apply transform-none;
}

/* 로딩 */
.v-icon--loading {
  @apply animate-pulse;
}

/* 스핀 애니메이션 */
@keyframes icon-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 호버 효과 */
.v-icon--clickable:hover .v-icon__svg {
  @apply opacity-80;
}

/* 포커스 스타일 */
.v-icon--clickable:focus {
  @apply outline-none ring-2 ring-offset-2 ring-primary-500;
}

/* 다크 모드 */
.dark .v-icon--secondary .v-icon__svg {
  @apply text-gray-400;
}

.dark .v-icon--inherit .v-icon__svg {
  @apply text-gray-200;
}
</style>
