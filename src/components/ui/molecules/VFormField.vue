<template>
  <div class="v-form-field">
    <!-- 라벨 -->
    <label
      v-if="label"
      :for="fieldId"
      class="v-form-field__label"
      :class="labelClasses"
    >
      {{ label }}
      <span v-if="required" class="v-form-field__required">*</span>
    </label>

    <!-- 슬롯 내용 -->
    <div class="v-form-field__content">
      <slot />
    </div>

    <!-- 힌트 텍스트 -->
    <div
      v-if="hint || errorMessage"
      class="v-form-field__hint"
      :class="hintClasses"
    >
      {{ errorMessage || hint }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Props 정의
interface Props {
  label?: string
  required?: boolean
  error?: boolean
  errorMessage?: string
  hint?: string
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  required: false,
  error: false,
  errorMessage: '',
  hint: '',
  id: ''
})

// Computed 속성들
const fieldId = computed(() => {
  return props.id || `v-form-field-${Math.random().toString(36).substr(2, 9)}`
})

const labelClasses = computed(() => {
  return [
    'v-form-field__label',
    {
      'v-form-field__label--required': props.required,
      'v-form-field__label--error': props.error
    }
  ]
})

const hintClasses = computed(() => {
  return [
    'v-form-field__hint',
    {
      'v-form-field__hint--error': props.error
    }
  ]
})
</script>

<style scoped>
.v-form-field {
  @apply relative w-full;
}

/* Label */
.v-form-field__label {
  @apply block text-sm font-medium text-gray-700 mb-1 transition-all duration-200;
}

.v-form-field__label--required {
  @apply text-red-500;
}

.v-form-field__label--error {
  @apply text-red-600;
}

.v-form-field__required {
  @apply text-red-500 ml-1;
}

/* Content */
.v-form-field__content {
  @apply relative;
}

/* Hint */
.v-form-field__hint {
  @apply mt-1 text-xs text-gray-500;
}

.v-form-field__hint--error {
  @apply text-red-500;
}
</style>
