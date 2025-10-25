<template>
  <div class="search-section">
    <div class="relative max-w-2xl">
      <VIcon name="mdi:magnify" class="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
      <input
        v-model="searchQuery"
        type="text"
        placeholder="아티스트, 곡, 앨범을 검색해보세요"
        class="w-full pl-12 pr-4 py-4 bg-gray-800 text-white placeholder-gray-400 rounded-full border border-gray-700 focus:border-white focus:outline-none transition-colors text-lg"
        @keyup.enter="handleSearch"
        @input="handleInput"
      />
      <button
        v-if="searchQuery"
        @click="clearSearch"
        class="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-700 transition-colors"
      >
        <VIcon name="mdi:close" class="w-5 h-5 text-gray-400" />
      </button>
    </div>

    <!-- 검색 제안 -->
    <div v-if="showSuggestions && suggestions.length > 0" class="mt-4 bg-gray-800 rounded-lg p-4 max-w-2xl">
      <h3 class="text-sm font-semibold text-gray-400 mb-3">추천 검색어</h3>
      <div class="space-y-2">
        <button
          v-for="suggestion in suggestions"
          :key="suggestion"
          @click="selectSuggestion(suggestion)"
          class="block w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors"
        >
          {{ suggestion }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

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

const handleInput = () => {
  showSuggestions.value = searchQuery.value.length > 0
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    console.log('검색 실행:', searchQuery.value)
    showSuggestions.value = false
  }
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
</script>
