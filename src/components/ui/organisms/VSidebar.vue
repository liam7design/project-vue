<template>
  <aside
    ref="sidebarRef"
    class="v-sidebar"
    :class="sidebarClasses"
  >
    <!-- 사이드바 헤더 -->
    <div
      v-if="showHeader"
      class="v-sidebar__header"
      :class="headerClasses"
    >
      <slot name="header">
        <div class="v-sidebar__brand">
          <img
            v-if="logo"
            :src="logo"
            :alt="logoAlt"
            class="v-sidebar__logo"
          />
          <span v-else class="v-sidebar__title">{{ title }}</span>
        </div>
      </slot>
    </div>

    <!-- 사이드바 네비게이션 -->
    <nav
      v-if="showNavigation"
      class="v-sidebar__nav"
      :class="navClasses"
    >
      <slot name="navigation">
        <div
          v-for="section in navigationSections"
          :key="section.value"
          class="v-sidebar__section"
        >
          <!-- 섹션 헤더 -->
          <div
            v-if="section.title"
            class="v-sidebar__section-header"
            :class="getSectionHeaderClasses(section)"
            @click="toggleSection(section.value)"
          >
            <VIcon
              v-if="section.icon"
              :name="section.icon"
              class="v-sidebar__section-icon"
            />
            <span class="v-sidebar__section-title">{{ section.title }}</span>
            <VIcon
              v-if="section.collapsible"
              :name="isSectionOpen(section.value) ? 'mdi:chevron-up' : 'mdi:chevron-down'"
              class="v-sidebar__section-arrow"
            />
          </div>

          <!-- 섹션 아이템들 -->
          <div
            v-if="!section.collapsible || isSectionOpen(section.value)"
            class="v-sidebar__section-items"
            :class="getSectionItemsClasses(section)"
          >
            <div
              v-for="item in section.items"
              :key="item.value"
              class="v-sidebar__item"
              :class="getItemClasses(item)"
              @click="handleItemClick(item)"
            >
              <VIcon
                v-if="item.icon"
                :name="item.icon"
                class="v-sidebar__item-icon"
              />
              <span class="v-sidebar__item-text">{{ item.label }}</span>
              <VBadge
                v-if="item.badge"
                :content="item.badge"
                :color="item.badgeColor || 'primary'"
                size="small"
                class="v-sidebar__item-badge"
              />
            </div>
          </div>
        </div>
      </slot>
    </nav>

    <!-- 사이드바 푸터 -->
    <div
      v-if="showFooter"
      class="v-sidebar__footer"
      :class="footerClasses"
    >
      <slot name="footer">
        <div class="v-sidebar__footer-content">
          <div class="v-sidebar__user-info">
            <VAvatar
              :src="userAvatar"
              :initials="userInitials"
              size="small"
            />
            <div class="v-sidebar__user-details">
              <div class="v-sidebar__user-name">{{ userName }}</div>
              <div class="v-sidebar__user-role">{{ userRole }}</div>
            </div>
          </div>
        </div>
      </slot>
    </div>

    <!-- 토글 버튼 -->
    <button
      v-if="showToggle"
      class="v-sidebar__toggle"
      :class="toggleClasses"
      @click="toggleSidebar"
      :aria-label="collapsed ? '사이드바 펼치기' : '사이드바 접기'"
    >
      <VIcon
        :name="collapsed ? 'mdi:chevron-right' : 'mdi:chevron-left'"
        class="v-sidebar__toggle-icon"
      />
    </button>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { VAvatar, VBadge, VIcon } from '@/components/ui'

// Navigation item interface
interface NavigationItem {
  value: string
  label: string
  icon?: string
  badge?: string | number
  badgeColor?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
  disabled?: boolean
  active?: boolean
}

// Navigation section interface
interface NavigationSection {
  value: string
  title?: string
  icon?: string
  items: NavigationItem[]
  collapsible?: boolean
  collapsed?: boolean
}

// Props 정의
interface Props {
  // 기본 속성
  title?: string
  logo?: string
  logoAlt?: string

  // 네비게이션
  navigationSections?: NavigationSection[]
  showNavigation?: boolean
  activeItem?: string

  // 사용자 정보
  showFooter?: boolean
  userAvatar?: string
  userInitials?: string
  userName?: string
  userRole?: string

  // 토글
  showToggle?: boolean
  collapsed?: boolean

  // 헤더/푸터
  showHeader?: boolean

  // 스타일
  variant?: 'default' | 'elevated' | 'transparent'
  size?: 'small' | 'default' | 'large'
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'

  // 기능
  fixed?: boolean
  overlay?: boolean
  shadow?: boolean


}

const props = withDefaults(defineProps<Props>(), {
  title: 'Vue UI',
  logo: '',
  logoAlt: 'Logo',
  navigationSections: () => [],
  showNavigation: true,
  activeItem: '',
  showFooter: false,
  userAvatar: '',
  userInitials: 'U',
  userName: '사용자',
  userRole: '관리자',
  showToggle: true,
  collapsed: false,
  showHeader: true,
  variant: 'default',
  size: 'default',
  color: 'primary',
  fixed: false,
  overlay: false,
  shadow: true,
  id: ''
})

