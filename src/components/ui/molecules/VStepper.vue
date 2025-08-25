<template>
  <div
    ref="stepperRef"
    class="v-stepper"
    :class="stepperClasses"
  >
    <!-- 스텝 헤더 -->
    <div
      v-if="showHeader"
      class="v-stepper__header"
      :class="headerClasses"
    >
      <div
        class="v-stepper__steps"
        :class="stepsClasses"
      >
        <div
          v-for="(step, index) in steps"
          :key="step.value"
          class="v-stepper__step"
          :class="getStepClasses(step, index)"
          @click="goToStep(step.value)"
        >
          <!-- 스텝 커넥터 -->
          <div
            v-if="index > 0"
            class="v-stepper__connector"
            :class="getConnectorClasses(index)"
          />

          <!-- 스텝 아이콘 -->
          <div class="v-stepper__step-icon" :class="getStepIconClasses(step, index)">
            <VIcon
              v-if="step.icon"
              :name="step.icon"
              class="v-stepper__step-icon-svg"
            />
            <span v-else class="v-stepper__step-number">{{ index + 1 }}</span>
          </div>

          <!-- 스텝 라벨 -->
          <div class="v-stepper__step-label">
            <span class="v-stepper__step-title">{{ step.title }}</span>
            <span
              v-if="step.subtitle"
              class="v-stepper__step-subtitle"
            >
              {{ step.subtitle }}
            </span>
          </div>

          <!-- 스텝 상태 아이콘 -->
          <div
            v-if="getStepStatus(step, index) === 'completed'"
            class="v-stepper__step-status"
          >
            <VIcon
              name="mdi:check"
              class="v-stepper__step-status-icon"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 스텝 콘텐츠 -->
    <div
      class="v-stepper__content"
      :class="contentClasses"
    >
      <Transition
        :name="transitionName"
        :mode="transitionMode"
        @enter="onStepEnter"
        @leave="onStepLeave"
      >
        <div
          v-if="activeStep"
          :key="activeStep.value"
          class="v-stepper__step-content"
          :class="stepContentClasses"
        >
          <slot
            :name="activeStep.value"
            :step="activeStep"
            :index="activeStepIndex"
            :is-first="isFirstStep"
            :is-last="isLastStep"
          >
            {{ activeStep.content }}
          </slot>
        </div>
      </Transition>
    </div>

    <!-- 스텝 액션 -->
    <div
      v-if="showActions"
      class="v-stepper__actions"
      :class="actionsClasses"
    >
      <slot name="actions">
        <!-- 기본 액션 버튼들 -->
        <VButton
          v-if="!isFirstStep"
          variant="outlined"
          :disabled="disabled"
          @click="previousStep"
        >
          {{ previousButtonText }}
        </VButton>

        <VButton
          v-if="!isLastStep"
          :loading="loading"
          :disabled="disabled || !canProceed"
          @click="nextStep"
        >
          {{ nextButtonText }}
        </VButton>

        <VButton
          v-if="isLastStep"
          :loading="loading"
          :disabled="disabled || !canProceed"
          @click="complete"
        >
          {{ completeButtonText }}
        </VButton>
      </slot>
    </div>

    <!-- 푸터 -->
    <div
      v-if="$slots.footer"
      class="v-stepper__footer"
      :class="footerClasses"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { VButton, VIcon } from '@/components/ui'

// Step interface
export interface Step {
  value: string
  title: string
  subtitle?: string
  content?: string
  icon?: string
  disabled?: boolean
  completed?: boolean
  error?: boolean
  required?: boolean
}

// Props 정의
interface Props {
  // 기본 속성
  modelValue?: string
  steps?: Step[]
  canProceed?: boolean

  // 스타일
  variant?: 'default' | 'vertical' | 'horizontal'
  size?: 'small' | 'default' | 'large'
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'

  // 기능
  showHeader?: boolean
  showActions?: boolean
  linear?: boolean
  editable?: boolean
  nonLinear?: boolean

  // 애니메이션
  animated?: boolean
  transitionName?: string
  transitionMode?: 'in-out' | 'out-in'

  // 버튼 텍스트
  previousButtonText?: string
  nextButtonText?: string
  completeButtonText?: string

