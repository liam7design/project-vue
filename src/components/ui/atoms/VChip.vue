<template>
  <div class="v-chip" :class="chipClasses" @click="handleClick">
    <!-- 접두사 아이콘 -->
    <Icon
      v-if="prependIcon"
      :name="prependIcon"
      class="v-chip__prepend-icon"
    />

    <!-- 칩 내용 -->
    <span class="v-chip__content">
      <slot>{{ label }}</slot>
    </span>

    <!-- 접미사 아이콘 -->
    <Icon
      v-if="appendIcon"
      :name="appendIcon"
      class="v-chip__append-icon"
    />

    <!-- 닫기 아이콘 -->
    <Icon
      v-if="closeable"
      name="mdi:close"
      class="v-chip__close-icon"
      @click.stop="handleClose"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'

// Props 정의
interface Props {
  // 기본 속성
  label?: string

  // 스타일
  variant?: 'filled' | 'outlined' | 'text' | 'tonal'
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
  size?: 'small' | 'default' | 'large'

  // 상태
  disabled?: boolean
  selected?: boolean

  // 아이콘
  prependIcon?: string
  appendIcon?: string
  closeable?: boolean

  // 기타
  filter?: boolean
  pill?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'filled',
  color: 'primary',
  size: 'default',
  disabled: false,
  selected: false,
  closeable: false,
  filter: false,
  pill: false,
  label: '',
  prependIcon: '',
  appendIcon: ''
})

// Emits 정의
const emit = defineEmits<{
  click: [event: MouseEvent]
  close: [event: MouseEvent]
  'update:selected': [value: boolean]
}>()

// Slots
const slots = useSlots()

// Computed 속성들
const chipClasses = computed(() => {
  return [
    'v-chip',
    `v-chip--${props.variant}`,
    `v-chip--${props.color}`,
    `v-chip--${props.size}`,
    {
      'v-chip--disabled': props.disabled,
      'v-chip--selected': props.selected,
      'v-chip--filter': props.filter,
      'v-chip--pill': props.pill,
      'v-chip--clickable': !props.disabled && (props.filter || !!slots.default),
      'v-chip--with-prepend': props.prependIcon,
      'v-chip--with-append': props.appendIcon,
      'v-chip--closeable': props.closeable
    }
  ]
})

// 이벤트 핸들러들
const handleClick = (event: MouseEvent) => {
  if (props.disabled) return

  if (props.filter) {
    emit('update:selected', !props.selected)
  }

  emit('click', event)
}

const handleClose = (event: MouseEvent) => {
  if (props.disabled) return
  emit('close', event)
}
</script>

<style scoped>
.v-chip {
  @apply inline-flex items-center gap-1 font-medium transition-all duration-200;
  @apply cursor-default select-none;
}

/* Variants */
.v-chip--filled {
  @apply bg-primary-100 text-primary-800;
}

.v-chip--outlined {
  @apply bg-transparent border border-primary-300 text-primary-700;
}

.v-chip--text {
  @apply bg-transparent text-primary-600;
}

.v-chip--tonal {
  @apply bg-primary-50 text-primary-700;
}

/* Colors */
.v-chip--secondary.v-chip--filled {
  @apply bg-gray-100 text-gray-800;
}

.v-chip--secondary.v-chip--outlined {
  @apply border-gray-300 text-gray-700;
}

.v-chip--secondary.v-chip--text {
  @apply text-gray-600;
}

.v-chip--secondary.v-chip--tonal {
  @apply bg-gray-50 text-gray-700;
}

.v-chip--success.v-chip--filled {
  @apply bg-green-100 text-green-800;
}

.v-chip--success.v-chip--outlined {
  @apply border-green-300 text-green-700;
}

.v-chip--success.v-chip--text {
  @apply text-green-600;
}

.v-chip--success.v-chip--tonal {
  @apply bg-green-50 text-green-700;
}

.v-chip--warning.v-chip--filled {
  @apply bg-yellow-100 text-yellow-800;
}

.v-chip--warning.v-chip--outlined {
  @apply border-yellow-300 text-yellow-700;
}

.v-chip--warning.v-chip--text {
  @apply text-yellow-600;
}

.v-chip--warning.v-chip--tonal {
  @apply bg-yellow-50 text-yellow-700;
}

.v-chip--error.v-chip--filled {
  @apply bg-red-100 text-red-800;
}

.v-chip--error.v-chip--outlined {
  @apply border-red-300 text-red-700;
}

.v-chip--error.v-chip--text {
  @apply text-red-600;
}

.v-chip--error.v-chip--tonal {
  @apply bg-red-50 text-red-700;
}

.v-chip--info.v-chip--filled {
  @apply bg-blue-100 text-blue-800;
}

.v-chip--info.v-chip--outlined {
  @apply border-blue-300 text-blue-700;
}

.v-chip--info.v-chip--text {
  @apply text-blue-600;
}

.v-chip--info.v-chip--tonal {
  @apply bg-blue-50 text-blue-700;
}

/* Sizes */
.v-chip--small {
  @apply px-2 py-1 text-xs rounded;
}

.v-chip--default {
  @apply px-3 py-1.5 text-sm rounded-md;
}

.v-chip--large {
  @apply px-4 py-2 text-base rounded-lg;
}

/* States */
.v-chip--disabled {
  @apply opacity-50 cursor-not-allowed;
}

.v-chip--selected {
  @apply ring-2 ring-offset-2 ring-primary-500;
}

.v-chip--filter {
  @apply cursor-pointer;
}

.v-chip--filter:hover {
  @apply shadow-sm;
}

.v-chip--clickable {
  @apply cursor-pointer;
}

.v-chip--clickable:hover {
  @apply shadow-sm;
}

.v-chip--pill {
  @apply rounded-full;
}

/* Icons */
.v-chip__prepend-icon,
.v-chip__append-icon {
  @apply w-4 h-4;
}

.v-chip--small .v-chip__prepend-icon,
.v-chip--small .v-chip__append-icon {
  @apply w-3 h-3;
}

.v-chip--large .v-chip__prepend-icon,
.v-chip--large .v-chip__append-icon {
  @apply w-5 h-5;
}

.v-chip__close-icon {
  @apply w-4 h-4 cursor-pointer hover:opacity-70 transition-opacity;
}

.v-chip--small .v-chip__close-icon {
  @apply w-3 h-3;
}

.v-chip--large .v-chip__close-icon {
  @apply w-5 h-5;
}

/* Content */
.v-chip__content {
  @apply whitespace-nowrap;
}
</style>
