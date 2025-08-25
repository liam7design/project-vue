<template>
  <form
    ref="formRef"
    class="v-form"
    :class="formClasses"
    @submit="handleSubmit"
    @reset="handleReset"
  >
    <!-- 폼 필드들 -->
    <div class="v-form__fields">
      <slot />
    </div>

    <!-- 폼 액션 -->
    <div
      v-if="showActions"
      class="v-form__actions"
      :class="actionsClasses"
    >
      <slot name="actions">
        <!-- 기본 액션 버튼들 -->
        <VButton
          v-if="showSubmitButton"
          type="submit"
          :loading="loading"
          :disabled="disabled || !isValid"
          :variant="submitButtonVariant"
          :color="submitButtonColor"
          :size="submitButtonSize"
        >
          {{ submitButtonText }}
        </VButton>

        <VButton
          v-if="showResetButton"
          type="button"
          variant="outlined"
          :disabled="disabled"
          @click="handleReset"
        >
          {{ resetButtonText }}
        </VButton>

        <VButton
          v-if="showCancelButton"
          type="button"
          variant="text"
          :disabled="disabled"
          @click="handleCancel"
        >
          {{ cancelButtonText }}
        </VButton>
      </slot>
    </div>

    <!-- 폼 에러 메시지 -->
    <div
      v-if="formError"
      class="v-form__error"
      :class="errorClasses"
    >
      <VIcon name="mdi:alert-circle" class="v-form__error-icon" />
      <span class="v-form__error-message">{{ formError }}</span>
    </div>

    <!-- 폼 성공 메시지 -->
    <div
      v-if="formSuccess"
      class="v-form__success"
      :class="successClasses"
    >
      <VIcon name="mdi:check-circle" class="v-form__success-icon" />
      <span class="v-form__success-message">{{ formSuccess }}</span>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, provide, onMounted } from 'vue'
import { VButton, VIcon } from '@/components/ui'
import { useFormValidation, type FormFieldValue, type ValidationRule } from '@/components/ui/composables/useFormValidation'

// Props 정의
interface Props {
  // 기본 속성
  modelValue?: Record<string, FormFieldValue>
  initialValues?: Record<string, FormFieldValue>

  // 유효성 검사
  validationRules?: Record<string, ValidationRule[]>
  validateOnSubmit?: boolean

  // 상태
  loading?: boolean
  disabled?: boolean
  readonly?: boolean

  // 액션 버튼
  showActions?: boolean
  showSubmitButton?: boolean
  showResetButton?: boolean
  showCancelButton?: boolean
  submitButtonText?: string
  resetButtonText?: string
  cancelButtonText?: string
  submitButtonVariant?: 'filled' | 'outlined' | 'text'
  submitButtonColor?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
  submitButtonSize?: 'small' | 'default' | 'large'

  // 메시지
  formError?: string
  formSuccess?: string

  // 스타일
  layout?: 'vertical' | 'horizontal' | 'inline'
  labelPosition?: 'top' | 'left' | 'right'
  labelWidth?: string

  // 기타
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({}),
  initialValues: () => ({}),
  validationRules: () => ({}),
  validateOnSubmit: true,
  loading: false,
  disabled: false,
  readonly: false,
  showActions: true,
  showSubmitButton: true,
  showResetButton: false,
  showCancelButton: false,
  submitButtonText: '제출',
  resetButtonText: '초기화',
  cancelButtonText: '취소',
  submitButtonVariant: 'filled',
  submitButtonColor: 'primary',
  submitButtonSize: 'default',
  formError: '',
  formSuccess: '',
  layout: 'vertical',
  labelPosition: 'top',
  labelWidth: '120px'
})

// Emits 정의
const emit = defineEmits<{
  'update:modelValue': [value: Record<string, FormFieldValue>]
  'submit': [values: Record<string, FormFieldValue>, event: Event]
  'reset': [event: Event]
  'cancel': []
  'validation': [result: { isValid: boolean; errors: Record<string, string[]> }]
  'fieldChange': [field: string, value: FormFieldValue]
  'fieldBlur': [field: string, value: FormFieldValue]
}>()

// Refs
const formRef = ref<HTMLFormElement>()

// Form validation composable
const {
  errors,
  isValid,
  validateField,
  clearAllErrors,
  validateForm
} = useFormValidation()

// Form fields state
const fields = ref<Record<string, FormFieldValue>>({ ...props.initialValues })

// Computed 속성들
const formClasses = computed(() => {
  return [
    'v-form',
    `v-form--${props.layout}`,
    {
      'v-form--loading': props.loading,
      'v-form--disabled': props.disabled,
      'v-form--readonly': props.readonly,
      'v-form--error': !!props.formError,
      'v-form--success': !!props.formSuccess
    }
  ]
})

const actionsClasses = computed(() => {
  return [
    'v-form__actions',
    {
      'v-form__actions--horizontal': props.layout === 'horizontal',
      'v-form__actions--inline': props.layout === 'inline'
    }
  ]
})

const errorClasses = computed(() => {
  return [
    'v-form__error'
  ]
})

const successClasses = computed(() => {
  return [
    'v-form__success'
  ]
})