  // 상태
  disabled?: boolean
  loading?: boolean

  // 기타
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  steps: () => [],
  canProceed: true,
  variant: 'default',
  size: 'default',
  color: 'primary',
  showHeader: true,
  showActions: true,
  linear: true,
  editable: false,
  nonLinear: false,
  animated: true,
  transitionName: 'v-stepper',
  transitionMode: 'out-in',
  previousButtonText: '이전',
  nextButtonText: '다음',
  completeButtonText: '완료',
  disabled: false,
  loading: false
})

// Emits 정의
const emit = defineEmits<{
  'update:modelValue': [value: string]
  'change': [value: string, step: Step, index: number]
  'next': [value: string, step: Step, index: number]
  'previous': [value: string, step: Step, index: number]
  'complete': [value: string, step: Step, index: number]
}>()

// Refs
const stepperRef = ref<HTMLElement>()

// Computed 속성들
const stepperClasses = computed(() => {
  return [
    'v-stepper',
    `v-stepper--${props.variant}`,
    `v-stepper--${props.size}`,
    `v-stepper--${props.color}`,
    {
      'v-stepper--disabled': props.disabled,
      'v-stepper--loading': props.loading,
      'v-stepper--linear': props.linear,
      'v-stepper--editable': props.editable,
      'v-stepper--non-linear': props.nonLinear,
      'v-stepper--animated': props.animated
    }
  ]
})

const headerClasses = computed(() => {
  return [
    'v-stepper__header',
    {
      'v-stepper__header--hidden': !props.showHeader
    }
  ]
})

const stepsClasses = computed(() => {
  return [
    'v-stepper__steps',
    `v-stepper__steps--${props.variant}`
  ]
})

const contentClasses = computed(() => {
  return [
    'v-stepper__content',
    {
      'v-stepper__content--animated': props.animated
    }
  ]
})

const stepContentClasses = computed(() => {
  return [
    'v-stepper__step-content'
  ]
})

const actionsClasses = computed(() => {
  return [
    'v-stepper__actions',
    {
      'v-stepper__actions--hidden': !props.showActions
    }
  ]
})

const footerClasses = computed(() => {
  return [
    'v-stepper__footer'
  ]
})

const activeStep = computed(() => {
  return props.steps.find(step => step.value === props.modelValue) || props.steps[0]
})

const activeStepIndex = computed(() => {
  return props.steps.findIndex(step => step.value === props.modelValue)
})

const isFirstStep = computed(() => {
  return activeStepIndex.value === 0
})

const isLastStep = computed(() => {
  return activeStepIndex.value === props.steps.length - 1
})

// Methods
const getStepClasses = (step: Step, index: number) => {
  const status = getStepStatus(step, index)

  return [
    'v-stepper__step',
    {
      'v-stepper__step--active': props.modelValue === step.value,
      'v-stepper__step--completed': status === 'completed',
      'v-stepper__step--error': step.error,
      'v-stepper__step--disabled': step.disabled || props.disabled,
      'v-stepper__step--clickable': props.editable && !step.disabled && !props.disabled
    }
  ]
}

const getStepIconClasses = (step: Step, index: number) => {
  const status = getStepStatus(step, index)

  return [
    'v-stepper__step-icon',
    {
      'v-stepper__step-icon--active': props.modelValue === step.value,
      'v-stepper__step-icon--completed': status === 'completed',
      'v-stepper__step-icon--error': step.error
    }
  ]
}

const getConnectorClasses = (index: number) => {
  const previousStep = props.steps[index - 1]

  return [
    'v-stepper__connector',
    {
      'v-stepper__connector--completed': previousStep?.completed || getStepStatus(previousStep, index - 1) === 'completed'
    }
  ]
}

const getStepStatus = (step: Step | undefined, index: number) => {
  if (!step) return 'pending'
  if (step.completed) return 'completed'
  if (step.error) return 'error'
  if (props.modelValue === step.value) return 'active'
  if (index < activeStepIndex.value) return 'completed'
  return 'pending'
}

