<template>
  <div class="v-textarea" :class="textareaWrapperClasses">
    <!-- 라벨 -->
    <label
      v-if="label"
      :for="textareaId"
      class="v-textarea__label"
      :class="labelClasses"
    >
      {{ label }}
      <span v-if="required" class="v-textarea__required">*</span>
    </label>

    <!-- 텍스트 영역 컨테이너 -->
    <div class="v-textarea__container" :class="containerClasses">
      <!-- 접두사 아이콘 -->
      <div
        v-if="prependIcon || $slots.prepend"
        class="v-textarea__prepend"
      >
        <slot name="prepend">
          <Icon
            :name="prependIcon"
            class="v-textarea__prepend-icon"
          />
        </slot>
      </div>

      <!-- 텍스트 영역 -->
      <textarea
        :id="textareaId"
        ref="textareaRef"
        v-model="textareaValue"
        :name="name"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :rows="rows"
        :cols="cols"
        :maxlength="maxlength"
        :minlength="minlength"
        :autocomplete="autocomplete"
        :autofocus="autofocus"
        :spellcheck="spellcheck"
        :wrap="wrap"
        class="v-textarea__input"
        :class="inputClasses"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
        @paste="handlePaste"
        @drop="handleDrop"
      />

      <!-- 접미사 아이콘 -->
      <div
        v-if="appendIcon || $slots.append"
        class="v-textarea__append"
      >
        <slot name="append">
          <Icon
            :name="appendIcon"
            class="v-textarea__append-icon"
          />
        </slot>
      </div>

      <!-- 지우기 버튼 -->
      <button
        v-if="clearable && textareaValue"
        class="v-textarea__clear"
        @click="clearTextarea"
        :aria-label="clearButtonLabel"
      >
        <Icon name="mdi:close" class="v-textarea__clear-icon" />
      </button>
    </div>

    <!-- 하단 정보 -->
    <div
      v-if="hint || errorMessage || maxlength || $slots.hint"
      class="v-textarea__info"
      :class="infoClasses"
    >
      <slot name="hint">
        <span v-if="errorMessage" class="v-textarea__error-message">
          {{ errorMessage }}
        </span>
        <span v-else-if="hint" class="v-textarea__hint">
          {{ hint }}
        </span>
      </slot>

      <!-- 글자 수 카운터 -->
      <span
        v-if="maxlength"
        class="v-textarea__counter"
        :class="counterClasses"
      >
        {{ textareaValue?.length || 0 }} / {{ maxlength }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick, useSlots } from 'vue'

// Props 정의
interface Props {
  // 기본 속성
  modelValue?: string | null
  label?: string
  placeholder?: string
  name?: string
  required?: boolean

  // 상태
  disabled?: boolean
  readonly?: boolean
  loading?: boolean

  // 유효성 검사
  error?: boolean
  errorMessage?: string
  hint?: string

  // 스타일
  size?: 'small' | 'default' | 'large'
  variant?: 'outlined' | 'filled' | 'solo'
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'

  // 기능
  prependIcon?: string
  appendIcon?: string
  clearable?: boolean
  clearButtonLabel?: string

  // 텍스트 영역 속성
  rows?: number
  cols?: number
  maxlength?: number
  minlength?: number
  autocomplete?: string
  autofocus?: boolean
  spellcheck?: boolean
  wrap?: 'soft' | 'hard' | 'off'

  // 기타
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  label: '',
  placeholder: '',
  name: '',
  required: false,
  disabled: false,
  readonly: false,
  loading: false,
  error: false,
  errorMessage: '',
  hint: '',
  size: 'default',
  variant: 'outlined',
  color: 'primary',
  prependIcon: '',
  appendIcon: '',
  clearable: false,
  clearButtonLabel: '지우기',
  rows: 3,
  cols: 0,
  maxlength: 0,
  minlength: 0,
  autocomplete: '',
  autofocus: false,
  spellcheck: false,
  wrap: 'soft',
  id: ''
})

