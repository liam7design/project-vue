<template>
  <div class="v-checkbox" :class="checkboxWrapperClasses">
    <label
      :for="checkboxId"
      class="v-checkbox__label"
      :class="labelClasses"
    >
      <!-- 체크박스 입력 -->
      <input
        :id="checkboxId"
        ref="checkboxRef"
        v-model="checkboxValue"
        type="checkbox"
        :name="name"
        :disabled="disabled"
        :required="required"
        :indeterminate="indeterminate"
        class="v-checkbox__input"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <!-- 체크박스 디자인 -->
      <div class="v-checkbox__design" :class="designClasses">
        <Icon
          v-if="isChecked"
          name="mdi:check"
          class="v-checkbox__icon"
        />
        <Icon
          v-else-if="indeterminate"
          name="mdi:minus"
          class="v-checkbox__icon"
        />
      </div>

      <!-- 라벨 텍스트 -->
      <span class="v-checkbox__text">
        <slot>
          {{ label }}
        </slot>
      </span>

      <!-- 필수 표시 -->
      <span v-if="required" class="v-checkbox__required">*</span>
    </label>

    <!-- 힌트 텍스트 -->
    <div
      v-if="hint || errorMessage || $slots.hint"
      class="v-checkbox__hint"
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
  indeterminate?: boolean

  // 유효성 검사
  error?: boolean
  errorMessage?: string
  hint?: string

  // 스타일
  size?: 'small' | 'default' | 'large'
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'

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
  indeterminate: false,
  error: false,
  errorMessage: '',
  hint: '',
  size: 'default',
  color: 'primary',
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
const checkboxRef = ref<HTMLInputElement>()

// Slots
// const slots = useSlots()

// Computed 속성들
const checkboxId = computed(() => {
  return props.id || `v-checkbox-${Math.random().toString(36).substr(2, 9)}`
})

const checkboxWrapperClasses = computed(() => {
  return [
    'v-checkbox',
    `v-checkbox--${props.size}`,
    {
      'v-checkbox--disabled': props.disabled,
      'v-checkbox--readonly': props.readonly,
      'v-checkbox--error': props.error || !!props.errorMessage,
      'v-checkbox--indeterminate': props.indeterminate
    }
  ]
})

const labelClasses = computed(() => {
  return [
    'v-checkbox__label',
    {
      'v-checkbox__label--disabled': props.disabled,
      'v-checkbox__label--error': props.error || !!props.errorMessage
    }
  ]
})

const designClasses = computed(() => {
  return [
    'v-checkbox__design',
    `v-checkbox__design--${props.color}`,
    {
      'v-checkbox__design--checked': isChecked.value,
      'v-checkbox__design--indeterminate': props.indeterminate,
      'v-checkbox__design--disabled': props.disabled,
      'v-checkbox__design--error': props.error || !!props.errorMessage
    }
  ]
})

const hintClasses = computed(() => {
  return [
    'v-checkbox__hint',
    {
      'v-checkbox__hint--error': props.error || !!props.errorMessage
    }
  ]
})

const checkboxValue = computed({
  get: () => props.modelValue || false,
  set: (value: boolean) => {
    emit('update:modelValue', value)
  }
})

const isChecked = computed(() => {
  return checkboxValue.value === true
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
  checkboxRef.value?.focus()
}

const blur = () => {
  checkboxRef.value?.blur()
}

// Expose methods
defineExpose({
  focus,
  blur,
  checkboxRef
})
</script>

<style scoped>
.v-checkbox {
  @apply relative;
}

/* Label */
.v-checkbox__label {
  @apply flex items-center gap-2 cursor-pointer transition-colors;
  @apply hover:text-gray-700;
}

.v-checkbox__label--disabled {
  @apply cursor-not-allowed opacity-50;
}

.v-checkbox__label--error {
  @apply text-red-600;
}

/* Input */
.v-checkbox__input {
  @apply sr-only;
}

/* Design */
.v-checkbox__design {
  @apply relative flex items-center justify-center w-4 h-4 border-2 rounded transition-all duration-200;
  @apply bg-white border-gray-300;
}

.v-checkbox__design--primary {
  @apply focus-within:border-primary-500;
}

.v-checkbox__design--primary.v-checkbox__design--checked {
  @apply bg-primary-500 border-primary-500;
}

.v-checkbox__design--secondary {
  @apply focus-within:border-gray-500;
}

.v-checkbox__design--secondary.v-checkbox__design--checked {
  @apply bg-gray-500 border-gray-500;
}

.v-checkbox__design--success {
  @apply focus-within:border-green-500;
}

.v-checkbox__design--success.v-checkbox__design--checked {
  @apply bg-green-500 border-green-500;
}

.v-checkbox__design--warning {
  @apply focus-within:border-yellow-500;
}

.v-checkbox__design--warning.v-checkbox__design--checked {
  @apply bg-yellow-500 border-yellow-500;
}

.v-checkbox__design--error {
  @apply border-red-500 focus-within:border-red-500;
}

.v-checkbox__design--error.v-checkbox__design--checked {
  @apply bg-red-500 border-red-500;
}

.v-checkbox__design--info {
  @apply focus-within:border-blue-500;
}

.v-checkbox__design--info.v-checkbox__design--checked {
  @apply bg-blue-500 border-blue-500;
}

.v-checkbox__design--disabled {
  @apply bg-gray-100 border-gray-300 cursor-not-allowed;
}

.v-checkbox__design--indeterminate {
  @apply bg-primary-500 border-primary-500;
}

/* Icon */
.v-checkbox__icon {
  @apply w-3 h-3 text-white;
}

/* Text */
.v-checkbox__text {
  @apply text-sm text-gray-700;
}

.v-checkbox__required {
  @apply text-red-500 ml-1;
}

/* Hint */
.v-checkbox__hint {
  @apply mt-1 text-xs text-gray-500;
}

.v-checkbox__hint--error {
  @apply text-red-500;
}

/* Sizes */
.v-checkbox--small .v-checkbox__design {
  @apply w-3 h-3;
}

.v-checkbox--small .v-checkbox__icon {
  @apply w-2.5 h-2.5;
}

.v-checkbox--small .v-checkbox__text {
  @apply text-xs;
}

.v-checkbox--large .v-checkbox__design {
  @apply w-5 h-5;
}

.v-checkbox--large .v-checkbox__icon {
  @apply w-4 h-4;
}

.v-checkbox--large .v-checkbox__text {
  @apply text-base;
}

/* Focus styles */
.v-checkbox__input:focus + .v-checkbox__design {
  @apply ring-2 ring-offset-2;
}

.v-checkbox__input:focus + .v-checkbox__design--primary {
  @apply ring-primary-500;
}

.v-checkbox__input:focus + .v-checkbox__design--secondary {
  @apply ring-gray-500;
}

.v-checkbox__input:focus + .v-checkbox__design--success {
  @apply ring-green-500;
}

.v-checkbox__input:focus + .v-checkbox__design--warning {
  @apply ring-yellow-500;
}

.v-checkbox__input:focus + .v-checkbox__design--error {
  @apply ring-red-500;
}

.v-checkbox__input:focus + .v-checkbox__design--info {
  @apply ring-blue-500;
}

/* Hover effects */
.v-checkbox__label:hover .v-checkbox__design:not(.v-checkbox__design--disabled) {
  @apply border-gray-400;
}

.v-checkbox__label:hover .v-checkbox__design--checked:not(.v-checkbox__design--disabled) {
  @apply opacity-80;
}

/* Indeterminate state */
.v-checkbox__design--indeterminate .v-checkbox__icon {
  @apply text-white;
}
</style>
