<template>
  <GuideSection
    title="Input 컴포넌트"
    :is-active="isActive"
    :props="inputProps"
    :code-example="codeExample"
  >
    <!-- 기본 Input -->
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">기본 Input</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <VInput label="기본 입력" placeholder="텍스트를 입력하세요" />
        <VInput label="필수 입력" required placeholder="필수 입력 필드" />
      </div>
    </div>

    <!-- Input Types -->
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">Input Types</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <VInput type="email" label="이메일" placeholder="example@email.com" />
        <VInput type="password" label="비밀번호" placeholder="비밀번호를 입력하세요" />
        <VInput type="number" label="숫자" placeholder="숫자를 입력하세요" />
        <VInput type="tel" label="전화번호" placeholder="010-1234-5678" />
      </div>
    </div>

    <!-- Input States -->
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">Input States</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <VInput label="정상 상태" placeholder="정상 입력" />
        <VInput label="에러 상태" :error="true" placeholder="에러 입력" />
        <VInput label="비활성화" disabled placeholder="비활성화된 입력" />
        <VInput label="읽기 전용" readonly value="읽기 전용 텍스트" />
      </div>
    </div>

    <!-- Input with Icons -->
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">Input with Icons</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <VInput
          label="검색"
          placeholder="검색어를 입력하세요"
          icon="mdi:magnify"
        />
        <VInput
          label="이메일"
          placeholder="이메일을 입력하세요"
          icon="mdi:email"
          icon-position="right"
        />
      </div>
    </div>

    <!-- Input Sizes -->
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">Input Sizes</h3>
      <div class="space-y-4">
        <VInput size="small" label="Small" placeholder="작은 크기" />
        <VInput size="default" label="Default" placeholder="기본 크기" />
        <VInput size="large" label="Large" placeholder="큰 크기" />
      </div>
    </div>

    <!-- 인터랙티브 데모 -->
    <template #interactive>
      <InteractiveDemo :props="demoProps" component-name="VInput">
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
              <label class="block text-sm font-medium mb-2">Type</label>
              <select v-model="demoProps.type" class="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option value="text">Text</option>
                <option value="email">Email</option>
                <option value="password">Password</option>
                <option value="number">Number</option>
                <option value="tel">Tel</option>
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
                <input v-model="demoProps.required" type="checkbox" class="mr-2">
                <span class="text-sm">Required</span>
              </label>
              <label class="flex items-center">
                <input v-model="demoProps.disabled" type="checkbox" class="mr-2">
                <span class="text-sm">Disabled</span>
              </label>
              <label class="flex items-center">
                <input v-model="demoProps.readonly" type="checkbox" class="mr-2">
                <span class="text-sm">Readonly</span>
              </label>
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Error Message</label>
              <input v-model="demoProps.error" type="text" placeholder="에러 메시지" class="w-full px-3 py-2 border border-gray-300 rounded-md">
            </div>
          </div>
        </template>
        <template #preview>
          <VInput v-bind="demoProps" />
        </template>
      </InteractiveDemo>
    </template>
  </GuideSection>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VInput } from '@/components/ui'
import GuideSection from '../components/GuideSection.vue'
import InteractiveDemo from '../components/InteractiveDemo.vue'

interface Props {
  isActive: boolean
}

defineProps<Props>()

const demoProps = ref({
  label: '인터랙티브 입력',
  placeholder: '텍스트를 입력하세요',
  type: 'text' as const,
  size: 'default' as const,
  required: false,
  disabled: false,
  readonly: false,
  error: false
})

const inputProps = [
  { name: 'label', type: 'string', default: '', description: '입력 필드의 라벨' },
  { name: 'placeholder', type: 'string', default: '', description: '플레이스홀더 텍스트' },
  { name: 'type', type: 'string', default: 'text', description: '입력 필드 타입' },
  { name: 'size', type: 'string', default: 'default', description: '입력 필드 크기' },
  { name: 'required', type: 'boolean', default: 'false', description: '필수 입력 여부' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '비활성화 상태' },
  { name: 'readonly', type: 'boolean', default: 'false', description: '읽기 전용 상태' },
  { name: 'error', type: 'string', default: '', description: '에러 메시지' },
  { name: 'icon', type: 'string', default: '', description: '아이콘 이름' },
  { name: 'iconPosition', type: 'string', default: 'left', description: '아이콘 위치' }
]

const codeExample = 'VInput 컴포넌트 사용 예시'
</script>
