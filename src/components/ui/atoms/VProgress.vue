<template>
  <div class="v-progress" :class="progressWrapperClasses">
    <!-- 라벨 -->
    <div
      v-if="label || showLabel"
      class="v-progress__header"
    >
      <label
        v-if="label"
        class="v-progress__label"
        :class="labelClasses"
      >
        {{ label }}
      </label>

      <!-- 진행률 표시 -->
      <span
        v-if="showValue"
        class="v-progress__value"
        :class="valueClasses"
      >
        {{ formattedValue }}
      </span>
    </div>

    <!-- 진행률 바 컨테이너 -->
    <div class="v-progress__container" :class="containerClasses">
      <!-- 배경 바 -->
      <div class="v-progress__background" :class="backgroundClasses" />

      <!-- 진행률 바 -->
      <div
        class="v-progress__bar"
        :class="barClasses"
        :style="barStyles"
      >
        <!-- 애니메이션 효과 -->
        <div
          v-if="indeterminate"
          class="v-progress__indeterminate"
          :class="indeterminateClasses"
        />

        <!-- 버퍼 바 -->
        <div
          v-if="bufferValue !== undefined"
          class="v-progress__buffer"
          :class="bufferClasses"
          :style="bufferStyles"
        />
      </div>
    </div>

    <!-- 하단 정보 -->
    <div
      v-if="hint || $slots.hint"
      class="v-progress__hint"
      :class="hintClasses"
    >
      <slot name="hint">
        {{ hint }}
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Props 정의
interface Props {
  // 기본 속성
  modelValue?: number
  label?: string
  showLabel?: boolean
  showValue?: boolean

  // 진행률 설정
  min?: number
  max?: number
  bufferValue?: number
  indeterminate?: boolean

  // 스타일
  size?: 'small' | 'default' | 'large'
  variant?: 'linear' | 'circular'
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
  thickness?: number

  // 기능
  striped?: boolean
  animated?: boolean
  rounded?: boolean

  // 유효성 검사
  error?: boolean
  errorMessage?: string
  hint?: string

  // 기타
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  label: '',
  showLabel: false,
  showValue: false,
  min: 0,
  max: 100,
  bufferValue: 0,
  indeterminate: false,
  size: 'default',
  variant: 'linear',
  color: 'primary',
  thickness: 4,
  striped: false,
  animated: true,
  rounded: true,
  error: false,
  errorMessage: '',
  hint: ''
})

// Emits 정의
const emit = defineEmits<{
  'update:modelValue': [value: number]
  'complete': []
}>()

// Computed 속성들
const progressWrapperClasses = computed(() => {
  return [
    'v-progress',
    `v-progress--${props.size}`,
    `v-progress--${props.variant}`,
    {
      'v-progress--error': props.error || !!props.errorMessage,
      'v-progress--indeterminate': props.indeterminate,
      'v-progress--striped': props.striped,
      'v-progress--animated': props.animated
    }
  ]
})

const labelClasses = computed(() => {
  return [
    'v-progress__label',
    {
      'v-progress__label--error': props.error || !!props.errorMessage
    }
  ]
})

const valueClasses = computed(() => {
  return [
    'v-progress__value',
    {
      'v-progress__value--error': props.error || !!props.errorMessage
    }
  ]
})

const containerClasses = computed(() => {
  return [
    'v-progress__container',
    {
      'v-progress__container--rounded': props.rounded,
      'v-progress__container--error': props.error || !!props.errorMessage
    }
  ]
})

const backgroundClasses = computed(() => {
  return [
    'v-progress__background',
    `v-progress__background--${props.color}`
  ]
})

const barClasses = computed(() => {
  return [
    'v-progress__bar',
    `v-progress__bar--${props.color}`,
    {
      'v-progress__bar--striped': props.striped,
      'v-progress__bar--animated': props.animated,
      'v-progress__bar--error': props.error || !!props.errorMessage
    }
  ]
})

const bufferClasses = computed(() => {
  return [
    'v-progress__buffer',
    `v-progress__buffer--${props.color}`
  ]
})

const indeterminateClasses = computed(() => {
  return [
    'v-progress__indeterminate',
    `v-progress__indeterminate--${props.color}`
  ]
})

const hintClasses = computed(() => {
  return [
    'v-progress__hint',
    {
      'v-progress__hint--error': props.error || !!props.errorMessage
    }
  ]
})

// 진행률 계산
const progressValue = computed(() => {
  if (props.indeterminate) return 0

  const value = Math.max(props.min, Math.min(props.max, props.modelValue))
  return ((value - props.min) / (props.max - props.min)) * 100
})

const bufferProgressValue = computed(() => {
  if (props.bufferValue === undefined) return 0

  const value = Math.max(props.min, Math.min(props.max, props.bufferValue))
  return ((value - props.min) / (props.max - props.min)) * 100
})

// 스타일 계산
const barStyles = computed(() => {
  if (props.indeterminate) return {}

  return {
    width: `${progressValue.value}%`,
    height: props.thickness ? `${props.thickness}px` : undefined
  }
})

const bufferStyles = computed(() => {
  if (props.bufferValue === undefined) return {}

  return {
    width: `${bufferProgressValue.value}%`
  }
})

// 포맷된 값
const formattedValue = computed(() => {
  if (props.indeterminate) return ''

  const percentage = Math.round(progressValue.value)
  return `${percentage}%`
})

// 완료 감지
const isComplete = computed(() => {
  return progressValue.value >= 100
})