// Emits 정의
const emit = defineEmits<{
  'update:modelValue': [value: string]
  'input': [value: string, event: Event]
  'change': [value: string, event: Event]
  'focus': [event: FocusEvent]
  'blur': [event: FocusEvent]
  'keydown': [event: KeyboardEvent]
  'paste': [event: ClipboardEvent]
  'drop': [event: DragEvent]
  'clear': []
}>()

// Refs
const textareaRef = ref<HTMLTextAreaElement>()
const slots = useSlots()

// Computed 속성들
const textareaId = computed(() => {
  return props.id || `v-textarea-${Math.random().toString(36).substr(2, 9)}`
})

const textareaWrapperClasses = computed(() => {
  return [
    'v-textarea',
    `v-textarea--${props.size}`,
    {
      'v-textarea--disabled': props.disabled,
      'v-textarea--readonly': props.readonly,
      'v-textarea--error': props.error || !!props.errorMessage,
      'v-textarea--loading': props.loading
    }
  ]
})

const labelClasses = computed(() => {
  return [
    'v-textarea__label',
    {
      'v-textarea__label--active': textareaValue.value || props.autofocus,
      'v-textarea__label--error': props.error || !!props.errorMessage
    }
  ]
})

const containerClasses = computed(() => {
  return [
    'v-textarea__container',
    `v-textarea__container--${props.variant}`,
    `v-textarea__container--${props.color}`,
    {
      'v-textarea__container--error': props.error || !!props.errorMessage,
      'v-textarea__container--disabled': props.disabled,
      'v-textarea__container--focused': isFocused.value,
      'v-textarea__container--with-prepend': props.prependIcon || !!slots.prepend,
      'v-textarea__container--with-append': props.appendIcon || !!slots.append
    }
  ]
})

const inputClasses = computed(() => {
  return [
    'v-textarea__input',
    {
      'v-textarea__input--error': props.error || !!props.errorMessage
    }
  ]
})

const infoClasses = computed(() => {
  return [
    'v-textarea__info',
    {
      'v-textarea__info--error': props.error || !!props.errorMessage
    }
  ]
})

const counterClasses = computed(() => {
  const length = textareaValue.value?.length || 0
  const maxLength = props.maxlength || 0

  return [
    'v-textarea__counter',
    {
      'v-textarea__counter--warning': maxLength > 0 && length > maxLength * 0.8,
      'v-textarea__counter--error': maxLength > 0 && length > maxLength
    }
  ]
})

const textareaValue = computed({
  get: () => props.modelValue || '',
  set: (value: string) => {
    emit('update:modelValue', value)
  }
})

const isFocused = ref(false)

// Methods
const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('input', target.value, event)
}

const handleChange = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('change', target.value, event)
}

const handleFocus = (event: FocusEvent) => {
  isFocused.value = true
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false
  emit('blur', event)
}

const handleKeydown = (event: KeyboardEvent) => {
  emit('keydown', event)
}

const handlePaste = (event: ClipboardEvent) => {
  emit('paste', event)
}

const handleDrop = (event: DragEvent) => {
  emit('drop', event)
}

const clearTextarea = () => {
  textareaValue.value = ''
  emit('clear')
  nextTick(() => {
    textareaRef.value?.focus()
  })
}

// Public methods
const focus = () => {
  textareaRef.value?.focus()
}

const blur = () => {
  textareaRef.value?.blur()
}

const select = () => {
  textareaRef.value?.select()
}

const setSelectionRange = (start: number, end: number) => {
  textareaRef.value?.setSelectionRange(start, end)
}

// Expose methods
defineExpose({
  focus,
  blur,
  select,
  setSelectionRange,
  textareaRef
})
</script>

<style scoped>
.v-textarea {
  @apply relative w-full;
}

/* Label */
.v-textarea__label {
  @apply block text-sm font-medium text-gray-700 mb-1 transition-all duration-200;
}

.v-textarea__label--active {
  @apply text-primary-600;
}

.v-textarea__label--error {
  @apply text-red-600;
}

.v-textarea__required {
  @apply text-red-500 ml-1;
}

