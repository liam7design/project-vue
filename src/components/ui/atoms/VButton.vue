<template>
  <component
    :is="tag"
    :class="buttonClasses"
    :disabled="disabled || loading"
    :type="type"
    :href="href"
    :target="target"
    :rel="rel"
    @click="handleClick"
    @keydown.enter="handleClick"
    @keydown.space="handleClick"
  >
    <div class="v-button__content">
      <Icon
        v-if="loading"
        name="mdi:loading"
        class="v-button__loader animate-spin"
        :class="loaderClasses"
      />
      <Icon
        v-else-if="icon"
        :name="icon"
        class="v-button__icon"
        :class="iconClasses"
      />
      <span v-if="hasDefaultSlot" class="v-button__text">
        <slot />
      </span>
    </div>
    <div v-if="ripple" class="v-button__ripple" />
  </component>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'

interface Props {
  variant?: 'filled' | 'outlined' | 'text' | 'tonal' | 'elevated' | 'flat'
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
  size?: 'x-small' | 'small' | 'default' | 'large' | 'x-large'
  disabled?: boolean
  loading?: boolean
  rounded?: boolean
  block?: boolean
  flat?: boolean
  elevation?: number | boolean
  icon?: string
  iconPosition?: 'left' | 'right'
  href?: string
  target?: string
  rel?: string
  type?: 'button' | 'submit' | 'reset'
  ripple?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'filled',
  color: 'primary',
  size: 'default',
  disabled: false,
  loading: false,
  rounded: false,
  block: false,
  flat: false,
  elevation: false,
  icon: '',
  iconPosition: 'left',
  type: 'button',
  ripple: true,
  href: '',
  target: '',
  rel: ''
})

const emit = defineEmits<{
  click: [event: MouseEvent | KeyboardEvent]
}>()

const slots = useSlots()
const hasDefaultSlot = computed(() => !!slots.default)

const tag = computed(() => props.href ? 'a' : 'button')

const buttonClasses = computed(() => [
  'v-button',
  `v-button--${props.variant}`,
  `v-button--${props.color}`,
  `v-button--${props.size}`,
  {
    'v-button--disabled': props.disabled,
    'v-button--loading': props.loading,
    'v-button--rounded': props.rounded,
    'v-button--block': props.block,
    'v-button--flat': props.flat,
    'v-button--elevated': props.elevation,
    'v-button--icon-only': !hasDefaultSlot.value && props.icon
  }
])

const iconClasses = computed(() => [
  'v-button__icon',
  {
    'v-button__icon--right': props.iconPosition === 'right'
  }
])

const loaderClasses = computed(() => [
  'v-button__loader',
  {
    'v-button__loader--right': props.iconPosition === 'right'
  }
])

const handleClick = (event: MouseEvent | KeyboardEvent) => {
  if (props.disabled || props.loading) {
    event.preventDefault()
    return
  }
  emit('click', event)
}
</script>

<style scoped>
.v-button {
  @apply relative inline-flex items-center justify-center font-medium transition-all duration-200 ease-in-out cursor-pointer select-none;
  @apply focus:outline-none focus:ring-2 focus:ring-offset-2;
  @apply disabled:cursor-not-allowed disabled:opacity-50;
  @apply active:scale-95;
}

/* Variants */
.v-button--filled {
  @apply bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500;
}

.v-button--outlined {
  @apply bg-transparent border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500;
}

.v-button--text {
  @apply bg-transparent text-primary-600 hover:bg-primary-50 focus:ring-primary-500;
}

.v-button--tonal {
  @apply bg-primary-100 text-primary-800 hover:bg-primary-200 focus:ring-primary-500;
}

.v-button--elevated {
  @apply bg-white text-gray-900 shadow-lg hover:shadow-xl focus:ring-gray-500;
}

.v-button--flat {
  @apply bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500;
}

/* Colors */
.v-button--secondary {
  @apply bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500;
}

