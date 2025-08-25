<template>
  <div class="v-select" :class="selectWrapperClasses">
    <!-- 라벨 -->
    <label
      v-if="label"
      :for="selectId"
      class="v-select__label"
      :class="labelClasses"
    >
      {{ label }}
      <span v-if="required" class="v-select__required">*</span>
    </label>

    <!-- 셀렉트 컨테이너 -->
    <div class="v-select__container" :class="containerClasses">
      <!-- 선택된 값 표시 -->
      <div
        class="v-select__trigger"
        :class="triggerClasses"
        @click="toggleDropdown"
        @keydown="handleKeydown"
        tabindex="0"
        role="combobox"
        :aria-expanded="isOpen"
        :aria-haspopup="true"
      >
        <div class="v-select__value">
          <slot name="value" :value="selectedOption">
            <span v-if="selectedOption" class="v-select__selected-text">
              {{ getOptionLabel(selectedOption) }}
            </span>
            <span v-else class="v-select__placeholder">
              {{ placeholder || '선택해주세요' }}
            </span>
          </slot>
        </div>

        <!-- 화살표 아이콘 -->
        <Icon
          name="mdi:chevron-down"
          class="v-select__arrow"
          :class="{ 'v-select__arrow--open': isOpen }"
        />
      </div>

      <!-- 드롭다운 메뉴 -->
      <Transition name="v-select-dropdown">
        <div
          v-if="isOpen"
          class="v-select__dropdown"
          :class="dropdownClasses"
        >
          <!-- 검색 입력 -->
          <div
            v-if="searchable"
            class="v-select__search"
          >
            <input
              ref="searchInput"
              v-model="searchQuery"
              type="text"
              class="v-select__search-input"
              :placeholder="searchPlaceholder || '검색...'"
              @input="handleSearch"
              @keydown="handleSearchKeydown"
            />
          </div>

          <!-- 옵션 목록 -->
          <div class="v-select__options">
            <div
              v-for="option in filteredOptions"
              :key="getOptionValue(option)"
              class="v-select__option"
              :class="getOptionClasses(option)"
              @click="selectOption(option)"
              @mouseenter="hoveredOption = option"
            >
              <slot name="option" :option="option">
                <span class="v-select__option-label">
                  {{ getOptionLabel(option) }}
                </span>
              </slot>
            </div>

            <!-- 빈 상태 -->
            <div
              v-if="filteredOptions.length === 0"
              class="v-select__empty"
            >
              <slot name="empty">
                <span class="v-select__empty-text">옵션이 없습니다.</span>
              </slot>
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <!-- 힌트 텍스트 -->
    <div
      v-if="hint || errorMessage || $slots.hint"
      class="v-select__hint"
      :class="hintClasses"
    >
      <slot name="hint">
        {{ errorMessage || hint }}
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick, onMounted, onUnmounted } from 'vue'

// 타입 정의
export interface SelectOption {
  value: string | number
  label: string
  disabled?: boolean
  [key: string]: string | number | boolean | undefined
}

// Props 정의
interface Props {
  // 기본 속성
  modelValue?: string | number | null
  options: SelectOption[]
  label?: string
  placeholder?: string
  required?: boolean

  // 상태
  disabled?: boolean
  readonly?: boolean
  loading?: boolean

  // 유효성 검사
  error?: boolean
  errorMessage?: string
  hint?: string

  // 기능
  searchable?: boolean
  searchPlaceholder?: string

  // 스타일
  size?: 'small' | 'default' | 'large'
  variant?: 'outlined' | 'filled' | 'solo'
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'

  // 기타
  id?: string
  valueKey?: string
  labelKey?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  options: () => [],
  label: '',
  placeholder: '',
  required: false,
  disabled: false,
  readonly: false,
  loading: false,
  error: false,
  errorMessage: '',
  hint: '',
  searchable: false,
  searchPlaceholder: '',
  size: 'default',
  variant: 'outlined',
  color: 'primary',
  id: '',
  valueKey: 'value',
  labelKey: 'label'
})

// Emits 정의
const emit = defineEmits<{
  'update:modelValue': [value: string | number | null]
  'change': [value: string | number | null, option: SelectOption | null]
  'focus': [event: FocusEvent]
  'blur': [event: FocusEvent]
  'search': [query: string]
}>()

// Refs
const selectId = computed(() => {
  return props.id || `v-select-${Math.random().toString(36).substr(2, 9)}`
})

