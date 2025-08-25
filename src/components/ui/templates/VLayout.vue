<template>
  <div
    ref="layoutRef"
    class="v-layout"
    :class="layoutClasses"
  >
    <!-- 헤더 -->
    <header
      v-if="showHeader"
      class="v-layout__header"
      :class="headerClasses"
    >
      <slot name="header">
        <VHeader
          :title="headerTitle"
          :logo="headerLogo"
          :navigation="headerNavigation"
          :user-menu="headerUserMenu"
          :search="headerSearch"
          :sticky="headerSticky"
          :shadow="headerShadow"
          :size="headerSize"
          :color="headerColor"
        />
      </slot>
    </header>

    <!-- 메인 컨테이너 -->
    <div class="v-layout__main" :class="mainClasses">
      <!-- 사이드바 -->
      <aside
        v-if="showSidebar"
        class="v-layout__sidebar"
        :class="sidebarClasses"
      >
        <slot name="sidebar">
          <VSidebar
            :title="sidebarTitle"
            :logo="sidebarLogo"
            :navigation="sidebarNavigation"
            :user-info="sidebarUserInfo"
            :collapsed="sidebarCollapsed"
            :fixed="sidebarFixed"
            :overlay="sidebarOverlay"
            :shadow="sidebarShadow"
            :size="sidebarSize"
            :color="sidebarColor"
            @toggle="handleSidebarToggle"
          />
        </slot>
      </aside>

      <!-- 콘텐츠 영역 -->
      <main class="v-layout__content" :class="contentClasses">
        <!-- 페이지 헤더 -->
        <div
          v-if="showPageHeader"
          class="v-layout__page-header"
          :class="pageHeaderClasses"
        >
          <slot name="page-header">
            <div class="v-layout__page-header-content">
              <div class="v-layout__page-header-left">
                <h1 v-if="pageTitle" class="v-layout__page-title">
                  {{ pageTitle }}
                </h1>
                <p v-if="pageSubtitle" class="v-layout__page-subtitle">
                  {{ pageSubtitle }}
                </p>
              </div>
              <div class="v-layout__page-header-right">
                <slot name="page-actions" />
              </div>
            </div>
          </slot>
        </div>

        <!-- 페이지 콘텐츠 -->
        <div class="v-layout__page-content" :class="pageContentClasses">
          <slot />
        </div>
      </main>
    </div>

    <!-- 푸터 -->
    <footer
      v-if="showFooter"
      class="v-layout__footer"
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
      class="v-layout__overlay"
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
  // 레이아웃 타입
  type?: 'default' | 'dashboard' | 'admin' | 'landing'

  // 헤더 설정
  showHeader?: boolean
  headerTitle?: string
  headerLogo?: string
  headerNavigation?: NavigationItem[]
  headerUserMenu?: UserMenuItem[]
  headerSearch?: boolean
  headerSticky?: boolean
  headerShadow?: boolean
  headerSize?: 'small' | 'default' | 'large'
  headerColor?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'

  // 사이드바 설정
  showSidebar?: boolean
  sidebarTitle?: string
  sidebarLogo?: string
  sidebarNavigation?: NavigationSection[]
  sidebarUserInfo?: UserInfo
  sidebarCollapsed?: boolean
  sidebarFixed?: boolean
  sidebarOverlay?: boolean
  sidebarShadow?: boolean
  sidebarSize?: 'small' | 'default' | 'large'
  sidebarColor?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'

  // 페이지 헤더 설정
  showPageHeader?: boolean
  pageTitle?: string
  pageSubtitle?: string

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
  maxWidth?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl'
  padding?: 'none' | 'small' | 'default' | 'large'
  gap?: 'none' | 'small' | 'default' | 'large'

  // 기능
  sidebarOpen?: boolean
  autoCloseSidebar?: boolean


}

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  showHeader: true,
  headerTitle: 'Vue UI',
  headerLogo: '',
  headerNavigation: () => [],
  headerUserMenu: () => [],
  headerSearch: false,
  headerSticky: true,
  headerShadow: true,
  headerSize: 'default',
  headerColor: 'primary',
  showSidebar: false,
  sidebarTitle: 'Navigation',
  sidebarLogo: '',
  sidebarNavigation: () => [],
  sidebarUserInfo: () => ({
    name: '사용자',
    email: 'user@example.com',
    avatar: '',
    role: '관리자'
  }),
  sidebarCollapsed: false,
  sidebarFixed: true,
  sidebarOverlay: true,
  sidebarShadow: true,
  sidebarSize: 'default',
  sidebarColor: 'primary',
  showPageHeader: false,
  pageTitle: '',
  pageSubtitle: '',
  showFooter: true,
  footerTitle: 'Vue UI',
  footerLogo: '',
  footerDescription: 'Vue 3 + TypeScript + Tailwind CSS로 구축된 현대적인 UI 컴포넌트 라이브러리입니다.',
  footerLinkSections: () => [],
  footerSocialLinks: () => [],
  footerLegalLinks: () => [],
  footerShowBranding: true,
  footerShowLinks: true,
  footerShowSocial: false,
  footerShowBottom: true,
  footerVariant: 'default',
  footerSize: 'default',
  footerColor: 'primary',
  footerFixed: false,
  footerShadow: true,
  maxWidth: '7xl',
  padding: 'default',
  gap: 'default',
  sidebarOpen: false,
  autoCloseSidebar: true
})

