<template>
  <div class="my-page">
    <!-- VIBE 헤더 -->
    <VibeHeader />
    
    <!-- 메인 컨텐츠 -->
    <div class="vibe-content">
      <!-- 사이드바 -->
      <VibeSidebar />
      
      <!-- 메인 영역 -->
      <main class="main-area">
        <!-- 마이뮤직 헤더 -->
        <div class="my-header">
          <h1 class="my-title">마이뮤직</h1>
          <p class="my-subtitle">나만의 음악 컬렉션</p>
        </div>
        
        <!-- 마이뮤직 컨텐츠 -->
        <div class="my-content">
          <!-- 좋아요한 곡 -->
          <section class="section">
            <div class="section-header">
              <h2 class="section-title">좋아요한 곡</h2>
              <button class="play-all-btn">
                <VIcon name="mdi:play" class="w-5 h-5 mr-2" />
                전체 재생
              </button>
            </div>
            
            <div class="track-list">
              <div
                v-for="(track, index) in likedTracks"
                :key="track.id"
                class="track-item group"
                @click="playTrack(track)"
              >
                <div class="track-number">
                  <span class="number">{{ index + 1 }}</span>
                </div>
                <div class="track-image">
                  <img :src="track.image" :alt="track.title" />
                  <div class="play-overlay">
                    <button class="play-btn">
                      <VIcon name="mdi:play" class="w-6 h-6" />
                    </button>
                  </div>
                </div>
                <div class="track-info">
                  <h3 class="track-title">{{ track.title }}</h3>
                  <p class="track-artist">{{ track.artist }}</p>
                </div>
                <div class="track-stats">
                  <span class="play-count">{{ track.playCount }}회</span>
                  <span class="duration">{{ track.duration }}</span>
                </div>
                <div class="track-actions">
                  <button class="action-btn">
                    <VIcon name="mdi:heart" class="w-5 h-5 text-red-500" />
                  </button>
                  <button class="action-btn">
                    <VIcon name="mdi:plus" class="w-5 h-5" />
                  </button>
                  <button class="action-btn">
                    <VIcon name="mdi:dots-vertical" class="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </section>
          
          <!-- 내 플레이리스트 -->
          <section class="section">
            <div class="section-header">
              <h2 class="section-title">내 플레이리스트</h2>
              <button class="create-btn">
                <VIcon name="mdi:plus" class="w-5 h-5 mr-2" />
                새 플레이리스트
              </button>
            </div>
            
            <div class="playlist-grid">
              <div
                v-for="playlist in myPlaylists"
                :key="playlist.id"
                class="playlist-card"
                @click="goToPlaylist(playlist.id)"
              >
                <div class="playlist-image">
                  <img :src="playlist.image" :alt="playlist.title" />
                  <div class="play-overlay">
                    <button class="play-btn">
                      <VIcon name="mdi:play" class="w-6 h-6" />
                    </button>
                  </div>
                </div>
                <div class="playlist-info">
                  <h3 class="playlist-title">{{ playlist.title }}</h3>
                  <p class="playlist-tracks">{{ playlist.trackCount }}곡</p>
                </div>
              </div>
            </div>
          </section>
          
          <!-- 최근 재생 -->
          <section class="section">
            <div class="section-header">
              <h2 class="section-title">최근 재생</h2>
              <button class="clear-btn">전체 삭제</button>
            </div>
            
            <div class="track-list">
              <div
                v-for="(track, index) in recentTracks"
                :key="track.id"
                class="track-item"
                @click="playTrack(track)"
              >
                <div class="track-number">
                  <span class="number">{{ index + 1 }}</span>
                </div>
                <div class="track-image">
                  <img :src="track.image" :alt="track.title" />
                  <div class="play-overlay">
                    <button class="play-btn">
                      <VIcon name="mdi:play" class="w-6 h-6" />
                    </button>
                  </div>
                </div>
                <div class="track-info">
                  <h3 class="track-title">{{ track.title }}</h3>
                  <p class="track-artist">{{ track.artist }}</p>
                </div>
                <div class="track-stats">
                  <span class="play-time">{{ track.playTime }}</span>
                </div>
                <div class="track-actions">
                  <button class="action-btn">
                    <VIcon name="mdi:heart-outline" class="w-5 h-5" />
                  </button>
                  <button class="action-btn">
                    <VIcon name="mdi:plus" class="w-5 h-5" />
                  </button>
                  <button class="action-btn">
                    <VIcon name="mdi:dots-vertical" class="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </section>
          
          <!-- 다운로드한 곡 -->
          <section class="section">
            <div class="section-header">
              <h2 class="section-title">다운로드한 곡</h2>
              <button class="download-all-btn">
                <VIcon name="mdi:download" class="w-5 h-5 mr-2" />
                전체 다운로드
              </button>
            </div>
            
            <div class="track-list">
              <div
                v-for="(track, index) in downloadedTracks"
                :key="track.id"
                class="track-item"
                @click="playTrack(track)"
              >
                <div class="track-number">
                  <span class="number">{{ index + 1 }}</span>
                </div>
                <div class="track-image">
                  <img :src="track.image" :alt="track.title" />
                  <div class="play-overlay">
                    <button class="play-btn">
                      <VIcon name="mdi:play" class="w-6 h-6" />
                    </button>
                  </div>
                </div>
                <div class="track-info">
                  <h3 class="track-title">{{ track.title }}</h3>
                  <p class="track-artist">{{ track.artist }}</p>
                </div>
                <div class="track-stats">
                  <span class="download-size">{{ track.size }}</span>
                </div>
                <div class="track-actions">
                  <button class="action-btn">
                    <VIcon name="mdi:heart-outline" class="w-5 h-5" />
                  </button>
                  <button class="action-btn">
                    <VIcon name="mdi:plus" class="w-5 h-5" />
                  </button>
                  <button class="action-btn">
                    <VIcon name="mdi:dots-vertical" class="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
    
    <!-- 하단 플레이어 -->
    <VibePlayer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import VibeHeader from '@/components/vibe/VibeHeader.vue'
