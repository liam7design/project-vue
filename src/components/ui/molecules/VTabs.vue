<template>
  <div
    ref="tabsRef"
    class="v-tabs"
    :class="tabsClasses"
  >
    <!-- 탭 헤더 -->
    <div
      v-if="showHeader"
      class="v-tabs__header"
      :class="headerClasses"
    >
      <!-- 탭 네비게이션 -->
      <div
        class="v-tabs__nav"
        :class="navClasses"
        role="tablist"
        :aria-label="ariaLabel"
      >
        <button
          v-for="(tab, index) in tabs"
          :key="tab.value"
          ref="tabButtons"
          class="v-tabs__tab"
          :class="getTabClasses(tab, index)"
          :disabled="tab.disabled || disabled"
          :aria-selected="modelValue === tab.value"
          :aria-controls="`panel-${tab.value}`"
          role="tab"
          @click="selectTab(tab.value)"
          @keydown="handleKeydown"
        >
          <!-- 탭 아이콘 -->
          <VIcon
            v-if="tab.icon"
            :name="tab.icon"
            class="v-tabs__tab-icon"
            :class="getTabIconClasses(tab)"
          />

          <!-- 탭 라벨 -->
          <span class="v-tabs__tab-label">{{ tab.label }}</span>

          <!-- 탭 배지 -->
          <VBadge
            v-if="tab.badge"
            :content="tab.badge"
            :color="tab.badgeColor || 'primary'"
            :size="tab.badgeSize || 'small'"
            class="v-tabs__tab-badge"
          />

          <!-- 탭 닫기 버튼 -->
          <button
            v-if="tab.closable"
            class="v-tabs__tab-close"
            :class="getTabCloseClasses(tab)"
            @click.stop="closeTab(tab.value)"
            :aria-label="`Close ${tab.label} tab`"
          >
            <VIcon name="mdi:close" class="v-tabs__tab-close-icon" />
          </button>
        </button>

        <!-- 활성 탭 인디케이터 -->
        <div
          v-if="showIndicator"
          ref="indicatorRef"
          class="v-tabs__indicator"
          :class="indicatorClasses"
          :style="indicatorStyles"
        />
      </div>

      <!-- 헤더 액션 -->
      <div
        v-if="$slots.actions"
        class="v-tabs__actions"
        :class="actionsClasses"
      >
        <slot name="actions" />
      </div>
    </div>

    <!-- 탭 패널들 -->
    <div
      class="v-tabs__panels"
      :class="panelsClasses"
    >
      <Transition
        :name="transitionName"
        :mode="transitionMode"
        @enter="onPanelEnter"
        @leave="onPanelLeave"
      >
        <div
          v-if="activeTab"
          :key="activeTab.value"
          :id="`panel-${activeTab.value}`"
          class="v-tabs__panel"
          :class="panelClasses"
          role="tabpanel"
          :aria-labelledby="`tab-${activeTab.value}`"
        >
          <slot
            :name="activeTab.value"
            :tab="activeTab"
            :index="activeTabIndex"
          >
            {{ activeTab.content }}
          </slot>
        </div>
      </Transition>
    </div>

    <!-- 푸터 -->
    <div
      v-if="$slots.footer"
      class="v-tabs__footer"
      :class="footerClasses"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { VBadge, VIcon } from '@/components/ui'

// Tab interface
export interface Tab {
  value: string
  label: string
  content?: string
  icon?: string
  badge?: string | number
  badgeColor?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
  badgeSize?: 'small' | 'default' | 'large'
  disabled?: boolean
  closable?: boolean
  lazy?: boolean
}

// Props 정의
interface Props {
  // 기본 속성
  modelValue?: string
  tabs?: Tab[]
  ariaLabel?: string

  // 스타일
  variant?: 'default' | 'pills' | 'cards' | 'underline'
  size?: 'small' | 'default' | 'large'
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
  alignment?: 'left' | 'center' | 'right' | 'justify'

  // 기능
  showHeader?: boolean
  showIndicator?: boolean
  closable?: boolean
  addable?: boolean
  draggable?: boolean
  swipeable?: boolean

  // 애니메이션
  animated?: boolean
  transitionName?: string
  transitionMode?: 'in-out' | 'out-in'

  // 상태
  disabled?: boolean
  loading?: boolean

