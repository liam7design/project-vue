<template>
  <!-- 모바일 오버레이 -->
  <div v-if="isOpen" class="sidebar-overlay lg:hidden" @click="toggleSidebar"></div>
  
  <aside class="vibe-sidebar" :class="{ open: isOpen }">
    <!-- 사용자 정보 -->
    <div class="user-section">
      <div class="user-profile">
        <div class="user-avatar">
          <VIcon name="mdi:account" class="w-8 h-8" />
        </div>
        <div class="user-details">
          <h3 class="user-name">사용자</h3>
          <p class="user-type">프리미엄</p>
        </div>
      </div>
    </div>
    
    <!-- 메인 메뉴 -->
    <nav class="sidebar-nav">
      <div class="nav-section">
        <h4 class="nav-title">음악</h4>
        <ul class="nav-list">
          <li>
            <router-link to="/vibe" class="nav-link" :class="{ active: $route.path === '/vibe' }">
              <VIcon name="mdi:home" class="w-5 h-5" />
              <span>홈</span>
            </router-link>
          </li>
          <li>
            <router-link to="/vibe/chart" class="nav-link" :class="{ active: $route.path === '/vibe/chart' }">
              <VIcon name="mdi:chart-line" class="w-5 h-5" />
              <span>차트</span>
            </router-link>
          </li>
          <li>
            <router-link to="/vibe/genre/pop" class="nav-link" :class="{ active: $route.path.startsWith('/vibe/genre') }">
              <VIcon name="mdi:music-note" class="w-5 h-5" />
              <span>장르</span>
            </router-link>
          </li>
        </ul>
      </div>
      
      <div class="nav-section">
        <h4 class="nav-title">마이뮤직</h4>
        <ul class="nav-list">
          <li>
            <router-link to="/vibe/my" class="nav-link" :class="{ active: $route.path === '/vibe/my' }">
              <VIcon name="mdi:library-music" class="w-5 h-5" />
              <span>내 라이브러리</span>
            </router-link>
          </li>
          <li>
            <a href="#" class="nav-link">
              <VIcon name="mdi:heart" class="w-5 h-5" />
              <span>좋아요한 곡</span>
            </a>
          </li>
          <li>
            <a href="#" class="nav-link">
              <VIcon name="mdi:playlist-music" class="w-5 h-5" />
              <span>플레이리스트</span>
            </a>
          </li>
          <li>
            <a href="#" class="nav-link">
              <VIcon name="mdi:download" class="w-5 h-5" />
              <span>다운로드</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
    
    <!-- 플레이리스트 섹션 -->
    <div class="playlist-section">
      <div class="playlist-header">
        <h4 class="playlist-title">플레이리스트</h4>
        <button class="add-playlist-btn">
          <VIcon name="mdi:plus" class="w-4 h-4" />
        </button>
      </div>
      <ul class="playlist-list">
        <li v-for="playlist in userPlaylists" :key="playlist.id">
          <a href="#" class="playlist-link">
            <VIcon name="mdi:playlist-music" class="w-4 h-4" />
            <span>{{ playlist.name }}</span>
          </a>
        </li>
      </ul>
    </div>
    
    <!-- 최근 재생 -->
    <div class="recent-section">
      <h4 class="recent-title">최근 재생</h4>
      <ul class="recent-list">
        <li v-for="track in recentTracks" :key="track.id" class="recent-item">
          <img :src="track.image" :alt="track.title" class="recent-image" />
          <div class="recent-info">
            <h5 class="recent-title">{{ track.title }}</h5>
            <p class="recent-artist">{{ track.artist }}</p>
          </div>
          <button class="recent-play-btn">
            <VIcon name="mdi:play" class="w-4 h-4" />
          </button>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const userPlaylists = ref([
  { id: 1, name: '내가 좋아하는 곡들' },
  { id: 2, name: '운동할 때 듣는 음악' },
  { id: 3, name: '잠들기 전 음악' },
  { id: 4, name: '드라이브 음악' }
])

const recentTracks = ref([
  {
    id: 1,
    title: '새로운 시작',
    artist: '김아티스트',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=64&h=64&fit=crop'
  },
  {
    id: 2,
    title: '밤하늘',
    artist: '박가수',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f1989a2a25?w=64&h=64&fit=crop'
  },
  {
    id: 3,
    title: '도시의 밤',
    artist: '이뮤지션',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=64&h=64&fit=crop'
  }
])

const isOpen = ref(false)

const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}

onMounted(() => {
  window.addEventListener('toggle-sidebar', toggleSidebar)
})

onUnmounted(() => {
  window.removeEventListener('toggle-sidebar', toggleSidebar)
})
</script>

<style scoped>
.vibe-sidebar {
  @apply w-64 bg-gray-900 h-screen fixed left-0 top-16 overflow-y-auto z-40;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.vibe-sidebar.open {
  transform: translateX(0);
}

@media (min-width: 1024px) {
  .vibe-sidebar {
    transform: translateX(0);
  }
}

.sidebar-overlay {
  @apply fixed inset-0 bg-black bg-opacity-50 z-30;
}

.user-section {
  @apply p-6 border-b border-gray-800;
}

.user-profile {
  @apply flex items-center space-x-3;
}

.user-avatar {
  @apply w-10 h-10 bg-green-500 rounded-full flex items-center justify-center;
}

.user-details {
  @apply flex-1;
}

.user-name {
  @apply text-white font-semibold;
}

.user-type {
  @apply text-sm text-gray-400;
}

.sidebar-nav {
  @apply p-6;
}

.nav-section {
  @apply mb-8;
}

.nav-title {
  @apply text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4;
}

.nav-list {
  @apply space-y-2;
}

.nav-link {
  @apply flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors;
}

.nav-link.active {
  @apply text-white bg-gray-800;
}

.playlist-section {
  @apply p-6 border-t border-gray-800;
}

.playlist-header {
  @apply flex items-center justify-between mb-4;
}

.playlist-title {
  @apply text-sm font-semibold text-gray-400 uppercase tracking-wider;
}

.add-playlist-btn {
  @apply p-1 text-gray-400 hover:text-white transition-colors;
}

.playlist-list {
  @apply space-y-1;
}

.playlist-link {
  @apply flex items-center space-x-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded transition-colors;
}

.recent-section {
  @apply p-6 border-t border-gray-800;
}

.recent-title {
  @apply text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4;
}

.recent-list {
  @apply space-y-3;
}

.recent-item {
  @apply flex items-center space-x-3 p-2 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer;
}

.recent-image {
  @apply w-10 h-10 object-cover rounded;
}

.recent-info {
  @apply flex-1 min-w-0;
}

.recent-title {
  @apply text-sm font-medium text-white truncate;
}

.recent-artist {
  @apply text-xs text-gray-400 truncate;
}

.recent-play-btn {
  @apply p-1 text-gray-400 hover:text-white transition-colors;
}
</style>
