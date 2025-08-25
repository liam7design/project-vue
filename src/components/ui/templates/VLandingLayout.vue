<template>
  <div
    ref="landingRef"
    class="v-landing"
    :class="landingClasses"
  >
    <!-- 헤더 -->
    <header
      v-if="showHeader"
      class="v-landing__header"
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

    <!-- 메인 콘텐츠 -->
    <main class="v-landing__main" :class="mainClasses">
      <!-- 히어로 섹션 -->
      <section
        v-if="showHero"
        class="v-landing__hero"
        :class="heroClasses"
      >
        <slot name="hero">
          <div class="v-landing__hero-content">
            <div class="v-landing__hero-text">
              <h1 v-if="heroTitle" class="v-landing__hero-title">
                {{ heroTitle }}
              </h1>
              <p v-if="heroSubtitle" class="v-landing__hero-subtitle">
                {{ heroSubtitle }}
              </p>
              <div v-if="heroActions && heroActions.length > 0" class="v-landing__hero-actions">
                <VButton
                  v-for="action in heroActions"
                  :key="action.value"
                  :variant="action.variant || 'filled'"
                  :size="action.size || 'large'"
                  :color="action.color || 'primary'"
                  :href="action.href || ''"
                  :external="action.external || false"
                  @click="handleHeroActionClick(action)"
                >
                  {{ action.label }}
                </VButton>
              </div>
            </div>
            <div v-if="heroImage" class="v-landing__hero-image">
              <img
                :src="heroImage"
                :alt="heroImageAlt"
                class="v-landing__hero-img"
              />
            </div>
          </div>
        </slot>
      </section>

      <!-- 콘텐츠 영역 -->
      <div class="v-landing__content" :class="contentClasses">
        <!-- 페이지 헤더 -->
        <div
          v-if="showPageHeader"
          class="v-landing__page-header"
          :class="pageHeaderClasses"
        >
          <slot name="page-header">
            <div class="v-landing__page-header-content">
              <div class="v-landing__page-header-left">
                <h1 v-if="pageTitle" class="v-landing__page-title">
                  {{ pageTitle }}
                </h1>
                <p v-if="pageSubtitle" class="v-landing__page-subtitle">
                  {{ pageSubtitle }}
                </p>
                <div v-if="breadcrumbs && breadcrumbs.length > 0" class="v-landing__breadcrumbs">
                  <nav class="v-landing__breadcrumb-nav">
                    <ol class="v-landing__breadcrumb-list">
                      <li
                        v-for="(crumb, index) in breadcrumbs"
                        :key="crumb.value"
                        class="v-landing__breadcrumb-item"
                      >
                        <a
                          v-if="crumb.href && index < breadcrumbs.length - 1"
                          :href="crumb.href"
                          class="v-landing__breadcrumb-link"
                          @click="handleBreadcrumbClick(crumb)"
                        >
                          {{ crumb.label }}
                        </a>
                        <span
                          v-else
                          class="v-landing__breadcrumb-current"
                        >
                          {{ crumb.label }}
                        </span>
                        <span
                          v-if="index < breadcrumbs.length - 1"
                          class="v-landing__breadcrumb-separator"
                        >
                          /
                        </span>
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
              <div class="v-landing__page-header-right">
                <slot name="page-actions" />
              </div>
            </div>
          </slot>
        </div>

        <!-- 페이지 콘텐츠 -->
        <div class="v-landing__page-content" :class="pageContentClasses">
          <slot />
        </div>
      </div>
    </main>

    <!-- 푸터 -->
    <footer
      v-if="showFooter"
      class="v-landing__footer"
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
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { VHeader, VFooter, VButton } from '@/components/ui'

// Navigation item interface
interface NavigationItem {
  value: string
  label: string
  href?: string
  icon?: string
  badge?: string
  children?: NavigationItem[]
}

// User menu item interface
interface UserMenuItem {
  value: string
  label: string
  href?: string
  icon?: string
  divider?: boolean
}

// Hero action interface
interface HeroAction {
  value: string
  label: string
  href?: string
  variant?: 'filled' | 'outlined' | 'text' | 'tonal' | 'elevated' | 'flat'
  size?: 'small' | 'default' | 'large'
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
  external?: boolean
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

  // 히어로 섹션 설정
  showHero?: boolean
  heroTitle?: string
  heroSubtitle?: string
  heroImage?: string
  heroImageAlt?: string
  heroActions?: HeroAction[]

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
  variant?: 'default' | 'minimal' | 'extended'
  maxWidth?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl'
  padding?: 'none' | 'small' | 'default' | 'large'
  gap?: 'none' | 'small' | 'default' | 'large'


}