const isOpen = ref(false)
const searchQuery = ref('')
const hoveredOption = ref<SelectOption | null>(null)
const searchInput = ref<HTMLInputElement>()

// Slots
// const slots = useSlots()

// Computed 속성들
const selectWrapperClasses = computed(() => {
  return [
    'v-select',
    `v-select--${props.size}`,
    `v-select--${props.variant}`,
    {
      'v-select--disabled': props.disabled,
      'v-select--readonly': props.readonly,
      'v-select--error': props.error || !!props.errorMessage,
      'v-select--open': isOpen.value,
      'v-select--loading': props.loading
    }
  ]
})

const labelClasses = computed(() => {
  return [
    'v-select__label',
    {
      'v-select__label--active': selectedOption.value || isOpen.value
    }
  ]
})

const containerClasses = computed(() => {
  return [
    'v-select__container',
    `v-select__container--${props.color}`,
    {
      'v-select__container--error': props.error || !!props.errorMessage,
      'v-select__container--open': isOpen.value,
      'v-select__container--disabled': props.disabled
    }
  ]
})

const triggerClasses = computed(() => {
  return [
    'v-select__trigger',
    {
      'v-select__trigger--disabled': props.disabled,
      'v-select__trigger--focused': isOpen.value
    }
  ]
})

const dropdownClasses = computed(() => {
  return [
    'v-select__dropdown',
    {
      'v-select__dropdown--searchable': props.searchable
    }
  ]
})

const hintClasses = computed(() => {
  return [
    'v-select__hint',
    {
      'v-select__hint--error': props.error || !!props.errorMessage
    }
  ]
})

const selectedOption = computed(() => {
  if (!props.modelValue) return null
  return props.options.find(option =>
    getOptionValue(option) === props.modelValue
  ) || null
})

const filteredOptions = computed(() => {
  if (!props.searchable || !searchQuery.value) {
    return props.options
  }

  return props.options.filter(option => {
    const label = getOptionLabel(option).toLowerCase()
    const query = searchQuery.value.toLowerCase()
    return label.includes(query)
  })
})

// Methods
const getOptionValue = (option: SelectOption): string | number => {
  return option[props.valueKey] as string | number
}

const getOptionLabel = (option: SelectOption): string => {
  return option[props.labelKey] as string
}

const getOptionClasses = (option: SelectOption) => {
  return [
    'v-select__option',
    {
      'v-select__option--selected': getOptionValue(option) === props.modelValue,
      'v-select__option--disabled': option.disabled,
      'v-select__option--hovered': hoveredOption.value === option
    }
  ]
}

const toggleDropdown = () => {
  if (props.disabled || props.readonly) return

  isOpen.value = !isOpen.value

  if (isOpen.value && props.searchable) {
    nextTick(() => {
      searchInput.value?.focus()
    })
  }
}

const selectOption = (option: SelectOption) => {
  if (option.disabled) return

  const value = getOptionValue(option)
  emit('update:modelValue', value)
  emit('change', value, option)

  isOpen.value = false
  searchQuery.value = ''
}

const handleKeydown = (event: KeyboardEvent) => {
  if (props.disabled || props.readonly) return

  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault()
      toggleDropdown()
      break
    case 'Escape':
      isOpen.value = false
      break
    case 'ArrowDown':
      event.preventDefault()
      if (!isOpen.value) {
        isOpen.value = true
      } else {
        navigateOptions(1)
      }
      break
    case 'ArrowUp':
      event.preventDefault()
      if (!isOpen.value) {
        isOpen.value = true
      } else {
        navigateOptions(-1)
      }
      break
  }
}

const handleSearch = () => {
  emit('search', searchQuery.value)
}

const handleSearchKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    event.preventDefault()
    if (hoveredOption.value) {
      selectOption(hoveredOption.value)
    }
  }
}

const navigateOptions = (direction: number) => {
  const enabledOptions = filteredOptions.value.filter(option => !option.disabled)
  if (enabledOptions.length === 0) return

  const currentIndex = hoveredOption.value
    ? enabledOptions.findIndex(option => option === hoveredOption.value)
    : -1

  let newIndex = currentIndex + direction

  if (newIndex < 0) {
    newIndex = enabledOptions.length - 1
  } else if (newIndex >= enabledOptions.length) {
    newIndex = 0
  }

  hoveredOption.value = enabledOptions[newIndex] || null
}

