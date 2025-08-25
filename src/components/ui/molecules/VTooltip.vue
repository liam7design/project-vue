<template>
  <div
    ref="tooltipRef"
    class="v-tooltip"
    :class="tooltipWrapperClasses"
    @mouseenter="showTooltip"
    @mouseleave="hideTooltip"
    @focus="showTooltip"
    @blur="hideTooltip"
  >
    <!-- 트리거 요소 -->
    <div class="v-tooltip__trigger">
      <slot />
    </div>

    <!-- 툴팁 내용 -->
    <Teleport to="body">
      <Transition
        name="v-tooltip"
        @enter="onEnter"
        @leave="onLeave"
      >
        <div
          v-if="isVisible"
          ref="contentRef"
          class="v-tooltip__content"
          :class="contentClasses"
          :style="contentStyles"
          role="tooltip"
          :aria-describedby="tooltipId"
        >
          <!-- 화살표 -->
          <div
            v-if="showArrow"
            class="v-tooltip__arrow"
            :class="arrowClasses"
            :style="arrowStyles"
          />

          <!-- 내용 -->
          <div class="v-tooltip__body">
            <slot name="content">
              {{ content }}
            </slot>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

// Props 정의
interface Props {
  // 기본 속성
  content?: string
  disabled?: boolean

  // 위치
  position?: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end'
  offset?: number
  distance?: number

  // 스타일
  variant?: 'light' | 'dark' | 'primary' | 'success' | 'warning' | 'error'
  size?: 'small' | 'default' | 'large'
  maxWidth?: string

  // 기능
  showArrow?: boolean
  persistent?: boolean
  delay?: number
  duration?: number

  // 상태
  open?: boolean
  loading?: boolean

  // 기타
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  content: '',
  disabled: false,
  position: 'top',
  offset: 8,
  distance: 4,
  variant: 'dark',
  size: 'default',
  maxWidth: '200px',
  showArrow: true,
  persistent: false,
  delay: 200,
  duration: 300,
  open: false,
  loading: false,
  id: ''
})

// Emits 정의
const emit = defineEmits<{
  'show': []
  'hide': []
  'update:open': [value: boolean]
}>()

// Refs
const tooltipRef = ref<HTMLElement>()
const contentRef = ref<HTMLElement>()
const isVisible = ref(false)
const showTimeout = ref<number>()
const hideTimeout = ref<number>()

// Computed 속성들
const tooltipId = computed(() => {
  return props.id || `v-tooltip-${Math.random().toString(36).substr(2, 9)}`
})

const tooltipWrapperClasses = computed(() => {
  return [
    'v-tooltip',
    {
      'v-tooltip--disabled': props.disabled,
      'v-tooltip--loading': props.loading
    }
  ]
})

const contentClasses = computed(() => {
  return [
    'v-tooltip__content',
    `v-tooltip__content--${props.variant}`,
    `v-tooltip__content--${props.size}`,
    `v-tooltip__content--${props.position}`,
    {
      'v-tooltip__content--loading': props.loading
    }
  ]
})

const arrowClasses = computed(() => {
  return [
    'v-tooltip__arrow',
    `v-tooltip__arrow--${props.position}`
  ]
})

