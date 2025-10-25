<template>
  <GuideSection
    title="Icon 컴포넌트"
    :is-active="isActive"
    :props="IconProps"
    :code-example="codeExample"
  >
    <!-- Variants -->
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">Variants</h3>
      <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div class="text-center">
          <VIcon name="mdi:heart" variant="filled" class="mb-2" />
          <p class="text-sm text-gray-600">filled</p>
        </div>
        <div class="text-center">
          <VIcon name="mdi:heart" variant="outlined" class="mb-2" />
          <p class="text-sm text-gray-600">outlined</p>
        </div>
        <div class="text-center">
          <VIcon name="mdi:heart" variant="round" class="mb-2" />
          <p class="text-sm text-gray-600">round</p>
        </div>
        <div class="text-center">
          <VIcon name="mdi:heart" variant="sharp" class="mb-2" />
          <p class="text-sm text-gray-600">sharp</p>
        </div>
        <div class="text-center">
          <VIcon name="mdi:heart" variant="two-tone" class="mb-2" />
          <p class="text-sm text-gray-600">two-tone</p>
        </div>
      </div>
    </div>

    <!-- Colors -->
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">Colors</h3>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div class="text-center">
          <VIcon name="mdi:heart" color="primary" class="mb-2" />
          <p class="text-sm text-gray-600">primary</p>
        </div>
        <div class="text-center">
          <VIcon name="mdi:heart" color="secondary" class="mb-2" />
          <p class="text-sm text-gray-600">secondary</p>
        </div>
        <div class="text-center">
          <VIcon name="mdi:heart" color="success" class="mb-2" />
          <p class="text-sm text-gray-600">success</p>
        </div>
        <div class="text-center">
          <VIcon name="mdi:heart" color="warning" class="mb-2" />
          <p class="text-sm text-gray-600">warning</p>
        </div>
        <div class="text-center">
          <VIcon name="mdi:heart" color="error" class="mb-2" />
          <p class="text-sm text-gray-600">error</p>
        </div>
        <div class="text-center">
          <VIcon name="mdi:heart" color="info" class="mb-2" />
          <p class="text-sm text-gray-600">info</p>
        </div>
      </div>
    </div>

    <!-- Sizes -->
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">Sizes</h3>
      <div class="flex items-center gap-4">
        <VIcon name="mdi:heart" size="small" />
        <VIcon name="mdi:heart" size="default" />
        <VIcon name="mdi:heart" size="large" />
      </div>
    </div>

    <!-- States -->
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">States</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <VIcon name="mdi:heart" label="정상 상태" />
        <VIcon name="mdi:heart" label="비활성화" disabled />
        <VIcon name="mdi:heart" label="로딩 상태" loading />
        <VIcon name="mdi:heart" label="에러 상태" :error="true" />
      </div>
    </div>

    <!-- 인터랙티브 데모 -->
    <template #interactive>
      <InteractiveDemo :props="demoProps" component-name="VIcon">
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
          <VIcon v-bind="demoProps" />
        </template>
      </InteractiveDemo>
    </template>
  </GuideSection>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VIcon } from '@/components/ui'
import GuideSection from '../components/GuideSection.vue'
import InteractiveDemo from '../components/InteractiveDemo.vue'

interface Props {
  isActive: boolean
}

defineProps<Props>()

const demoProps = ref({
  name: 'mdi:heart',
  label: '인터랙티브 icon',
  color: 'primary' as const,
  size: 'default' as const,
  disabled: false,
  loading: false,
  error: false
})

const IconProps = [
  { name: 'label', type: 'string', default: '', description: 'Icon의 라벨' },
  { name: 'color', type: 'string', default: 'primary', description: 'Icon의 색상' },
  { name: 'size', type: 'string', default: 'default', description: 'Icon의 크기' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '비활성화 상태' },
  { name: 'loading', type: 'boolean', default: 'false', description: '로딩 상태' },
  { name: 'error', type: 'string | boolean', default: 'false', description: '에러 상태 또는 메시지' }
]

const codeExample = 'VIcon 컴포넌트 사용 예시'
</script>
