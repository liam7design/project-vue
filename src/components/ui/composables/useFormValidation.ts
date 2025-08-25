import { ref, computed, type Ref } from 'vue'

// 폼 필드 값의 타입 정의
export type FormFieldValue = string | number | boolean | null | undefined

export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: FormFieldValue) => boolean | string
  message?: string
}

export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

export interface FormField {
  value: FormFieldValue
  rules: ValidationRule[]
}

export function useFormValidation() {
  const errors = ref<Record<string, string[]>>({})
  const touched = ref<Record<string, boolean>>({})
  const dirty = ref<Record<string, boolean>>({})

  const hasErrors = computed(() => Object.keys(errors.value).length > 0)
  const isValid = computed(() => !hasErrors.value)

  const validateField = (
    fieldName: string,
    value: FormFieldValue,
    rules: ValidationRule[]
  ): ValidationResult => {
    const fieldErrors: string[] = []

    for (const rule of rules) {
      // Required validation
      if (rule.required && (!value || value.toString().trim() === '')) {
        fieldErrors.push(rule.message || `${fieldName}은(는) 필수입니다.`)
        continue
      }

      // Skip other validations if value is empty and not required
      if (!value || value.toString().trim() === '') {
        continue
      }

      const stringValue = value.toString()

      // Min length validation
      if (rule.minLength && stringValue.length < rule.minLength) {
        fieldErrors.push(
          rule.message || `${fieldName}은(는) 최소 ${rule.minLength}자 이상이어야 합니다.`
        )
      }

      // Max length validation
      if (rule.maxLength && stringValue.length > rule.maxLength) {
        fieldErrors.push(
          rule.message || `${fieldName}은(는) 최대 ${rule.maxLength}자까지 입력 가능합니다.`
        )
      }

      // Pattern validation
      if (rule.pattern && !rule.pattern.test(stringValue)) {
        fieldErrors.push(
          rule.message || `${fieldName}의 형식이 올바르지 않습니다.`
        )
      }

      // Custom validation
      if (rule.custom) {
        const result = rule.custom(value)
        if (result === false) {
          fieldErrors.push(
            rule.message || `${fieldName}의 값이 유효하지 않습니다.`
          )
        } else if (typeof result === 'string') {
          fieldErrors.push(result)
        }
      }
    }

    return {
      isValid: fieldErrors.length === 0,
      errors: fieldErrors
    }
  }

  const setFieldError = (fieldName: string, fieldErrors: string[]) => {
    if (fieldErrors.length > 0) {
      errors.value[fieldName] = fieldErrors
    } else {
      delete errors.value[fieldName]
    }
  }

  const clearFieldError = (fieldName: string) => {
    delete errors.value[fieldName]
  }

  const clearAllErrors = () => {
    errors.value = {}
  }

  const markFieldAsTouched = (fieldName: string) => {
    touched.value[fieldName] = true
  }

  const markFieldAsDirty = (fieldName: string) => {
    dirty.value[fieldName] = true
  }

  const getFieldError = (fieldName: string): string[] => {
    return errors.value[fieldName] || []
  }

  const getFieldErrorMessage = (fieldName: string): string => {
    const fieldErrors = getFieldError(fieldName)
    return fieldErrors.length > 0 ? fieldErrors[0] || '' : ''
  }

  const isFieldTouched = (fieldName: string): boolean => {
    return touched.value[fieldName] || false
  }

  const isFieldDirty = (fieldName: string): boolean => {
    return dirty.value[fieldName] || false
  }

  const validateForm = (fields: Record<string, FormField>) => {
    clearAllErrors()

    for (const [fieldName, field] of Object.entries(fields)) {
      const result = validateField(fieldName, field.value, field.rules)
      setFieldError(fieldName, result.errors)
    }

    return isValid.value
  }

  return {
    // State
    errors: errors as Ref<Record<string, string[]>>,
    touched: touched as Ref<Record<string, boolean>>,
    dirty: dirty as Ref<Record<string, boolean>>,

    // Computed
    hasErrors,
    isValid,

    // Methods
    validateField,
    setFieldError,
    clearFieldError,
    clearAllErrors,
    markFieldAsTouched,
    markFieldAsDirty,
    getFieldError,
    getFieldErrorMessage,
    isFieldTouched,
    isFieldDirty,
    validateForm
  }
}
