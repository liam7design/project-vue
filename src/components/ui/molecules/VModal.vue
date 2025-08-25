<template>
  <Teleport to="body">
    <Transition name="v-modal">
      <div
        v-if="modelValue"
        class="v-modal-overlay"
        :class="overlayClasses"
        @click="handleOverlayClick"
      >
        <!-- 모달 컨테이너 -->
        <div
          class="v-modal-container"
          :class="containerClasses"
          @click.stop
        >
          <!-- 모달 헤더 -->
          <div
            v-if="title || $slots.header || showCloseButton"
            class="v-modal__header"
            :class="headerClasses"
          >
            <slot name="header">
              <h3 v-if="title" class="v-modal__title">{{ title }}</h3>
            </slot>

            <button
              v-if="showCloseButton"
              class="v-modal__close"
              @click="closeModal"
              :aria-label="closeButtonLabel"
            >
              <Icon name="mdi:close" class="v-modal__close-icon" />
            </button>
          </div>

          <!-- 모달 내용 -->
          <div class="v-modal__content" :class="contentClasses">
            <slot />
          </div>

          <!-- 모달 푸터 -->
          <div
            v-if="$slots.footer"
            class="v-modal__footer"
            :class="footerClasses"
          >
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'

// Props 정의
interface Props {
  // 기본 속성
  modelValue: boolean
  title?: string
  persistent?: boolean
  fullscreen?: boolean

  // 스타일
  size?: 'small' | 'default' | 'large' | 'x-large'
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'

  // 기능
  showCloseButton?: boolean
  closeButtonLabel?: string
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean

  // 기타
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  title: '',
  persistent: false,
  fullscreen: false,
  size: 'default',
  color: 'primary',
  showCloseButton: true,
  closeButtonLabel: '닫기',
  closeOnOverlayClick: true,
  closeOnEscape: true
})

// Emits 정의
const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'close': []
  'open': []
}>()

// Computed 속성들
const overlayClasses = computed(() => {
  return [
    'v-modal-overlay',
    {
      'v-modal-overlay--fullscreen': props.fullscreen
    }
  ]
})

const containerClasses = computed(() => {
  return [
    'v-modal-container',
    `v-modal-container--${props.size}`,
    `v-modal-container--${props.color}`,
    {
      'v-modal-container--fullscreen': props.fullscreen
    }
  ]
})

const headerClasses = computed(() => {
  return [
    'v-modal__header',
    {
      'v-modal__header--with-close': props.showCloseButton
    }
  ]
})

const contentClasses = computed(() => {
  return [
    'v-modal__content',
    {
      'v-modal__content--fullscreen': props.fullscreen
    }
  ]
})

const footerClasses = computed(() => {
  return [
    'v-modal__footer'
  ]
})

// Methods
const closeModal = () => {
  if (props.persistent) return
  emit('update:modelValue', false)
  emit('close')
}

const handleOverlayClick = () => {
  if (props.closeOnOverlayClick && !props.persistent) {
    closeModal()
  }
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.closeOnEscape && !props.persistent) {
    closeModal()
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)

  // Body scroll 방지
  if (props.modelValue) {
    document.body.style.overflow = 'hidden'
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})

// Watch for modelValue changes
import { watch } from 'vue'

const watchModelValue = (newValue: boolean) => {
  if (newValue) {
    document.body.style.overflow = 'hidden'
    emit('open')
  } else {
    document.body.style.overflow = ''
  }
}

// Watch modelValue changes
watch(() => props.modelValue, watchModelValue, { immediate: true })
</script>

<style scoped>
/* Overlay */
.v-modal-overlay {
  @apply fixed inset-0 z-50 flex items-center justify-center;
  @apply bg-black bg-opacity-50 backdrop-blur-sm;
}

.v-modal-overlay--fullscreen {
  @apply bg-black bg-opacity-75;
}

/* Container */
.v-modal-container {
  @apply relative bg-white rounded-lg shadow-xl;
  @apply max-h-[90vh] overflow-hidden;
  @apply transform transition-all duration-300;
}

.v-modal-container--small {
  @apply w-full max-w-sm mx-4;
}

.v-modal-container--default {
  @apply w-full max-w-md mx-4;
}

.v-modal-container--large {
  @apply w-full max-w-lg mx-4;
}

.v-modal-container--x-large {
  @apply w-full max-w-2xl mx-4;
}

.v-modal-container--fullscreen {
  @apply w-full h-full max-w-none max-h-none mx-0 rounded-none;
}

/* Header */
.v-modal__header {
  @apply flex items-center justify-between p-4 border-b border-gray-200;
}

.v-modal__header--with-close {
  @apply gap-4;
}

.v-modal__title {
  @apply text-lg font-semibold text-gray-900;
}

.v-modal__close {
  @apply p-1 text-gray-400 hover:text-gray-600 transition-colors;
  @apply rounded-full hover:bg-gray-100;
}

.v-modal__close-icon {
  @apply w-5 h-5;
}

/* Content */
.v-modal__content {
  @apply p-4 overflow-y-auto;
}

.v-modal__content--fullscreen {
  @apply flex-1;
}

/* Footer */
.v-modal__footer {
  @apply flex items-center justify-end gap-2 p-4 border-t border-gray-200;
}

/* Transitions */
.v-modal-enter-active,
.v-modal-leave-active {
  @apply transition-all duration-300;
}

.v-modal-enter-from {
  @apply opacity-0;
}

.v-modal-enter-to {
  @apply opacity-100;
}

.v-modal-leave-from {
  @apply opacity-100;
}

.v-modal-leave-to {
  @apply opacity-0;
}

.v-modal-enter-from .v-modal-container {
  @apply scale-95 opacity-0;
}

.v-modal-enter-to .v-modal-container {
  @apply scale-100 opacity-100;
}

.v-modal-leave-from .v-modal-container {
  @apply scale-100 opacity-100;
}

.v-modal-leave-to .v-modal-container {
  @apply scale-95 opacity-0;
}

/* Responsive */
@media (max-width: 640px) {
  .v-modal-container--small,
  .v-modal-container--default,
  .v-modal-container--large,
  .v-modal-container--x-large {
    @apply w-full max-w-none mx-2;
  }

  .v-modal__header,
  .v-modal__content,
  .v-modal__footer {
    @apply p-3;
  }
}

/* Color variants */
.v-modal-container--primary .v-modal__title {
  @apply text-primary-600;
}

.v-modal-container--secondary .v-modal__title {
  @apply text-gray-600;
}

.v-modal-container--success .v-modal__title {
  @apply text-green-600;
}

.v-modal-container--warning .v-modal__title {
  @apply text-yellow-600;
}

.v-modal-container--error .v-modal__title {
  @apply text-red-600;
}

.v-modal-container--info .v-modal__title {
  @apply text-blue-600;
}
</style>
