<template>
  <header class="vibe-header">
    <div class="header-container">
      <!-- 로고 및 네비게이션 -->
      <div class="header-left">
        <!-- 모바일 메뉴 버튼 -->
        <button class="mobile-menu-btn lg:hidden" @click="toggleSidebar">
          <VIcon name="mdi:menu" class="w-6 h-6" />
        </button>

        <router-link to="/vibe" class="vibe-logo">
          <VIcon name="mdi:music" class="w-8 h-8 text-green-500" />
          <span class="logo-text">VIBE</span>
        </router-link>
        
        <nav class="header-nav">
          <router-link to="/vibe" class="nav-item" :class="{ active: $route.path === '/vibe' }">
            홈
          </router-link>
          <router-link to="/vibe/chart" class="nav-item" :class="{ active: $route.path === '/vibe/chart' }">
            차트
          </router-link>
          <router-link to="/vibe/genre/pop" class="nav-item" :class="{ active: $route.path.startsWith('/vibe/genre') }">
            장르
          </router-link>
          <router-link to="/vibe/my" class="nav-item" :class="{ active: $route.path === '/vibe/my' }">
            마이뮤직
          </router-link>
        </nav>
      </div>
      
      <!-- 검색바 -->
      <div class="header-center">
        <div class="search-container">
          <VIcon name="mdi:magnify" class="search-icon" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="아티스트, 곡, 앨범 검색"
            class="search-input"
            @keyup.enter="handleSearch"
            @focus="showSuggestions = true"
            @blur="hideSuggestions"
          />
          <button v-if="searchQuery" @click="clearSearch" class="clear-btn">
            <VIcon name="mdi:close" class="w-4 h-4" />
          </button>
        </div>
        
        <!-- 검색 제안 -->
        <div v-if="showSuggestions && suggestions.length > 0" class="search-suggestions">
          <div class="suggestion-item" v-for="suggestion in suggestions" :key="suggestion" @click="selectSuggestion(suggestion)">
            <VIcon name="mdi:magnify" class="w-4 h-4 text-gray-400" />
            <span>{{ suggestion }}</span>
          </div>
        </div>
      </div>
      
      <!-- 사용자 메뉴 -->
      <div class="header-right">
        <button class="header-btn">
          <VIcon name="mdi:bell-outline" class="w-5 h-5" />
        </button>
        <button class="header-btn">
          <VIcon name="mdi:cog-outline" class="w-5 h-5" />
        </button>
        <div class="user-menu">
          <div class="user-avatar">
            <VIcon name="mdi:account" class="w-6 h-6" />
          </div>
          <div class="user-info">
            <span class="user-name">사용자</span>
            <span class="user-type">프리미엄</span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const searchQuery = ref('')
const showSuggestions = ref(false)

const suggestions = computed(() => {
  if (!searchQuery.value) return []
  
  const allSuggestions = [
    '최신 히트곡',
    '발라드 모음',
    '댄스 음악',
    '재즈 플레이리스트',
    '클래식 음악',
    'K-POP',
    '팝송',
    '힙합',
    '록 음악',
    '인디 음악'
  ]
  
  return allSuggestions.filter(suggestion => 
    suggestion.toLowerCase().includes(searchQuery.value.toLowerCase())
  ).slice(0, 5)
})

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push(`/vibe/search?q=${encodeURIComponent(searchQuery.value)}`)
    showSuggestions.value = false
  }
}

const toggleSidebar = () => {
  // 사이드바 토글 이벤트 발생
  const event = new CustomEvent('toggle-sidebar')
  window.dispatchEvent(event)
}

const selectSuggestion = (suggestion: string) => {
  searchQuery.value = suggestion
  showSuggestions.value = false
  handleSearch()
}

const clearSearch = () => {
  searchQuery.value = ''
  showSuggestions.value = false
}

const hideSuggestions = () => {
  setTimeout(() => {
    showSuggestions.value = false
  }, 200)
}
</script>

<style scoped>
.vibe-header {
  @apply bg-black border-b border-gray-800 sticky top-0 z-50;
}

.header-container {
  @apply flex items-center justify-between px-4 lg:px-6 py-4;
}

.header-left {
  @apply flex items-center space-x-4 lg:space-x-8;
}

.mobile-menu-btn {
  @apply p-2 text-gray-400 hover:text-white transition-colors;
}

.vibe-logo {
  @apply flex items-center space-x-2 text-white hover:text-green-400 transition-colors;
}

.logo-text {
  @apply text-2xl font-bold;
}

.header-nav {
  @apply hidden md:flex space-x-4 lg:space-x-6;
}

.nav-item {
  @apply text-gray-300 hover:text-white transition-colors relative;
}

.nav-item.active {
  @apply text-white;
}

.nav-item.active::after {
  content: '';
  @apply absolute -bottom-1 left-0 right-0 h-0.5 bg-green-500;
}

.header-center {
  @apply flex-1 max-w-md mx-4 lg:mx-8 relative;
}

.search-container {
  @apply relative flex items-center;
}

.search-icon {
  @apply absolute left-3 w-5 h-5 text-gray-400;
}

.search-input {
  @apply w-full pl-10 pr-10 py-2 bg-gray-800 text-white placeholder-gray-400 rounded-full border border-gray-700 focus:border-green-500 focus:outline-none transition-colors;
}

.clear-btn {
  @apply absolute right-3 p-1 text-gray-400 hover:text-white transition-colors;
}

.search-suggestions {
  @apply absolute top-full left-0 right-0 mt-2 bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden;
}

.suggestion-item {
  @apply flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer transition-colors;
}

.header-right {
  @apply flex items-center space-x-2 lg:space-x-4;
}

.header-btn {
  @apply p-2 text-gray-400 hover:text-white transition-colors;
}

.user-menu {
  @apply flex items-center space-x-3 cursor-pointer hover:bg-gray-800 rounded-lg p-2 transition-colors;
}

.user-avatar {
  @apply w-8 h-8 bg-green-500 rounded-full flex items-center justify-center;
}

.user-info {
  @apply flex flex-col;
}

.user-name {
  @apply text-sm font-medium text-white;
}

.user-type {
  @apply text-xs text-gray-400;
}
</style>
