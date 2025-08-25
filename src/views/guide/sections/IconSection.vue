<template>
  <GuideSection title="Icon 컴포넌트" :is-active="isActive">
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">기본 Icon</h3>
      <VIcon name="mdi:heart" />
    </div>
  </GuideSection>
</template>

<script setup lang="ts">
import { VIcon } from '@/components/ui'
import GuideSection from '../components/GuideSection.vue'

interface Props {
  isActive: boolean
}

defineProps<Props>()
</script>
