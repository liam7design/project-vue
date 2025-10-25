<template>
  <GuideSection
    title="Checkbox 컴포넌트"
    :is-active="isActive"
    :props="checkboxProps"
    :code-example="codeExample"
  >
    <!-- Variants -->
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">Variants</h3>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div class="text-center">
          <VCheckbox variant="default" :model-value="true" class="mb-2" />
          <p class="text-sm text-gray-600">default</p>
        </div>
        <div class="text-center">
          <VCheckbox variant="minimal" :model-value="true" class="mb-2" />
          <p class="text-sm text-gray-600">minimal</p>
        </div>
      </div>
    </div>

    <!-- Colors -->
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">Colors</h3>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div class="text-center">
          <VCheckbox color="primary" :model-value="true" class="mb-2" />
          <p class="text-sm text-gray-600">primary</p>
        </div>
        <div class="text-center">
          <VCheckbox color="secondary" :model-value="true" class="mb-2" />
          <p class="text-sm text-gray-600">secondary</p>
        </div>
        <div class="text-center">
          <VCheckbox color="success" :model-value="true" class="mb-2" />
          <p class="text-sm text-gray-600">success</p>
        </div>
        <div class="text-center">
          <VCheckbox color="warning" :model-value="true" class="mb-2" />
          <p class="text-sm text-gray-600">warning</p>
        </div>
        <div class="text-center">
          <VCheckbox color="error" :model-value="true" class="mb-2" />
          <p class="text-sm text-gray-600">error</p>
        </div>
        <div class="text-center">
          <VCheckbox color="info" :model-value="true" class="mb-2" />
          <p class="text-sm text-gray-600">info</p>
        </div>
      </div>
    </div>

    <!-- Sizes -->
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">Sizes</h3>
      <div class="flex items-center gap-4">
        <VCheckbox size="small" :model-value="true" />
        <VCheckbox size="default" :model-value="true" />
        <VCheckbox size="large" :model-value="true" />
      </div>
    </div>

    <!-- States -->
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">States</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <VCheckbox label="정상 상태" :model-value="true" />
        <VCheckbox label="비활성화" disabled />
        <VCheckbox label="로딩 상태" loading />
        <VCheckbox label="에러 상태" :error="true" />
      </div>
    </div>

    <!-- Checkbox Group -->
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">Checkbox Group</h3>
      <div class="space-y-2">
        <VCheckbox label="옵션 1" :model-value="true" />
        <VCheckbox label="옵션 2" />
        <VCheckbox label="옵션 3" :model-value="true" />
        <VCheckbox label="옵션 4" />
      </div>
    </div>

    <!-- 인터랙티브 데모 -->
    <template #interactive>
      <InteractiveDemo :props="demoProps" component-name="VCheckbox">
        <template #controls>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-2">Label</label>
              <input v-model="demoProps.label" type="text" placeholder="라벨" class="w-full px-3 py-2 border border-gray-300 rounded-md">
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Color</label>
              <select v-model="demoProps.color" class="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
                <option value="info">Info</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Size</label>
              <select v-model="demoProps.size" class="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option value="small">Small</option>
                <option value="default">Default</option>
                <option value="large">Large</option>
              </select>
            </div>
            <div class="flex items-center gap-4">
              <label class="flex items-center">
                <input v-model="demoProps.modelValue" type="checkbox" class="mr-2">
                <span class="text-sm">Checked</span>
              </label>
              <label class="flex items-center">
                <input v-model="demoProps.disabled" type="checkbox" class="mr-2">
                <span class="text-sm">Disabled</span>
              </label>
              <label class="flex items-center">
                <input v-model="demoProps.loading" type="checkbox" class="mr-2">
                <span class="text-sm">Loading</span>
              </label>
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Error Message</label>
              <input v-model="demoProps.error" type="text" placeholder="에러 메시지" class="w-full px-3 py-2 border border-gray-300 rounded-md">
            </div>
          </div>
        </template>
        <template #preview>
          <VCheckbox v-bind="demoProps" />
        </template>
      </InteractiveDemo>
    </template>
  </GuideSection>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VCheckbox } from '@/components/ui'
import GuideSection from '../components/GuideSection.vue'
import InteractiveDemo from '../components/InteractiveDemo.vue'

interface Props {
  isActive: boolean
}

defineProps<Props>()

const demoProps = ref({
  label: '인터랙티브 체크박스',
  color: 'primary' as const,
  size: 'default' as const,
  modelValue: true,
  disabled: false,
  loading: false,
  error: false
})

const checkboxProps = [
  { name: 'label', type: 'string', default: '', description: '체크박스의 라벨' },
  { name: 'color', type: 'string', default: 'primary', description: '체크박스의 색상' },
  { name: 'size', type: 'string', default: 'default', description: '체크박스의 크기' },
  { name: 'modelValue', type: 'boolean', default: 'false', description: '체크박스의 상태' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '비활성화 상태' },
  { name: 'loading', type: 'boolean', default: 'false', description: '로딩 상태' },
  { name: 'error', type: 'string | boolean', default: 'false', description: '에러 상태 또는 메시지' }
]

const codeExample = 'VCheckbox 컴포넌트 사용 예시'
</script>
