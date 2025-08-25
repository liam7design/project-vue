<template>
  <div
    ref="accordionRef"
    class="v-accordion"
    :class="accordionClasses"
  >
    <!-- 헤더 -->
    <div
      v-if="title"
      class="v-accordion__header"
      :class="headerClasses"
    >
      <h3 class="v-accordion__title">{{ title }}</h3>
      <div class="v-accordion__actions">
        <slot name="actions" />
      </div>
    </div>

    <!-- 아이템들 -->
    <div class="v-accordion__items">
      <slot />
    </div>

    <!-- 푸터 -->
    <div
      v-if="$slots.footer"
      class="v-accordion__footer"
      :class="footerClasses"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'

// Props 정의
interface Props {
  // 기본 속성
  title?: string
  modelValue?: string | string[]
  multiple?: boolean

  // 스타일
  variant?: 'default' | 'bordered' | 'elevated' | 'flat'
  size?: 'small' | 'default' | 'large'
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'

  // 기능
  expandIcon?: string
  collapseIcon?: string
  animated?: boolean
  duration?: number

  // 상태
  disabled?: boolean
  loading?: boolean

  // 기타
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  modelValue: () => [],
  multiple: false,
  variant: 'default',
  size: 'default',
  color: 'primary',
  expandIcon: 'mdi:chevron-down',
  collapseIcon: 'mdi:chevron-up',
  animated: true,
  duration: 300,
  disabled: false,
  loading: false
})

// Emits 정의
const emit = defineEmits<{
  'update:modelValue': [value: string | string[]]
  'change': [value: string | string[]]
}>()

// Computed 속성들
const accordionClasses = computed(() => {
  return [
    'v-accordion',
    `v-accordion--${props.variant}`,
    `v-accordion--${props.size}`,
    `v-accordion--${props.color}`,
    {
      'v-accordion--disabled': props.disabled,
      'v-accordion--loading': props.loading,
      'v-accordion--multiple': props.multiple
    }
  ]
})

const headerClasses = computed(() => {
  return [
    'v-accordion__header'
  ]
})

const footerClasses = computed(() => {
  return [
    'v-accordion__footer'
  ]
})

// Accordion context 제공
const accordionContext = {
  // Props
  multiple: computed(() => props.multiple),
  variant: computed(() => props.variant),
  size: computed(() => props.size),
  color: computed(() => props.color),
  expandIcon: computed(() => props.expandIcon),
  collapseIcon: computed(() => props.collapseIcon),
  animated: computed(() => props.animated),
  duration: computed(() => props.duration),
  disabled: computed(() => props.disabled),
  loading: computed(() => props.loading),

  // State
  modelValue: computed(() => props.modelValue),

  // Methods
  toggleItem: (value: string) => {
    if (props.disabled || props.loading) return

    let newValue: string | string[]

    if (props.multiple) {
      const currentValues = Array.isArray(props.modelValue) ? props.modelValue : []
      const index = currentValues.indexOf(value)

      if (index > -1) {
        newValue = currentValues.filter(v => v !== value)
      } else {
        newValue = [...currentValues, value]
      }
    } else {
      const currentValue = Array.isArray(props.modelValue) ? props.modelValue[0] : props.modelValue
      newValue = currentValue === value ? '' : value
    }

    emit('update:modelValue', newValue)
    emit('change', newValue)
  },

  isItemOpen: (value: string) => {
    if (props.multiple) {
      return Array.isArray(props.modelValue) && props.modelValue.includes(value)
    } else {
      const currentValue = Array.isArray(props.modelValue) ? props.modelValue[0] : props.modelValue
      return currentValue === value
    }
  }
}

provide('accordion', accordionContext)
</script>

<style scoped>
.v-accordion {
  @apply w-full;
}

/* Variants */
.v-accordion--default {
  @apply space-y-2;
}

.v-accordion--bordered {
  @apply border border-gray-200 rounded-lg divide-y divide-gray-200;
}

.v-accordion--elevated {
  @apply space-y-2;
}

.v-accordion--flat {
  @apply space-y-1;
}

/* Sizes */
.v-accordion--small {
  @apply text-sm;
}

.v-accordion--default {
  @apply text-base;
}

.v-accordion--large {
  @apply text-lg;
}

/* Header */
.v-accordion__header {
  @apply flex items-center justify-between p-4;
}

.v-accordion--bordered .v-accordion__header {
  @apply border-b border-gray-200;
}

.v-accordion__title {
  @apply text-lg font-medium text-gray-900;
}

.v-accordion__actions {
  @apply flex items-center gap-2;
}

/* Items */
.v-accordion__items {
  @apply space-y-1;
}

.v-accordion--bordered .v-accordion__items {
  @apply space-y-0;
}

/* Footer */
.v-accordion__footer {
  @apply p-4 border-t border-gray-200;
}

.v-accordion--bordered .v-accordion__footer {
  @apply border-t border-gray-200;
}

/* Colors */
.v-accordion--primary .v-accordion__title {
  @apply text-primary-600;
}

.v-accordion--secondary .v-accordion__title {
  @apply text-gray-600;
}

.v-accordion--success .v-accordion__title {
  @apply text-green-600;
}

.v-accordion--warning .v-accordion__title {
  @apply text-yellow-600;
}

.v-accordion--error .v-accordion__title {
  @apply text-red-600;
}

.v-accordion--info .v-accordion__title {
  @apply text-blue-600;
}

/* Disabled state */
.v-accordion--disabled {
  @apply opacity-50 pointer-events-none;
}

/* Loading state */
.v-accordion--loading .v-accordion__items {
  @apply animate-pulse;
}

/* Dark mode */
.dark .v-accordion--bordered {
  @apply border-gray-700 divide-gray-700;
}

.dark .v-accordion__title {
  @apply text-gray-100;
}

.dark .v-accordion--bordered .v-accordion__header,
.dark .v-accordion--bordered .v-accordion__footer {
  @apply border-gray-700;
}

.dark .v-accordion--primary .v-accordion__title {
  @apply text-primary-400;
}

.dark .v-accordion--secondary .v-accordion__title {
  @apply text-gray-400;
}

.dark .v-accordion--success .v-accordion__title {
  @apply text-green-400;
}

.dark .v-accordion--warning .v-accordion__title {
  @apply text-yellow-400;
}

.dark .v-accordion--error .v-accordion__title {
  @apply text-red-400;
}

.dark .v-accordion--info .v-accordion__title {
  @apply text-blue-400;
}
</style>
