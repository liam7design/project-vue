<template>
  <GuideSection title="Header 컴포넌트" :is-active="isActive">
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">기본 Header</h3>
      <VHeader />
    </div>
  </GuideSection>
</template>

<script setup lang="ts">
import { VHeader } from '@/components/ui'
import GuideSection from '../components/GuideSection.vue'

interface Props {
  isActive: boolean
}

defineProps<Props>()
</script>
