<template>
  <div class="v-avatar" :class="avatarWrapperClasses">
    <!-- 이미지 -->
    <img
      v-if="src && !error"
      :src="src"
      :alt="alt"
      class="v-avatar__image"
      :class="imageClasses"
      @load="handleImageLoad"
      @error="handleImageError"
    />

    <!-- 이니셜 -->
    <div
      v-else-if="initials"
      class="v-avatar__initials"
      :class="initialsClasses"
    >
      {{ initials }}
    </div>

    <!-- 아이콘 -->
    <div
      v-else-if="icon"
      class="v-avatar__icon"
      :class="iconClasses"
    >
      <Icon
        :name="icon"
        class="v-avatar__icon-svg"
      />
    </div>

    <!-- 기본 아이콘 -->
    <div
      v-else
      class="v-avatar__default"
      :class="defaultClasses"
    >
      <Icon
        name="mdi:account"
        class="v-avatar__default-icon"
      />
    </div>

    <!-- 배지 -->
    <div
      v-if="badge"
      class="v-avatar__badge"
      :class="badgeClasses"
    >
      <slot name="badge">
        {{ badge }}
      </slot>
    </div>

    <!-- 상태 표시 -->
    <div
      v-if="status"
      class="v-avatar__status"
      :class="statusClasses"
    />

    <!-- 로딩 오버레이 -->
    <div
      v-if="loading"
      class="v-avatar__loading"
      :class="loadingClasses"
    >
      <div class="v-avatar__loading-spinner" />
    </div>

    <!-- 클릭 가능한 오버레이 -->
    <div
      v-if="clickable"
      class="v-avatar__overlay"
      :class="overlayClasses"
      @click="handleClick"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

// Props 정의
interface Props {
  // 기본 속성
  src?: string
  alt?: string
  initials?: string
  icon?: string

  // 스타일
  size?: 'x-small' | 'small' | 'default' | 'large' | 'x-large'
  variant?: 'circular' | 'rounded' | 'square'
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'

  // 기능
  badge?: string | number
  status?: 'online' | 'offline' | 'away' | 'busy'
  loading?: boolean
  clickable?: boolean

  // 상태
  error?: boolean

  // 기타
}

const props = withDefaults(defineProps<Props>(), {
  src: '',
  alt: '',
  initials: '',
  icon: '',
  size: 'default',
  variant: 'circular',
  color: 'primary',
  badge: '',
  status: 'online',
  loading: false,
  clickable: false,
  error: false
})

// Emits 정의
const emit = defineEmits<{
  'click': [event: MouseEvent]
  'load': [event: Event]
  'error': [event: Event]
}>()

// Refs
const imageError = ref(false)

// Computed 속성들
const avatarWrapperClasses = computed(() => {
  return [
    'v-avatar',
    `v-avatar--${props.size}`,
    `v-avatar--${props.variant}`,
    `v-avatar--${props.color}`,
    {
      'v-avatar--clickable': props.clickable,
      'v-avatar--loading': props.loading,
      'v-avatar--error': props.error || imageError.value
    }
  ]
})

const imageClasses = computed(() => {
  return [
    'v-avatar__image',
    {
      'v-avatar__image--error': props.error || imageError.value
    }
  ]
})

const initialsClasses = computed(() => {
  return [
    'v-avatar__initials',
    `v-avatar__initials--${props.color}`
  ]
})

const iconClasses = computed(() => {
  return [
    'v-avatar__icon',
    `v-avatar__icon--${props.color}`
  ]
})

const defaultClasses = computed(() => {
  return [
    'v-avatar__default',
    `v-avatar__default--${props.color}`
  ]
})

const badgeClasses = computed(() => {
  return [
    'v-avatar__badge',
    `v-avatar__badge--${props.size}`
  ]
})

const statusClasses = computed(() => {
  return [
    'v-avatar__status',
    `v-avatar__status--${props.status}`,
    `v-avatar__status--${props.size}`
  ]
})

const loadingClasses = computed(() => {
  return [
    'v-avatar__loading'
  ]
})

const overlayClasses = computed(() => {
  return [
    'v-avatar__overlay'
  ]
})

// Methods
const handleImageLoad = (event: Event) => {
  imageError.value = false
  emit('load', event)
}

const handleImageError = (event: Event) => {
  imageError.value = true
  emit('error', event)
}

const handleClick = (event: MouseEvent) => {
  if (props.clickable) {
    emit('click', event)
  }
}
</script>

<style scoped>
.v-avatar {
  @apply relative inline-block;
}

/* 기본 크기 */
.v-avatar--x-small {
  @apply w-6 h-6;
}

.v-avatar--small {
  @apply w-8 h-8;
}

.v-avatar--default {
  @apply w-10 h-10;
}

.v-avatar--large {
  @apply w-12 h-12;
}

.v-avatar--x-large {
  @apply w-16 h-16;
}

/* 변형 */
.v-avatar--circular {
  @apply rounded-full;
}

.v-avatar--rounded {
  @apply rounded-lg;
}

.v-avatar--square {
  @apply rounded-none;
}

/* 이미지 */
.v-avatar__image {
  @apply w-full h-full object-cover;
}

.v-avatar__image--error {
  @apply opacity-50;
}

