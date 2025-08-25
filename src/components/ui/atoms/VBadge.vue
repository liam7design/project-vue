<template>
  <div class="v-badge" :class="badgeClasses">
    <!-- 배지 내용 -->
    <div class="v-badge__content">
      <slot />
    </div>

    <!-- 배지 표시 -->
    <div
      v-if="show || content"
      class="v-badge__badge"
      :class="badgeContentClasses"
    >
      {{ content }}
    </div>

    <!-- 점 표시 -->
    <div
      v-else-if="dot"
      class="v-badge__dot"
      :class="dotClasses"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Props 정의
interface Props {
  // 기본 속성
  content?: string | number
  show?: boolean
  dot?: boolean

  // 스타일
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
  size?: 'small' | 'default' | 'large'
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

  // 기타
  max?: number
}

const props = withDefaults(defineProps<Props>(), {
  show: true,
  dot: false,
  color: 'error',
  size: 'default',
  position: 'top-right',
  max: 99,
  content: ''
})

// Computed 속성들
const badgeClasses = computed(() => {
  return [
    'v-badge',
    `v-badge--${props.position}`,
    {
      'v-badge--with-content': props.content || props.dot
    }
  ]
})

const badgeContentClasses = computed(() => {
  return [
    'v-badge__badge',
    `v-badge__badge--${props.color}`,
    `v-badge__badge--${props.size}`,
    {
      'v-badge__badge--overflow': props.content && Number(props.content) > props.max
    }
  ]
})

const dotClasses = computed(() => {
  return [
    'v-badge__dot',
    `v-badge__dot--${props.color}`,
    `v-badge__dot--${props.size}`
  ]
})
</script>

<style scoped>
.v-badge {
  @apply relative inline-block;
}

/* Position */
.v-badge--top-right .v-badge__badge,
.v-badge--top-right .v-badge__dot {
  @apply top-0 right-0 transform translate-x-1/2 -translate-y-1/2;
}

.v-badge--top-left .v-badge__badge,
.v-badge--top-left .v-badge__dot {
  @apply top-0 left-0 transform -translate-x-1/2 -translate-y-1/2;
}

.v-badge--bottom-right .v-badge__badge,
.v-badge--bottom-right .v-badge__dot {
  @apply bottom-0 right-0 transform translate-x-1/2 translate-y-1/2;
}

.v-badge--bottom-left .v-badge__badge,
.v-badge--bottom-left .v-badge__dot {
  @apply bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2;
}

/* Content */
.v-badge__content {
  @apply relative;
}

/* Badge */
.v-badge__badge {
  @apply absolute flex items-center justify-center font-medium text-white rounded-full;
  @apply min-w-[20px] h-5 px-1 text-xs;
  @apply z-10;
}

.v-badge__badge--small {
  @apply min-w-[16px] h-4 px-1 text-xs;
}

.v-badge__badge--large {
  @apply min-w-[24px] h-6 px-2 text-sm;
}

/* Colors */
.v-badge__badge--primary {
  @apply bg-primary-600;
}

.v-badge__badge--secondary {
  @apply bg-gray-600;
}

.v-badge__badge--success {
  @apply bg-green-600;
}

.v-badge__badge--warning {
  @apply bg-yellow-600;
}

.v-badge__badge--error {
  @apply bg-red-600;
}

.v-badge__badge--info {
  @apply bg-blue-600;
}

/* Overflow */
.v-badge__badge--overflow {
  @apply min-w-[24px];
}

/* Dot */
.v-badge__dot {
  @apply absolute w-2 h-2 rounded-full z-10;
}

.v-badge__dot--small {
  @apply w-1.5 h-1.5;
}

.v-badge__dot--large {
  @apply w-3 h-3;
}

.v-badge__dot--primary {
  @apply bg-primary-600;
}

.v-badge__dot--secondary {
  @apply bg-gray-600;
}

.v-badge__dot--success {
  @apply bg-green-600;
}

.v-badge__dot--warning {
  @apply bg-yellow-600;
}

.v-badge__dot--error {
  @apply bg-red-600;
}

.v-badge__dot--info {
  @apply bg-blue-600;
}
</style>
