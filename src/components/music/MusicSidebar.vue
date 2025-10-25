<template>
  <div class="sidebar fixed left-0 top-0 h-full w-64 bg-gray-900 border-r border-gray-800 z-40">
    <!-- 로고 -->
    <div class="p-6 border-b border-gray-800">
      <h1 class="text-2xl font-bold text-white">MusicVibe</h1>
    </div>

    <!-- 네비게이션 메뉴 -->
    <nav class="p-4">
      <ul class="space-y-2">
        <li>
          <router-link
            to="/music"
            class="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            :class="{ 'bg-gray-800 text-white': $route.path === '/music' }"
          >
            <VIcon name="mdi:home" class="w-5 h-5 mr-3" />
            홈
          </router-link>
        </li>
        <li>
          <a href="#" class="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
            <VIcon name="mdi:music" class="w-5 h-5 mr-3" />
            탐색
          </a>
        </li>
        <li>
          <a href="#" class="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
            <VIcon name="mdi:library-music" class="w-5 h-5 mr-3" />
            내 라이브러리
          </a>
        </li>
        <li>
          <a href="#" class="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
            <VIcon name="mdi:heart" class="w-5 h-5 mr-3" />
            좋아요한 곡
          </a>
        </li>
        <li>
          <a href="#" class="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
            <VIcon name="mdi:playlist-music" class="w-5 h-5 mr-3" />
            플레이리스트
          </a>
        </li>
      </ul>
    </nav>

    <!-- 플레이리스트 섹션 -->
    <div class="px-4 py-2">
      <h3 class="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">플레이리스트</h3>
      <ul class="space-y-1">
        <li v-for="playlist in userPlaylists" :key="playlist.id">
          <a href="#" class="flex items-center px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded transition-colors">
            <VIcon name="mdi:playlist-music" class="w-4 h-4 mr-2" />
            {{ playlist.name }}
          </a>
        </li>
      </ul>
    </div>

    <!-- 사용자 정보 -->
    <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
      <div class="flex items-center">
        <div class="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3">
          <VIcon name="mdi:account" class="w-5 h-5 text-white" />
        </div>
        <div>
          <p class="text-sm font-medium text-white">사용자</p>
          <p class="text-xs text-gray-400">프리미엄</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const userPlaylists = ref([
  { id: 1, name: '내가 좋아하는 곡들' },
  { id: 2, name: '운동할 때 듣는 음악' },
  { id: 3, name: '잠들기 전 음악' },
  { id: 4, name: '드라이브 음악' }
])
</script>