/* 이니셜 */
.v-avatar__initials {
  @apply w-full h-full flex items-center justify-center text-white font-medium;
  @apply bg-gray-400;
}

.v-avatar__initials--primary {
  @apply bg-primary-500;
}

.v-avatar__initials--secondary {
  @apply bg-gray-500;
}

.v-avatar__initials--success {
  @apply bg-green-500;
}

.v-avatar__initials--warning {
  @apply bg-yellow-500;
}

.v-avatar__initials--error {
  @apply bg-red-500;
}

.v-avatar__initials--info {
  @apply bg-blue-500;
}

/* 아이콘 */
.v-avatar__icon {
  @apply w-full h-full flex items-center justify-center;
  @apply bg-gray-400;
}

.v-avatar__icon--primary {
  @apply bg-primary-500;
}

.v-avatar__icon--secondary {
  @apply bg-gray-500;
}

.v-avatar__icon--success {
  @apply bg-green-500;
}

.v-avatar__icon--warning {
  @apply bg-yellow-500;
}

.v-avatar__icon--error {
  @apply bg-red-500;
}

.v-avatar__icon--info {
  @apply bg-blue-500;
}

.v-avatar__icon-svg {
  @apply w-1/2 h-1/2 text-white;
}

/* 기본 아이콘 */
.v-avatar__default {
  @apply w-full h-full flex items-center justify-center;
  @apply bg-gray-300;
}

.v-avatar__default--primary {
  @apply bg-primary-100;
}

.v-avatar__default--secondary {
  @apply bg-gray-100;
}

.v-avatar__default--success {
  @apply bg-green-100;
}

.v-avatar__default--warning {
  @apply bg-yellow-100;
}

.v-avatar__default--error {
  @apply bg-red-100;
}

.v-avatar__default--info {
  @apply bg-blue-100;
}

.v-avatar__default-icon {
  @apply w-1/2 h-1/2 text-gray-500;
}

/* 배지 */
.v-avatar__badge {
  @apply absolute -top-1 -right-1 min-w-4 h-4 px-1;
  @apply flex items-center justify-center text-xs font-medium text-white;
  @apply bg-red-500 rounded-full;
}

.v-avatar__badge--x-small {
  @apply min-w-3 h-3 px-0.5 text-xs;
}

.v-avatar__badge--small {
  @apply min-w-3.5 h-3.5 px-0.5 text-xs;
}

.v-avatar__badge--default {
  @apply min-w-4 h-4 px-1 text-xs;
}

.v-avatar__badge--large {
  @apply min-w-5 h-5 px-1.5 text-sm;
}

.v-avatar__badge--x-large {
  @apply min-w-6 h-6 px-2 text-sm;
}

/* 상태 */
.v-avatar__status {
  @apply absolute bottom-0 right-0 border-2 border-white rounded-full;
}

.v-avatar__status--online {
  @apply bg-green-500;
}

.v-avatar__status--offline {
  @apply bg-gray-400;
}

.v-avatar__status--away {
  @apply bg-yellow-500;
}

.v-avatar__status--busy {
  @apply bg-red-500;
}

.v-avatar__status--x-small {
  @apply w-1.5 h-1.5;
}

.v-avatar__status--small {
  @apply w-2 h-2;
}

.v-avatar__status--default {
  @apply w-2.5 h-2.5;
}

.v-avatar__status--large {
  @apply w-3 h-3;
}

.v-avatar__status--x-large {
  @apply w-4 h-4;
}

/* 로딩 */
.v-avatar__loading {
  @apply absolute inset-0 bg-white bg-opacity-75;
  @apply flex items-center justify-center rounded-full;
}

.v-avatar__loading-spinner {
  @apply w-4 h-4 border-2 border-gray-300 border-t-primary-500;
  @apply rounded-full animate-spin;
}

/* 오버레이 */
.v-avatar__overlay {
  @apply absolute inset-0 bg-black bg-opacity-0;
  @apply transition-all duration-200 rounded-full;
  @apply cursor-pointer;
}

.v-avatar--clickable:hover .v-avatar__overlay {
  @apply bg-opacity-20;
}

/* 텍스트 크기 */
.v-avatar--x-small .v-avatar__initials {
  @apply text-xs;
}

.v-avatar--small .v-avatar__initials {
  @apply text-sm;
}

.v-avatar--default .v-avatar__initials {
  @apply text-base;
}

.v-avatar--large .v-avatar__initials {
  @apply text-lg;
}

.v-avatar--x-large .v-avatar__initials {
  @apply text-xl;
}

/* 호버 효과 */
.v-avatar--clickable {
  @apply cursor-pointer transition-transform duration-200;
}

.v-avatar--clickable:hover {
  @apply transform scale-105;
}

/* 에러 상태 */
.v-avatar--error .v-avatar__image {
  @apply opacity-50;
}

.v-avatar--error .v-avatar__initials,
.v-avatar--error .v-avatar__icon,
.v-avatar--error .v-avatar__default {
  @apply bg-red-100;
}

.v-avatar--error .v-avatar__initials {
  @apply text-red-600;
}

.v-avatar--error .v-avatar__icon-svg,
.v-avatar--error .v-avatar__default-icon {
  @apply text-red-500;
}
</style>
