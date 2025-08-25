<template>
  <Transition name="v-alert">
    <div
      v-if="modelValue"
      class="v-alert"
      :class="alertClasses"
      role="alert"
    >
      <!-- 아이콘 -->
      <div
        v-if="icon || $slots.icon"
        class="v-alert__icon"
        :class="iconClasses"
      >
        <slot name="icon">
          <Icon
            :name="getDefaultIcon"
            class="v-alert__icon-svg"
          />
        </slot>
      </div>

      <!-- 내용 -->
      <div class="v-alert__content">
        <!-- 제목 -->
        <div
          v-if="title || $slots.title"
          class="v-alert__title"
        >
          <slot name="title">
            {{ title }}
          </slot>
        </div>

        <!-- 메시지 -->
        <div
          v-if="message || $slots.default"
          class="v-alert__message"
        >
          <slot>
            {{ message }}
          </slot>
        </div>

        <!-- 액션 -->
        <div
          v-if="$slots.actions"
          class="v-alert__actions"
        >
          <slot name="actions" />
        </div>
      </div>

      <!-- 닫기 버튼 -->
      <button
        v-if="dismissible"
        class="v-alert__close"
        @click="closeAlert"
        :aria-label="closeButtonLabel"
      >
        <Icon name="mdi:close" class="v-alert__close-icon" />
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Props 정의
interface Props {
  // 기본 속성
  modelValue?: boolean
  title?: string
  message?: string
  type?: 'success' | 'error' | 'warning' | 'info'
  variant?: 'filled' | 'outlined' | 'tonal' | 'text'

  // 상태
  dismissible?: boolean
  persistent?: boolean
  loading?: boolean

  // 스타일
  size?: 'small' | 'default' | 'large'
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'

  // 기능
  icon?: string
  closeButtonLabel?: string
  autoClose?: boolean
  autoCloseDelay?: number

  // 기타
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: true,
  title: '',
  message: '',
  type: 'info',
  variant: 'filled',
  dismissible: false,
  persistent: false,
  loading: false,
  size: 'default',
  color: 'primary',
  icon: '',
  closeButtonLabel: '닫기',
  autoClose: false,
  autoCloseDelay: 5000
})

// Emits 정의
const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'close': []
}>()

// Computed 속성들
const alertClasses = computed(() => {
  return [
    'v-alert',
    `v-alert--${props.size}`,
    `v-alert--${props.variant}`,
    `v-alert--${props.color}`,
    {
      'v-alert--dismissible': props.dismissible,
      'v-alert--loading': props.loading
    }
  ]
})

const iconClasses = computed(() => {
  return [
    'v-alert__icon',
    {
      'v-alert__icon--loading': props.loading
    }
  ]
})

const getDefaultIcon = computed(() => {
  if (props.icon) return props.icon

  switch (props.type) {
    case 'success':
      return 'mdi:check-circle'
    case 'error':
      return 'mdi:alert-circle'
    case 'warning':
      return 'mdi:alert'
    case 'info':
    default:
      return 'mdi:information'
  }
})

// Methods
const closeAlert = () => {
  if (props.persistent) return
  emit('update:modelValue', false)
  emit('close')
}

// Auto close functionality
import { onUnmounted, watch } from 'vue'

let autoCloseTimer: NodeJS.Timeout | null = null

// Auto close watcher
watch(() => [props.modelValue, props.autoClose, props.persistent], ([modelValue, autoClose, persistent]) => {
  if (autoClose && !persistent && modelValue) {
    autoCloseTimer = setTimeout(() => {
      closeAlert()
    }, props.autoCloseDelay)
  } else if (autoCloseTimer) {
    clearTimeout(autoCloseTimer)
    autoCloseTimer = null
  }
}, { immediate: true })

onUnmounted(() => {
  if (autoCloseTimer) {
    clearTimeout(autoCloseTimer)
  }
})
</script>

<style scoped>
.v-alert {
  @apply relative flex items-start gap-3 p-4 rounded-lg border;
  @apply transition-all duration-200;
}

/* Variants */
.v-alert--filled {
  @apply border-transparent;
}

.v-alert--outlined {
  @apply bg-transparent;
}

.v-alert--tonal {
  @apply border-transparent;
}

.v-alert--text {
  @apply bg-transparent border-transparent;
}

/* Colors - Filled */
.v-alert--primary.v-alert--filled {
  @apply bg-primary-50 text-primary-800 border-primary-200;
}

