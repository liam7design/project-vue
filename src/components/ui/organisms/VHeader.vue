<template>
  <header
    ref="headerRef"
    class="v-header"
    :class="headerClasses"
  >
    <!-- 헤더 컨테이너 -->
    <div class="v-header__container">
      <!-- 브랜딩 -->
      <div class="v-header__brand">
        <slot name="brand">
          <div class="v-header__logo">
            <img
              v-if="logo"
              :src="logo"
              :alt="logoAlt"
              class="v-header__logo-image"
            />
            <span v-else class="v-header__logo-text">{{ title }}</span>
          </div>
        </slot>
      </div>

      <!-- 네비게이션 -->
      <nav
        v-if="showNavigation"
        class="v-header__nav"
        :class="navClasses"
      >
        <slot name="navigation">
          <div
            v-for="item in navigationItems"
            :key="item.value"
            class="v-header__nav-item"
            :class="getNavItemClasses(item)"
            @click="handleNavClick(item)"
          >
            <VIcon
              v-if="item.icon"
              :name="item.icon"
              class="v-header__nav-icon"
            />
            <span class="v-header__nav-text">{{ item.label }}</span>
            <VBadge
              v-if="item.badge"
              :content="item.badge"
              :color="item.badgeColor || 'primary'"
              size="small"
              class="v-header__nav-badge"
            />
          </div>
        </slot>
      </nav>

      <!-- 액션 -->
      <div class="v-header__actions">
        <slot name="actions">
          <!-- 검색 -->
          <div
            v-if="showSearch"
            class="v-header__search"
            :class="searchClasses"
          >
            <VInput
              :model-value="searchValue"
              placeholder="검색..."
              prepend-icon="mdi:magnify"
              clearable
              @update:model-value="handleSearchUpdate"
              @input="handleSearch"
            />
          </div>

          <!-- 사용자 메뉴 -->
          <VMenu
            v-if="showUserMenu"
            class="v-header__user-menu"
          >
            <template #trigger>
              <div class="v-header__user-trigger">
                <VAvatar
                  :src="userAvatar"
                  :initials="userInitials"
                  size="small"
                />
                <span v-if="showUserName" class="v-header__user-name">
                  {{ userName }}
                </span>
                <VIcon
                  name="mdi:chevron-down"
                  class="v-header__user-arrow"
                />
              </div>
            </template>

            <div class="p-2">
              <div class="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded">
                프로필
              </div>
              <div class="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded">
                설정
              </div>
              <div class="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded">
                로그아웃
              </div>
            </div>
          </VMenu>

          <!-- 모바일 메뉴 토글 -->
          <button
            v-if="showMobileMenu"
            class="v-header__mobile-toggle"
            :class="mobileToggleClasses"
            @click="toggleMobileMenu"
            :aria-label="mobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'"
          >
            <VIcon
              :name="mobileMenuOpen ? 'mdi:close' : 'mdi:menu'"
              class="v-header__mobile-toggle-icon"
            />
          </button>
        </slot>
      </div>
    </div>

    <!-- 모바일 메뉴 -->
    <Transition
      name="v-header-mobile"
      @enter="onMobileMenuEnter"
      @leave="onMobileMenuLeave"
    >
      <div
        v-if="showMobileMenu && mobileMenuOpen"
        class="v-header__mobile-menu"
        :class="mobileMenuClasses"
      >
        <slot name="mobile-menu">
          <div
            v-for="item in navigationItems"
            :key="item.value"
            class="v-header__mobile-item"
            :class="getMobileItemClasses(item)"
            @click="handleMobileNavClick(item)"
          >
            <VIcon
              v-if="item.icon"
              :name="item.icon"
              class="v-header__mobile-icon"
            />
            <span class="v-header__mobile-text">{{ item.label }}</span>
            <VBadge
              v-if="item.badge"
              :content="item.badge"
              :color="item.badgeColor || 'primary'"
              size="small"
              class="v-header__mobile-badge"
            />
          </div>
        </slot>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { VInput, VAvatar, VBadge, VIcon, VMenu } from '@/components/ui'

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

// Props 정의
interface Props {
  // 기본 속성
  title?: string
  logo?: string
  logoAlt?: string

  // 네비게이션
  navigationItems?: NavigationItem[]
  showNavigation?: boolean
  activeItem?: string

  // 검색
  showSearch?: boolean
  searchValue?: string

  // 사용자 메뉴
  showUserMenu?: boolean
  userAvatar?: string
  userInitials?: string
  userName?: string
  showUserName?: boolean

  // 모바일
  showMobileMenu?: boolean
  mobileMenuOpen?: boolean

  // 스타일
  variant?: 'default' | 'elevated' | 'transparent'
  size?: 'small' | 'default' | 'large'
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'

