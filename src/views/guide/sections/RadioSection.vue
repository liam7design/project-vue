<template>
  <GuideSection title="Radio 컴포넌트" :is-active="isActive">
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">기본 Radio</h3>
      <VRadio :options="radioOptions" />
    </div>
  </GuideSection>
</template>

<script setup lang="ts">
import { VRadio } from '@/components/ui'
import GuideSection from '../components/GuideSection.vue'

interface Props {
  isActive: boolean
}

defineProps<Props>()

const radioOptions = [
  { label: '옵션 1', value: 'option1' },
  { label: '옵션 2', value: 'option2' },
  { label: '옵션 3', value: 'option3' }
]
</script>
