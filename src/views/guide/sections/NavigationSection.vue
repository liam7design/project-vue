<template>
  <GuideSection title="Navigation 컴포넌트" :is-active="isActive">
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">기본 Navigation</h3>
      <VNavigation :items="navigationItems" />
    </div>
  </GuideSection>
</template>

<script setup lang="ts">
import { VNavigation } from '@/components/ui'
import GuideSection from '../components/GuideSection.vue'

interface Props {
  isActive: boolean
}

defineProps<Props>()

const navigationItems = [
  { label: '홈', value: 'home', href: '#' },
  { label: '서비스', value: 'services', href: '#' },
  { label: '문의', value: 'contact', href: '#' }
]
</script>