const goToStep = (value: string) => {
  if (props.disabled || props.loading) return

  const step = props.steps.find(s => s.value === value)
  if (!step || step.disabled) return

  // Linear 모드에서는 이전 단계로만 이동 가능
  if (props.linear && !props.editable) {
    const targetIndex = props.steps.findIndex(s => s.value === value)
    if (targetIndex > activeStepIndex.value) return
  }

  emit('update:modelValue', value)
  emit('change', value, step, props.steps.findIndex(s => s.value === value))
}

const nextStep = () => {
  if (props.disabled || props.loading || isLastStep.value || !props.canProceed) return

  const nextIndex = activeStepIndex.value + 1
  const nextStep = props.steps[nextIndex]

  if (nextStep) {
    emit('update:modelValue', nextStep.value)
    emit('next', nextStep.value, nextStep, nextIndex)
  }
}

const previousStep = () => {
  if (props.disabled || props.loading || isFirstStep.value) return

  const prevIndex = activeStepIndex.value - 1
  const prevStep = props.steps[prevIndex]

  if (prevStep) {
    emit('update:modelValue', prevStep.value)
    emit('previous', prevStep.value, prevStep, prevIndex)
  }
}

const complete = () => {
  if (props.disabled || props.loading || !isLastStep.value || !props.canProceed || !activeStep.value) return

  emit('complete', activeStep.value.value, activeStep.value, activeStepIndex.value)
}

const onStepEnter = (el: Element) => {
  const element = el as HTMLElement
  element.style.opacity = '0'
  element.style.transform = 'translateX(20px)'

  requestAnimationFrame(() => {
    element.style.transition = 'opacity 200ms ease, transform 200ms ease'
    element.style.opacity = '1'
    element.style.transform = 'translateX(0)'
  })
}

const onStepLeave = (el: Element) => {
  const element = el as HTMLElement
  element.style.opacity = '0'
  element.style.transform = 'translateX(-20px)'
}

// Public methods
const goToStepByIndex = (index: number) => {
  if (index >= 0 && index < props.steps.length) {
    goToStep(props.steps[index]?.value || '')
  }
}

const reset = () => {
  if (props.steps.length > 0) {
    goToStep(props.steps[0]?.value || '')
  }
}

// Expose methods
defineExpose({
  goToStep,
  goToStepByIndex,
  nextStep,
  previousStep,
  complete,
  reset,
  activeStep: computed(() => activeStep.value || null),
  activeStepIndex: computed(() => activeStepIndex.value)
})
</script>

<style scoped>
.v-stepper {
  @apply w-full;
}

/* Variants */
.v-stepper--default {
  @apply space-y-6;
}

.v-stepper--vertical {
  @apply flex gap-6;
}

.v-stepper--horizontal {
  @apply space-y-6;
}

/* Sizes */
.v-stepper--small .v-stepper__step-icon {
  @apply w-8 h-8;
}

.v-stepper--small .v-stepper__step-title {
  @apply text-sm;
}

.v-stepper--small .v-stepper__step-subtitle {
  @apply text-xs;
}

.v-stepper--default .v-stepper__step-icon {
  @apply w-10 h-10;
}

.v-stepper--default .v-stepper__step-title {
  @apply text-base;
}

.v-stepper--default .v-stepper__step-subtitle {
  @apply text-sm;
}

.v-stepper--large .v-stepper__step-icon {
  @apply w-12 h-12;
}

.v-stepper--large .v-stepper__step-title {
  @apply text-lg;
}

.v-stepper--large .v-stepper__step-subtitle {
  @apply text-base;
}

/* Header */
.v-stepper__header {
  @apply mb-6;
}

.v-stepper__header--hidden {
  @apply hidden;
}

/* Steps */
.v-stepper__steps {
  @apply flex items-center;
}

.v-stepper__steps--vertical {
  @apply flex-col items-start;
}

.v-stepper__steps--horizontal {
  @apply flex-row items-center;
}

/* Step */
.v-stepper__step {
  @apply relative flex items-center;
}

.v-stepper__steps--vertical .v-stepper__step {
  @apply w-full mb-4;
}

.v-stepper__steps--horizontal .v-stepper__step {
  @apply flex-1;
}

.v-stepper__step--clickable {
  @apply cursor-pointer;
}

.v-stepper__step--clickable:hover .v-stepper__step-icon {
  @apply ring-2 ring-offset-2 ring-primary-500;
}

