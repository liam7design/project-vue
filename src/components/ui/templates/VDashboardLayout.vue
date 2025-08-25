<template>
  <div
    ref="dashboardRef"
    class="v-dashboard"
    :class="dashboardClasses"
  >
    <!-- 사이드바 -->
    <aside
      v-if="showSidebar"
      class="v-dashboard__sidebar"
      :class="sidebarClasses"
    >
      <slot name="sidebar">
        <VSidebar
          :title="sidebarTitle"
          :logo="sidebarLogo"
          :navigation="sidebarNavigation"
          :user-info="sidebarUserInfo"
          :collapsed="sidebarCollapsed"
          :fixed="true"
          :overlay="sidebarOverlay"
          :shadow="sidebarShadow"
          :size="sidebarSize"
          :color="sidebarColor"
          @toggle="handleSidebarToggle"
        />
      </slot>
    </aside>

    <!-- 메인 콘텐츠 -->
    <main class="v-dashboard__main" :class="mainClasses">
      <!-- 헤더 -->
      <header
        v-if="showHeader"
        class="v-dashboard__header"
        :class="headerClasses"
      >
        <slot name="header">
          <VHeader
            :title="headerTitle"
            :logo="headerLogo"
            :navigation="headerNavigation"
            :user-menu="headerUserMenu"
            :search="headerSearch"
            :sticky="false"
            :shadow="headerShadow"
            :size="headerSize"
            :color="headerColor"
          />
        </slot>
      </header>

      <!-- 콘텐츠 영역 -->
      <div class="v-dashboard__content" :class="contentClasses">
        <!-- 페이지 헤더 -->
        <div
          v-if="showPageHeader"
          class="v-dashboard__page-header"
          :class="pageHeaderClasses"
        >
          <slot name="page-header">
            <div class="v-dashboard__page-header-content">
              <div class="v-dashboard__page-header-left">
                <h1 v-if="pageTitle" class="v-dashboard__page-title">
                  {{ pageTitle }}
                </h1>
                <p v-if="pageSubtitle" class="v-dashboard__page-subtitle">
                  {{ pageSubtitle }}
                </p>
                <div v-if="breadcrumbs && breadcrumbs.length > 0" class="v-dashboard__breadcrumbs">
                  <nav class="v-dashboard__breadcrumb-nav">
                    <ol class="v-dashboard__breadcrumb-list">
                      <li
                        v-for="(crumb, index) in breadcrumbs"
                        :key="crumb.value"
                        class="v-dashboard__breadcrumb-item"
                      >
                        <a
                          v-if="crumb.href && index < breadcrumbs.length - 1"
                          :href="crumb.href"
                          class="v-dashboard__breadcrumb-link"
                          @click="handleBreadcrumbClick(crumb)"
                        >
                          {{ crumb.label }}
                        </a>
                        <span
                          v-else
                          class="v-dashboard__breadcrumb-current"
                        >
                          {{ crumb.label }}
                        </span>
                        <span
                          v-if="index < breadcrumbs.length - 1"
                          class="v-dashboard__breadcrumb-separator"
                        >
                          /
                        </span>
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
              <div class="v-dashboard__page-header-right">
                <slot name="page-actions" />
              </div>
            </div>
          </slot>
        </div>

        <!-- 페이지 콘텐츠 -->
        <div class="v-dashboard__page-content" :class="pageContentClasses">
          <slot />
        </div>
      </div>
    </main>

    <!-- 오버레이 (모바일 사이드바용) -->
    <div
      v-if="showSidebar && sidebarOverlay && sidebarOpen"
      class="v-dashboard__overlay"
      @click="handleOverlayClick"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { VHeader, VSidebar } from '@/components/ui'

// Navigation item interface
interface NavigationItem {
  value: string
  label: string
  href?: string
  icon?: string
  badge?: string
  children?: NavigationItem[]
}

// Navigation section interface
interface NavigationSection {
  title: string
  items: NavigationItem[]
}

// User menu item interface
interface UserMenuItem {
  value: string
  label: string
  href?: string
  icon?: string
  divider?: boolean
}

// User info interface
interface UserInfo {
  name: string
  email: string
  avatar?: string
  role?: string
}

// Breadcrumb interface
interface Breadcrumb {
  value: string
  label: string
  href?: string
}

// Props 정의
interface Props {
  // 사이드바 설정
  showSidebar?: boolean
  sidebarTitle?: string
  sidebarLogo?: string
  sidebarNavigation?: NavigationSection[]
  sidebarUserInfo?: UserInfo
  sidebarCollapsed?: boolean
  sidebarOverlay?: boolean
  sidebarShadow?: boolean
  sidebarSize?: 'small' | 'default' | 'large'
  sidebarColor?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'

