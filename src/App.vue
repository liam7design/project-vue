<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-semibold text-gray-900">
              {{ $t('welcome') }}
            </h1>
          </div>
          <div class="flex items-center space-x-4">
            <router-link
              to="/"
              class="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              active-class="text-blue-600"
            >
              {{ $t('home') }}
            </router-link>
            <router-link
              to="/about"
              class="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              active-class="text-blue-600"
            >
              {{ $t('about') }}
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- 알림 토스트 -->
    <NotificationToast />
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'

// 메타데이터 설정
useHead({
  title: 'Project Vue - Modern Vue 3 Application',
  meta: [
    { name: 'description', content: 'Vue 3 + TypeScript + Vite로 구축된 현대적인 웹 애플리케이션' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ]
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