/* Step icon */
.v-stepper__step-icon {
  @apply flex items-center justify-center;
  @apply rounded-full border-2;
  @apply bg-white text-gray-400;
  @apply border-gray-300;
  @apply transition-all duration-200;
  @apply flex-shrink-0;
}

.v-stepper__step-icon--active {
  @apply bg-primary-500 text-white border-primary-500;
}

.v-stepper__step-icon--completed {
  @apply bg-green-500 text-white border-green-500;
}

.v-stepper__step-icon--error {
  @apply bg-red-500 text-white border-red-500;
}

.v-stepper__step-icon-svg {
  @apply w-5 h-5;
}

.v-stepper__step-number {
  @apply text-sm font-medium;
}

/* Step label */
.v-stepper__step-label {
  @apply ml-3 flex flex-col;
}

.v-stepper__steps--vertical .v-stepper__step-label {
  @apply ml-4;
}

.v-stepper__step-title {
  @apply font-medium text-gray-900;
}

.v-stepper__step-subtitle {
  @apply text-gray-500;
}

.v-stepper__step--active .v-stepper__step-title {
  @apply text-primary-600;
}

.v-stepper__step--completed .v-stepper__step-title {
  @apply text-green-600;
}

.v-stepper__step--error .v-stepper__step-title {
  @apply text-red-600;
}

/* Step status */
.v-stepper__step-status {
  @apply absolute -top-1 -right-1;
  @apply w-5 h-5 bg-green-500 text-white;
  @apply rounded-full flex items-center justify-center;
}

.v-stepper__step-status-icon {
  @apply w-3 h-3;
}

/* Connector */
.v-stepper__connector {
  @apply absolute top-5 w-full h-0.5;
  @apply bg-gray-300;
  @apply transition-colors duration-200;
}

.v-stepper__steps--vertical .v-stepper__connector {
  @apply top-10 left-5 w-0.5 h-full;
}

.v-stepper__connector--completed {
  @apply bg-green-500;
}

/* Content */
.v-stepper__content {
  @apply relative;
}

.v-stepper__content--animated {
  @apply overflow-hidden;
}

.v-stepper__step-content {
  @apply w-full;
}

/* Actions */
.v-stepper__actions {
  @apply flex items-center justify-between mt-6;
}

.v-stepper__actions--hidden {
  @apply hidden;
}

/* Footer */
.v-stepper__footer {
  @apply mt-6 pt-4 border-t border-gray-200;
}

/* Transitions */
.v-stepper-enter-active,
.v-stepper-leave-active {
  @apply transition-all duration-200 ease-out;
}

.v-stepper-enter-from {
  @apply opacity-0 transform translate-x-4;
}

.v-stepper-leave-to {
  @apply opacity-0 transform -translate-x-4;
}

/* Loading state */
.v-stepper--loading .v-stepper__content {
  @apply animate-pulse;
}

/* Disabled state */
.v-stepper--disabled .v-stepper__step {
  @apply opacity-50 pointer-events-none;
}

/* Dark mode */
.dark .v-stepper__step-icon {
  @apply bg-gray-800 text-gray-400 border-gray-600;
}

.dark .v-stepper__step-title {
  @apply text-gray-100;
}

.dark .v-stepper__step-subtitle {
  @apply text-gray-400;
}

.dark .v-stepper__step--active .v-stepper__step-title {
  @apply text-primary-400;
}

.dark .v-stepper__step--completed .v-stepper__step-title {
  @apply text-green-400;
}

.dark .v-stepper__step--error .v-stepper__step-title {
  @apply text-red-400;
}

.dark .v-stepper__connector {
  @apply bg-gray-600;
}

.dark .v-stepper__footer {
  @apply border-gray-700;
}

/* Responsive */
@media (max-width: 640px) {
  .v-stepper__steps--horizontal {
    @apply flex-col items-start;
  }

  .v-stepper__steps--horizontal .v-stepper__step {
    @apply w-full mb-4;
  }

  .v-stepper__steps--horizontal .v-stepper__connector {
    @apply top-10 left-5 w-0.5 h-full;
  }

  .v-stepper__actions {
    @apply flex-col gap-3;
  }
}
</style>