  // 기능
  sticky?: boolean
  fixed?: boolean
  shadow?: boolean


}

const props = withDefaults(defineProps<Props>(), {
  title: 'Vue UI',
  logo: '',
  logoAlt: 'Logo',
  navigationItems: () => [],
  showNavigation: true,
  activeItem: '',
  showSearch: false,
  searchValue: '',
  showUserMenu: false,
  userAvatar: '',
  userInitials: 'U',
  userName: '사용자',
  showUserName: true,
  showMobileMenu: true,
  mobileMenuOpen: false,
  variant: 'default',
  size: 'default',
  color: 'primary',
  sticky: false,
  fixed: false,
  shadow: true,
  id: ''
})

// Emits 정의
const emit = defineEmits<{
  'update:searchValue': [value: string]
  'update:mobileMenuOpen': [value: boolean]
  'navClick': [item: NavigationItem]
  'search': [value: string]
  'mobileNavClick': [item: NavigationItem]
}>()

// Refs
const headerRef = ref<HTMLElement>()
const mobileMenuOpen = ref(props.mobileMenuOpen)

// Computed 속성들
const headerClasses = computed(() => {
  return [
    'v-header',
    `v-header--${props.variant}`,
    `v-header--${props.size}`,
    `v-header--${props.color}`,
    {
      'v-header--sticky': props.sticky,
      'v-header--fixed': props.fixed,
      'v-header--shadow': props.shadow,
      'v-header--mobile-open': mobileMenuOpen.value
    }
  ]
})

const navClasses = computed(() => {
  return [
    'v-header__nav',
    {
      'v-header__nav--hidden': !props.showNavigation
    }
  ]
})

const searchClasses = computed(() => {
  return [
    'v-header__search',
    {
      'v-header__search--hidden': !props.showSearch
    }
  ]
})

const mobileToggleClasses = computed(() => {
  return [
    'v-header__mobile-toggle',
    {
      'v-header__mobile-toggle--hidden': !props.showMobileMenu
    }
  ]
})

const mobileMenuClasses = computed(() => {
  return [
    'v-header__mobile-menu'
  ]
})

// Methods
const getNavItemClasses = (item: NavigationItem) => {
  return [
    'v-header__nav-item',
    {
      'v-header__nav-item--active': props.activeItem === item.value || item.active,
      'v-header__nav-item--disabled': item.disabled
    }
  ]
}

const getMobileItemClasses = (item: NavigationItem) => {
  return [
    'v-header__mobile-item',
    {
      'v-header__mobile-item--active': props.activeItem === item.value || item.active,
      'v-header__mobile-item--disabled': item.disabled
    }
  ]
}

const handleNavClick = (item: NavigationItem) => {
  if (item.disabled) return
  emit('navClick', item)
}

const handleMobileNavClick = (item: NavigationItem) => {
  if (item.disabled) return
  emit('mobileNavClick', item)
  mobileMenuOpen.value = false
  emit('update:mobileMenuOpen', false)
}

const handleSearchUpdate = (value: string) => {
  emit('update:searchValue', value)
}

const handleSearch = (value: string) => {
  emit('search', value)
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
  emit('update:mobileMenuOpen', mobileMenuOpen.value)
}

const onMobileMenuEnter = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = '0'
  element.style.opacity = '0'

  requestAnimationFrame(() => {
    element.style.transition = 'height 200ms ease, opacity 200ms ease'
    element.style.height = `${element.scrollHeight}px`
    element.style.opacity = '1'
  })
}

const onMobileMenuLeave = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = '0'
  element.style.opacity = '0'
}

// Public methods
const openMobileMenu = () => {
  mobileMenuOpen.value = true
  emit('update:mobileMenuOpen', true)
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
  emit('update:mobileMenuOpen', false)
}

// Expose methods
defineExpose({
  openMobileMenu,
  closeMobileMenu,
  toggleMobileMenu,
  headerRef
})
</script>

<style scoped>
.v-header {
  @apply w-full bg-white border-b border-gray-200;
  @apply transition-all duration-200;
}

/* Variants */
.v-header--default {
  @apply bg-white;
}

.v-header--elevated {
  @apply bg-white shadow-lg;
}

.v-header--transparent {
  @apply bg-transparent border-transparent;
}

/* Sizes */
.v-header--small {
  @apply h-12;
}

.v-header--default {
  @apply h-16;
}

.v-header--large {
  @apply h-20;
}

/* Colors */
.v-header--primary {
  @apply border-primary-200;
}

.v-header--secondary {
  @apply border-gray-200;
}

.v-header--success {
  @apply border-green-200;
}

.v-header--warning {
  @apply border-yellow-200;
}

.v-header--error {
  @apply border-red-200;
}

