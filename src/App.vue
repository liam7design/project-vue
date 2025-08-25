<template>
  <div id="app">
    <AppNavigation />

    <main class="min-h-screen bg-gray-50">
      <router-view />
    </main>

    <NotificationToast />
  </div>
</template>

<script setup lang="ts">
import AppNavigation from '@/components/AppNavigation.vue'
import NotificationToast from '@/components/NotificationToast.vue'
</script>

<style>
#app {
  @apply antialiased;
}

/* 다크 모드 스타일 */
.dark {
  @apply bg-gray-900 text-white;
}

.dark nav {
  @apply bg-gray-800 border-gray-700;
}

.dark .bg-white {
  @apply bg-gray-800;
}

.dark .text-gray-900 {
  @apply text-white;
}

.dark .text-gray-600 {
  @apply text-gray-300;
}

.dark .border-gray-200 {
  @apply border-gray-700;
}
</style>
