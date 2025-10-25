<template>
  <section v-if="isActive" class="component-section">
    <h2 class="text-2xl font-semibold mb-6">{{ title }}</h2>
    <slot />
  </section>
</template>

<script setup lang="ts">
interface Props {
  title: string
  isActive: boolean
}

defineProps<Props>()
</script>

<style scoped>
.component-section {
  @apply bg-white rounded-lg shadow-sm p-6;
}

.component-section h2 {
  @apply border-b border-gray-200 pb-4;
}
</style>


