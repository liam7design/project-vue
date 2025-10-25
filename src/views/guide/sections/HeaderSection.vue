<template>
  <GuideSection
    title="Header 컴포넌트"
    :is-active="isActive"
    :props="HeaderProps"
    :code-example="codeExample"
  >
    <!-- Variants -->
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">Variants</h3>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div class="text-center">
          <VHeader variant="default" class="mb-2" />
          <p class="text-sm text-gray-600">default</p>
        </div>
        <div class="text-center">
          <VHeader variant="elevated" class="mb-2" />
          <p class="text-sm text-gray-600">elevated</p>
        </div>
        <div class="text-center">
          <VHeader variant="transparent" class="mb-2" />
          <p class="text-sm text-gray-600">transparent</p>
        </div>
      </div>
    </div>

    <!-- Colors -->
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">Colors</h3>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div class="text-center">
          <VHeader color="primary" class="mb-2" />
          <p class="text-sm text-gray-600">primary</p>
        </div>
        <div class="text-center">
          <VHeader color="secondary" class="mb-2" />
          <p class="text-sm text-gray-600">secondary</p>
        </div>
        <div class="text-center">
          <VHeader color="success" class="mb-2" />
          <p class="text-sm text-gray-600">success</p>
        </div>
        <div class="text-center">
          <VHeader color="warning" class="mb-2" />
          <p class="text-sm text-gray-600">warning</p>
        </div>
        <div class="text-center">
          <VHeader color="error" class="mb-2" />
          <p class="text-sm text-gray-600">error</p>
        </div>
        <div class="text-center">
          <VHeader color="info" class="mb-2" />
          <p class="text-sm text-gray-600">info</p>
        </div>
      </div>
    </div>

    <!-- Sizes -->
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">Sizes</h3>
      <div class="flex items-center gap-4">
        <VHeader size="small" />
        <VHeader size="default" />
        <VHeader size="large" />
      </div>
    </div>

    <!-- States -->
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">States</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <VHeader label="정상 상태" />
        <VHeader label="비활성화" disabled />
        <VHeader label="로딩 상태" loading />
        <VHeader label="에러 상태" :error="true" />
      </div>
    </div>

    <!-- 인터랙티브 데모 -->
    <template #interactive>
      <InteractiveDemo :props="demoProps" component-name="VHeader">
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
          <VHeader v-bind="demoProps" />
        </template>
      </InteractiveDemo>
    </template>
  </GuideSection>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VHeader } from '@/components/ui'
import GuideSection from '../components/GuideSection.vue'
import InteractiveDemo from '../components/InteractiveDemo.vue'

interface Props {
  isActive: boolean
}

defineProps<Props>()

const demoProps = ref({
  label: '인터랙티브 Header',
  color: 'primary' as const,
  size: 'default' as const,
  disabled: false,
  loading: false,
  error: false
})

const HeaderProps = [
  { name: 'label', type: 'string', default: '', description: 'Header의 라벨' },
  { name: 'color', type: 'string', default: 'primary', description: 'Header의 색상' },
  { name: 'size', type: 'string', default: 'default', description: 'Header의 크기' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '비활성화 상태' },
  { name: 'loading', type: 'boolean', default: 'false', description: '로딩 상태' },
  { name: 'error', type: 'string | boolean', default: 'false', description: '에러 상태 또는 메시지' }
]

const codeExample = 'VHeader 컴포넌트 사용 예시'
</script>
