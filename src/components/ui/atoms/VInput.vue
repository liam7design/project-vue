<template>
  <div class="v-input" :class="inputWrapperClasses">
    <!-- 라벨 -->
    <label
      v-if="label"
      :for="inputId"
      class="v-input__label"
      :class="labelClasses"
    >
      {{ label }}
      <span v-if="required" class="v-input__required">*</span>
    </label>

    <!-- 입력 컨테이너 -->
    <div class="v-input__container" :class="containerClasses">
      <!-- 접두사 아이콘 -->
      <div
        v-if="prependIcon || $slots.prepend"
        class="v-input__prepend"
        :class="prependClasses"
      >
        <Icon
          v-if="prependIcon"
          :name="prependIcon"
          class="v-input__prepend-icon"
        />
        <slot name="prepend" />
      </div>

      <!-- 입력 필드 -->
      <div class="v-input__field-wrapper">
        <input
          :id="inputId"
          ref="inputRef"
          v-model="inputValue"
          :type="inputType"
          :placeholder="placeholder || ''"
          :disabled="disabled || false"
          :readonly="readonly || false"
          :required="required || false"
          :pattern="pattern || ''"
          :autocomplete="autocomplete || ''"
          :autofocus="autofocus || false"
          :name="name || ''"
          :class="inputClasses"
          @input="handleInput"
          @change="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
          @keydown="handleKeydown"
          v-bind="{
            ...(maxlength && { maxlength }),
            ...(minlength && { minlength })
          }"
        />

        <!-- 접미사 아이콘 -->
        <div
          v-if="appendIcon || $slots.append || clearable"
          class="v-input__append"
          :class="appendClasses"
        >
          <Icon
            v-if="clearable && inputValue"
            name="mdi:close"
            class="v-input__clear-icon"
            @click="clearInput"
          />
          <Icon
            v-else-if="appendIcon"
            :name="appendIcon"
            class="v-input__append-icon"
          />
          <slot name="append" />
        </div>
      </div>
    </div>

    <!-- 힌트 텍스트 -->
    <div
      v-if="hint || errorMessage || $slots.hint"
      class="v-input__hint"
      :class="hintClasses"
    >
      <slot name="hint">
        {{ errorMessage || hint }}
      </slot>
    </div>

    <!-- 문자 수 카운터 -->
    <div
      v-if="counter"
      class="v-input__counter"
      :class="counterClasses"
    >
      {{ inputValue?.length || 0 }}{{ maxlength ? ` / ${maxlength}` : '' }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick, useSlots } from 'vue'

// Props 정의
interface Props {
  // 기본 속성
  modelValue?: string | number
  label?: string
  placeholder?: string
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'

  // 상태
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  clearable?: boolean

  // 유효성 검사
  error?: boolean
  errorMessage?: string
  hint?: string

  // 제한
  maxlength?: number
  minlength?: number
  pattern?: string

  // 아이콘
  prependIcon?: string
  appendIcon?: string

  // 스타일
  size?: 'small' | 'default' | 'large'
  variant?: 'outlined' | 'filled' | 'solo'
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'

  // 기타
  name?: string
  autocomplete?: string
  autofocus?: boolean
  counter?: boolean
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  variant: 'outlined',
  color: 'primary',
  size: 'default',
  disabled: false,
  readonly: false,
  required: false,
  clearable: false,
  label: '',
  placeholder: '',
  errorMessage: '',
  hint: '',
  maxlength: 0,
  minlength: 0,
  pattern: '',
  prependIcon: '',
  appendIcon: '',
  name: '',
  autocomplete: '',
  autofocus: false,
  counter: false,
  id: ''
})

// Emits 정의
const emit = defineEmits<{
  'update:modelValue': [value: string]
  input: [value: string, event: Event]
  change: [value: string, event: Event]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  clear: []
}>()

// Refs
const inputRef = ref<HTMLInputElement>()

// Slots
const slots = useSlots()

// Computed 속성들
const inputId = computed(() => {
  return props.id || `v-input-${Math.random().toString(36).substr(2, 9)}`
})

const inputValue = computed({
  get: () => String(props.modelValue || ''),
  set: (value: string) => emit('update:modelValue', value)
})

const inputType = computed(() => {
  if (props.type === 'password') {
    return 'password'
  }
  return props.type
})

const inputWrapperClasses = computed(() => {
  return [
    'v-input',
    `v-input--${props.size}`,
    `v-input--${props.variant}`,
    {
      'v-input--disabled': props.disabled,
      'v-input--readonly': props.readonly,
      'v-input--error': props.error || !!props.errorMessage,
      'v-input--focused': isFocused.value
    }
  ]
})

const labelClasses = computed(() => {
  return [
    'v-input__label',
    {
      'v-input__label--active': inputValue.value || isFocused.value
    }
  ]
})

const containerClasses = computed(() => {
  return [
    'v-input__container',
    `v-input__container--${props.color}`,
    {
      'v-input__container--error': props.error || !!props.errorMessage,
      'v-input__container--focused': isFocused.value,
      'v-input__container--disabled': props.disabled
    }
  ]
})