// Form context 제공
const formContext = {
  // Form 상태
  loading: computed(() => props.loading),
  disabled: computed(() => props.disabled),
  readonly: computed(() => props.readonly),

  // Layout 설정
  layout: computed(() => props.layout),
  labelPosition: computed(() => props.labelPosition),
  labelWidth: computed(() => props.labelWidth),

  // Validation
  errors,
  validateField,
  setFieldValue: (field: string, value: FormFieldValue) => {
    fields.value[field] = value
  },
  getFieldValue: (field: string): FormFieldValue => {
    return fields.value[field]
  },

  // Events
  onFieldChange: (field: string, value: FormFieldValue) => {
    emit('fieldChange', field, value)
    emit('update:modelValue', { ...fields.value })
  },

  onFieldBlur: (field: string, value: FormFieldValue) => {
    emit('fieldBlur', field, value)
  }
}

provide('form', formContext)

// Methods
const handleSubmit = async (event: Event) => {
  event.preventDefault()

  if (props.disabled || props.loading) return

  // 폼 유효성 검사
  if (props.validateOnSubmit) {
    const formFields = Object.keys(fields.value).reduce((acc, field) => {
      acc[field] = {
        value: fields.value[field],
        rules: props.validationRules[field] || []
      }
      return acc
    }, {} as Record<string, { value: FormFieldValue; rules: ValidationRule[] }>)

    const validationResult = validateForm(formFields)
    emit('validation', { isValid: validationResult, errors: errors.value })

    if (!validationResult) {
      return
    }
  }

  // 제출 이벤트 발생
  emit('submit', fields.value, event)
}

const handleReset = (event: Event) => {
  // 폼 필드들 초기화
  Object.keys(fields.value).forEach(field => {
    fields.value[field] = props.initialValues[field] || ''
  })

  // 유효성 검사 초기화
  clearAllErrors()

  // 이벤트 발생
  emit('reset', event)
  emit('update:modelValue', { ...fields.value })
}

const handleCancel = () => {
  emit('cancel')
}

// Public methods
const submit = () => {
  formRef.value?.requestSubmit()
}

const reset = () => {
  formRef.value?.reset()
  handleReset(new Event('reset'))
}

const clear = () => {
  Object.keys(fields.value).forEach(field => {
    fields.value[field] = ''
  })
  clearAllErrors()
  emit('update:modelValue', { ...fields.value })
}

const focus = () => {
  // 첫 번째 입력 필드에 포커스
  const firstInput = formRef.value?.querySelector('input, textarea, select')
  if (firstInput instanceof HTMLElement) {
    firstInput.focus()
  }
}

// Watch for modelValue changes
const updateFieldsFromModelValue = () => {
  if (props.modelValue) {
    Object.keys(props.modelValue).forEach(field => {
      fields.value[field] = props.modelValue[field]
    })
  }
}

// Lifecycle
onMounted(() => {
  updateFieldsFromModelValue()
})

// Expose methods and properties
defineExpose({
  submit,
  reset,
  clear,
  focus,
  validateForm,
  clearAllErrors,
  fields,
  errors,
  isValid,
  formRef
})
</script>

<style scoped>
.v-form {
  @apply w-full;
}

/* Layout variants */
.v-form--vertical {
  @apply space-y-4;
}

.v-form--horizontal {
  @apply space-y-4;
}

.v-form--horizontal .v-form__fields {
  @apply grid gap-4;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.v-form--inline {
  @apply flex flex-wrap items-end gap-4;
}

.v-form--inline .v-form__fields {
  @apply flex flex-wrap items-end gap-4;
}

/* Actions */
.v-form__actions {
  @apply flex items-center gap-3 mt-6;
}

.v-form__actions--horizontal {
  @apply justify-start;
}

.v-form__actions--inline {
  @apply mt-0;
}

/* Error message */
.v-form__error {
  @apply flex items-center gap-2 mt-4 p-3 bg-red-50 border border-red-200 rounded-md;
}

.v-form__error-icon {
  @apply text-red-500 flex-shrink-0;
}

.v-form__error-message {
  @apply text-sm text-red-700;
}

/* Success message */
.v-form__success {
  @apply flex items-center gap-2 mt-4 p-3 bg-green-50 border border-green-200 rounded-md;
}

.v-form__success-icon {
  @apply text-green-500 flex-shrink-0;
}

.v-form__success-message {
  @apply text-sm text-green-700;
}

/* Loading state */
.v-form--loading {
  @apply opacity-75 pointer-events-none;
}

.v-form--loading .v-form__fields {
  @apply animate-pulse;
}

/* Disabled state */
.v-form--disabled {
  @apply opacity-50 pointer-events-none;
}

/* Readonly state */
.v-form--readonly .v-form__actions {
  @apply hidden;
}

/* Responsive */
@media (max-width: 640px) {
  .v-form--horizontal .v-form__fields {
    grid-template-columns: 1fr;
  }

  .v-form--inline {
    @apply flex-col items-stretch;
  }

  .v-form--inline .v-form__fields {
    @apply flex-col items-stretch;
  }

  .v-form__actions {
    @apply flex-col items-stretch;
  }
}

/* Dark mode */
.dark .v-form__error {
  @apply bg-red-900/20 border-red-800;
}

.dark .v-form__error-message {
  @apply text-red-300;
}

.dark .v-form__success {
  @apply bg-green-900/20 border-green-800;
}

.dark .v-form__success-message {
  @apply text-green-300;
}
</style>