  // 헤더 설정
  showHeader?: boolean
  headerTitle?: string
  headerLogo?: string
  headerNavigation?: NavigationItem[]
  headerUserMenu?: UserMenuItem[]
  headerSearch?: boolean
  headerShadow?: boolean
  headerSize?: 'small' | 'default' | 'large'
  headerColor?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'

  // 페이지 헤더 설정
  showPageHeader?: boolean
  pageTitle?: string
  pageSubtitle?: string
  breadcrumbs?: Breadcrumb[]

  // 스타일
  variant?: 'default' | 'compact' | 'spacious'
  sidebarWidth?: 'narrow' | 'default' | 'wide'

  // 기능
  sidebarOpen?: boolean
  autoCloseSidebar?: boolean


}

const props = withDefaults(defineProps<Props>(), {
  showSidebar: true,
  sidebarTitle: 'Dashboard',
  sidebarLogo: '',
  sidebarNavigation: () => [],
  sidebarUserInfo: () => ({
    name: '사용자',
    email: 'user@example.com',
    avatar: '',
    role: '관리자'
  }),
  sidebarCollapsed: false,
  sidebarOverlay: true,
  sidebarShadow: true,
  sidebarSize: 'default',
  sidebarColor: 'primary',
  showHeader: true,
  headerTitle: 'Dashboard',
  headerLogo: '',
  headerNavigation: () => [],
  headerUserMenu: () => [],
  headerSearch: false,
  headerShadow: true,
  headerSize: 'default',
  headerColor: 'primary',
  showPageHeader: true,
  pageTitle: '',
  pageSubtitle: '',
  breadcrumbs: () => [],
  variant: 'default',
  sidebarWidth: 'default',
  sidebarOpen: false,
  autoCloseSidebar: true
})

// Emits 정의
const emit = defineEmits<{
  'sidebarToggle': [collapsed: boolean]
  'sidebarOpen': [open: boolean]
  'breadcrumbClick': [breadcrumb: Breadcrumb]
}>()

// Reactive 상태
const sidebarOpen = ref(props.sidebarOpen)

// Computed 속성들
const dashboardClasses = computed(() => {
  return [
    'v-dashboard',
    `v-dashboard--${props.variant}`,
    `v-dashboard--sidebar-width-${props.sidebarWidth}`,
    {
      'v-dashboard--sidebar-open': sidebarOpen.value,
      'v-dashboard--sidebar-overlay': props.sidebarOverlay
    }
  ]
})

const sidebarClasses = computed(() => {
  return [
    'v-dashboard__sidebar',
    {
      'v-dashboard__sidebar--hidden': !props.showSidebar,
      'v-dashboard__sidebar--open': sidebarOpen.value
    }
  ]
})

const mainClasses = computed(() => {
  return [
    'v-dashboard__main',
    {
      'v-dashboard__main--sidebar': props.showSidebar
    }
  ]
})

const headerClasses = computed(() => {
  return [
    'v-dashboard__header',
    {
      'v-dashboard__header--hidden': !props.showHeader
    }
  ]
})

const contentClasses = computed(() => {
  return [
    'v-dashboard__content',
    {
      'v-dashboard__content--page-header': props.showPageHeader
    }
  ]
})

const pageHeaderClasses = computed(() => {
  return [
    'v-dashboard__page-header',
    {
      'v-dashboard__page-header--hidden': !props.showPageHeader
    }
  ]
})

const pageContentClasses = computed(() => {
  return [
    'v-dashboard__page-content',
    {
      'v-dashboard__page-content--page-header': props.showPageHeader
    }
  ]
})

// Methods
const handleSidebarToggle = (collapsed: boolean) => {
  sidebarOpen.value = !collapsed
  emit('sidebarToggle', collapsed)
  emit('sidebarOpen', sidebarOpen.value)
}

const handleOverlayClick = () => {
  if (props.autoCloseSidebar) {
    sidebarOpen.value = false
    emit('sidebarOpen', false)
  }
}

const handleBreadcrumbClick = (breadcrumb: Breadcrumb) => {
  emit('breadcrumbClick', breadcrumb)
}

// Watchers
watch(() => props.sidebarOpen, (newValue) => {
  sidebarOpen.value = newValue
})

watch(sidebarOpen, (newValue) => {
  emit('sidebarOpen', newValue)
})
</script>

<style scoped>
.v-dashboard {
  @apply min-h-screen flex;
  @apply bg-gray-50;
}

/* Variants */
.v-dashboard--default {
  @apply bg-gray-50;
}

.v-dashboard--compact {
  @apply bg-gray-100;
}

.v-dashboard--spacious {
  @apply bg-gray-50;
}

/* Sidebar width */
.v-dashboard--sidebar-width-narrow .v-dashboard__sidebar {
  @apply w-56;
}

.v-dashboard--sidebar-width-default .v-dashboard__sidebar {
  @apply w-64;
}

