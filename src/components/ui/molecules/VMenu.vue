<template>
  <div
    ref="menuRef"
    class="v-menu"
    :class="menuWrapperClasses"
  >
    <!-- 트리거 요소 -->
    <div
      ref="triggerRef"
      class="v-menu__trigger"
      :class="triggerClasses"
      @click="toggleMenu"
      @keydown="handleKeydown"
      :tabindex="disabled ? -1 : 0"
      role="button"
      :aria-expanded="isOpen"
      :aria-haspopup="true"
    >
      <slot name="trigger">
        <VButton
          :variant="triggerVariant"
          :color="triggerColor"
          :size="triggerSize"
          :disabled="disabled"
          :loading="loading"
        >
          {{ triggerText }}
          <VIcon
            name="mdi:chevron-down"
            class="v-menu__trigger-icon"
            :class="{ 'v-menu__trigger-icon--open': isOpen }"
          />
        </VButton>
      </slot>
    </div>

    <!-- 메뉴 내용 -->
    <Teleport to="body">
      <Transition
        name="v-menu"
        @enter="onEnter"
        @leave="onLeave"
      >
        <div
          v-if="isOpen"
          ref="contentRef"
          class="v-menu__content"
          :class="contentClasses"
          :style="contentStyles"
          role="menu"
          :aria-labelledby="menuId"
        >
          <!-- 화살표 -->
          <div
            v-if="showArrow"
            class="v-menu__arrow"
            :class="arrowClasses"
            :style="arrowStyles"
          />

          <!-- 메뉴 헤더 -->
          <div
            v-if="$slots.header"
            class="v-menu__header"
            :class="headerClasses"
          >
            <slot name="header" />
          </div>

          <!-- 메뉴 아이템들 -->
          <div class="v-menu__items">
            <slot />
          </div>

          <!-- 메뉴 푸터 -->
          <div
            v-if="$slots.footer"
            class="v-menu__footer"
            :class="footerClasses"
          >
            <slot name="footer" />
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { VButton, VIcon } from '@/components/ui'

// Props 정의
interface Props {
  // 기본 속성
  triggerText?: string
  disabled?: boolean
  loading?: boolean

  // 위치
  position?: 'bottom' | 'top' | 'left' | 'right' | 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end'
  offset?: number
  distance?: number

  // 스타일
  variant?: 'light' | 'dark' | 'primary'
  size?: 'small' | 'default' | 'large'
  maxWidth?: string
  maxHeight?: string

  // 트리거 버튼
  triggerVariant?: 'filled' | 'outlined' | 'text'
  triggerColor?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
  triggerSize?: 'small' | 'default' | 'large'

  // 기능
  showArrow?: boolean
  closeOnClickOutside?: boolean
  closeOnEscape?: boolean

  // 상태
  open?: boolean
  autoFocus?: boolean

  // 기타
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  triggerText: '메뉴',
  disabled: false,
  loading: false,
  position: 'bottom',
  offset: 8,
  distance: 4,
  variant: 'light',
  size: 'default',
  maxWidth: '200px',
  maxHeight: '300px',
  triggerVariant: 'outlined',
  triggerColor: 'primary',
  triggerSize: 'default',
  showArrow: true,
  closeOnClickOutside: true,
  closeOnEscape: true,
  open: false,
  autoFocus: false,
  id: ''
})

// Emits 정의
const emit = defineEmits<{
  'update:open': [value: boolean]
  'open': []
  'close': []
  'select': [value: string | number | boolean]
}>()

// Refs
const menuRef = ref<HTMLElement>()
const triggerRef = ref<HTMLElement>()
const contentRef = ref<HTMLElement>()
const isOpen = ref(false)

// Computed 속성들
const menuId = computed(() => {
  return props.id || `v-menu-${Math.random().toString(36).substr(2, 9)}`
})

const menuWrapperClasses = computed(() => {
  return [
    'v-menu',
    {
      'v-menu--disabled': props.disabled,
      'v-menu--loading': props.loading,
      'v-menu--open': isOpen.value
    }
  ]
})

const triggerClasses = computed(() => {
  return [
    'v-menu__trigger',
    {
      'v-menu__trigger--disabled': props.disabled,
      'v-menu__trigger--loading': props.loading
    }
  ]
})

const contentClasses = computed(() => {
  return [
    'v-menu__content',
    `v-menu__content--${props.variant}`,
    `v-menu__content--${props.size}`,
    `v-menu__content--${props.position}`,
    {
      'v-menu__content--loading': props.loading
    }
  ]
})

const arrowClasses = computed(() => {
  return [
    'v-menu__arrow',
    `v-menu__arrow--${props.position}`
  ]
})

const headerClasses = computed(() => {
  return [
    'v-menu__header'
  ]
})

const footerClasses = computed(() => {
  return [
    'v-menu__footer'
  ]
})

const contentStyles = computed(() => {
  const styles: Record<string, string> = {
    maxWidth: props.maxWidth,
    maxHeight: props.maxHeight
  }

  if (props.loading) {
    styles.opacity = '0.7'
  }

  return styles
})