// Emits 정의
const emit = defineEmits<{
  'sidebarToggle': [collapsed: boolean]
  'sidebarOpen': [open: boolean]
}>()

// Reactive 상태
const sidebarOpen = ref(props.sidebarOpen)

// Computed 속성들
const layoutClasses = computed(() => {
  return [
    'v-layout',
    `v-layout--${props.type}`,
    `v-layout--max-width-${props.maxWidth}`,
    `v-layout--padding-${props.padding}`,
    `v-layout--gap-${props.gap}`,
    {
      'v-layout--sidebar-open': sidebarOpen.value,
      'v-layout--sidebar-overlay': props.sidebarOverlay
    }
  ]
})

const headerClasses = computed(() => {
  return [
    'v-layout__header',
    {
      'v-layout__header--hidden': !props.showHeader
    }
  ]
})

const mainClasses = computed(() => {
  return [
    'v-layout__main',
    {
      'v-layout__main--sidebar': props.showSidebar,
      'v-layout__main--sidebar-fixed': props.showSidebar && props.sidebarFixed
    }
  ]
})

const sidebarClasses = computed(() => {
  return [
    'v-layout__sidebar',
    {
      'v-layout__sidebar--hidden': !props.showSidebar,
      'v-layout__sidebar--fixed': props.sidebarFixed,
      'v-layout__sidebar--overlay': props.sidebarOverlay,
      'v-layout__sidebar--open': sidebarOpen.value
    }
  ]
})

const contentClasses = computed(() => {
  return [
    'v-layout__content',
    {
      'v-layout__content--sidebar': props.showSidebar,
      'v-layout__content--sidebar-fixed': props.showSidebar && props.sidebarFixed
    }
  ]
})

const pageHeaderClasses = computed(() => {
  return [
    'v-layout__page-header',
    {
      'v-layout__page-header--hidden': !props.showPageHeader
    }
  ]
})

const pageContentClasses = computed(() => {
  return [
    'v-layout__page-content',
    {
      'v-layout__page-content--page-header': props.showPageHeader
    }
  ]
})