/* Container */
.v-textarea__container {
  @apply relative flex items-start;
}

.v-textarea__container--outlined {
  @apply border border-gray-300 bg-white rounded-md;
}

.v-textarea__container--filled {
  @apply border-transparent bg-gray-50 rounded-md;
}

.v-textarea__container--solo {
  @apply border-transparent bg-white shadow-sm rounded-md;
}

.v-textarea__container--primary {
  @apply focus-within:ring-2 focus-within:ring-primary-500;
}

.v-textarea__container--primary.v-textarea__container--focused {
  @apply border-primary-500;
}

.v-textarea__container--secondary {
  @apply focus-within:ring-2 focus-within:ring-gray-500;
}

.v-textarea__container--secondary.v-textarea__container--focused {
  @apply border-gray-500;
}

.v-textarea__container--success {
  @apply focus-within:ring-2 focus-within:ring-green-500;
}

.v-textarea__container--success.v-textarea__container--focused {
  @apply border-green-500;
}

.v-textarea__container--warning {
  @apply focus-within:ring-2 focus-within:ring-yellow-500;
}

.v-textarea__container--warning.v-textarea__container--focused {
  @apply border-yellow-500;
}

.v-textarea__container--error {
  @apply border-red-500 focus-within:ring-red-500;
}

.v-textarea__container--info {
  @apply focus-within:ring-2 focus-within:ring-blue-500;
}

.v-textarea__container--info.v-textarea__container--focused {
  @apply border-blue-500;
}

.v-textarea__container--disabled {
  @apply bg-gray-100 cursor-not-allowed opacity-50;
}

/* Prepend */
.v-textarea__prepend {
  @apply flex items-center justify-center w-10 h-full text-gray-400;
}

.v-textarea__prepend-icon {
  @apply w-5 h-5;
}

/* Input */
.v-textarea__input {
  @apply flex-1 w-full px-3 py-2 text-sm bg-transparent border-none outline-none resize-none;
  @apply placeholder-gray-400;
}

.v-textarea__input--error {
  @apply text-red-600;
}

/* Append */
.v-textarea__append {
  @apply flex items-center justify-center w-10 h-full text-gray-400;
}

.v-textarea__append-icon {
  @apply w-5 h-5;
}

/* Clear button */
.v-textarea__clear {
  @apply flex items-center justify-center w-8 h-8 text-gray-400 hover:text-gray-600;
  @apply rounded-full hover:bg-gray-100 transition-colors;
}

.v-textarea__clear-icon {
  @apply w-4 h-4;
}

/* Info */
.v-textarea__info {
  @apply flex items-center justify-between mt-1 text-xs;
}

.v-textarea__info--error {
  @apply text-red-500;
}

.v-textarea__hint {
  @apply text-gray-500;
}

.v-textarea__error-message {
  @apply text-red-500;
}

.v-textarea__counter {
  @apply text-gray-400;
}

.v-textarea__counter--warning {
  @apply text-yellow-500;
}

.v-textarea__counter--error {
  @apply text-red-500;
}

/* Sizes */
.v-textarea--small .v-textarea__input {
  @apply px-2 py-1 text-xs;
}

.v-textarea--small .v-textarea__prepend,
.v-textarea--small .v-textarea__append {
  @apply w-8;
}

.v-textarea--small .v-textarea__prepend-icon,
.v-textarea--small .v-textarea__append-icon {
  @apply w-4 h-4;
}

.v-textarea--large .v-textarea__input {
  @apply px-4 py-3 text-base;
}

.v-textarea--large .v-textarea__prepend,
.v-textarea--large .v-textarea__append {
  @apply w-12;
}

.v-textarea--large .v-textarea__prepend-icon,
.v-textarea--large .v-textarea__append-icon {
  @apply w-6 h-6;
}

/* Focus styles */
.v-textarea__input:focus {
  @apply outline-none;
}

/* Disabled styles */
.v-textarea__input:disabled {
  @apply cursor-not-allowed;
}

/* Loading state */
.v-textarea--loading .v-textarea__input {
  @apply animate-pulse;
}
</style>
