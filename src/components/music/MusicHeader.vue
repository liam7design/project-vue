<template>
  <header class="bg-gray-900 border-b border-gray-800 px-6 py-4">
    <div class="flex items-center justify-between">
      <!-- 이전/다음 버튼 -->
      <div class="flex items-center space-x-4">
        <button class="p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-colors">
          <VIcon name="mdi:chevron-left" class="w-5 h-5 text-white" />
        </button>
        <button class="p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-colors">
          <VIcon name="mdi:chevron-right" class="w-5 h-5 text-white" />
        </button>
      </div>

      <!-- 검색바 -->
      <div class="flex-1 max-w-md mx-8">
        <div class="relative">
          <VIcon name="mdi:magnify" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="아티스트, 곡, 앨범 검색"
            class="w-full pl-10 pr-4 py-2 bg-white bg-opacity-10 text-white placeholder-gray-400 rounded-full border border-transparent focus:border-white focus:outline-none transition-colors"
            @keyup.enter="handleSearch"
          />
        </div>
      </div>

      <!-- 사용자 메뉴 -->
      <div class="flex items-center space-x-4">
        <button class="p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-colors">
          <VIcon name="mdi:bell-outline" class="w-5 h-5 text-white" />
        </button>
        <button class="p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-colors">
          <VIcon name="mdi:cog-outline" class="w-5 h-5 text-white" />
        </button>
        <div class="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <VIcon name="mdi:account" class="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = ref('')

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    // 검색 로직 구현
    console.log('검색:', searchQuery.value)
  }
}
</script>
