<template>
  <GuideSection
    title="Progress 컴포넌트"
    :is-active="isActive"
    :props="ProgressProps"
    :code-example="codeExample"
  >
    <!-- Variants -->
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">Variants</h3>
      <div class="grid grid-cols-2 md:grid-cols-2 gap-4">
        <div class="text-center">
          <VProgress variant="linear" class="mb-2" />
          <p class="text-sm text-gray-600">linear</p>
        </div>
        <div class="text-center">
          <VProgress variant="circular" class="mb-2" />
          <p class="text-sm text-gray-600">circular</p>
        </div>
      </div>
    </div>

    <!-- Colors -->
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">Colors</h3>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div class="text-center">
          <VProgress color="primary" class="mb-2" />
          <p class="text-sm text-gray-600">primary</p>
        </div>
        <div class="text-center">
          <VProgress color="secondary" class="mb-2" />
          <p class="text-sm text-gray-600">secondary</p>
        </div>
        <div class="text-center">
          <VProgress color="success" class="mb-2" />
          <p class="text-sm text-gray-600">success</p>
        </div>
        <div class="text-center">
          <VProgress color="warning" class="mb-2" />
          <p class="text-sm text-gray-600">warning</p>
        </div>
        <div class="text-center">
          <VProgress color="error" class="mb-2" />
          <p class="text-sm text-gray-600">error</p>
        </div>
        <div class="text-center">
          <VProgress color="info" class="mb-2" />
          <p class="text-sm text-gray-600">info</p>
        </div>
      </div>
    </div>

    <!-- Sizes -->
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">Sizes</h3>
      <div class="flex items-center gap-4">
        <VProgress size="small" />
        <VProgress size="default" />
        <VProgress size="large" />
      </div>
    </div>

    <!-- States -->
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">States</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <VProgress label="정상 상태" />
        <VProgress label="비활성화" disabled />
        <VProgress label="로딩 상태" loading />
        <VProgress label="에러 상태" :error="true" />
      </div>
    </div>

    <!-- 인터랙티브 데모 -->
    <template #interactive>
      <InteractiveDemo :props="demoProps" component-name="VProgress">
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
          <VProgress v-bind="demoProps" />
        </template>
      </InteractiveDemo>
    </template>
  </GuideSection>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VProgress } from '@/components/ui'
import GuideSection from '../components/GuideSection.vue'
import InteractiveDemo from '../components/InteractiveDemo.vue'

interface Props {
  isActive: boolean
}

defineProps<Props>()

const demoProps = ref({
  label: '인터랙티브 Progress',
  color: 'primary' as const,
  size: 'default' as const,
  disabled: false,
  loading: false,
  error: false
})

const ProgressProps = [
  { name: 'label', type: 'string', default: '', description: 'Progress의 라벨' },
  { name: 'color', type: 'string', default: 'primary', description: 'Progress의 색상' },
  { name: 'size', type: 'string', default: 'default', description: 'Progress의 크기' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '비활성화 상태' },
  { name: 'loading', type: 'boolean', default: 'false', description: '로딩 상태' },
  { name: 'error', type: 'string | boolean', default: 'false', description: '에러 상태 또는 메시지' }
]

const codeExample = 'VProgress 컴포넌트 사용 예시'
</script>
