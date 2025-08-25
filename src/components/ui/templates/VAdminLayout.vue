<template>
  <div
    ref="adminRef"
    class="v-admin"
    :class="adminClasses"
  >
    <!-- 사이드바 -->
    <aside
      v-if="showSidebar"
      class="v-admin__sidebar"
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
    <main class="v-admin__main" :class="mainClasses">
      <!-- 헤더 -->
      <header
        v-if="showHeader"
        class="v-admin__header"
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
      <div class="v-admin__content" :class="contentClasses">
        <!-- 페이지 헤더 -->
        <div
          v-if="showPageHeader"
          class="v-admin__page-header"
          :class="pageHeaderClasses"
        >
          <slot name="page-header">
            <div class="v-admin__page-header-content">
              <div class="v-admin__page-header-left">
                <h1 v-if="pageTitle" class="v-admin__page-title">
                  {{ pageTitle }}
                </h1>
                <p v-if="pageSubtitle" class="v-admin__page-subtitle">
                  {{ pageSubtitle }}
                </p>
                <div v-if="breadcrumbs && breadcrumbs.length > 0" class="v-admin__breadcrumbs">
                  <nav class="v-admin__breadcrumb-nav">
                    <ol class="v-admin__breadcrumb-list">
                      <li
                        v-for="(crumb, index) in breadcrumbs"
                        :key="crumb.value"
                        class="v-admin__breadcrumb-item"
                      >
                        <a
                          v-if="crumb.href && index < breadcrumbs.length - 1"
                          :href="crumb.href"
                          class="v-admin__breadcrumb-link"
                          @click="handleBreadcrumbClick(crumb)"
                        >
                          {{ crumb.label }}
                        </a>
                        <span
                          v-else
                          class="v-admin__breadcrumb-current"
                        >
                          {{ crumb.label }}
                        </span>
                        <span
                          v-if="index < breadcrumbs.length - 1"
                          class="v-admin__breadcrumb-separator"
                        >
                          /
                        </span>
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
              <div class="v-admin__page-header-right">
                <slot name="page-actions" />
              </div>
            </div>
          </slot>
        </div>

        <!-- 페이지 콘텐츠 -->
        <div class="v-admin__page-content" :class="pageContentClasses">
          <slot />
        </div>
      </div>
    </main>

    <!-- 푸터 -->
    <footer
      v-if="showFooter"
      class="v-admin__footer"
      :class="footerClasses"
    >
      <slot name="footer">
        <VFooter
          :title="footerTitle"
          :logo="footerLogo"
          :description="footerDescription"
          :link-sections="footerLinkSections"
          :social-links="footerSocialLinks"
          :legal-links="footerLegalLinks"
          :show-branding="footerShowBranding"
          :show-links="footerShowLinks"
          :show-social="footerShowSocial"
          :show-bottom="footerShowBottom"
          :variant="footerVariant"
          :size="footerSize"
          :color="footerColor"
          :fixed="footerFixed"
          :shadow="footerShadow"
        />
      </slot>
    </footer>

    <!-- 오버레이 (모바일 사이드바용) -->
    <div
      v-if="showSidebar && sidebarOverlay && sidebarOpen"
      class="v-admin__overlay"
      @click="handleOverlayClick"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { VHeader, VSidebar, VFooter } from '@/components/ui'

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

// Link section interface
interface LinkSection {
  title: string
  links: Array<{
    value: string
    label: string
    href: string
    external?: boolean
  }>
}

// Social link interface
interface SocialLink {
  platform: string
  label: string
  href: string
  icon: string
  external?: boolean
}

// Legal link interface
interface LegalLink {
  value: string
  label: string
  href: string
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

  // 푸터 설정
  showFooter?: boolean
  footerTitle?: string
  footerLogo?: string
  footerDescription?: string
  footerLinkSections?: LinkSection[]
  footerSocialLinks?: SocialLink[]
  footerLegalLinks?: LegalLink[]
  footerShowBranding?: boolean
  footerShowLinks?: boolean
  footerShowSocial?: boolean
  footerShowBottom?: boolean
  footerVariant?: 'default' | 'minimal' | 'extended'
  footerSize?: 'small' | 'default' | 'large'
  footerColor?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
  footerFixed?: boolean
  footerShadow?: boolean

  // 스타일
  variant?: 'default' | 'compact' | 'spacious'
  sidebarWidth?: 'narrow' | 'default' | 'wide'
  theme?: 'light' | 'dark' | 'auto'