.v-header--info {
  @apply border-blue-200;
}

/* Container */
.v-header__container {
  @apply flex items-center justify-between h-full px-4;
}

/* Brand */
.v-header__brand {
  @apply flex items-center;
}

.v-header__logo {
  @apply flex items-center;
}

.v-header__logo-image {
  @apply h-8 w-auto;
}

.v-header__logo-text {
  @apply text-xl font-bold text-gray-900;
}

/* Navigation */
.v-header__nav {
  @apply hidden md:flex items-center space-x-1;
}

.v-header__nav--hidden {
  @apply hidden;
}

.v-header__nav-item {
  @apply flex items-center gap-2 px-3 py-2;
  @apply text-gray-600 hover:text-gray-900;
  @apply rounded-md cursor-pointer transition-colors;
}

.v-header__nav-item--active {
  @apply text-primary-600 bg-primary-50;
}

.v-header__nav-item--disabled {
  @apply text-gray-400 cursor-not-allowed;
}

.v-header__nav-icon {
  @apply w-5 h-5;
}

.v-header__nav-text {
  @apply text-sm font-medium;
}

.v-header__nav-badge {
  @apply ml-1;
}

/* Actions */
.v-header__actions {
  @apply flex items-center gap-4;
}

/* Search */
.v-header__search {
  @apply w-64;
}

.v-header__search--hidden {
  @apply hidden;
}

/* User Menu */
.v-header__user-menu {
  @apply hidden lg:block;
}

.v-header__user-trigger {
  @apply flex items-center gap-2 px-3 py-2;
  @apply text-gray-600 hover:text-gray-900;
  @apply rounded-md cursor-pointer transition-colors;
}

.v-header__user-name {
  @apply text-sm font-medium;
}

.v-header__user-arrow {
  @apply w-4 h-4 transition-transform;
}

/* Mobile Toggle */
.v-header__mobile-toggle {
  @apply md:hidden flex items-center justify-center;
  @apply w-10 h-10 text-gray-600 hover:text-gray-900;
  @apply rounded-md hover:bg-gray-100 transition-colors;
}

.v-header__mobile-toggle--hidden {
  @apply hidden;
}

.v-header__mobile-toggle-icon {
  @apply w-6 h-6;
}

/* Mobile Menu */
.v-header__mobile-menu {
  @apply md:hidden bg-white border-t border-gray-200;
  @apply overflow-hidden;
}

.v-header__mobile-item {
  @apply flex items-center gap-3 px-4 py-3;
  @apply text-gray-600 hover:text-gray-900;
  @apply hover:bg-gray-50 cursor-pointer transition-colors;
}

.v-header__mobile-item--active {
  @apply text-primary-600 bg-primary-50;
}

.v-header__mobile-item--disabled {
  @apply text-gray-400 cursor-not-allowed;
}

.v-header__mobile-icon {
  @apply w-5 h-5;
}

.v-header__mobile-text {
  @apply text-sm font-medium;
}

.v-header__mobile-badge {
  @apply ml-auto;
}

/* Sticky/Fixed */
.v-header--sticky {
  @apply sticky top-0 z-40;
}

.v-header--fixed {
  @apply fixed top-0 left-0 right-0 z-40;
}

/* Shadow */
.v-header--shadow {
  @apply shadow-sm;
}

/* Mobile menu transitions */
.v-header-mobile-enter-active,
.v-header-mobile-leave-active {
  @apply transition-all duration-200 ease-out;
}

.v-header-mobile-enter-from,
.v-header-mobile-leave-to {
  @apply opacity-0;
}

/* Dark mode */
.dark .v-header {
  @apply bg-gray-900 border-gray-700;
}

.dark .v-header__logo-text {
  @apply text-gray-100;
}

.dark .v-header__nav-item {
  @apply text-gray-300 hover:text-gray-100;
}

.dark .v-header__nav-item--active {
  @apply text-primary-400 bg-primary-900/20;
}

.dark .v-header__user-trigger {
  @apply text-gray-300 hover:text-gray-100;
}

.dark .v-header__mobile-toggle {
  @apply text-gray-300 hover:text-gray-100 hover:bg-gray-800;
}

.dark .v-header__mobile-menu {
  @apply bg-gray-900 border-gray-700;
}

.dark .v-header__mobile-item {
  @apply text-gray-300 hover:text-gray-100 hover:bg-gray-800;
}

.dark .v-header__mobile-item--active {
  @apply text-primary-400 bg-primary-900/20;
}

/* Responsive */
@media (max-width: 768px) {
  .v-header__search {
    @apply w-48;
  }
}

@media (max-width: 640px) {
  .v-header__search {
    @apply w-32;
  }

  .v-header__user-name {
    @apply hidden;
  }
}
</style>