.v-button--secondary.v-button--outlined {
  @apply border-gray-600 text-gray-600 hover:bg-gray-50;
}

.v-button--secondary.v-button--text {
  @apply text-gray-600 hover:bg-gray-50;
}

.v-button--secondary.v-button--tonal {
  @apply bg-gray-100 text-gray-800 hover:bg-gray-200;
}

.v-button--success {
  @apply bg-green-600 text-white hover:bg-green-700 focus:ring-green-500;
}

.v-button--success.v-button--outlined {
  @apply border-green-600 text-green-600 hover:bg-green-50;
}

.v-button--success.v-button--text {
  @apply text-green-600 hover:bg-green-50;
}

.v-button--success.v-button--tonal {
  @apply bg-green-100 text-green-800 hover:bg-green-200;
}

.v-button--warning {
  @apply bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500;
}

.v-button--warning.v-button--outlined {
  @apply border-yellow-600 text-yellow-600 hover:bg-yellow-50;
}

.v-button--warning.v-button--text {
  @apply text-yellow-600 hover:bg-yellow-50;
}

.v-button--warning.v-button--tonal {
  @apply bg-yellow-100 text-yellow-800 hover:bg-yellow-200;
}

.v-button--error {
  @apply bg-red-600 text-white hover:bg-red-700 focus:ring-red-500;
}

.v-button--error.v-button--outlined {
  @apply border-red-600 text-red-600 hover:bg-red-50;
}

.v-button--error.v-button--text {
  @apply text-red-600 hover:bg-red-50;
}

.v-button--error.v-button--tonal {
  @apply bg-red-100 text-red-800 hover:bg-red-200;
}

.v-button--info {
  @apply bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500;
}

.v-button--info.v-button--outlined {
  @apply border-blue-600 text-blue-600 hover:bg-blue-50;
}

.v-button--info.v-button--text {
  @apply text-blue-600 hover:bg-blue-50;
}

.v-button--info.v-button--tonal {
  @apply bg-blue-100 text-blue-800 hover:bg-blue-200;
}

/* Sizes */
.v-button--x-small {
  @apply px-2 py-1 text-xs;
}

.v-button--small {
  @apply px-3 py-1.5 text-sm;
}

.v-button--default {
  @apply px-4 py-2 text-sm;
}

.v-button--large {
  @apply px-6 py-3 text-base;
}

.v-button--x-large {
  @apply px-8 py-4 text-lg;
}

/* States */
.v-button--disabled {
  @apply opacity-50 cursor-not-allowed;
}

.v-button--loading {
  @apply cursor-wait;
}

.v-button--rounded {
  @apply rounded-full;
}

.v-button--block {
  @apply w-full;
}

.v-button--flat {
  @apply shadow-none;
}

.v-button--elevated {
  @apply shadow-lg;
}

.v-button--icon-only {
  @apply p-2;
}

.v-button--icon-only.v-button--x-small {
  @apply p-1;
}

.v-button--icon-only.v-button--small {
  @apply p-1.5;
}

.v-button--icon-only.v-button--large {
  @apply p-3;
}

.v-button--icon-only.v-button--x-large {
  @apply p-4;
}

/* Content */
.v-button__content {
  @apply flex items-center justify-center gap-2;
}

.v-button__icon {
  @apply w-4 h-4;
}

.v-button__icon--right {
  @apply order-last;
}

.v-button__loader {
  @apply w-4 h-4;
}

.v-button__loader--right {
  @apply order-last;
}

.v-button__text {
  @apply whitespace-nowrap;
}

/* Ripple effect */
.v-button__ripple {
  @apply absolute inset-0 overflow-hidden pointer-events-none;
  border-radius: inherit;
}

.v-button__ripple::before {
  @apply content-[''] absolute inset-0 bg-white opacity-0 transition-opacity duration-300;
}

.v-button:active .v-button__ripple::before {
  @apply opacity-20;
}
</style>