// Emits 정의
const emit = defineEmits<{
  'update:collapsed': [value: boolean]
  'itemClick': [item: NavigationItem]
  'sectionToggle': [section: NavigationSection]
  'toggle': [collapsed: boolean]
}>()

// Refs
const sidebarRef = ref<HTMLElement>()
const collapsed = ref(props.collapsed)
const openSections = ref<Set<string>>(new Set())

// Computed 속성들
const sidebarClasses = computed(() => {
  return [
    'v-sidebar',
    `v-sidebar--${props.variant}`,
    `v-sidebar--${props.size}`,
    `v-sidebar--${props.color}`,
    {
      'v-sidebar--collapsed': collapsed.value,
      'v-sidebar--fixed': props.fixed,
      'v-sidebar--overlay': props.overlay,
      'v-sidebar--shadow': props.shadow
    }
  ]
})

const headerClasses = computed(() => {
  return [
    'v-sidebar__header',
    {
      'v-sidebar__header--hidden': !props.showHeader
    }
  ]
})

const navClasses = computed(() => {
  return [
    'v-sidebar__nav',
    {
      'v-sidebar__nav--hidden': !props.showNavigation
    }
  ]
})

const footerClasses = computed(() => {
  return [
    'v-sidebar__footer',
    {
      'v-sidebar__footer--hidden': !props.showFooter
    }
  ]
})

const toggleClasses = computed(() => {
  return [
    'v-sidebar__toggle',
    {
      'v-sidebar__toggle--hidden': !props.showToggle
    }
  ]
})

// Methods
const getSectionHeaderClasses = (section: NavigationSection) => {
  return [
    'v-sidebar__section-header',
    {
      'v-sidebar__section-header--collapsible': section.collapsible,
      'v-sidebar__section-header--collapsed': section.collapsed
    }
  ]
}

const getSectionItemsClasses = (section: NavigationSection) => {
  return [
    'v-sidebar__section-items',
    {
      'v-sidebar__section-items--collapsed': section.collapsed
    }
  ]
}

const getItemClasses = (item: NavigationItem) => {
  return [
    'v-sidebar__item',
    {
      'v-sidebar__item--active': props.activeItem === item.value || item.active,
      'v-sidebar__item--disabled': item.disabled
    }
  ]
}

const handleItemClick = (item: NavigationItem) => {
  if (item.disabled) return
  emit('itemClick', item)
}

const toggleSection = (sectionValue: string) => {
  const section = props.navigationSections.find(s => s.value === sectionValue)
  if (!section || !section.collapsible) return

  if (openSections.value.has(sectionValue)) {
    openSections.value.delete(sectionValue)
  } else {
    openSections.value.add(sectionValue)
  }

  emit('sectionToggle', section)
}

const isSectionOpen = (sectionValue: string) => {
  return openSections.value.has(sectionValue)
}

const toggleSidebar = () => {
  collapsed.value = !collapsed.value
  emit('update:collapsed', collapsed.value)
  emit('toggle', collapsed.value)
}

// Public methods
const expandSidebar = () => {
  collapsed.value = false
  emit('update:collapsed', false)
  emit('toggle', false)
}

const collapseSidebar = () => {
  collapsed.value = true
  emit('update:collapsed', true)
  emit('toggle', true)
}

// Expose methods
defineExpose({
  expandSidebar,
  collapseSidebar,
  toggleSidebar,
  sidebarRef
})
</script>

<style scoped>
.v-sidebar {
  @apply w-64 bg-white border-r border-gray-200;
  @apply flex flex-col transition-all duration-300;
  @apply h-full;
}

/* Variants */
.v-sidebar--default {
  @apply bg-white;
}

.v-sidebar--elevated {
  @apply bg-white shadow-lg;
}

.v-sidebar--transparent {
  @apply bg-transparent border-transparent;
}

/* Sizes */
.v-sidebar--small {
  @apply w-48;
}

.v-sidebar--default {
  @apply w-64;
}

.v-sidebar--large {
  @apply w-80;
}

/* Colors */
.v-sidebar--primary {
  @apply border-primary-200;
}

.v-sidebar--secondary {
  @apply border-gray-200;
}

.v-sidebar--success {
  @apply border-green-200;
}

.v-sidebar--warning {
  @apply border-yellow-200;
}

.v-sidebar--error {
  @apply border-red-200;
}

.v-sidebar--info {
  @apply border-blue-200;
}

/* Collapsed state */
.v-sidebar--collapsed {
  @apply w-16;
}

.v-sidebar--collapsed .v-sidebar__title,
.v-sidebar--collapsed .v-sidebar__section-title,
.v-sidebar--collapsed .v-sidebar__item-text,
.v-sidebar--collapsed .v-sidebar__user-name,
.v-sidebar--collapsed .v-sidebar__user-role {
  @apply hidden;
}

