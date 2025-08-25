<template>
  <div class="v-card" :class="cardClasses">
    <!-- 카드 헤더 -->
    <div
      v-if="hasHeader"
      class="v-card__header"
      :class="headerClasses"
    >
      <slot name="header">
        <div class="v-card__header-content">
          <h3 v-if="title" class="v-card__title">{{ title }}</h3>
          <p v-if="subtitle" class="v-card__subtitle">{{ subtitle }}</p>
        </div>
        <div v-if="$slots['header-actions']" class="v-card__header-actions">
          <slot name="header-actions" />
        </div>
      </slot>
    </div>

    <!-- 카드 이미지 -->
    <div
      v-if="hasImage"
      class="v-card__image"
      :class="imageClasses"
    >
      <slot name="image">
        <img
          :src="image || ''"
          :alt="imageAlt || ''"
          class="v-card__image-content"
        />
      </slot>
    </div>

    <!-- 카드 내용 -->
    <div
      v-if="$slots.default"
      class="v-card__content"
      :class="contentClasses"
    >
      <slot />
    </div>

    <!-- 카드 액션 -->
    <div
      v-if="hasActions"
      class="v-card__actions"
      :class="actionsClasses"
    >
      <slot name="actions" />
    </div>

    <!-- 카드 푸터 -->
    <div
      v-if="hasFooter"
      class="v-card__footer"
      :class="footerClasses"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'

// Props 정의
interface Props {
  // 기본 속성
  variant?: 'elevated' | 'outlined' | 'flat' | 'tonal'
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
  size?: 'small' | 'default' | 'large'

  // 상태
  loading?: boolean

  // 스타일
  flat?: boolean
  elevation?: number | boolean

  // 콘텐츠
  title?: string
  subtitle?: string
  image?: string
  imageAlt?: string

  // 링크
  href?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'elevated',
  color: 'primary',
  size: 'default',
  loading: false,
  flat: false,
  elevation: false,
  title: '',
  subtitle: '',
  image: '',
  imageAlt: '',
  href: ''
})

// Slots
const slots = useSlots()

// Computed 속성들
const cardClasses = computed(() => {
  return [
    'v-card',
    `v-card--${props.variant}`,
    `v-card--${props.color}`,
    `v-card--${props.size}`,
    {
      'v-card--loading': props.loading,
      'v-card--flat': props.flat,
      'v-card--elevated': props.elevation,
      'v-card--clickable': !!props.href
    }
  ]
})

const hasHeader = computed(() => {
  return !!(props.title || props.subtitle || slots.header)
})

const hasImage = computed(() => {
  return !!(props.image || slots.image)
})

const hasActions = computed(() => {
  return !!slots.actions
})

const hasFooter = computed(() => {
  return !!slots.footer
})

const headerClasses = computed(() => {
  return [
    'v-card__header',
    {
      'v-card__header--with-actions': !!slots['header-actions']
    }
  ]
})

const imageClasses = computed(() => {
  return [
    'v-card__image',
    {
      'v-card__image--loading': props.loading
    }
  ]
})

const contentClasses = computed(() => {
  return [
    'v-card__content',
    {
      'v-card__content--loading': props.loading
    }
  ]
})

const actionsClasses = computed(() => {
  return [
    'v-card__actions',
    {
      'v-card__actions--loading': props.loading
    }
  ]
})

const footerClasses = computed(() => {
  return [
    'v-card__footer',
    {
      'v-card__footer--loading': props.loading
    }
  ]
})
</script>

<style scoped>
.v-card {
  @apply relative overflow-hidden transition-all duration-200;
}

/* Variants */
.v-card--elevated {
  @apply bg-white shadow-md hover:shadow-lg;
}

.v-card--outlined {
  @apply bg-white border border-gray-200;
}

.v-card--flat {
  @apply bg-transparent shadow-none;
}

.v-card--tonal {
  @apply bg-gray-50;
}

/* Colors */
.v-card--primary {
  @apply border-primary-200;
}

.v-card--primary.v-card--elevated {
  @apply shadow-primary-100;
}

.v-card--secondary {
  @apply border-gray-200;
}

.v-card--success {
  @apply border-green-200;
}

.v-card--success.v-card--elevated {
  @apply shadow-green-100;
}

.v-card--warning {
  @apply border-yellow-200;
}

.v-card--warning.v-card--elevated {
  @apply shadow-yellow-100;
}

.v-card--error {
  @apply border-red-200;
}

.v-card--error.v-card--elevated {
  @apply shadow-red-100;
}

.v-card--info {
  @apply border-blue-200;
}

.v-card--info.v-card--elevated {
  @apply shadow-blue-100;
}

/* Sizes */
.v-card--small {
  @apply text-sm;
}

.v-card--large {
  @apply text-lg;
}

/* States */
.v-card--rounded {
  @apply rounded-lg;
}

.v-card--loading {
  @apply pointer-events-none;
}

.v-card--elevated {
  @apply shadow-lg;
}

.v-card--link {
  @apply cursor-pointer;
}

.v-card--link:hover {
  @apply transform -translate-y-1;
}

/* Header */
.v-card__header {
  @apply flex items-center justify-between p-4 border-b border-gray-100;
}

.v-card__header--with-actions {
  @apply gap-4;
}

.v-card__header-content {
  @apply flex-1;
}

.v-card__title {
  @apply text-lg font-semibold text-gray-900 mb-1;
}

.v-card__subtitle {
  @apply text-sm text-gray-600;
}

.v-card__header-actions {
  @apply flex items-center gap-2;
}

/* Image */
.v-card__image {
  @apply relative overflow-hidden;
}

.v-card__image--loading {
  @apply animate-pulse bg-gray-200;
}

.v-card__image-content {
  @apply w-full h-auto object-cover;
}

/* Content */
.v-card__content {
  @apply p-4;
}

.v-card__content--loading {
  @apply animate-pulse;
}

/* Actions */
.v-card__actions {
  @apply flex items-center justify-end gap-2 p-4 border-t border-gray-100;
}

.v-card__actions--loading {
  @apply animate-pulse;
}

/* Footer */
.v-card__footer {
  @apply p-4 bg-gray-50 border-t border-gray-100;
}

.v-card__footer--loading {
  @apply animate-pulse;
}

/* Loading skeleton */
.v-card--loading .v-card__title {
  @apply bg-gray-200 rounded h-6 mb-2;
}

.v-card--loading .v-card__subtitle {
  @apply bg-gray-200 rounded h-4;
}

.v-card--loading .v-card__content {
  @apply space-y-2;
}

.v-card--loading .v-card__content > * {
  @apply bg-gray-200 rounded h-4;
}

/* Responsive */
@media (max-width: 640px) {
  .v-card__header {
    @apply p-3;
  }

  .v-card__content {
    @apply p-3;
  }

  .v-card__actions {
    @apply p-3;
  }

  .v-card__footer {
    @apply p-3;
  }
}
</style>
