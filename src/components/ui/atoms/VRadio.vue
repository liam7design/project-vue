<template>
  <div class="v-radio-group" :class="radioGroupClasses">
    <!-- 라벨 -->
    <label
      v-if="label"
      class="v-radio-group__label"
      :class="labelClasses"
    >
      {{ label }}
      <span v-if="required" class="v-radio-group__required">*</span>
    </label>

    <!-- 라디오 버튼들 -->
    <div class="v-radio-group__options" :class="optionsClasses">
      <label
        v-for="option in options"
        :key="getOptionValue(option)"
        class="v-radio-option"
        :class="getOptionClasses(option)"
      >
        <!-- 라디오 입력 -->
        <input
          :name="name"
          :value="getOptionValue(option)"
          :checked="isOptionSelected(option)"
          :disabled="!!(disabled || option.disabled)"
          type="radio"
          class="v-radio-option__input"
          @change="selectOption(option)"
        />

        <!-- 라디오 디자인 -->
        <div class="v-radio-option__design" :class="getDesignClasses(option)">
          <div class="v-radio-option__dot"></div>
        </div>

        <!-- 라디오 텍스트 -->
        <span class="v-radio-option__text">
          <slot name="option" :option="option">
            {{ getOptionLabel(option) }}
          </slot>
        </span>
      </label>
    </div>

    <!-- 힌트 텍스트 -->
    <div
      v-if="hint || errorMessage || $slots.hint"
      class="v-radio-group__hint"
      :class="hintClasses"
    >
      <slot name="hint">
        {{ errorMessage || hint }}
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// 타입 정의
export interface RadioOption {
  value: string | number
  label: string
  disabled?: boolean
  [key: string]: string | number | boolean | undefined
}

// Props 정의
interface Props {
  // 기본 속성
  modelValue?: string | number | null
  options: RadioOption[]
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
  layout?: 'vertical' | 'horizontal'

  // 기타
  valueKey?: string
  labelKey?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  options: () => [],
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
  layout: 'vertical',
  valueKey: 'value',
  labelKey: 'label'
})

// Emits 정의
const emit = defineEmits<{
  'update:modelValue': [value: string | number | null]
  'change': [value: string | number | null, option: RadioOption | null]
}>()

// Computed 속성들
const radioGroupClasses = computed(() => {
  return [
    'v-radio-group',
    `v-radio-group--${props.size}`,
    `v-radio-group--${props.layout}`,
    {
      'v-radio-group--disabled': props.disabled,
      'v-radio-group--error': props.error || !!props.errorMessage
    }
  ]
})

const labelClasses = computed(() => {
  return [
    'v-radio-group__label',
    {
      'v-radio-group__label--error': props.error || !!props.errorMessage
    }
  ]
})

const optionsClasses = computed(() => {
  return [
    'v-radio-group__options',
    `v-radio-group__options--${props.layout}`
  ]
})

const hintClasses = computed(() => {
  return [
    'v-radio-group__hint',
    {
      'v-radio-group__hint--error': props.error || !!props.errorMessage
    }
  ]
})

// Methods
const getOptionValue = (option: RadioOption): string | number => {
  return option[props.valueKey] as string | number
}

const getOptionLabel = (option: RadioOption): string => {
  return option[props.labelKey] as string
}

const isOptionSelected = (option: RadioOption): boolean => {
  return getOptionValue(option) === props.modelValue
}

const getOptionClasses = (option: RadioOption) => {
  return [
    'v-radio-option',
    {
      'v-radio-option--selected': isOptionSelected(option),
      'v-radio-option--disabled': props.disabled || option.disabled,
      'v-radio-option--error': props.error || !!props.errorMessage
    }
  ]
}

const getDesignClasses = (option: RadioOption) => {
  return [
    'v-radio-option__design',
    `v-radio-option__design--${props.color}`,
    {
      'v-radio-option__design--selected': isOptionSelected(option),
      'v-radio-option__design--disabled': props.disabled || option.disabled,
      'v-radio-option__design--error': props.error || !!props.errorMessage
    }
  ]
}

const selectOption = (option: RadioOption) => {
  if (props.disabled || option.disabled || props.readonly) return

  const value = getOptionValue(option)
  emit('update:modelValue', value)
  emit('change', value, option)
}
</script>

<style scoped>
.v-radio-group {
  @apply relative;
}

/* Label */
.v-radio-group__label {
  @apply block text-sm font-medium text-gray-700 mb-2;
}

.v-radio-group__label--error {
  @apply text-red-600;
}

.v-radio-group__required {
  @apply text-red-500 ml-1;
}

/* Options */
.v-radio-group__options {
  @apply space-y-2;
}

