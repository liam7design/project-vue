<template>
  <nav class="bg-white shadow-sm border-b">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center space-x-8">
          <router-link to="/" class="text-xl font-bold text-gray-900">
            {{ $t('app.title') }}
          </router-link>
          <div class="hidden md:flex space-x-6">
            <router-link
              v-for="item in navigationItems"
              :key="item.path"
              :to="item.path"
              class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              active-class="text-primary-600 bg-primary-50"
            >
              {{ item.label }}
            </router-link>
          </div>
        </div>

        <div class="flex items-center space-x-4">
          <!-- 언어 선택 -->
          <select
            v-model="currentLocale"
            @change="changeLocale"
            class="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="ko">한국어</option>
            <option value="en">English</option>
          </select>

          <!-- 테마 토글 -->
          <button
            @click="toggleTheme"
            class="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            :title="$t('app.toggleTheme')"
          >
            <Icon
              :name="isDark ? 'mdi:weather-sunny' : 'mdi:weather-night'"
              class="w-5 h-5"
            />
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '@/stores/app'
import { useTheme } from '@/composables/useTheme'

const { locale, t } = useI18n()
const appStore = useAppStore()
const { isDark, toggleTheme } = useTheme()

const navigationItems = [
  { path: '/', label: t('nav.home') },
  { path: '/about', label: t('nav.about') },
  { path: '/components', label: '컴포넌트 가이드' },
  { path: '/vibe', label: 'VIBE 클론' }
]

const currentLocale = computed({
  get: () => locale.value,
  set: (value: string) => {
    locale.value = value
  }
})

const changeLocale = () => {
  appStore.setLocale(currentLocale.value as 'ko' | 'en')
}
</script>