.v-dashboard--sidebar-width-wide .v-dashboard__sidebar {
  @apply w-72;
}

/* Sidebar */
.v-dashboard__sidebar {
  @apply flex-shrink-0;
  @apply fixed top-0 left-0 h-full z-40;
  @apply transition-all duration-300;
}

.v-dashboard__sidebar--hidden {
  @apply hidden;
}

.v-dashboard__sidebar--open {
  @apply translate-x-0;
}

/* Main */
.v-dashboard__main {
  @apply flex-1;
  @apply flex flex-col;
  @apply min-w-0;
  @apply ml-64;
}

.v-dashboard--sidebar-width-narrow .v-dashboard__main {
  @apply ml-56;
}

.v-dashboard--sidebar-width-wide .v-dashboard__main {
  @apply ml-72;
}

.v-dashboard__main--sidebar {
  @apply ml-64;
}

.v-dashboard--sidebar-width-narrow .v-dashboard__main--sidebar {
  @apply ml-56;
}

.v-dashboard--sidebar-width-wide .v-dashboard__main--sidebar {
  @apply ml-72;
}

/* Header */
.v-dashboard__header {
  @apply flex-shrink-0;
  @apply bg-white border-b border-gray-200;
}

.v-dashboard__header--hidden {
  @apply hidden;
}

/* Content */
.v-dashboard__content {
  @apply flex-1;
  @apply flex flex-col;
  @apply min-w-0;
}

.v-dashboard__content--page-header {
  @apply pt-0;
}

/* Page Header */
.v-dashboard__page-header {
  @apply flex-shrink-0;
  @apply bg-white border-b border-gray-200;
  @apply px-6 py-4;
}

.v-dashboard__page-header--hidden {
  @apply hidden;
}

.v-dashboard__page-header-content {
  @apply flex justify-between items-center;
}

.v-dashboard__page-header-left {
  @apply flex flex-col;
}

.v-dashboard__page-title {
  @apply text-2xl font-bold text-gray-900;
}

.v-dashboard__page-subtitle {
  @apply text-sm text-gray-600 mt-1;
}

.v-dashboard__breadcrumbs {
  @apply mt-2;
}

.v-dashboard__breadcrumb-nav {
  @apply flex;
}

.v-dashboard__breadcrumb-list {
  @apply flex items-center gap-2;
  @apply list-none;
}

.v-dashboard__breadcrumb-item {
  @apply flex items-center;
}

.v-dashboard__breadcrumb-link {
  @apply text-sm text-gray-500 hover:text-gray-700;
  @apply transition-colors;
}

.v-dashboard__breadcrumb-current {
  @apply text-sm font-medium text-gray-900;
}

.v-dashboard__breadcrumb-separator {
  @apply text-sm text-gray-400;
  @apply mx-2;
}

.v-dashboard__page-header-right {
  @apply flex items-center gap-4;
}

/* Page Content */
.v-dashboard__page-content {
  @apply flex-1;
  @apply p-6;
}

.v-dashboard__page-content--page-header {
  @apply pt-6;
}

/* Overlay */
.v-dashboard__overlay {
  @apply fixed inset-0 bg-black bg-opacity-50 z-30;
  @apply md:hidden;
}

/* Responsive */
@media (max-width: 768px) {
  .v-dashboard__main {
    @apply ml-0;
  }

  .v-dashboard__main--sidebar {
    @apply ml-0;
  }

  .v-dashboard__sidebar {
    @apply transform -translate-x-full;
  }

  .v-dashboard__sidebar--open {
    @apply translate-x-0;
  }

  .v-dashboard__page-header-content {
    @apply flex-col items-start gap-4;
  }

  .v-dashboard__page-header-right {
    @apply w-full justify-start;
  }

  .v-dashboard__page-title {
    @apply text-xl;
  }

  .v-dashboard__page-subtitle {
    @apply text-sm;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .v-dashboard {
    @apply bg-gray-900;
  }

  .v-dashboard--default {
    @apply bg-gray-900;
  }

  .v-dashboard--compact {
    @apply bg-gray-800;
  }

  .v-dashboard--spacious {
    @apply bg-gray-900;
  }

  .v-dashboard__header {
    @apply bg-gray-800 border-gray-700;
  }

  .v-dashboard__page-header {
    @apply bg-gray-800 border-gray-700;
  }

  .v-dashboard__page-title {
    @apply text-white;
  }

  .v-dashboard__page-subtitle {
    @apply text-gray-400;
  }

  .v-dashboard__breadcrumb-link {
    @apply text-gray-400 hover:text-gray-300;
  }

  .v-dashboard__breadcrumb-current {
    @apply text-white;
  }

  .v-dashboard__breadcrumb-separator {
    @apply text-gray-500;
  }
}
</style>