.v-radio-group__options--horizontal {
  @apply flex flex-wrap gap-4;
}

/* Radio Option */
.v-radio-option {
  @apply flex items-center gap-2 cursor-pointer transition-colors;
  @apply hover:text-gray-700;
}

.v-radio-option--disabled {
  @apply cursor-not-allowed opacity-50;
}

.v-radio-option--error {
  @apply text-red-600;
}

/* Input */
.v-radio-option__input {
  @apply sr-only;
}

/* Design */
.v-radio-option__design {
  @apply relative flex items-center justify-center w-4 h-4 border-2 rounded-full transition-all duration-200;
  @apply bg-white border-gray-300;
}

.v-radio-option__design--primary {
  @apply focus-within:border-primary-500;
}

.v-radio-option__design--primary.v-radio-option__design--selected {
  @apply border-primary-500;
}

.v-radio-option__design--secondary {
  @apply focus-within:border-gray-500;
}

.v-radio-option__design--secondary.v-radio-option__design--selected {
  @apply border-gray-500;
}

.v-radio-option__design--success {
  @apply focus-within:border-green-500;
}

.v-radio-option__design--success.v-radio-option__design--selected {
  @apply border-green-500;
}

.v-radio-option__design--warning {
  @apply focus-within:border-yellow-500;
}

.v-radio-option__design--warning.v-radio-option__design--selected {
  @apply border-yellow-500;
}

.v-radio-option__design--error {
  @apply border-red-500 focus-within:border-red-500;
}

.v-radio-option__design--error.v-radio-option__design--selected {
  @apply border-red-500;
}

.v-radio-option__design--info {
  @apply focus-within:border-blue-500;
}

.v-radio-option__design--info.v-radio-option__design--selected {
  @apply border-blue-500;
}

.v-radio-option__design--disabled {
  @apply bg-gray-100 border-gray-300 cursor-not-allowed;
}

/* Dot */
.v-radio-option__dot {
  @apply w-2 h-2 rounded-full bg-transparent transition-all duration-200;
}

.v-radio-option__design--selected .v-radio-option__dot {
  @apply bg-current;
}

.v-radio-option__design--primary.v-radio-option__design--selected .v-radio-option__dot {
  @apply bg-primary-500;
}

.v-radio-option__design--secondary.v-radio-option__design--selected .v-radio-option__dot {
  @apply bg-gray-500;
}

.v-radio-option__design--success.v-radio-option__design--selected .v-radio-option__dot {
  @apply bg-green-500;
}

.v-radio-option__design--warning.v-radio-option__design--selected .v-radio-option__dot {
  @apply bg-yellow-500;
}

.v-radio-option__design--error.v-radio-option__design--selected .v-radio-option__dot {
  @apply bg-red-500;
}

.v-radio-option__design--info.v-radio-option__design--selected .v-radio-option__dot {
  @apply bg-blue-500;
}

/* Text */
.v-radio-option__text {
  @apply text-sm text-gray-700;
}

/* Hint */
.v-radio-group__hint {
  @apply mt-1 text-xs text-gray-500;
}

.v-radio-group__hint--error {
  @apply text-red-500;
}

/* Sizes */
.v-radio-group--small .v-radio-option__design {
  @apply w-3 h-3;
}

.v-radio-group--small .v-radio-option__dot {
  @apply w-1.5 h-1.5;
}

.v-radio-group--small .v-radio-option__text {
  @apply text-xs;
}

.v-radio-group--large .v-radio-option__design {
  @apply w-5 h-5;
}

.v-radio-group--large .v-radio-option__dot {
  @apply w-2.5 h-2.5;
}

.v-radio-group--large .v-radio-option__text {
  @apply text-base;
}

/* Focus styles */
.v-radio-option__input:focus + .v-radio-option__design {
  @apply ring-2 ring-offset-2;
}

.v-radio-option__input:focus + .v-radio-option__design--primary {
  @apply ring-primary-500;
}

.v-radio-option__input:focus + .v-radio-option__design--secondary {
  @apply ring-gray-500;
}

.v-radio-option__input:focus + .v-radio-option__design--success {
  @apply ring-green-500;
}

.v-radio-option__input:focus + .v-radio-option__design--warning {
  @apply ring-yellow-500;
}

.v-radio-option__input:focus + .v-radio-option__design--error {
  @apply ring-red-500;
}

.v-radio-option__input:focus + .v-radio-option__design--info {
  @apply ring-blue-500;
}

/* Hover effects */
.v-radio-option:hover .v-radio-option__design:not(.v-radio-option__design--disabled) {
  @apply border-gray-400;
}

.v-radio-option:hover .v-radio-option__design--selected:not(.v-radio-option__design--disabled) {
  @apply opacity-80;
}
</style>