const arrowStyles = computed(() => {
  const styles: Record<string, string> = {}

  // 화살표 위치 조정
  if (props.position.includes('start')) {
    styles.left = '12px'
  } else if (props.position.includes('end')) {
    styles.right = '12px'
  } else {
    styles.left = '50%'
    styles.transform = 'translateX(-50%)'
  }

  return styles
})

// Methods
const toggleMenu = () => {
  if (props.disabled || props.loading) return

  if (isOpen.value) {
    closeMenu()
  } else {
    openMenu()
  }
}

const openMenu = () => {
  if (isOpen.value) return

  isOpen.value = true
  emit('update:open', true)
  emit('open')

  nextTick(() => {
    updatePosition()

    if (props.autoFocus) {
      focusFirstItem()
    }

    // 이벤트 리스너 추가
    if (props.closeOnClickOutside) {
      document.addEventListener('click', handleClickOutside)
    }

    if (props.closeOnEscape) {
      document.addEventListener('keydown', handleEscape)
    }
  })
}

const closeMenu = () => {
  if (!isOpen.value) return

  isOpen.value = false
  emit('update:open', false)
  emit('close')

  // 이벤트 리스너 제거
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleEscape)
}

const updatePosition = () => {
  if (!triggerRef.value || !contentRef.value) return

  const triggerRect = triggerRef.value.getBoundingClientRect()
  const contentRect = contentRef.value.getBoundingClientRect()
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight

  let top = 0
  let left = 0

  // 기본 위치 계산
  switch (props.position) {
    case 'bottom':
      top = triggerRect.bottom + props.distance
      left = triggerRect.left + (triggerRect.width / 2) - (contentRect.width / 2)
      break
    case 'top':
      top = triggerRect.top - contentRect.height - props.distance
      left = triggerRect.left + (triggerRect.width / 2) - (contentRect.width / 2)
      break
    case 'left':
      top = triggerRect.top + (triggerRect.height / 2) - (contentRect.height / 2)
      left = triggerRect.left - contentRect.width - props.distance
      break
    case 'right':
      top = triggerRect.top + (triggerRect.height / 2) - (contentRect.height / 2)
      left = triggerRect.right + props.distance
      break
    case 'bottom-start':
      top = triggerRect.bottom + props.distance
      left = triggerRect.left + props.offset
      break
    case 'bottom-end':
      top = triggerRect.bottom + props.distance
      left = triggerRect.right - contentRect.width - props.offset
      break
    case 'top-start':
      top = triggerRect.top - contentRect.height - props.distance
      left = triggerRect.left + props.offset
      break
    case 'top-end':
      top = triggerRect.top - contentRect.height - props.distance
      left = triggerRect.right - contentRect.width - props.offset
      break
    case 'left-start':
      top = triggerRect.top + props.offset
      left = triggerRect.left - contentRect.width - props.distance
      break
    case 'left-end':
      top = triggerRect.bottom - contentRect.height - props.offset
      left = triggerRect.left - contentRect.width - props.distance
      break
    case 'right-start':
      top = triggerRect.top + props.offset
      left = triggerRect.right + props.distance
      break
    case 'right-end':
      top = triggerRect.bottom - contentRect.height - props.offset
      left = triggerRect.right + props.distance
      break
  }

  // 뷰포트 경계 확인 및 조정
  if (left < 0) {
    left = props.offset
  } else if (left + contentRect.width > viewportWidth) {
    left = viewportWidth - contentRect.width - props.offset
  }

  if (top < 0) {
    top = props.offset
  } else if (top + contentRect.height > viewportHeight) {
    top = viewportHeight - contentRect.height - props.offset
  }

  // 위치 적용
  contentRef.value.style.top = `${top}px`
  contentRef.value.style.left = `${left}px`
}

const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement

  if (menuRef.value && !menuRef.value.contains(target)) {
    closeMenu()
  }
}

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeMenu()
  }
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    toggleMenu()
  } else if (event.key === 'ArrowDown') {
    event.preventDefault()
    if (!isOpen.value) {
      openMenu()
    } else {
      focusNextItem()
    }
  } else if (event.key === 'ArrowUp') {
    event.preventDefault()
    if (!isOpen.value) {
      openMenu()
    } else {
      focusPreviousItem()
    }
  }
}

const focusFirstItem = () => {
  const firstItem = contentRef.value?.querySelector('[role="menuitem"]') as HTMLElement
  if (firstItem) {
    firstItem.focus()
  }
}

const focusNextItem = () => {
  const items = Array.from(contentRef.value?.querySelectorAll('[role="menuitem"]') || []) as HTMLElement[]
  const currentIndex = items.findIndex(item => item === document.activeElement)
  const nextIndex = (currentIndex + 1) % items.length
  items[nextIndex]?.focus()
}

