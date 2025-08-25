<template>
  <div
    ref="pageRef"
    class="v-page"
    :class="pageClasses"
  >
    <!-- 페이지 헤더 -->
    <header
      v-if="showHeader"
      class="v-page__header"
      :class="headerClasses"
    >
      <slot name="header">
        <div class="v-page__header-content">
          <div class="v-page__header-left">
            <h1 v-if="title" class="v-page__title">
              {{ title }}
            </h1>
            <p v-if="subtitle" class="v-page__subtitle">
              {{ subtitle }}
            </p>
            <div v-if="breadcrumbs && breadcrumbs.length > 0" class="v-page__breadcrumbs">
              <nav class="v-page__breadcrumb-nav">
                <ol class="v-page__breadcrumb-list">
                  <li
                    v-for="(crumb, index) in breadcrumbs"
                    :key="crumb.value"
                    class="v-page__breadcrumb-item"
                  >
                    <a
                      v-if="crumb.href && index < breadcrumbs.length - 1"
                      :href="crumb.href"
                      class="v-page__breadcrumb-link"
                      @click="handleBreadcrumbClick(crumb)"
                    >
                      {{ crumb.label }}
                    </a>
                    <span
                      v-else
                      class="v-page__breadcrumb-current"
                    >
                      {{ crumb.label }}
                    </span>
                    <span
                      v-if="index < breadcrumbs.length - 1"
                      class="v-page__breadcrumb-separator"
                    >
                      /
                    </span>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <div class="v-page__header-right">
            <slot name="actions" />
          </div>
        </div>
      </slot>
    </header>

    <!-- 페이지 콘텐츠 -->
    <main class="v-page__content" :class="contentClasses">
      <!-- 콘텐츠 헤더 -->
      <div
        v-if="showContentHeader"
        class="v-page__content-header"
        :class="contentHeaderClasses"
      >
        <slot name="content-header" />
      </div>

      <!-- 메인 콘텐츠 -->
      <div class="v-page__main" :class="mainClasses">
        <slot />
      </div>

      <!-- 콘텐츠 푸터 -->
      <div
        v-if="showContentFooter"
        class="v-page__content-footer"
        :class="contentFooterClasses"
      >
        <slot name="content-footer" />
      </div>
    </main>

    <!-- 페이지 푸터 -->
    <footer
      v-if="showFooter"
      class="v-page__footer"
      :class="footerClasses"
    >
      <slot name="footer" />
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Breadcrumb interface
interface Breadcrumb {
  value: string
  label: string
  href?: string
}

// Props 정의
interface Props {
  // 기본 속성
  title?: string
  subtitle?: string
  breadcrumbs?: Breadcrumb[]

  // 표시 옵션
  showHeader?: boolean
  showContentHeader?: boolean
  showContentFooter?: boolean
  showFooter?: boolean

  // 레이아웃
  layout?: 'default' | 'narrow' | 'wide' | 'full'
  maxWidth?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl'
  padding?: 'none' | 'small' | 'default' | 'large'
  gap?: 'none' | 'small' | 'default' | 'large'

  // 스타일
  variant?: 'default' | 'card' | 'bordered' | 'elevated'
  size?: 'small' | 'default' | 'large'
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'

  // 기능
  centered?: boolean
  fluid?: boolean


}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  subtitle: '',
  breadcrumbs: () => [],
  showHeader: true,
  showContentHeader: false,
  showContentFooter: false,
  showFooter: false,
  layout: 'default',
  maxWidth: '7xl',
  padding: 'default',
  gap: 'default',
  variant: 'default',
  size: 'default',
  color: 'primary',
  centered: false,
  fluid: false
})

// Emits 정의
const emit = defineEmits<{
  'breadcrumbClick': [breadcrumb: Breadcrumb]
}>()

// Computed 속성들
const pageClasses = computed(() => {
  return [
    'v-page',
    `v-page--${props.layout}`,
    `v-page--${props.variant}`,
    `v-page--${props.size}`,
    `v-page--${props.color}`,
    `v-page--max-width-${props.maxWidth}`,
    `v-page--padding-${props.padding}`,
    `v-page--gap-${props.gap}`,
    {
      'v-page--centered': props.centered,
      'v-page--fluid': props.fluid
    }
  ]
})

const headerClasses = computed(() => {
  return [
    'v-page__header',
    {
      'v-page__header--hidden': !props.showHeader
    }
  ]
})

const contentClasses = computed(() => {
  return [
    'v-page__content',
    {
      'v-page__content--centered': props.centered
    }
  ]
})

const contentHeaderClasses = computed(() => {
  return [
    'v-page__content-header',
    {
      'v-page__content-header--hidden': !props.showContentHeader
    }
  ]
})

const mainClasses = computed(() => {
  return [
    'v-page__main',
    {
      'v-page__main--centered': props.centered
    }
  ]
})

const contentFooterClasses = computed(() => {
  return [
    'v-page__content-footer',
    {
      'v-page__content-footer--hidden': !props.showContentFooter
    }
  ]
})

const footerClasses = computed(() => {
  return [
    'v-page__footer',
    {
      'v-page__footer--hidden': !props.showFooter
    }
  ]
})

// Methods
const handleBreadcrumbClick = (breadcrumb: Breadcrumb) => {
  emit('breadcrumbClick', breadcrumb)
}
</script>

<style scoped>
.v-page {
  @apply w-full;
  @apply flex flex-col;
  @apply min-h-0;
}

/* Layouts */
.v-page--default {
  @apply max-w-7xl mx-auto;
}