const contentStyles = computed(() => {
  const styles: Record<string, string> = {
    maxWidth: props.maxWidth
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
const showTooltip = () => {
  if (props.disabled || props.loading) return

  clearTimeout(hideTimeout.value)

  if (props.delay > 0) {
    showTimeout.value = window.setTimeout(() => {
      isVisible.value = true
      emit('show')
      emit('update:open', true)
      nextTick(() => {
        updatePosition()
      })
    }, props.delay)
  } else {
    isVisible.value = true
    emit('show')
    emit('update:open', true)
    nextTick(() => {
      updatePosition()
    })
  }
}

const hideTooltip = () => {
  if (props.persistent) return

  clearTimeout(showTimeout.value)

  hideTimeout.value = window.setTimeout(() => {
    isVisible.value = false
    emit('hide')
    emit('update:open', false)
  }, props.duration)
}

const updatePosition = () => {
  if (!tooltipRef.value || !contentRef.value) return

  const triggerRect = tooltipRef.value.getBoundingClientRect()
  const contentRect = contentRef.value.getBoundingClientRect()
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight

  let top = 0
  let left = 0

  // 기본 위치 계산
  switch (props.position) {
    case 'top':
      top = triggerRect.top - contentRect.height - props.distance
      left = triggerRect.left + (triggerRect.width / 2) - (contentRect.width / 2)
      break
    case 'bottom':
      top = triggerRect.bottom + props.distance
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
    case 'top-start':
      top = triggerRect.top - contentRect.height - props.distance
      left = triggerRect.left + props.offset
      break
    case 'top-end':
      top = triggerRect.top - contentRect.height - props.distance
      left = triggerRect.right - contentRect.width - props.offset
      break
    case 'bottom-start':
      top = triggerRect.bottom + props.distance
      left = triggerRect.left + props.offset
      break
    case 'bottom-end':
      top = triggerRect.bottom + props.distance
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

const onEnter = (el: Element) => {
  const element = el as HTMLElement
  element.style.opacity = '0'
  element.style.transform = 'scale(0.8)'

  requestAnimationFrame(() => {
    element.style.transition = `opacity ${props.duration}ms ease, transform ${props.duration}ms ease`
    element.style.opacity = '1'
    element.style.transform = 'scale(1)'
  })
}

const onLeave = (el: Element) => {
  const element = el as HTMLElement
  element.style.opacity = '0'
  element.style.transform = 'scale(0.8)'
}

// Public methods
const show = () => {
  showTooltip()
}

const hide = () => {
  hideTooltip()
}

const update = () => {
  if (isVisible.value) {
    updatePosition()
  }
}

// Lifecycle
onMounted(() => {
  if (props.open) {
    showTooltip()
  }

  // 윈도우 리사이즈 이벤트 리스너
  window.addEventListener('resize', update)
  window.addEventListener('scroll', update, true)
})

onUnmounted(() => {
  clearTimeout(showTimeout.value)
  clearTimeout(hideTimeout.value)
  window.removeEventListener('resize', update)
  window.removeEventListener('scroll', update, true)
})

// Expose methods
defineExpose({
  show,
  hide,
  update,
  isVisible: computed(() => isVisible.value)
})
</script>

<style scoped>
.v-tooltip {
  @apply relative inline-block;
}

.v-tooltip--disabled {
  @apply pointer-events-none;
}

/* Content */
.v-tooltip__content {
  @apply fixed z-50 px-3 py-2 text-sm font-medium;
  @apply rounded-md shadow-lg;
  @apply pointer-events-none;
  @apply whitespace-nowrap;
}

/* Variants */
.v-tooltip__content--light {
  @apply bg-white text-gray-900 border border-gray-200;
}

.v-tooltip__content--dark {
  @apply bg-gray-900 text-white;
}

.v-tooltip__content--primary {
  @apply bg-primary-500 text-white;
}

.v-tooltip__content--success {
  @apply bg-green-500 text-white;
}

.v-tooltip__content--warning {
  @apply bg-yellow-500 text-white;
}

.v-tooltip__content--error {
  @apply bg-red-500 text-white;
}

/* Sizes */
.v-tooltip__content--small {
  @apply px-2 py-1 text-xs;
}

.v-tooltip__content--default {
  @apply px-3 py-2 text-sm;
}

.v-tooltip__content--large {
  @apply px-4 py-3 text-base;
}

/* Arrow */
.v-tooltip__arrow {
  @apply absolute w-2 h-2;
  @apply bg-inherit;
  @apply transform rotate-45;
}

.v-tooltip__arrow--top {
  @apply top-full -mt-1;
}

.v-tooltip__arrow--bottom {
  @apply bottom-full -mb-1;
}

.v-tooltip__arrow--left {
  @apply left-full -ml-1;
}

.v-tooltip__arrow--right {
  @apply right-full -mr-1;
}

/* Light variant arrow border */
.v-tooltip__content--light .v-tooltip__arrow {
  @apply border border-gray-200;
}

.v-tooltip__content--light .v-tooltip__arrow--top {
  @apply border-t-0 border-l-0;
}

.v-tooltip__content--light .v-tooltip__arrow--bottom {
  @apply border-b-0 border-r-0;
}

.v-tooltip__content--light .v-tooltip__arrow--left {
  @apply border-l-0 border-b-0;
}

.v-tooltip__content--light .v-tooltip__arrow--right {
  @apply border-r-0 border-t-0;
}

/* Body */
.v-tooltip__body {
  @apply relative z-10;
}

/* Loading state */
.v-tooltip__content--loading {
  @apply opacity-70;
}

.v-tooltip__content--loading .v-tooltip__body {
  @apply animate-pulse;
}

/* Transitions */
.v-tooltip-enter-active,
.v-tooltip-leave-active {
  @apply transition-all duration-200 ease-out;
}

.v-tooltip-enter-from,
.v-tooltip-leave-to {
  @apply opacity-0 scale-95;
}

/* Dark mode */
.dark .v-tooltip__content--light {
  @apply bg-gray-800 text-gray-100 border-gray-700;
}

.dark .v-tooltip__content--light .v-tooltip__arrow {
  @apply border-gray-700;
}

/* Responsive */
@media (max-width: 640px) {
  .v-tooltip__content {
    @apply max-w-xs;
    @apply whitespace-normal;
  }
}
</style>

