<template>
  <GuideSection
    title="Button 컴포넌트"
    :is-active="isActive"
    :props="buttonProps"
    :code-example="codeExample"
  >
    <!-- Variants -->
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">Variants</h3>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div class="text-center">
          <VButton variant="filled" class="mb-2">Filled</VButton>
          <p class="text-sm text-gray-600">filled</p>
        </div>
        <div class="text-center">
          <VButton variant="outlined" class="mb-2">Outlined</VButton>
          <p class="text-sm text-gray-600">outlined</p>
        </div>
        <div class="text-center">
          <VButton variant="text" class="mb-2">Text</VButton>
          <p class="text-sm text-gray-600">text</p>
        </div>
        <div class="text-center">
          <VButton variant="tonal" class="mb-2">Tonal</VButton>
          <p class="text-sm text-gray-600">tonal</p>
        </div>
        <div class="text-center">
          <VButton variant="elevated" class="mb-2">Elevated</VButton>
          <p class="text-sm text-gray-600">elevated</p>
        </div>
        <div class="text-center">
          <VButton variant="flat" class="mb-2">Flat</VButton>
          <p class="text-sm text-gray-600">flat</p>
        </div>
      </div>
    </div>

    <!-- Colors -->
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">Colors</h3>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div class="text-center">
          <VButton color="primary" class="mb-2">Primary</VButton>
          <p class="text-sm text-gray-600">primary</p>
        </div>
        <div class="text-center">
          <VButton color="secondary" class="mb-2">Secondary</VButton>
          <p class="text-sm text-gray-600">secondary</p>
        </div>
        <div class="text-center">
          <VButton color="success" class="mb-2">Success</VButton>
          <p class="text-sm text-gray-600">success</p>
        </div>
        <div class="text-center">
          <VButton color="warning" class="mb-2">Warning</VButton>
          <p class="text-sm text-gray-600">warning</p>
        </div>
        <div class="text-center">
          <VButton color="error" class="mb-2">Error</VButton>
          <p class="text-sm text-gray-600">error</p>
        </div>
        <div class="text-center">
          <VButton color="info" class="mb-2">Info</VButton>
          <p class="text-sm text-gray-600">info</p>
        </div>
      </div>
    </div>

    <!-- Sizes -->
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">Sizes</h3>
      <div class="flex items-center gap-4">
        <VButton size="x-small">X-Small</VButton>
        <VButton size="small">Small</VButton>
        <VButton size="default">Default</VButton>
        <VButton size="large">Large</VButton>
        <VButton size="x-large">X-Large</VButton>
      </div>
    </div>

    <!-- States -->
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">States</h3>
      <div class="flex items-center gap-4">
        <VButton>Normal</VButton>
        <VButton disabled>Disabled</VButton>
        <VButton loading>Loading</VButton>
      </div>
    </div>

    <!-- Icons -->
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">Icons</h3>
      <div class="flex items-center gap-4">
        <VButton icon="mdi:plus">Add Item</VButton>
        <VButton icon="mdi:delete" icon-position="right">Delete</VButton>
        <VButton icon="mdi:heart" />
      </div>
    </div>

    <!-- Block -->
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">Block Button</h3>
      <VButton block>Full Width Button</VButton>
    </div>

    <!-- 인터랙티브 데모 -->
    <template #interactive>
      <InteractiveDemo :props="demoProps" component-name="VButton">
        <template #controls>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-2">Variant</label>
              <select v-model="demoProps.variant" class="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option value="filled">Filled</option>
                <option value="outlined">Outlined</option>
                <option value="text">Text</option>
                <option value="tonal">Tonal</option>
                <option value="elevated">Elevated</option>
                <option value="flat">Flat</option>
              </select>
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
                <option value="x-small">X-Small</option>
                <option value="small">Small</option>
                <option value="default">Default</option>
                <option value="large">Large</option>
                <option value="x-large">X-Large</option>
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
              <label class="flex items-center">
                <input v-model="demoProps.block" type="checkbox" class="mr-2">
                <span class="text-sm">Block</span>
              </label>
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Text</label>
              <input v-model="demoProps.text" type="text" placeholder="Button text" class="w-full px-3 py-2 border border-gray-300 rounded-md">
            </div>
          </div>
        </template>
        <template #preview>
          <VButton v-bind="demoProps">
            {{ demoProps.text || 'Button' }}
          </VButton>
        </template>
      </InteractiveDemo>
    </template>
  </GuideSection>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VButton } from '@/components/ui'
import GuideSection from '../components/GuideSection.vue'
import InteractiveDemo from '../components/InteractiveDemo.vue'

interface Props {
  isActive: boolean
}

defineProps<Props>()

const demoProps = ref({
  variant: 'filled' as const,
  color: 'primary' as const,
  size: 'default' as const,
  disabled: false,
  loading: false,
  block: false,
  text: 'Interactive Button'
})

const buttonProps = [
  { name: 'variant', type: 'string', default: 'filled', description: '버튼의 스타일 변형' },
  { name: 'color', type: 'string', default: 'primary', description: '버튼의 색상' },
  { name: 'size', type: 'string', default: 'default', description: '버튼의 크기' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '비활성화 상태' },
  { name: 'loading', type: 'boolean', default: 'false', description: '로딩 상태' },
  { name: 'block', type: 'boolean', default: 'false', description: '전체 너비 사용' },
  { name: 'icon', type: 'string', default: '', description: '아이콘 이름' },
  { name: 'iconPosition', type: 'string', default: 'left', description: '아이콘 위치' }
]

const codeExample = 'VButton 컴포넌트 사용 예시'
</script>