.v-alert--secondary.v-alert--filled {
  @apply bg-gray-50 text-gray-800 border-gray-200;
}

.v-alert--success.v-alert--filled {
  @apply bg-green-50 text-green-800 border-green-200;
}

.v-alert--warning.v-alert--filled {
  @apply bg-yellow-50 text-yellow-800 border-yellow-200;
}

.v-alert--error.v-alert--filled {
  @apply bg-red-50 text-red-800 border-red-200;
}

.v-alert--info.v-alert--filled {
  @apply bg-blue-50 text-blue-800 border-blue-200;
}

/* Colors - Outlined */
.v-alert--primary.v-alert--outlined {
  @apply border-primary-300 text-primary-700;
}

.v-alert--secondary.v-alert--outlined {
  @apply border-gray-300 text-gray-700;
}

.v-alert--success.v-alert--outlined {
  @apply border-green-300 text-green-700;
}

.v-alert--warning.v-alert--outlined {
  @apply border-yellow-300 text-yellow-700;
}

.v-alert--error.v-alert--outlined {
  @apply border-red-300 text-red-700;
}

.v-alert--info.v-alert--outlined {
  @apply border-blue-300 text-blue-700;
}

/* Colors - Tonal */
.v-alert--primary.v-alert--tonal {
  @apply bg-primary-100 text-primary-900;
}

.v-alert--secondary.v-alert--tonal {
  @apply bg-gray-100 text-gray-900;
}

.v-alert--success.v-alert--tonal {
  @apply bg-green-100 text-green-900;
}

.v-alert--warning.v-alert--tonal {
  @apply bg-yellow-100 text-yellow-900;
}

.v-alert--error.v-alert--tonal {
  @apply bg-red-100 text-red-900;
}

.v-alert--info.v-alert--tonal {
  @apply bg-blue-100 text-blue-900;
}

/* Colors - Text */
.v-alert--primary.v-alert--text {
  @apply text-primary-700;
}

.v-alert--secondary.v-alert--text {
  @apply text-gray-700;
}

.v-alert--success.v-alert--text {
  @apply text-green-700;
}

.v-alert--warning.v-alert--text {
  @apply text-yellow-700;
}

.v-alert--error.v-alert--text {
  @apply text-red-700;
}

.v-alert--info.v-alert--text {
  @apply text-blue-700;
}

/* Icon */
.v-alert__icon {
  @apply flex-shrink-0 flex items-center justify-center;
}

.v-alert__icon--loading {
  @apply animate-spin;
}

.v-alert__icon-svg {
  @apply w-5 h-5;
}

/* Content */
.v-alert__content {
  @apply flex-1 min-w-0;
}

.v-alert__title {
  @apply text-sm font-medium mb-1;
}

.v-alert__message {
  @apply text-sm;
}

.v-alert__actions {
  @apply mt-2 flex items-center gap-2;
}

/* Close button */
.v-alert__close {
  @apply flex-shrink-0 p-1 rounded-full transition-colors;
  @apply hover:bg-black hover:bg-opacity-10;
}

.v-alert__close-icon {
  @apply w-4 h-4;
}

/* Sizes */
.v-alert--small {
  @apply p-3 gap-2;
}

.v-alert--small .v-alert__icon-svg {
  @apply w-4 h-4;
}

.v-alert--small .v-alert__title,
.v-alert--small .v-alert__message {
  @apply text-xs;
}

.v-alert--large {
  @apply p-5 gap-4;
}

.v-alert--large .v-alert__icon-svg {
  @apply w-6 h-6;
}

.v-alert--large .v-alert__title,
.v-alert--large .v-alert__message {
  @apply text-base;
}

/* Loading state */
.v-alert--loading .v-alert__icon {
  @apply animate-spin;
}

/* Transitions */
.v-alert-enter-active,
.v-alert-leave-active {
  @apply transition-all duration-300;
}

.v-alert-enter-from {
  @apply opacity-0 transform -translate-y-2;
}

.v-alert-enter-to {
  @apply opacity-100 transform translate-y-0;
}

.v-alert-leave-from {
  @apply opacity-100 transform translate-y-0;
}

.v-alert-leave-to {
  @apply opacity-0 transform -translate-y-2;
}

/* Responsive */
@media (max-width: 640px) {
  .v-alert {
    @apply p-3 gap-2;
  }

  .v-alert__title,
  .v-alert__message {
    @apply text-sm;
  }
}
</style>