  // 기타
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  tabs: () => [],
  ariaLabel: 'Tabs',
  variant: 'default',
  size: 'default',
  color: 'primary',
  alignment: 'left',
  showHeader: true,
  showIndicator: true,
  closable: false,
  addable: false,
  draggable: false,
  swipeable: false,
  animated: true,
  transitionName: 'v-tabs',
  transitionMode: 'out-in',
  disabled: false,
  loading: false
})

// Emits 정의
const emit = defineEmits<{
  'update:modelValue': [value: string]
  'change': [value: string, tab: Tab]
  'close': [value: string, tab: Tab]
  'add': []
}>()

// Refs
const tabsRef = ref<HTMLElement>()
const tabButtons = ref<HTMLElement[]>([])
const indicatorRef = ref<HTMLElement>()

// Computed 속성들
const tabsClasses = computed(() => {
  return [
    'v-tabs',
    `v-tabs--${props.variant}`,
    `v-tabs--${props.size}`,
    `v-tabs--${props.color}`,
    `v-tabs--${props.alignment}`,
    {
      'v-tabs--disabled': props.disabled,
      'v-tabs--loading': props.loading,
      'v-tabs--animated': props.animated,
      'v-tabs--closable': props.closable,
      'v-tabs--addable': props.addable,
      'v-tabs--draggable': props.draggable,
      'v-tabs--swipeable': props.swipeable
    }
  ]
})

const headerClasses = computed(() => {
  return [
    'v-tabs__header',
    {
      'v-tabs__header--hidden': !props.showHeader
    }
  ]
})

const navClasses = computed(() => {
  return [
    'v-tabs__nav',
    `v-tabs__nav--${props.alignment}`
  ]
})

const indicatorClasses = computed(() => {
  return [
    'v-tabs__indicator',
    `v-tabs__indicator--${props.color}`
  ]
})

const actionsClasses = computed(() => {
  return [
    'v-tabs__actions'
  ]
})

const panelsClasses = computed(() => {
  return [
    'v-tabs__panels',
    {
      'v-tabs__panels--animated': props.animated
    }
  ]
})

const panelClasses = computed(() => {
  return [
    'v-tabs__panel'
  ]
})

const footerClasses = computed(() => {
  return [
    'v-tabs__footer'
  ]
})

const indicatorStyles = computed(() => {
  if (!props.showIndicator || !indicatorRef.value) return {}

  const activeIndex = props.tabs.findIndex(tab => tab.value === props.modelValue)
  if (activeIndex === -1) return {}

  const activeButton = tabButtons.value[activeIndex]
  if (!activeButton) return {}

  const rect = activeButton.getBoundingClientRect()
  const navRect = indicatorRef.value.parentElement?.getBoundingClientRect()

  if (!navRect) return {}

  return {
    left: `${rect.left - navRect.left}px`,
    width: `${rect.width}px`
  }
})

const activeTab = computed(() => {
  return props.tabs.find(tab => tab.value === props.modelValue) || props.tabs[0]
})

const activeTabIndex = computed(() => {
  return props.tabs.findIndex(tab => tab.value === props.modelValue)
})

// Methods
const getTabClasses = (tab: Tab, _index: number) => {
  return [
    'v-tabs__tab',
    {
      'v-tabs__tab--active': props.modelValue === tab.value,
      'v-tabs__tab--disabled': tab.disabled || props.disabled,
      'v-tabs__tab--closable': tab.closable || props.closable
    }
  ]
}

const getTabIconClasses = (tab: Tab) => {
  return [
    'v-tabs__tab-icon',
    {
      'v-tabs__tab-icon--active': props.modelValue === tab.value
    }
  ]
}

const getTabCloseClasses = (tab: Tab) => {
  return [
    'v-tabs__tab-close',
    {
      'v-tabs__tab-close--active': props.modelValue === tab.value
    }
  ]
}

const selectTab = (value: string) => {
  if (props.disabled || props.loading) return

  const tab = props.tabs.find(t => t.value === value)
  if (!tab || tab.disabled) return

  emit('update:modelValue', value)
  emit('change', value, tab)

  nextTick(() => {
    updateIndicator()
  })
}

const closeTab = (value: string) => {
  const tab = props.tabs.find(t => t.value === value)
  if (!tab) return

  emit('close', value, tab)

  // 현재 탭이 닫히는 경우 다음 탭으로 이동
  if (props.modelValue === value) {
    const currentIndex = props.tabs.findIndex(t => t.value === value)
    const nextTab = props.tabs[currentIndex + 1] || props.tabs[currentIndex - 1]
    if (nextTab) {
      selectTab(nextTab.value)
    }
  }
}