const props = withDefaults(defineProps<Props>(), {
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
  showHero: true,
  heroTitle: 'Vue 3 + TypeScript + Tailwind CSS',
  heroSubtitle: '현대적인 웹 애플리케이션을 위한 완벽한 개발 환경',
  heroImage: '',
  heroImageAlt: 'Hero Image',
  heroActions: () => [],
  showPageHeader: false,
  pageTitle: '',
  pageSubtitle: '',
  breadcrumbs: () => [],
  showFooter: true,
  footerTitle: 'Vue UI',
  footerLogo: '',
  footerDescription: 'Vue 3 + TypeScript + Tailwind CSS로 구축된 현대적인 UI 컴포넌트 라이브러리입니다.',
  footerLinkSections: () => [],
  footerSocialLinks: () => [],
  footerLegalLinks: () => [],
  footerShowBranding: true,
  footerShowLinks: true,
  footerShowSocial: true,
  footerShowBottom: true,
  footerVariant: 'extended',
  footerSize: 'default',
  footerColor: 'primary',
  footerFixed: false,
  footerShadow: true,
  variant: 'default',
  maxWidth: '7xl',
  padding: 'default',
  gap: 'default'
})

// Emits 정의
const emit = defineEmits<{
  'heroActionClick': [action: HeroAction]
  'breadcrumbClick': [breadcrumb: Breadcrumb]
}>()

// Computed 속성들
const landingClasses = computed(() => {
  return [
    'v-landing',
    `v-landing--${props.variant}`,
    `v-landing--max-width-${props.maxWidth}`,
    `v-landing--padding-${props.padding}`,
    `v-landing--gap-${props.gap}`
  ]
})

const headerClasses = computed(() => {
  return [
    'v-landing__header',
    {
      'v-landing__header--hidden': !props.showHeader
    }
  ]
})

const mainClasses = computed(() => {
  return [
    'v-landing__main',
    {
      'v-landing__main--hero': props.showHero
    }
  ]
})

const heroClasses = computed(() => {
  return [
    'v-landing__hero',
    {
      'v-landing__hero--hidden': !props.showHero
    }
  ]
})

const contentClasses = computed(() => {
  return [
    'v-landing__content',
    {
      'v-landing__content--page-header': props.showPageHeader
    }
  ]
})

const pageHeaderClasses = computed(() => {
  return [
    'v-landing__page-header',
    {
      'v-landing__page-header--hidden': !props.showPageHeader
    }
  ]
})

const pageContentClasses = computed(() => {
  return [
    'v-landing__page-content',
    {
      'v-landing__page-content--page-header': props.showPageHeader
    }
  ]
})

const footerClasses = computed(() => {
  return [
    'v-landing__footer',
    {
      'v-landing__footer--hidden': !props.showFooter
    }
  ]
})

// Methods
const handleHeroActionClick = (action: HeroAction) => {
  emit('heroActionClick', action)
}

const handleBreadcrumbClick = (breadcrumb: Breadcrumb) => {
  emit('breadcrumbClick', breadcrumb)
}
</script>

<style scoped>
.v-landing {
  @apply min-h-screen flex flex-col;
  @apply bg-white;
}

/* Variants */
.v-landing--default {
  @apply bg-white;
}

.v-landing--minimal {
  @apply bg-gray-50;
}

.v-landing--extended {
  @apply bg-white;
}

/* Max width */
.v-landing--max-width-none {
  @apply max-w-none;
}

.v-landing--max-width-sm {
  @apply max-w-sm;
}

.v-landing--max-width-md {
  @apply max-w-md;
}

.v-landing--max-width-lg {
  @apply max-w-lg;
}

.v-landing--max-width-xl {
  @apply max-w-xl;
}

.v-landing--max-width-2xl {
  @apply max-w-2xl;
}

.v-landing--max-width-3xl {
  @apply max-w-3xl;
}

.v-landing--max-width-4xl {
  @apply max-w-4xl;
}

.v-landing--max-width-5xl {
  @apply max-w-5xl;
}

.v-landing--max-width-6xl {
  @apply max-w-6xl;
}

.v-landing--max-width-7xl {
  @apply max-w-7xl;
}

/* Padding */
.v-landing--padding-none {
  @apply p-0;
}

.v-landing--padding-small {
  @apply p-4;
}

.v-landing--padding-default {
  @apply p-6;
}

.v-landing--padding-large {
  @apply p-8;
}

/* Gap */
.v-landing--gap-none {
  @apply gap-0;
}

.v-landing--gap-small {
  @apply gap-4;
}

.v-landing--gap-default {
  @apply gap-6;
}

.v-landing--gap-large {
  @apply gap-8;
}

/* Header */
.v-landing__header {
  @apply flex-shrink-0;
}

.v-landing__header--hidden {
  @apply hidden;
}

