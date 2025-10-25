<template>
  <GuideSection
    title="Radio 컴포넌트"
    :is-active="isActive"
    :props="radioProps"
    :code-example="codeExample"
  >
    <!-- Variants -->
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">Variants</h3>
      <div class="grid grid-cols-2 md:grid-cols-2 gap-4">
        <div class="text-center">
          <VRadio :options="radioOptions" layout="vertical" class="mb-2" />
          <p class="text-sm text-gray-600">vertical</p>
        </div>
        <div class="text-center">
          <VRadio :options="radioOptions" layout="horizontal" class="mb-2" />
          <p class="text-sm text-gray-600">horizontal</p>
        </div>
      </div>
    </div>

    <!-- Colors -->
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">Colors</h3>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div class="text-center">
          <VRadio :options="radioOptions" color="primary" class="mb-2" />
          <p class="text-sm text-gray-600">primary</p>
        </div>
        <div class="text-center">
          <VRadio :options="radioOptions" color="secondary" class="mb-2" />
          <p class="text-sm text-gray-600">secondary</p>
        </div>
        <div class="text-center">
          <VRadio :options="radioOptions" color="success" class="mb-2" />
          <p class="text-sm text-gray-600">success</p>
        </div>
        <div class="text-center">
          <VRadio :options="radioOptions" color="warning" class="mb-2" />
          <p class="text-sm text-gray-600">warning</p>
        </div>
        <div class="text-center">
          <VRadio :options="radioOptions" color="error" class="mb-2" />
          <p class="text-sm text-gray-600">error</p>
        </div>
        <div class="text-center">
          <VRadio :options="radioOptions" color="info" class="mb-2" />
          <p class="text-sm text-gray-600">info</p>
        </div>
      </div>
    </div>

    <!-- Sizes -->
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">Sizes</h3>
      <div class="flex items-center gap-4">
        <VRadio :options="radioOptions" size="small" />
        <VRadio :options="radioOptions" size="default" />
        <VRadio :options="radioOptions" size="large" />
      </div>
    </div>

    <!-- States -->
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">States</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <VRadio :options="radioOptions" label="정상 상태" />
        <VRadio :options="radioOptions" label="비활성화" disabled />
        <VRadio :options="radioOptions" label="에러 상태" :error="true" />
        <VRadio :options="radioOptions" label="필수 입력" required />
      </div>
    </div>

    <!-- 인터랙티브 데모 -->
    <template #interactive>
      <InteractiveDemo :props="demoProps" component-name="VRadio">
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
            <div>
              <label class="block text-sm font-medium mb-2">Layout</label>
              <select v-model="demoProps.layout" class="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option value="vertical">Vertical</option>
                <option value="horizontal">Horizontal</option>
              </select>
            </div>
            <div class="flex items-center gap-4">
              <label class="flex items-center">
                <input v-model="demoProps.disabled" type="checkbox" class="mr-2">
                <span class="text-sm">Disabled</span>
              </label>
              <label class="flex items-center">
                <input v-model="demoProps.required" type="checkbox" class="mr-2">
                <span class="text-sm">Required</span>
              </label>
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Error Message</label>
              <input v-model="demoProps.errorMessage" type="text" placeholder="에러 메시지" class="w-full px-3 py-2 border border-gray-300 rounded-md">
            </div>
          </div>
        </template>
        <template #preview>
          <VRadio v-bind="demoProps" />
        </template>
      </InteractiveDemo>
    </template>
  </GuideSection>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VRadio from '../../../components/ui/atoms/VRadio.vue'
import GuideSection from '../components/GuideSection.vue'
import InteractiveDemo from '../components/InteractiveDemo.vue'

interface Props {
  isActive: boolean
}

defineProps<Props>()

const radioOptions = [
  { label: '옵션 1', value: 'option1' },
  { label: '옵션 2', value: 'option2' },
  { label: '옵션 3', value: 'option3' }
]

const demoProps = ref({
  options: radioOptions,
  label: '인터랙티브 Radio',
  color: 'primary' as const,
  size: 'default' as const,
  layout: 'vertical' as const,
  disabled: false,
  required: false,
  errorMessage: ''
})

const radioProps = [
  { name: 'modelValue', type: 'string | number | null', default: 'null', description: '선택된 옵션의 값' },
  { name: 'options', type: 'RadioOption[]', default: '[]', description: '라디오 옵션 배열' },
  { name: 'label', type: 'string', default: '', description: '라디오 그룹의 라벨' },
  { name: 'name', type: 'string', default: '', description: '라디오 그룹의 이름' },
  { name: 'required', type: 'boolean', default: 'false', description: '필수 입력 여부' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '비활성화 상태' },
  { name: 'readonly', type: 'boolean', default: 'false', description: '읽기 전용 상태' },
  { name: 'error', type: 'boolean', default: 'false', description: '에러 상태' },
  { name: 'errorMessage', type: 'string', default: '', description: '에러 메시지' },
  { name: 'hint', type: 'string', default: '', description: '힌트 텍스트' },
  { name: 'size', type: 'string', default: 'default', description: '라디오의 크기' },
  { name: 'color', type: 'string', default: 'primary', description: '라디오의 색상' },
  { name: 'layout', type: 'string', default: 'vertical', description: '라디오 옵션 배치' }
]

const codeExample = 'VRadio 컴포넌트 사용 예시'
</script>