  // 기능
  sidebarOpen?: boolean
  autoCloseSidebar?: boolean


}

const props = withDefaults(defineProps<Props>(), {
  showSidebar: true,
  sidebarTitle: 'Admin Panel',
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
  headerTitle: 'Admin Panel',
  headerLogo: '',
  headerNavigation: () => [],
  headerUserMenu: () => [],
  headerSearch: true,
  headerShadow: true,
  headerSize: 'default',
  headerColor: 'primary',
  showPageHeader: true,
  pageTitle: '',
  pageSubtitle: '',
  breadcrumbs: () => [],
  showFooter: true,
  footerTitle: 'Admin Panel',
  footerLogo: '',
  footerDescription: '관리자 패널입니다.',
  footerLinkSections: () => [],
  footerSocialLinks: () => [],
  footerLegalLinks: () => [],
  footerShowBranding: true,
  footerShowLinks: true,
  footerShowSocial: false,
  footerShowBottom: true,
  footerVariant: 'minimal',
  footerSize: 'small',
  footerColor: 'primary',
  footerFixed: false,
  footerShadow: true,
  variant: 'default',
  sidebarWidth: 'default',
  theme: 'light',
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
const adminClasses = computed(() => {
  return [
    'v-admin',
    `v-admin--${props.variant}`,
    `v-admin--sidebar-width-${props.sidebarWidth}`,
    `v-admin--theme-${props.theme}`,
    {
      'v-admin--sidebar-open': sidebarOpen.value,
      'v-admin--sidebar-overlay': props.sidebarOverlay
    }
  ]
})

const sidebarClasses = computed(() => {
  return [
    'v-admin__sidebar',
    {
      'v-admin__sidebar--hidden': !props.showSidebar,
      'v-admin__sidebar--open': sidebarOpen.value
    }
  ]
})

const mainClasses = computed(() => {
  return [
    'v-admin__main',
    {
      'v-admin__main--sidebar': props.showSidebar
    }
  ]
})

const headerClasses = computed(() => {
  return [
    'v-admin__header',
    {
      'v-admin__header--hidden': !props.showHeader
    }
  ]
})

const contentClasses = computed(() => {
  return [
    'v-admin__content',
    {
      'v-admin__content--page-header': props.showPageHeader
    }
  ]
})

const pageHeaderClasses = computed(() => {
  return [
    'v-admin__page-header',
    {
      'v-admin__page-header--hidden': !props.showPageHeader
    }
  ]
})

const pageContentClasses = computed(() => {
  return [
    'v-admin__page-content',
    {
      'v-admin__page-content--page-header': props.showPageHeader
    }
  ]
})

const footerClasses = computed(() => {
  return [
    'v-admin__footer',
    {
      'v-admin__footer--hidden': !props.showFooter
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
.v-admin {
  @apply min-h-screen flex flex-col;
  @apply bg-gray-100;
}

/* Variants */
.v-admin--default {
  @apply bg-gray-100;
}

.v-admin--compact {
  @apply bg-gray-200;
}

.v-admin--spacious {
  @apply bg-gray-50;
}

/* Sidebar width */
.v-admin--sidebar-width-narrow .v-admin__sidebar {
  @apply w-56;
}

.v-admin--sidebar-width-default .v-admin__sidebar {
  @apply w-64;
}

.v-admin--sidebar-width-wide .v-admin__sidebar {
  @apply w-72;
}

/* Theme */
.v-admin--theme-dark {
  @apply bg-gray-900;
}

/* Sidebar */
.v-admin__sidebar {
  @apply flex-shrink-0;
  @apply fixed top-0 left-0 h-full z-40;
  @apply transition-all duration-300;
}

.v-admin__sidebar--hidden {
  @apply hidden;
}

.v-admin__sidebar--open {
  @apply translate-x-0;
}

/* Main */
.v-admin__main {
  @apply flex-1;
  @apply flex flex-col;
  @apply min-w-0;
  @apply ml-64;
}

.v-admin--sidebar-width-narrow .v-admin__main {
  @apply ml-56;
}

.v-admin--sidebar-width-wide .v-admin__main {
  @apply ml-72;
}

.v-admin__main--sidebar {
  @apply ml-64;
}

.v-admin--sidebar-width-narrow .v-admin__main--sidebar {
  @apply ml-56;
}

.v-admin--sidebar-width-wide .v-admin__main--sidebar {
  @apply ml-72;
}

/* Header */
.v-admin__header {
  @apply flex-shrink-0;
  @apply bg-white border-b border-gray-200;
}

.v-admin__header--hidden {
  @apply hidden;
}

/* Content */
.v-admin__content {
  @apply flex-1;
  @apply flex flex-col;
  @apply min-w-0;
}

.v-admin__content--page-header {
  @apply pt-0;
}

/* Page Header */
.v-admin__page-header {
  @apply flex-shrink-0;
  @apply bg-white border-b border-gray-200;
  @apply px-6 py-4;
}

.v-admin__page-header--hidden {
  @apply hidden;
}

.v-admin__page-header-content {
  @apply flex justify-between items-center;
}

.v-admin__page-header-left {
  @apply flex flex-col;
}

.v-admin__page-title {
  @apply text-2xl font-bold text-gray-900;
}

.v-admin__page-subtitle {
  @apply text-sm text-gray-600 mt-1;
}

.v-admin__breadcrumbs {
  @apply mt-2;
}

.v-admin__breadcrumb-nav {
  @apply flex;
}

.v-admin__breadcrumb-list {
  @apply flex items-center gap-2;
  @apply list-none;
}

.v-admin__breadcrumb-item {
  @apply flex items-center;
}

.v-admin__breadcrumb-link {
  @apply text-sm text-gray-500 hover:text-gray-700;
  @apply transition-colors;
}

.v-admin__breadcrumb-current {
  @apply text-sm font-medium text-gray-900;
}

.v-admin__breadcrumb-separator {
  @apply text-sm text-gray-400;
  @apply mx-2;
}

.v-admin__page-header-right {
  @apply flex items-center gap-4;
}

/* Page Content */
.v-admin__page-content {
  @apply flex-1;
  @apply p-6;
}

.v-admin__page-content--page-header {
  @apply pt-6;
}

/* Footer */
.v-admin__footer {
  @apply flex-shrink-0;
}

.v-admin__footer--hidden {
  @apply hidden;
}

/* Overlay */
.v-admin__overlay {
  @apply fixed inset-0 bg-black bg-opacity-50 z-30;
  @apply md:hidden;
}

/* Responsive */
@media (max-width: 768px) {
  .v-admin__main {
    @apply ml-0;
  }

  .v-admin__main--sidebar {
    @apply ml-0;
  }

  .v-admin__sidebar {
    @apply transform -translate-x-full;
  }

  .v-admin__sidebar--open {
    @apply translate-x-0;
  }

  .v-admin__page-header-content {
    @apply flex-col items-start gap-4;
  }

  .v-admin__page-header-right {
    @apply w-full justify-start;
  }

  .v-admin__page-title {
    @apply text-xl;
  }

  .v-admin__page-subtitle {
    @apply text-sm;
  }
}

/* Dark theme */
.v-admin--theme-dark {
  @apply bg-gray-900;
}

.v-admin--theme-dark .v-admin__header {
  @apply bg-gray-800 border-gray-700;
}

.v-admin--theme-dark .v-admin__page-header {
  @apply bg-gray-800 border-gray-700;
}

.v-admin--theme-dark .v-admin__page-title {
  @apply text-white;
}

.v-admin--theme-dark .v-admin__page-subtitle {
  @apply text-gray-400;
}

.v-admin--theme-dark .v-admin__breadcrumb-link {
  @apply text-gray-400 hover:text-gray-300;
}

.v-admin--theme-dark .v-admin__breadcrumb-current {
  @apply text-white;
}

.v-admin--theme-dark .v-admin__breadcrumb-separator {
  @apply text-gray-500;
}

/* Auto theme (follows system preference) */
@media (prefers-color-scheme: dark) {
  .v-admin--theme-auto {
    @apply bg-gray-900;
  }

  .v-admin--theme-auto .v-admin__header {
    @apply bg-gray-800 border-gray-700;
  }

  .v-admin--theme-auto .v-admin__page-header {
    @apply bg-gray-800 border-gray-700;
  }

  .v-admin--theme-auto .v-admin__page-title {
    @apply text-white;
  }

  .v-admin--theme-auto .v-admin__page-subtitle {
    @apply text-gray-400;
  }

  .v-admin--theme-auto .v-admin__breadcrumb-link {
    @apply text-gray-400 hover:text-gray-300;
  }

  .v-admin--theme-auto .v-admin__breadcrumb-current {
    @apply text-white;
  }

  .v-admin--theme-auto .v-admin__breadcrumb-separator {
    @apply text-gray-500;
  }
}
</style>
