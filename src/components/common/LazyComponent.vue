<template>
  <Suspense>
    <template #default>
      <component :is="lazyComponent" v-bind="$attrs" />
    </template>
    <template #fallback>
      <div class="lazy-loading">
        <div class="loading-spinner">
          <Icon name="mdi:loading" class="animate-spin w-6 h-6" />
        </div>
        <p class="loading-text">{{ loadingText }}</p>
      </div>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

interface Props {
  component: () => Promise<{ default: unknown }>
  loadingText?: string
}

const props = withDefaults(defineProps<Props>(), {
  loadingText: '로딩 중...'
})

const lazyComponent = defineAsyncComponent({
  loader: props.component,
  delay: 200,
  timeout: 10000,
  errorComponent: {
    template: `
      <div class="error-component">
        <Icon name="mdi:alert-circle" class="w-6 h-6 text-red-500" />
        <p class="error-text">컴포넌트를 불러올 수 없습니다.</p>
      </div>
    `
  }
})
</script>

<style scoped>
.lazy-loading {
  @apply flex flex-col items-center justify-center p-8;
}

.loading-spinner {
  @apply mb-4;
}

.loading-text {
  @apply text-sm text-gray-500;
}

.error-component {
  @apply flex flex-col items-center justify-center p-8;
}

.error-text {
  @apply mt-2 text-sm text-red-500;
}
</style>