/* Main */
.v-landing__main {
  @apply flex-1;
  @apply flex flex-col;
  @apply min-w-0;
}

.v-landing__main--hero {
  @apply pt-0;
}

/* Hero */
.v-landing__hero {
  @apply flex-shrink-0;
  @apply bg-gradient-to-br from-primary-50 to-primary-100;
  @apply py-20 px-6;
}

.v-landing__hero--hidden {
  @apply hidden;
}

.v-landing__hero-content {
  @apply max-w-7xl mx-auto;
  @apply grid gap-12;
  @apply lg:grid-cols-2 lg:items-center;
}

.v-landing__hero-text {
  @apply space-y-6;
  @apply text-center;
  @apply lg:text-left;
}

.v-landing__hero-title {
  @apply text-4xl font-bold text-gray-900;
  @apply leading-tight;
  @apply lg:text-5xl xl:text-6xl;
}

.v-landing__hero-subtitle {
  @apply text-xl text-gray-600;
  @apply leading-relaxed;
  @apply lg:text-2xl;
}

.v-landing__hero-actions {
  @apply flex flex-col gap-4;
  @apply sm:flex-row sm:justify-center;
  @apply lg:justify-start;
}

.v-landing__hero-image {
  @apply flex justify-center;
  @apply lg:justify-end;
}

.v-landing__hero-img {
  @apply max-w-full h-auto;
  @apply rounded-lg shadow-lg;
}

/* Content */
.v-landing__content {
  @apply flex-1;
  @apply flex flex-col;
  @apply min-w-0;
}

.v-landing__content--page-header {
  @apply pt-0;
}

/* Page Header */
.v-landing__page-header {
  @apply flex-shrink-0;
  @apply bg-white border-b border-gray-200;
  @apply px-6 py-4;
}

.v-landing__page-header--hidden {
  @apply hidden;
}

.v-landing__page-header-content {
  @apply flex justify-between items-center;
}

.v-landing__page-header-left {
  @apply flex flex-col;
}

.v-landing__page-title {
  @apply text-2xl font-bold text-gray-900;
}

.v-landing__page-subtitle {
  @apply text-sm text-gray-600 mt-1;
}

.v-landing__breadcrumbs {
  @apply mt-2;
}

.v-landing__breadcrumb-nav {
  @apply flex;
}

.v-landing__breadcrumb-list {
  @apply flex items-center gap-2;
  @apply list-none;
}

.v-landing__breadcrumb-item {
  @apply flex items-center;
}

.v-landing__breadcrumb-link {
  @apply text-sm text-gray-500 hover:text-gray-700;
  @apply transition-colors;
}

.v-landing__breadcrumb-current {
  @apply text-sm font-medium text-gray-900;
}

.v-landing__breadcrumb-separator {
  @apply text-sm text-gray-400;
  @apply mx-2;
}

.v-landing__page-header-right {
  @apply flex items-center gap-4;
}

/* Page Content */
.v-landing__page-content {
  @apply flex-1;
  @apply p-6;
}

.v-landing__page-content--page-header {
  @apply pt-6;
}

/* Footer */
.v-landing__footer {
  @apply flex-shrink-0;
}

.v-landing__footer--hidden {
  @apply hidden;
}

/* Responsive */
@media (max-width: 768px) {
  .v-landing__hero {
    @apply py-12;
  }

  .v-landing__hero-title {
    @apply text-3xl;
  }

  .v-landing__hero-subtitle {
    @apply text-lg;
  }

  .v-landing__page-header-content {
    @apply flex-col items-start gap-4;
  }

  .v-landing__page-header-right {
    @apply w-full justify-start;
  }

  .v-landing__page-title {
    @apply text-xl;
  }

  .v-landing__page-subtitle {
    @apply text-sm;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .v-landing {
    @apply bg-gray-900;
  }

  .v-landing--default {
    @apply bg-gray-900;
  }

  .v-landing--minimal {
    @apply bg-gray-800;
  }

  .v-landing--extended {
    @apply bg-gray-900;
  }

  .v-landing__hero {
    @apply bg-gradient-to-br from-gray-800 to-gray-900;
  }

  .v-landing__hero-title {
    @apply text-white;
  }

  .v-landing__hero-subtitle {
    @apply text-gray-300;
  }

  .v-landing__page-header {
    @apply bg-gray-800 border-gray-700;
  }

  .v-landing__page-title {
    @apply text-white;
  }

  .v-landing__page-subtitle {
    @apply text-gray-400;
  }

  .v-landing__breadcrumb-link {
    @apply text-gray-400 hover:text-gray-300;
  }

  .v-landing__breadcrumb-current {
    @apply text-white;
  }

  .v-landing__breadcrumb-separator {
    @apply text-gray-500;
  }
}
</style>