import VibeSidebar from '@/components/vibe/VibeSidebar.vue'
import VibePlayer from '@/components/vibe/VibePlayer.vue'

const router = useRouter()

const likedTracks = ref([
  {
    id: 1,
    title: '좋아요한 곡 1',
    artist: '아티스트 1',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=64&h=64&fit=crop',
    playCount: '1,234,567',
    duration: '3:45'
  },
  {
    id: 2,
    title: '좋아요한 곡 2',
    artist: '아티스트 2',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f1989a2a25?w=64&h=64&fit=crop',
    playCount: '987,654',
    duration: '4:12'
  },
  {
    id: 3,
    title: '좋아요한 곡 3',
    artist: '아티스트 3',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=64&h=64&fit=crop',
    playCount: '876,543',
    duration: '3:28'
  }
])

const myPlaylists = ref([
  {
    id: 1,
    title: '내가 좋아하는 곡들',
    trackCount: 25,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop'
  },
  {
    id: 2,
    title: '운동할 때 듣는 음악',
    trackCount: 18,
    image: 'https://images.unsplash.com/photo-1511379938547-c1f1989a2a25?w=300&h=300&fit=crop'
  },
  {
    id: 3,
    title: '잠들기 전 음악',
    trackCount: 32,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop'
  },
  {
    id: 4,
    title: '드라이브 음악',
    trackCount: 20,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop'
  }
])

const recentTracks = ref([
  {
    id: 1,
    title: '최근 재생 곡 1',
    artist: '아티스트 1',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=64&h=64&fit=crop',
    playTime: '2시간 전'
  },
  {
    id: 2,
    title: '최근 재생 곡 2',
    artist: '아티스트 2',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f1989a2a25?w=64&h=64&fit=crop',
    playTime: '5시간 전'
  },
  {
    id: 3,
    title: '최근 재생 곡 3',
    artist: '아티스트 3',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=64&h=64&fit=crop',
    playTime: '1일 전'
  }
])

