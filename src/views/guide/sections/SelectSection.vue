<template>
  <GuideSection
    title="Select 컴포넌트"
    :is-active="isActive"
    :props="selectProps"
    :code-example="codeExample"
  >
    <!-- 기본 Select -->
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">기본 Select</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <VSelect
          label="기본 선택"
          :options="basicOptions"
          placeholder="옵션을 선택하세요"
        />
        <VSelect
          label="필수 선택"
          :options="basicOptions"
          required
          placeholder="필수 선택"
        />
      </div>
    </div>

    <!-- Select States -->
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">Select States</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <VSelect
          label="정상 상태"
          :options="basicOptions"
          placeholder="정상 상태"
        />
        <VSelect
          label="에러 상태"
          :options="basicOptions"
          :error="true"
          placeholder="에러 상태"
        />
        <VSelect
          label="비활성화"
          :options="basicOptions"
          disabled
          placeholder="비활성화"
        />
        <VSelect
          label="로딩 상태"
          :options="basicOptions"
          loading
          placeholder="로딩 중..."
        />
      </div>
    </div>

    <!-- Select Sizes -->
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">Select Sizes</h3>
      <div class="space-y-4">
        <VSelect size="small" label="Small" :options="basicOptions" placeholder="작은 크기" />
        <VSelect size="default" label="Default" :options="basicOptions" placeholder="기본 크기" />
        <VSelect size="large" label="Large" :options="basicOptions" placeholder="큰 크기" />
      </div>
    </div>

    <!-- 인터랙티브 데모 -->
    <template #interactive>
      <InteractiveDemo :props="demoProps" component-name="VSelect">
        <template #controls>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-2">Label</label>
              <input v-model="demoProps.label" type="text" placeholder="라벨" class="w-full px-3 py-2 border border-gray-300 rounded-md">
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Placeholder</label>
              <input v-model="demoProps.placeholder" type="text" placeholder="플레이스홀더" class="w-full px-3 py-2 border border-gray-300 rounded-md">
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
                <input v-model="demoProps.required" type="checkbox" class="mr-2">
                <span class="text-sm">Required</span>
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
          <VSelect v-bind="demoProps" :options="basicOptions" />
        </template>
      </InteractiveDemo>
    </template>
  </GuideSection>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VSelect } from '@/components/ui'
import GuideSection from '../components/GuideSection.vue'
import InteractiveDemo from '../components/InteractiveDemo.vue'

interface Props {
  isActive: boolean
}

defineProps<Props>()

const basicOptions = [
  { value: 'option1', label: '옵션 1' },
  { value: 'option2', label: '옵션 2' },
  { value: 'option3', label: '옵션 3' },
  { value: 'option4', label: '옵션 4' }
]

const demoProps = ref({
  label: '인터랙티브 선택',
  placeholder: '옵션을 선택하세요',
  size: 'default' as const,
  required: false,
  disabled: false,
  loading: false,
  error: false
})

const selectProps = [
  { name: 'label', type: 'string', default: '', description: '선택 필드의 라벨' },
  { name: 'placeholder', type: 'string', default: '', description: '플레이스홀더 텍스트' },
  { name: 'options', type: 'SelectOption[]', default: '[]', description: '선택 옵션 배열' },
  { name: 'size', type: 'string', default: 'default', description: '선택 필드 크기' },
  { name: 'required', type: 'boolean', default: 'false', description: '필수 선택 여부' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '비활성화 상태' },
  { name: 'loading', type: 'boolean', default: 'false', description: '로딩 상태' },
  { name: 'error', type: 'string', default: '', description: '에러 메시지' }
]

const codeExample = 'VSelect 컴포넌트 사용 예시'
</script>