.v-page--narrow {
  @apply max-w-4xl mx-auto;
}

.v-page--wide {
  @apply max-w-full;
}

.v-page--full {
  @apply max-w-none;
}

/* Variants */
.v-page--default {
  @apply bg-transparent;
}

.v-page--card {
  @apply bg-white rounded-lg shadow-sm;
}

.v-page--bordered {
  @apply bg-white border border-gray-200 rounded-lg;
}

.v-page--elevated {
  @apply bg-white rounded-lg shadow-lg;
}

/* Sizes */
.v-page--small {
  @apply text-sm;
}

.v-page--default {
  @apply text-base;
}

.v-page--large {
  @apply text-lg;
}

/* Colors */
.v-page--primary {
  @apply text-primary-900;
}

.v-page--secondary {
  @apply text-gray-900;
}

.v-page--success {
  @apply text-green-900;
}

.v-page--warning {
  @apply text-yellow-900;
}

.v-page--error {
  @apply text-red-900;
}

.v-page--info {
  @apply text-blue-900;
}

/* Max width */
.v-page--max-width-none {
  @apply max-w-none;
}

.v-page--max-width-sm {
  @apply max-w-sm;
}

.v-page--max-width-md {
  @apply max-w-md;
}

.v-page--max-width-lg {
  @apply max-w-lg;
}

.v-page--max-width-xl {
  @apply max-w-xl;
}

.v-page--max-width-2xl {
  @apply max-w-2xl;
}

.v-page--max-width-3xl {
  @apply max-w-3xl;
}

.v-page--max-width-4xl {
  @apply max-w-4xl;
}

.v-page--max-width-5xl {
  @apply max-w-5xl;
}

.v-page--max-width-6xl {
  @apply max-w-6xl;
}

.v-page--max-width-7xl {
  @apply max-w-7xl;
}

/* Padding */
.v-page--padding-none {
  @apply p-0;
}

.v-page--padding-small {
  @apply p-4;
}

.v-page--padding-default {
  @apply p-6;
}

.v-page--padding-large {
  @apply p-8;
}

/* Gap */
.v-page--gap-none {
  @apply gap-0;
}

.v-page--gap-small {
  @apply gap-4;
}

.v-page--gap-default {
  @apply gap-6;
}

.v-page--gap-large {
  @apply gap-8;
}

/* Centered */
.v-page--centered {
  @apply text-center;
}

/* Fluid */
.v-page--fluid {
  @apply w-full;
}

/* Header */
.v-page__header {
  @apply flex-shrink-0;
  @apply mb-6;
}

.v-page__header--hidden {
  @apply hidden;
}

.v-page__header-content {
  @apply flex justify-between items-start gap-4;
}

.v-page__header-left {
  @apply flex flex-col gap-2;
}

.v-page__title {
  @apply text-3xl font-bold text-gray-900;
  @apply leading-tight;
}

.v-page__subtitle {
  @apply text-lg text-gray-600;
  @apply leading-relaxed;
}

.v-page__breadcrumbs {
  @apply mt-2;
}

.v-page__breadcrumb-nav {
  @apply flex;
}

.v-page__breadcrumb-list {
  @apply flex items-center gap-2;
  @apply list-none;
}

.v-page__breadcrumb-item {
  @apply flex items-center;
}

.v-page__breadcrumb-link {
  @apply text-sm text-gray-500 hover:text-gray-700;
  @apply transition-colors;
}

.v-page__breadcrumb-current {
  @apply text-sm font-medium text-gray-900;
}

.v-page__breadcrumb-separator {
  @apply text-sm text-gray-400;
  @apply mx-2;
}

.v-page__header-right {
  @apply flex items-center gap-3;
  @apply flex-shrink-0;
}

/* Content */
.v-page__content {
  @apply flex-1;
  @apply flex flex-col;
  @apply min-w-0;
}

.v-page__content--centered {
  @apply items-center;
}

/* Content Header */
.v-page__content-header {
  @apply flex-shrink-0;
  @apply mb-6;
}

.v-page__content-header--hidden {
  @apply hidden;
}

/* Main */
.v-page__main {
  @apply flex-1;
  @apply min-w-0;
}

.v-page__main--centered {
  @apply text-center;
}

/* Content Footer */
.v-page__content-footer {
  @apply flex-shrink-0;
  @apply mt-6;
}

.v-page__content-footer--hidden {
  @apply hidden;
}

/* Footer */
.v-page__footer {
  @apply flex-shrink-0;
  @apply mt-8;
}

.v-page__footer--hidden {
  @apply hidden;
}

/* Responsive */
@media (max-width: 768px) {
  .v-page__header-content {
    @apply flex-col items-start gap-4;
  }

  .v-page__header-right {
    @apply w-full justify-start;
  }

  .v-page__title {
    @apply text-2xl;
  }

  .v-page__subtitle {
    @apply text-base;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .v-page--card {
    @apply bg-gray-800;
  }

  .v-page--bordered {
    @apply bg-gray-800 border-gray-700;
  }

  .v-page--elevated {
    @apply bg-gray-800;
  }

  .v-page__title {
    @apply text-white;
  }

  .v-page__subtitle {
    @apply text-gray-400;
  }

  .v-page__breadcrumb-link {
    @apply text-gray-400 hover:text-gray-300;
  }

  .v-page__breadcrumb-current {
    @apply text-white;
  }

  .v-page__breadcrumb-separator {
    @apply text-gray-500;
  }
}
</style>