const handleKeydown = (event: KeyboardEvent) => {
  const target = event.target as HTMLElement
  const currentIndex = tabButtons.value.findIndex(button => button === target)

  if (currentIndex === -1) return

  let nextIndex = currentIndex

  switch (event.key) {
    case 'ArrowLeft':
      event.preventDefault()
      nextIndex = currentIndex > 0 ? currentIndex - 1 : props.tabs.length - 1
      break
    case 'ArrowRight':
      event.preventDefault()
      nextIndex = currentIndex < props.tabs.length - 1 ? currentIndex + 1 : 0
      break
    case 'Home':
      event.preventDefault()
      nextIndex = 0
      break
    case 'End':
      event.preventDefault()
      nextIndex = props.tabs.length - 1
      break
    case 'Enter':
    case ' ':
      event.preventDefault()
      selectTab(props.tabs[currentIndex]?.value || '')
      return
  }

  if (nextIndex !== currentIndex) {
    tabButtons.value[nextIndex]?.focus()
  }
}

const updateIndicator = () => {
  if (!props.showIndicator || !indicatorRef.value) return

  nextTick(() => {
    const activeIndex = props.tabs.findIndex(tab => tab.value === props.modelValue)
    if (activeIndex === -1) return

    const activeButton = tabButtons.value[activeIndex]
    if (!activeButton) return

    const rect = activeButton.getBoundingClientRect()
    const navRect = indicatorRef.value?.parentElement?.getBoundingClientRect()

    if (!navRect) return

    if (indicatorRef.value) {
      indicatorRef.value.style.left = `${rect.left - navRect.left}px`
      indicatorRef.value.style.width = `${rect.width}px`
    }
  })
}

const onPanelEnter = (el: Element) => {
  const element = el as HTMLElement
  element.style.opacity = '0'
  element.style.transform = 'translateX(20px)'

  requestAnimationFrame(() => {
    element.style.transition = 'opacity 200ms ease, transform 200ms ease'
    element.style.opacity = '1'
    element.style.transform = 'translateX(0)'
  })
}

const onPanelLeave = (el: Element) => {
  const element = el as HTMLElement
  element.style.opacity = '0'
  element.style.transform = 'translateX(-20px)'
}

// Public methods
const selectTabByIndex = (index: number) => {
  if (index >= 0 && index < props.tabs.length) {
    selectTab(props.tabs[index]?.value || '')
  }
}

const addTab = () => {
  emit('add')
}

// Watch for tabs changes
watch(() => props.tabs, () => {
  nextTick(() => {
    updateIndicator()
  })
}, { deep: true })

// Lifecycle
onMounted(() => {
  updateIndicator()

  // 윈도우 리사이즈 이벤트 리스너
  window.addEventListener('resize', updateIndicator)
})

// Expose methods
defineExpose({
  selectTab,
  selectTabByIndex,
  closeTab,
  addTab,
  updateIndicator
})
</script>

<style scoped>
.v-tabs {
  @apply w-full;
}

/* Variants */
.v-tabs--default .v-tabs__nav {
  @apply border-b border-gray-200;
}

.v-tabs--pills .v-tabs__nav {
  @apply bg-gray-100 rounded-lg p-1;
}

.v-tabs--cards .v-tabs__nav {
  @apply bg-gray-50 rounded-t-lg p-2;
}

.v-tabs--underline .v-tabs__nav {
  @apply border-b-2 border-gray-200;
}

/* Sizes */
.v-tabs--small .v-tabs__tab {
  @apply px-3 py-2 text-sm;
}

.v-tabs--default .v-tabs__tab {
  @apply px-4 py-3 text-base;
}

.v-tabs--large .v-tabs__tab {
  @apply px-6 py-4 text-lg;
}

/* Header */
.v-tabs__header {
  @apply flex items-center justify-between;
}

.v-tabs__header--hidden {
  @apply hidden;
}

/* Navigation */
.v-tabs__nav {
  @apply flex items-center;
}

.v-tabs__nav--left {
  @apply justify-start;
}

.v-tabs__nav--center {
  @apply justify-center;
}

.v-tabs__nav--right {
  @apply justify-end;
}

.v-tabs__nav--justify {
  @apply justify-between;
}

/* Tab */
.v-tabs__tab {
  @apply relative flex items-center gap-2 px-4 py-3;
  @apply text-gray-600 font-medium;
  @apply border-none bg-transparent;
  @apply cursor-pointer transition-all duration-200;
  @apply focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500;
}