const footerClasses = computed(() => {
  return [
    'v-layout__footer',
    {
      'v-layout__footer--hidden': !props.showFooter
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

// Watchers
watch(() => props.sidebarOpen, (newValue) => {
  sidebarOpen.value = newValue
})

watch(sidebarOpen, (newValue) => {
  emit('sidebarOpen', newValue)
})
</script>

<style scoped>
.v-layout {
  @apply min-h-screen flex flex-col;
  @apply bg-gray-50;
}

/* Layout types */
.v-layout--default {
  @apply bg-white;
}

.v-layout--dashboard {
  @apply bg-gray-50;
}

.v-layout--admin {
  @apply bg-gray-100;
}

.v-layout--landing {
  @apply bg-white;
}

/* Max width */
.v-layout--max-width-none {
  @apply max-w-none;
}

.v-layout--max-width-sm {
  @apply max-w-sm;
}

.v-layout--max-width-md {
  @apply max-w-md;
}

.v-layout--max-width-lg {
  @apply max-w-lg;
}

.v-layout--max-width-xl {
  @apply max-w-xl;
}

.v-layout--max-width-2xl {
  @apply max-w-2xl;
}

.v-layout--max-width-3xl {
  @apply max-w-3xl;
}

.v-layout--max-width-4xl {
  @apply max-w-4xl;
}

.v-layout--max-width-5xl {
  @apply max-w-5xl;
}

.v-layout--max-width-6xl {
  @apply max-w-6xl;
}

.v-layout--max-width-7xl {
  @apply max-w-7xl;
}

/* Padding */
.v-layout--padding-none {
  @apply p-0;
}

.v-layout--padding-small {
  @apply p-4;
}

.v-layout--padding-default {
  @apply p-6;
}

.v-layout--padding-large {
  @apply p-8;
}

/* Gap */
.v-layout--gap-none {
  @apply gap-0;
}

.v-layout--gap-small {
  @apply gap-4;
}

.v-layout--gap-default {
  @apply gap-6;
}

.v-layout--gap-large {
  @apply gap-8;
}

/* Header */
.v-layout__header {
  @apply flex-shrink-0;
}

.v-layout__header--hidden {
  @apply hidden;
}

/* Main */
.v-layout__main {
  @apply flex flex-1;
  @apply relative;
}

.v-layout__main--sidebar {
  @apply flex-row;
}

.v-layout__main--sidebar-fixed {
  @apply pl-64;
}

/* Sidebar */
.v-layout__sidebar {
  @apply flex-shrink-0;
  @apply w-64;
  @apply transition-all duration-300;
}

.v-layout__sidebar--hidden {
  @apply hidden;
}

.v-layout__sidebar--fixed {
  @apply fixed top-0 left-0 h-full z-40;
}

.v-layout__sidebar--overlay {
  @apply fixed top-0 left-0 h-full z-50;
  @apply transform transition-transform duration-300;
}

.v-layout__sidebar--overlay:not(.v-layout__sidebar--open) {
  @apply -translate-x-full;
}

.v-layout__sidebar--open {
  @apply translate-x-0;
}

/* Content */
.v-layout__content {
  @apply flex-1;
  @apply flex flex-col;
  @apply min-w-0;
}

.v-layout__content--sidebar {
  @apply ml-0;
}

.v-layout__content--sidebar-fixed {
  @apply ml-64;
}

/* Page Header */
.v-layout__page-header {
  @apply flex-shrink-0;
  @apply bg-white border-b border-gray-200;
  @apply px-6 py-4;
}

.v-layout__page-header--hidden {
  @apply hidden;
}

.v-layout__page-header-content {
  @apply flex justify-between items-center;
}

.v-layout__page-header-left {
  @apply flex flex-col;
}

.v-layout__page-title {
  @apply text-2xl font-bold text-gray-900;
}

.v-layout__page-subtitle {
  @apply text-sm text-gray-600 mt-1;
}

.v-layout__page-header-right {
  @apply flex items-center gap-4;
}

/* Page Content */
.v-layout__page-content {
  @apply flex-1;
  @apply p-6;
}

.v-layout__page-content--page-header {
  @apply pt-6;
}

/* Footer */
.v-layout__footer {
  @apply flex-shrink-0;
}

.v-layout__footer--hidden {
  @apply hidden;
}

/* Overlay */
.v-layout__overlay {
  @apply fixed inset-0 bg-black bg-opacity-50 z-40;
  @apply md:hidden;
}

/* Responsive */
@media (max-width: 768px) {
  .v-layout__main--sidebar-fixed {
    @apply pl-0;
  }

  .v-layout__content--sidebar-fixed {
    @apply ml-0;
  }

  .v-layout__sidebar--fixed {
    @apply relative;
  }

  .v-layout__sidebar--overlay {
    @apply fixed;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .v-layout {
    @apply bg-gray-900;
  }

  .v-layout--default {
    @apply bg-gray-900;
  }

  .v-layout--dashboard {
    @apply bg-gray-900;
  }

  .v-layout--admin {
    @apply bg-gray-800;
  }

  .v-layout--landing {
    @apply bg-gray-900;
  }

  .v-layout__page-header {
    @apply bg-gray-800 border-gray-700;
  }

  .v-layout__page-title {
    @apply text-white;
  }

  .v-layout__page-subtitle {
    @apply text-gray-400;
  }
}
</style>