const focusPreviousItem = () => {
  const items = Array.from(contentRef.value?.querySelectorAll('[role="menuitem"]') || []) as HTMLElement[]
  const currentIndex = items.findIndex(item => item === document.activeElement)
  const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1
  items[prevIndex]?.focus()
}

const onEnter = (el: Element) => {
  const element = el as HTMLElement
  element.style.opacity = '0'
  element.style.transform = 'scale(0.95) translateY(-10px)'

  requestAnimationFrame(() => {
    element.style.transition = 'opacity 150ms ease, transform 150ms ease'
    element.style.opacity = '1'
    element.style.transform = 'scale(1) translateY(0)'
  })
}

const onLeave = (el: Element) => {
  const element = el as HTMLElement
  element.style.opacity = '0'
  element.style.transform = 'scale(0.95) translateY(-10px)'
}

// Public methods
const show = () => {
  openMenu()
}

const hide = () => {
  closeMenu()
}

const update = () => {
  if (isOpen.value) {
    updatePosition()
  }
}

// Watch for open prop changes
watch(() => props.open, (newValue) => {
  if (newValue !== isOpen.value) {
    if (newValue) {
      openMenu()
    } else {
      closeMenu()
    }
  }
})

// Lifecycle
onMounted(() => {
  if (props.open) {
    openMenu()
  }

  // 윈도우 리사이즈 이벤트 리스너
  window.addEventListener('resize', update)
  window.addEventListener('scroll', update, true)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleEscape)
  window.removeEventListener('resize', update)
  window.removeEventListener('scroll', update, true)
})

// Expose methods
defineExpose({
  show,
  hide,
  update,
  isOpen: computed(() => isOpen.value)
})
</script>

<style scoped>
.v-menu {
  @apply relative inline-block;
}

.v-menu--disabled {
  @apply pointer-events-none;
}

/* Trigger */
.v-menu__trigger {
  @apply cursor-pointer;
}

.v-menu__trigger--disabled {
  @apply cursor-not-allowed;
}

.v-menu__trigger-icon {
  @apply ml-2 transition-transform duration-200;
}

.v-menu__trigger-icon--open {
  @apply transform rotate-180;
}

/* Content */
.v-menu__content {
  @apply fixed z-50 min-w-48;
  @apply rounded-md shadow-lg border;
  @apply bg-white;
  @apply overflow-hidden;
}

/* Variants */
.v-menu__content--light {
  @apply bg-white text-gray-900 border-gray-200;
}

.v-menu__content--dark {
  @apply bg-gray-900 text-white border-gray-700;
}

.v-menu__content--primary {
  @apply bg-primary-500 text-white border-primary-600;
}

/* Sizes */
.v-menu__content--small {
  @apply min-w-32;
}

.v-menu__content--default {
  @apply min-w-48;
}

.v-menu__content--large {
  @apply min-w-64;
}

/* Arrow */
.v-menu__arrow {
  @apply absolute w-2 h-2;
  @apply bg-inherit border border-inherit;
  @apply transform rotate-45;
}

.v-menu__arrow--bottom {
  @apply top-0 -mt-1;
}

.v-menu__arrow--top {
  @apply bottom-0 -mb-1;
}

.v-menu__arrow--left {
  @apply right-0 -mr-1;
}

.v-menu__arrow--right {
  @apply left-0 -ml-1;
}

/* Header */
.v-menu__header {
  @apply px-4 py-2 border-b border-gray-200;
  @apply text-sm font-medium text-gray-700;
}

.v-menu__content--dark .v-menu__header {
  @apply border-gray-700 text-gray-300;
}

.v-menu__content--primary .v-menu__header {
  @apply border-primary-400 text-primary-100;
}

/* Items */
.v-menu__items {
  @apply py-1;
}

/* Footer */
.v-menu__footer {
  @apply px-4 py-2 border-t border-gray-200;
  @apply text-sm text-gray-500;
}

.v-menu__content--dark .v-menu__footer {
  @apply border-gray-700 text-gray-400;
}

.v-menu__content--primary .v-menu__footer {
  @apply border-primary-400 text-primary-100;
}

/* Loading state */
.v-menu__content--loading {
  @apply opacity-70;
}

.v-menu__content--loading .v-menu__items {
  @apply animate-pulse;
}

/* Transitions */
.v-menu-enter-active,
.v-menu-leave-active {
  @apply transition-all duration-150 ease-out;
}

.v-menu-enter-from,
.v-menu-leave-to {
  @apply opacity-0 scale-95;
  transform: scale(0.95) translateY(-10px);
}

/* Dark mode */
.dark .v-menu__content--light {
  @apply bg-gray-800 text-gray-100 border-gray-700;
}

.dark .v-menu__content--light .v-menu__header {
  @apply border-gray-600 text-gray-300;
}

.dark .v-menu__content--light .v-menu__footer {
  @apply border-gray-600 text-gray-400;
}

/* Responsive */
@media (max-width: 640px) {
  .v-menu__content {
    @apply min-w-40;
  }

  .v-menu__content--large {
    @apply min-w-48;
  }
}
</style>
