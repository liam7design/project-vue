<template>
  <div class="v-switch" :class="switchWrapperClasses">
    <label
      :for="switchId"
      class="v-switch__label"
      :class="labelClasses"
    >
      <!-- 스위치 입력 -->
      <input
        :id="switchId"
        ref="switchRef"
        v-model="switchValue"
        type="checkbox"
        :name="name"
        :disabled="disabled"
        :required="required"
        class="v-switch__input"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <!-- 스위치 디자인 -->
      <div class="v-switch__design" :class="designClasses">
        <div class="v-switch__track" :class="trackClasses">
          <div class="v-switch__thumb" :class="thumbClasses">
            <Icon
              v-if="isChecked"
              name="mdi:check"
              class="v-switch__icon"
            />
            <Icon
              v-else
              name="mdi:close"
              class="v-switch__icon"
            />
          </div>
        </div>
      </div>

      <!-- 라벨 텍스트 -->
      <span class="v-switch__text">
        <slot>
          {{ label }}
        </slot>
      </span>

      <!-- 필수 표시 -->
      <span v-if="required" class="v-switch__required">*</span>
    </label>

    <!-- 힌트 텍스트 -->
    <div
      v-if="hint || errorMessage || $slots.hint"
      class="v-switch__hint"
      :class="hintClasses"
    >
      <slot name="hint">
        {{ errorMessage || hint }}
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

// Props 정의
interface Props {
  // 기본 속성
  modelValue?: boolean | null
  label?: string
  name?: string
  required?: boolean

  // 상태
  disabled?: boolean
  readonly?: boolean

  // 유효성 검사
  error?: boolean
  errorMessage?: string
  hint?: string

  // 스타일
  size?: 'small' | 'default' | 'large'
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'

  // 기능
  showIcon?: boolean
  inset?: boolean

  // 기타
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  label: '',
  name: '',
  required: false,
  disabled: false,
  readonly: false,
  error: false,
  errorMessage: '',
  hint: '',
  size: 'default',
  color: 'primary',
  showIcon: false,
  inset: false,
  id: ''
})

// Emits 정의
const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'change': [value: boolean, event: Event]
  'focus': [event: FocusEvent]
  'blur': [event: FocusEvent]
}>()

// Refs
const switchRef = ref<HTMLInputElement>()

// Computed 속성들
const switchId = computed(() => {
  return props.id || `v-switch-${Math.random().toString(36).substr(2, 9)}`
})

const switchWrapperClasses = computed(() => {
  return [
    'v-switch',
    `v-switch--${props.size}`,
    {
      'v-switch--disabled': props.disabled,
      'v-switch--readonly': props.readonly,
      'v-switch--error': props.error || !!props.errorMessage,
      'v-switch--inset': props.inset
    }
  ]
})

const labelClasses = computed(() => {
  return [
    'v-switch__label',
    {
      'v-switch__label--disabled': props.disabled,
      'v-switch__label--error': props.error || !!props.errorMessage
    }
  ]
})

const designClasses = computed(() => {
  return [
    'v-switch__design',
    {
      'v-switch__design--disabled': props.disabled
    }
  ]
})

const trackClasses = computed(() => {
  return [
    'v-switch__track',
    `v-switch__track--${props.color}`,
    {
      'v-switch__track--checked': isChecked.value,
      'v-switch__track--disabled': props.disabled,
      'v-switch__track--error': props.error || !!props.errorMessage,
      'v-switch__track--inset': props.inset
    }
  ]
})

const thumbClasses = computed(() => {
  return [
    'v-switch__thumb',
    {
      'v-switch__thumb--checked': isChecked.value,
      'v-switch__thumb--disabled': props.disabled,
      'v-switch__thumb--show-icon': props.showIcon
    }
  ]
})

const hintClasses = computed(() => {
  return [
    'v-switch__hint',
    {
      'v-switch__hint--error': props.error || !!props.errorMessage
    }
  ]
})

const switchValue = computed({
  get: () => props.modelValue || false,
  set: (value: boolean) => {
    emit('update:modelValue', value)
  }
})

const isChecked = computed(() => {
  return switchValue.value === true
})

// Methods
const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.checked
  emit('change', value, event)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

// Public methods
const focus = () => {
  switchRef.value?.focus()
}

const blur = () => {
  switchRef.value?.blur()
}

// Expose methods
defineExpose({
  focus,
  blur,
  switchRef
})
</script>

<style scoped>
.v-switch {
  @apply relative;
}

/* Label */
.v-switch__label {
  @apply flex items-center gap-3 cursor-pointer transition-colors;
  @apply hover:text-gray-700;
}