.v-tabs__tab:hover {
  @apply text-gray-900;
}

.v-tabs__tab--active {
  @apply text-primary-600;
}

.v-tabs__tab--disabled {
  @apply text-gray-400 cursor-not-allowed;
}

.v-tabs__tab--disabled:hover {
  @apply text-gray-400;
}

/* Tab icon */
.v-tabs__tab-icon {
  @apply w-5 h-5;
}

.v-tabs__tab-icon--active {
  @apply text-primary-600;
}

/* Tab label */
.v-tabs__tab-label {
  @apply whitespace-nowrap;
}

/* Tab badge */
.v-tabs__tab-badge {
  @apply ml-1;
}

/* Tab close */
.v-tabs__tab-close {
  @apply ml-2 p-1 rounded-full;
  @apply text-gray-400 hover:text-gray-600;
  @apply transition-colors duration-200;
}

.v-tabs__tab-close--active {
  @apply text-primary-600 hover:text-primary-700;
}

.v-tabs__tab-close-icon {
  @apply w-4 h-4;
}

/* Indicator */
.v-tabs__indicator {
  @apply absolute bottom-0 h-0.5 bg-primary-500;
  @apply transition-all duration-300 ease-out;
}

.v-tabs__indicator--primary {
  @apply bg-primary-500;
}

.v-tabs__indicator--secondary {
  @apply bg-gray-500;
}

.v-tabs__indicator--success {
  @apply bg-green-500;
}

.v-tabs__indicator--warning {
  @apply bg-yellow-500;
}

.v-tabs__indicator--error {
  @apply bg-red-500;
}

.v-tabs__indicator--info {
  @apply bg-blue-500;
}

/* Variant-specific styles */
.v-tabs--pills .v-tabs__tab {
  @apply rounded-md;
}

.v-tabs--pills .v-tabs__tab--active {
  @apply bg-white text-primary-600 shadow-sm;
}

.v-tabs--cards .v-tabs__tab {
  @apply rounded-t-lg;
}

.v-tabs--cards .v-tabs__tab--active {
  @apply bg-white text-primary-600 shadow-sm;
}

.v-tabs--underline .v-tabs__indicator {
  @apply h-0.5;
}

/* Actions */
.v-tabs__actions {
  @apply flex items-center gap-2;
}

/* Panels */
.v-tabs__panels {
  @apply relative;
}

.v-tabs__panels--animated {
  @apply overflow-hidden;
}

.v-tabs__panel {
  @apply w-full;
}

/* Footer */
.v-tabs__footer {
  @apply p-4 border-t border-gray-200;
}

/* Transitions */
.v-tabs-enter-active,
.v-tabs-leave-active {
  @apply transition-all duration-200 ease-out;
}

.v-tabs-enter-from {
  @apply opacity-0 transform translate-x-4;
}

.v-tabs-leave-to {
  @apply opacity-0 transform -translate-x-4;
}

/* Loading state */
.v-tabs--loading .v-tabs__panels {
  @apply animate-pulse;
}

/* Dark mode */
.dark .v-tabs--default .v-tabs__nav {
  @apply border-gray-700;
}

.dark .v-tabs--pills .v-tabs__nav {
  @apply bg-gray-800;
}

.dark .v-tabs--pills .v-tabs__tab--active {
  @apply bg-gray-700 text-primary-400;
}

.dark .v-tabs--cards .v-tabs__nav {
  @apply bg-gray-800;
}

.dark .v-tabs--cards .v-tabs__tab--active {
  @apply bg-gray-700 text-primary-400;
}

.dark .v-tabs--underline .v-tabs__nav {
  @apply border-gray-700;
}

.dark .v-tabs__tab {
  @apply text-gray-300;
}

.dark .v-tabs__tab:hover {
  @apply text-gray-100;
}

.dark .v-tabs__tab--active {
  @apply text-primary-400;
}

.dark .v-tabs__tab--disabled {
  @apply text-gray-600;
}

.dark .v-tabs__tab-close {
  @apply text-gray-500 hover:text-gray-300;
}

.dark .v-tabs__tab-close--active {
  @apply text-primary-400 hover:text-primary-300;
}

.dark .v-tabs__footer {
  @apply border-gray-700;
}

/* Responsive */
@media (max-width: 640px) {
  .v-tabs__nav {
    @apply flex-wrap;
  }

  .v-tabs__tab {
    @apply flex-1 min-w-0;
  }

  .v-tabs__tab-label {
    @apply truncate;
  }
}
</style>
