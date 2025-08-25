<template>
  <GuideSection title="Sidebar 컴포넌트" :is-active="isActive">
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">기본 Sidebar</h3>
      <VSidebar />
    </div>
  </GuideSection>
</template>

<script setup lang="ts">
import { VSidebar } from '@/components/ui'
import GuideSection from '../components/GuideSection.vue'

interface Props {
  isActive: boolean
}

defineProps<Props>()
</script>