const inputClasses = computed(() => {
  return [
    'v-input__field',
    {
      'v-input__field--with-prepend': props.prependIcon || !!slots.prepend,
      'v-input__field--with-append': props.appendIcon || !!slots.append || props.clearable
    }
  ]
})

const prependClasses = computed(() => {
  return [
    'v-input__prepend',
    {
      'v-input__prepend--disabled': props.disabled
    }
  ]
})

const appendClasses = computed(() => {
  return [
    'v-input__append',
    {
      'v-input__append--disabled': props.disabled
    }
  ]
})

const hintClasses = computed(() => {
  return [
    'v-input__hint',
    {
      'v-input__hint--error': props.error || !!props.errorMessage
    }
  ]
})

const counterClasses = computed(() => {
  return [
    'v-input__counter',
    {
      'v-input__counter--error': (inputValue.value?.length || 0) > (props.maxlength || 0)
    }
  ]
})

// 상태 관리
const isFocused = ref(false)

// 이벤트 핸들러들
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('input', target.value, event)
}

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
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
  if (event.key === 'Escape' && props.clearable) {
    clearInput()
  }
}

const clearInput = () => {
  inputValue.value = ''
  emit('clear')
  nextTick(() => {
    inputRef.value?.focus()
  })
}

// Public methods
const focus = () => {
  inputRef.value?.focus()
}

const blur = () => {
  inputRef.value?.blur()
}

const select = () => {
  inputRef.value?.select()
}

// Expose methods
defineExpose({
  focus,
  blur,
  select,
  inputRef
})
</script>

<style scoped>
.v-input {
  @apply relative w-full;
}

/* Label */
.v-input__label {
  @apply block text-sm font-medium text-gray-700 mb-1 transition-all duration-200;
}

.v-input__label--active {
  @apply text-primary-600;
}

.v-input__required {
  @apply text-red-500 ml-1;
}

/* Container */
.v-input__container {
  @apply relative flex items-center border rounded-md transition-all duration-200;
  @apply focus-within:ring-2 focus-within:ring-offset-2;
}

.v-input__container--outlined {
  @apply border-gray-300 bg-white;
}

.v-input__container--filled {
  @apply border-transparent bg-gray-50;
}

.v-input__container--solo {
  @apply border-transparent bg-white shadow-sm;
}

.v-input__container--primary {
  @apply focus-within:ring-primary-500;
}

.v-input__container--primary.v-input__container--focused {
  @apply border-primary-500;
}

.v-input__container--secondary {
  @apply focus-within:ring-gray-500;
}

.v-input__container--secondary.v-input__container--focused {
  @apply border-gray-500;
}

.v-input__container--success {
  @apply focus-within:ring-green-500;
}

.v-input__container--success.v-input__container--focused {
  @apply border-green-500;
}

.v-input__container--warning {
  @apply focus-within:ring-yellow-500;
}

.v-input__container--warning.v-input__container--focused {
  @apply border-yellow-500;
}

.v-input__container--error {
  @apply border-red-500 focus-within:ring-red-500;
}

.v-input__container--info {
  @apply focus-within:ring-blue-500;
}

.v-input__container--info.v-input__container--focused {
  @apply border-blue-500;
}

.v-input__container--disabled {
  @apply bg-gray-100 cursor-not-allowed opacity-50;
}

/* Field wrapper */
.v-input__field-wrapper {
  @apply relative flex-1 flex items-center;
}

/* Input field */
.v-input__field {
  @apply w-full px-3 py-2 text-sm bg-transparent border-none outline-none;
  @apply placeholder-gray-400;
  @apply disabled:cursor-not-allowed;
}

.v-input__field--with-prepend {
  @apply pl-0;
}

.v-input__field--with-append {
  @apply pr-0;
}

/* Prepend */
.v-input__prepend {
  @apply flex items-center justify-center px-3 text-gray-400;
}

.v-input__prepend--disabled {
  @apply opacity-50;
}

.v-input__prepend-icon {
  @apply w-4 h-4;
}

/* Append */
.v-input__append {
  @apply flex items-center justify-center px-3 text-gray-400;
}

.v-input__append--disabled {
  @apply opacity-50;
}

.v-input__append-icon {
  @apply w-4 h-4;
}

.v-input__clear-icon {
  @apply w-4 h-4 cursor-pointer hover:text-gray-600 transition-colors;
}

/* Sizes */
.v-input--small .v-input__field {
  @apply px-2 py-1 text-xs;
}

.v-input--small .v-input__prepend,
.v-input--small .v-input__append {
  @apply px-2;
}

.v-input--large .v-input__field {
  @apply px-4 py-3 text-base;
}

.v-input--large .v-input__prepend,
.v-input--large .v-input__append {
  @apply px-4;
}

/* Hint */
.v-input__hint {
  @apply mt-1 text-xs text-gray-500;
}

.v-input__hint--error {
  @apply text-red-500;
}

/* Counter */
.v-input__counter {
  @apply mt-1 text-xs text-gray-400 text-right;
}

.v-input__counter--error {
  @apply text-red-500;
}
</style>