const downloadedTracks = ref([
  {
    id: 1,
    title: '다운로드한 곡 1',
    artist: '아티스트 1',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=64&h=64&fit=crop',
    size: '4.2MB'
  },
  {
    id: 2,
    title: '다운로드한 곡 2',
    artist: '아티스트 2',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f1989a2a25?w=64&h=64&fit=crop',
    size: '3.8MB'
  },
  {
    id: 3,
    title: '다운로드한 곡 3',
    artist: '아티스트 3',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=64&h=64&fit=crop',
    size: '4.5MB'
  }
])

interface Track {
  id: number
  title: string
  artist: string
  image: string
  playCount?: string
  duration?: string
  playTime?: string
  size?: string
}

const playTrack = (track: Track) => {
  console.log('트랙 재생:', track)
}

const goToPlaylist = (id: number) => {
  router.push(`/vibe/playlist/${id}`)
}

onMounted(() => {
  // 마이뮤직 데이터 로딩
})
</script>

<style scoped>
.my-page {
  @apply bg-black text-white min-h-screen;
}

.vibe-content {
  @apply flex flex-col lg:flex-row;
}

.main-area {
  @apply flex-1 lg:ml-64 p-4 lg:p-6;
}

.my-header {
  @apply mb-8;
}

.my-title {
  @apply text-3xl font-bold mb-2;
}

.my-subtitle {
  @apply text-lg text-gray-300;
}

.my-content {
  @apply space-y-12;
}

.section {
  @apply space-y-6;
}

.section-header {
  @apply flex justify-between items-center;
}

.section-title {
  @apply text-2xl font-semibold;
}

.play-all-btn {
  @apply flex items-center px-4 py-2 bg-green-500 text-black font-semibold rounded-full hover:bg-green-400 transition-colors;
}

.create-btn {
  @apply flex items-center px-4 py-2 border border-gray-400 text-white font-semibold rounded-full hover:border-white transition-colors;
}

.clear-btn {
  @apply text-sm text-gray-400 hover:text-white transition-colors;
}

.download-all-btn {
  @apply flex items-center px-4 py-2 border border-gray-400 text-white font-semibold rounded-full hover:border-white transition-colors;
}

.track-list {
  @apply space-y-2;
}

.track-item {
  @apply flex items-center space-x-4 p-4 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer;
}

.track-number {
  @apply w-8 text-center;
}

.number {
  @apply text-lg font-bold text-white;
}

.track-image {
  @apply relative w-12 h-12;
}

.track-image img {
  @apply w-full h-full object-cover rounded;
}

.play-overlay {
  @apply absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded flex items-center justify-center transition-all;
}

.play-btn {
  @apply opacity-0 group-hover:opacity-100 bg-green-500 rounded-full p-2 hover:bg-green-400 transition-all;
}

.track-info {
  @apply flex-1 min-w-0;
}

.track-title {
  @apply font-semibold text-white truncate;
}

.track-artist {
  @apply text-sm text-gray-400 truncate;
}

.track-stats {
  @apply flex flex-col items-end space-y-1 w-32;
}

.play-count {
  @apply text-sm text-gray-400;
}

.duration {
  @apply text-sm text-gray-500;
}

.play-time {
  @apply text-sm text-gray-400;
}

.download-size {
  @apply text-sm text-gray-400;
}

.track-actions {
  @apply flex items-center space-x-2;
}

.action-btn {
  @apply p-2 text-gray-400 hover:text-white transition-colors;
}

.playlist-grid {
  @apply grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-6;
}

.playlist-card {
  @apply cursor-pointer;
}

.playlist-image {
  @apply relative mb-4;
  aspect-ratio: 1 / 1;
}

.playlist-image img {
  @apply w-full h-full object-cover rounded-lg;
}

.playlist-info {
  @apply text-center;
}

.playlist-title {
  @apply font-semibold text-white mb-1 line-clamp-1;
}

.playlist-tracks {
  @apply text-sm text-gray-400 line-clamp-1;
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