const handleClickOutside = (event: Event) => {
  const target = event.target as Element
  if (!target.closest('.v-select')) {
    isOpen.value = false
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.v-select {
  @apply relative w-full;
}

/* Label */
.v-select__label {
  @apply block text-sm font-medium text-gray-700 mb-1 transition-all duration-200;
}

.v-select__label--active {
  @apply text-primary-600;
}

.v-select__required {
  @apply text-red-500 ml-1;
}

/* Container */
.v-select__container {
  @apply relative;
}

.v-select__container--outlined {
  @apply border border-gray-300 bg-white rounded-md;
}

.v-select__container--filled {
  @apply border-transparent bg-gray-50 rounded-md;
}

.v-select__container--solo {
  @apply border-transparent bg-white shadow-sm rounded-md;
}

.v-select__container--primary {
  @apply focus-within:ring-2 focus-within:ring-primary-500;
}

.v-select__container--primary.v-select__container--open {
  @apply border-primary-500;
}

.v-select__container--secondary {
  @apply focus-within:ring-2 focus-within:ring-gray-500;
}

.v-select__container--secondary.v-select__container--open {
  @apply border-gray-500;
}

.v-select__container--success {
  @apply focus-within:ring-2 focus-within:ring-green-500;
}

.v-select__container--success.v-select__container--open {
  @apply border-green-500;
}

.v-select__container--warning {
  @apply focus-within:ring-2 focus-within:ring-yellow-500;
}

.v-select__container--warning.v-select__container--open {
  @apply border-yellow-500;
}

.v-select__container--error {
  @apply border-red-500 focus-within:ring-red-500;
}

.v-select__container--info {
  @apply focus-within:ring-2 focus-within:ring-blue-500;
}

.v-select__container--info.v-select__container--open {
  @apply border-blue-500;
}

.v-select__container--disabled {
  @apply bg-gray-100 cursor-not-allowed opacity-50;
}

/* Trigger */
.v-select__trigger {
  @apply flex items-center justify-between w-full px-3 py-2 text-sm bg-transparent border-none outline-none cursor-pointer;
  @apply hover:bg-gray-50 transition-colors;
}

.v-select__trigger--disabled {
  @apply cursor-not-allowed;
}

.v-select__trigger--focused {
  @apply bg-gray-50;
}

.v-select__value {
  @apply flex-1 text-left;
}

.v-select__selected-text {
  @apply text-gray-900;
}

.v-select__placeholder {
  @apply text-gray-400;
}

.v-select__arrow {
  @apply w-4 h-4 text-gray-400 transition-transform duration-200;
}

.v-select__arrow--open {
  @apply transform rotate-180;
}

/* Dropdown */
.v-select__dropdown {
  @apply absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-md shadow-lg;
  @apply max-h-60 overflow-hidden;
}

.v-select__dropdown--searchable {
  @apply max-h-80;
}

/* Search */
.v-select__search {
  @apply p-2 border-b border-gray-200;
}

.v-select__search-input {
  @apply w-full px-2 py-1 text-sm border border-gray-300 rounded-md outline-none;
  @apply focus:ring-2 focus:ring-primary-500 focus:border-primary-500;
}

/* Options */
.v-select__options {
  @apply max-h-48 overflow-y-auto;
}

.v-select__option {
  @apply flex items-center px-3 py-2 text-sm cursor-pointer transition-colors;
  @apply hover:bg-gray-100;
}

.v-select__option--selected {
  @apply bg-primary-50 text-primary-700;
}

.v-select__option--disabled {
  @apply text-gray-400 cursor-not-allowed hover:bg-transparent;
}

.v-select__option--hovered {
  @apply bg-gray-100;
}

.v-select__option-label {
  @apply flex-1;
}

/* Empty */
.v-select__empty {
  @apply px-3 py-2 text-sm text-gray-500 text-center;
}

.v-select__empty-text {
  @apply italic;
}

/* Hint */
.v-select__hint {
  @apply mt-1 text-xs text-gray-500;
}

.v-select__hint--error {
  @apply text-red-500;
}

/* Sizes */
.v-select--small .v-select__trigger {
  @apply px-2 py-1 text-xs;
}

.v-select--large .v-select__trigger {
  @apply px-4 py-3 text-base;
}

/* Transitions */
.v-select-dropdown-enter-active,
.v-select-dropdown-leave-active {
  @apply transition-all duration-200;
}

.v-select-dropdown-enter-from,
.v-select-dropdown-leave-to {
  @apply opacity-0 transform scale-95 -translate-y-2;
}

.v-select-dropdown-enter-to,
.v-select-dropdown-leave-from {
  @apply opacity-100 transform scale-100 translate-y-0;
}
</style>