.v-switch__label--disabled {
  @apply cursor-not-allowed opacity-50;
}

.v-switch__label--error {
  @apply text-red-600;
}

/* Input */
.v-switch__input {
  @apply sr-only;
}

/* Design */
.v-switch__design {
  @apply relative;
}

.v-switch__design--disabled {
  @apply cursor-not-allowed;
}

/* Track */
.v-switch__track {
  @apply relative w-11 h-6 rounded-full transition-all duration-200;
  @apply bg-gray-300;
}

.v-switch__track--primary {
  @apply focus-within:ring-2 focus-within:ring-primary-500;
}

.v-switch__track--primary.v-switch__track--checked {
  @apply bg-primary-500;
}

.v-switch__track--secondary {
  @apply focus-within:ring-2 focus-within:ring-gray-500;
}

.v-switch__track--secondary.v-switch__track--checked {
  @apply bg-gray-500;
}

.v-switch__track--success {
  @apply focus-within:ring-2 focus-within:ring-green-500;
}

.v-switch__track--success.v-switch__track--checked {
  @apply bg-green-500;
}

.v-switch__track--warning {
  @apply focus-within:ring-2 focus-within:ring-yellow-500;
}

.v-switch__track--warning.v-switch__track--checked {
  @apply bg-yellow-500;
}

.v-switch__track--error {
  @apply bg-red-300 focus-within:ring-red-500;
}

.v-switch__track--error.v-switch__track--checked {
  @apply bg-red-500;
}

.v-switch__track--info {
  @apply focus-within:ring-2 focus-within:ring-blue-500;
}

.v-switch__track--info.v-switch__track--checked {
  @apply bg-blue-500;
}

.v-switch__track--disabled {
  @apply bg-gray-200 cursor-not-allowed;
}

.v-switch__track--inset {
  @apply bg-gray-100;
}

/* Thumb */
.v-switch__thumb {
  @apply absolute top-0.5 left-0.5 w-5 h-5 rounded-full transition-all duration-200;
  @apply bg-white shadow-sm flex items-center justify-center;
}

.v-switch__thumb--checked {
  @apply transform translate-x-5;
}

.v-switch__thumb--disabled {
  @apply bg-gray-100 cursor-not-allowed;
}

.v-switch__thumb--show-icon {
  @apply w-4 h-4;
}

/* Icon */
.v-switch__icon {
  @apply w-3 h-3 text-gray-400;
}

.v-switch__thumb--checked .v-switch__icon {
  @apply text-white;
}

/* Text */
.v-switch__text {
  @apply text-sm text-gray-700;
}

.v-switch__required {
  @apply text-red-500 ml-1;
}

/* Hint */
.v-switch__hint {
  @apply mt-1 text-xs text-gray-500;
}

.v-switch__hint--error {
  @apply text-red-500;
}

/* Sizes */
.v-switch--small .v-switch__track {
  @apply w-9 h-5;
}

.v-switch--small .v-switch__thumb {
  @apply w-4 h-4;
}

.v-switch--small .v-switch__thumb--checked {
  @apply translate-x-4;
}

.v-switch--small .v-switch__text {
  @apply text-xs;
}

.v-switch--large .v-switch__track {
  @apply w-14 h-7;
}

.v-switch--large .v-switch__thumb {
  @apply w-6 h-6;
}

.v-switch--large .v-switch__thumb--checked {
  @apply translate-x-7;
}

.v-switch--large .v-switch__text {
  @apply text-base;
}

/* Focus styles */
.v-switch__input:focus + .v-switch__design .v-switch__track {
  @apply ring-2 ring-offset-2;
}

.v-switch__input:focus + .v-switch__design .v-switch__track--primary {
  @apply ring-primary-500;
}

.v-switch__input:focus + .v-switch__design .v-switch__track--secondary {
  @apply ring-gray-500;
}

.v-switch__input:focus + .v-switch__design .v-switch__track--success {
  @apply ring-green-500;
}

.v-switch__input:focus + .v-switch__design .v-switch__track--warning {
  @apply ring-yellow-500;
}

.v-switch__input:focus + .v-switch__design .v-switch__track--error {
  @apply ring-red-500;
}

.v-switch__input:focus + .v-switch__design .v-switch__track--info {
  @apply ring-blue-500;
}

/* Hover effects */
.v-switch__label:hover .v-switch__track:not(.v-switch__track--disabled) {
  @apply bg-gray-400;
}

.v-switch__label:hover .v-switch__track--checked:not(.v-switch__track--disabled) {
  @apply opacity-80;
}

/* Loading state */
.v-switch--loading .v-switch__thumb {
  @apply animate-pulse;
}
</style>