// 완료 이벤트 감시
if (isComplete.value) {
  emit('complete')
}
</script>

<style scoped>
.v-progress {
  @apply relative w-full;
}

/* Header */
.v-progress__header {
  @apply flex items-center justify-between mb-2;
}

.v-progress__label {
  @apply text-sm font-medium text-gray-700;
}

.v-progress__label--error {
  @apply text-red-600;
}

.v-progress__value {
  @apply text-sm text-gray-500;
}

.v-progress__value--error {
  @apply text-red-500;
}

/* Container */
.v-progress__container {
  @apply relative w-full bg-gray-200 overflow-hidden;
}

.v-progress__container--rounded {
  @apply rounded-full;
}

.v-progress__container--error {
  @apply bg-red-100;
}

/* Background */
.v-progress__background {
  @apply absolute inset-0;
}

.v-progress__background--primary {
  @apply bg-primary-100;
}

.v-progress__background--secondary {
  @apply bg-gray-100;
}

.v-progress__background--success {
  @apply bg-green-100;
}

.v-progress__background--warning {
  @apply bg-yellow-100;
}

.v-progress__background--error {
  @apply bg-red-100;
}

.v-progress__background--info {
  @apply bg-blue-100;
}

/* Bar */
.v-progress__bar {
  @apply relative h-full transition-all duration-300 ease-out;
}

.v-progress__bar--primary {
  @apply bg-primary-500;
}

.v-progress__bar--secondary {
  @apply bg-gray-500;
}

.v-progress__bar--success {
  @apply bg-green-500;
}

.v-progress__bar--warning {
  @apply bg-yellow-500;
}

.v-progress__bar--error {
  @apply bg-red-500;
}

.v-progress__bar--info {
  @apply bg-blue-500;
}

/* Striped */
.v-progress__bar--striped {
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  );
  background-size: 1rem 1rem;
}

/* Animated */
.v-progress__bar--animated {
  animation: progress-bar-stripes 1s linear infinite;
}

@keyframes progress-bar-stripes {
  0% {
    background-position-x: 1rem;
  }
}

/* Buffer */
.v-progress__buffer {
  @apply absolute inset-0 opacity-30;
}

.v-progress__buffer--primary {
  @apply bg-primary-400;
}

.v-progress__buffer--secondary {
  @apply bg-gray-400;
}

.v-progress__buffer--success {
  @apply bg-green-400;
}

.v-progress__buffer--warning {
  @apply bg-yellow-400;
}

.v-progress__buffer--error {
  @apply bg-red-400;
}

.v-progress__buffer--info {
  @apply bg-blue-400;
}

/* Indeterminate */
.v-progress__indeterminate {
  @apply absolute inset-0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.3) 50%,
    transparent 100%
  );
  animation: indeterminate-progress 1.5s ease-in-out infinite;
}

.v-progress__indeterminate--primary {
  @apply bg-primary-500;
}

.v-progress__indeterminate--secondary {
  @apply bg-gray-500;
}

.v-progress__indeterminate--success {
  @apply bg-green-500;
}

.v-progress__indeterminate--warning {
  @apply bg-yellow-500;
}

.v-progress__indeterminate--error {
  @apply bg-red-500;
}

.v-progress__indeterminate--info {
  @apply bg-blue-500;
}

@keyframes indeterminate-progress {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* Hint */
.v-progress__hint {
  @apply mt-1 text-xs text-gray-500;
}

.v-progress__hint--error {
  @apply text-red-500;
}

/* Sizes */
.v-progress--small .v-progress__container {
  @apply h-1;
}

.v-progress--small .v-progress__label,
.v-progress--small .v-progress__value {
  @apply text-xs;
}

.v-progress--default .v-progress__container {
  @apply h-2;
}

.v-progress--large .v-progress__container {
  @apply h-3;
}

.v-progress--large .v-progress__label,
.v-progress--large .v-progress__value {
  @apply text-base;
}

/* Circular variant */
.v-progress--circular .v-progress__container {
  @apply w-16 h-16 rounded-full;
  @apply flex items-center justify-center;
}

.v-progress--circular .v-progress__bar {
  @apply absolute inset-0 rounded-full;
  @apply border-4 border-transparent;
  @apply border-t-current;
  @apply transform -rotate-90;
}

.v-progress--circular .v-progress__background {
  @apply border-4 border-gray-200 rounded-full;
}

.v-progress--circular .v-progress__value {
  @apply absolute text-sm font-medium;
}

/* Circular sizes */
.v-progress--circular.v-progress--small .v-progress__container {
  @apply w-12 h-12;
}

.v-progress--circular.v-progress--small .v-progress__bar {
  @apply border-2;
}

.v-progress--circular.v-progress--small .v-progress__background {
  @apply border-2;
}

.v-progress--circular.v-progress--large .v-progress__container {
  @apply w-24 h-24;
}

.v-progress--circular.v-progress--large .v-progress__bar {
  @apply border-4;
}

.v-progress--circular.v-progress--large .v-progress__background {
  @apply border-4;
}

.v-progress--circular.v-progress--large .v-progress__value {
  @apply text-lg;
}

/* Error states */
.v-progress--error .v-progress__bar {
  @apply bg-red-500;
}

.v-progress--error .v-progress__background {
  @apply bg-red-100;
}

/* Loading state */
.v-progress--indeterminate .v-progress__bar {
  @apply bg-gray-300;
}
</style>