.v-sidebar--collapsed .v-sidebar__section-arrow {
  @apply hidden;
}

.v-sidebar--collapsed .v-sidebar__item-badge {
  @apply hidden;
}

/* Fixed */
.v-sidebar--fixed {
  @apply fixed top-0 left-0 z-30;
}

/* Overlay */
.v-sidebar--overlay {
  @apply fixed top-0 left-0 z-50;
}

/* Shadow */
.v-sidebar--shadow {
  @apply shadow-lg;
}

/* Header */
.v-sidebar__header {
  @apply p-4 border-b border-gray-200;
}

.v-sidebar__header--hidden {
  @apply hidden;
}

.v-sidebar__brand {
  @apply flex items-center;
}

.v-sidebar__logo {
  @apply h-8 w-auto;
}

.v-sidebar__title {
  @apply text-lg font-bold text-gray-900;
}

/* Navigation */
.v-sidebar__nav {
  @apply flex-1 overflow-y-auto;
}

.v-sidebar__nav--hidden {
  @apply hidden;
}

/* Section */
.v-sidebar__section {
  @apply mb-4;
}

.v-sidebar__section-header {
  @apply flex items-center gap-3 px-4 py-2;
  @apply text-gray-600 font-medium text-sm;
  @apply cursor-pointer transition-colors;
}

.v-sidebar__section-header--collapsible {
  @apply hover:text-gray-900 hover:bg-gray-50;
}

.v-sidebar__section-header--collapsed {
  @apply text-gray-400;
}

.v-sidebar__section-icon {
  @apply w-5 h-5;
}

.v-sidebar__section-title {
  @apply flex-1;
}

.v-sidebar__section-arrow {
  @apply w-4 h-4 transition-transform;
}

.v-sidebar__section-items {
  @apply space-y-1;
}

.v-sidebar__section-items--collapsed {
  @apply hidden;
}

/* Item */
.v-sidebar__item {
  @apply flex items-center gap-3 px-4 py-2 mx-2;
  @apply text-gray-600 hover:text-gray-900;
  @apply hover:bg-gray-50 rounded-md cursor-pointer transition-colors;
}

.v-sidebar__item--active {
  @apply text-primary-600 bg-primary-50;
}

.v-sidebar__item--disabled {
  @apply text-gray-400 cursor-not-allowed;
}

.v-sidebar__item-icon {
  @apply w-5 h-5;
}

.v-sidebar__item-text {
  @apply flex-1 text-sm;
}

.v-sidebar__item-badge {
  @apply ml-auto;
}

/* Footer */
.v-sidebar__footer {
  @apply p-4 border-t border-gray-200;
}

.v-sidebar__footer--hidden {
  @apply hidden;
}

.v-sidebar__footer-content {
  @apply space-y-3;
}

.v-sidebar__user-info {
  @apply flex items-center gap-3;
}

.v-sidebar__user-details {
  @apply flex-1 min-w-0;
}

.v-sidebar__user-name {
  @apply text-sm font-medium text-gray-900 truncate;
}

.v-sidebar__user-role {
  @apply text-xs text-gray-500 truncate;
}

/* Toggle */
.v-sidebar__toggle {
  @apply absolute -right-3 top-1/2 transform -translate-y-1/2;
  @apply w-6 h-6 bg-white border border-gray-200;
  @apply rounded-full shadow-md;
  @apply flex items-center justify-center;
  @apply text-gray-600 hover:text-gray-900;
  @apply transition-colors;
}

.v-sidebar__toggle--hidden {
  @apply hidden;
}

.v-sidebar__toggle-icon {
  @apply w-4 h-4;
}

/* Dark mode */
.dark .v-sidebar {
  @apply bg-gray-900 border-gray-700;
}

.dark .v-sidebar__title {
  @apply text-gray-100;
}

.dark .v-sidebar__section-header {
  @apply text-gray-300;
}

.dark .v-sidebar__section-header--collapsible {
  @apply hover:text-gray-100 hover:bg-gray-800;
}

.dark .v-sidebar__section-header--collapsed {
  @apply text-gray-500;
}

.dark .v-sidebar__item {
  @apply text-gray-300 hover:text-gray-100 hover:bg-gray-800;
}

.dark .v-sidebar__item--active {
  @apply text-primary-400 bg-primary-900/20;
}

.dark .v-sidebar__user-name {
  @apply text-gray-100;
}

.dark .v-sidebar__user-role {
  @apply text-gray-400;
}

.dark .v-sidebar__toggle {
  @apply bg-gray-800 border-gray-600 text-gray-300 hover:text-gray-100;
}

/* Responsive */
@media (max-width: 768px) {
  .v-sidebar {
    @apply w-full;
  }

  .v-sidebar--collapsed {
    @apply w-16;
  }
}

@media (max-width: 640px) {
  .v-sidebar {
    @apply w-full;
  }

  .v-sidebar--collapsed {
    @apply w-0;
  }
}
</style>
