<template>
  <div class="search-page">
    <!-- VIBE 헤더 -->
    <VibeHeader />
    
    <!-- 메인 컨텐츠 -->
    <div class="vibe-content">
      <!-- 사이드바 -->
      <VibeSidebar />
      
      <!-- 메인 영역 -->
      <main class="main-area">
        <!-- 검색 헤더 -->
        <div class="search-header">
          <h1 class="search-title">검색 결과</h1>
          <p class="search-query">"{{ searchQuery }}"에 대한 검색 결과</p>
        </div>
        
        <!-- 검색 필터 -->
        <div class="search-filters">
          <button
            v-for="filter in searchFilters"
            :key="filter.id"
            @click="activeFilter = filter.id"
            class="filter-btn"
            :class="{ active: activeFilter === filter.id }"
          >
            {{ filter.name }}
          </button>
        </div>
        
        <!-- 검색 결과 -->
        <div class="search-results">
          <!-- 곡 결과 -->
          <section v-if="activeFilter === 'all' || activeFilter === 'tracks'" class="section">
            <div class="section-header">
              <h2 class="section-title">곡</h2>
              <button class="more-btn">더보기</button>
            </div>
            
            <div class="track-list">
              <div
                v-for="(track, index) in searchResults.tracks"
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
          
          <!-- 아티스트 결과 -->
          <section v-if="activeFilter === 'all' || activeFilter === 'artists'" class="section">
            <div class="section-header">
              <h2 class="section-title">아티스트</h2>
              <button class="more-btn">더보기</button>
            </div>
            
            <div class="artist-grid">
              <div
                v-for="artist in searchResults.artists"
                :key="artist.id"
                class="artist-card"
                @click="goToArtist(artist.id)"
              >
                <div class="artist-image">
                  <img :src="artist.image" :alt="artist.name" />
                  <div class="play-overlay">
                    <button class="play-btn">
                      <VIcon name="mdi:play" class="w-6 h-6" />
                    </button>
                  </div>
                </div>
                <div class="artist-info">
                  <h3 class="artist-name">{{ artist.name }}</h3>
                  <p class="artist-followers">{{ artist.followers }} 팔로워</p>
                </div>
              </div>
            </div>
          </section>
          
          <!-- 앨범 결과 -->
          <section v-if="activeFilter === 'all' || activeFilter === 'albums'" class="section">
            <div class="section-header">
              <h2 class="section-title">앨범</h2>
              <button class="more-btn">더보기</button>
            </div>
            
            <div class="album-grid">
              <div
                v-for="album in searchResults.albums"
                :key="album.id"
                class="album-card"
                @click="goToAlbum(album.id)"
              >
                <div class="album-image">
                  <img :src="album.image" :alt="album.title" />
                  <div class="play-overlay">
                    <button class="play-btn">
                      <VIcon name="mdi:play" class="w-6 h-6" />
                    </button>
                  </div>
                </div>
                <div class="album-info">
                  <h3 class="album-title">{{ album.title }}</h3>
                  <p class="album-artist">{{ album.artist }}</p>
                  <p class="album-year">{{ album.year }}</p>
                </div>
              </div>
            </div>
          </section>
          
          <!-- 플레이리스트 결과 -->
          <section v-if="activeFilter === 'all' || activeFilter === 'playlists'" class="section">
            <div class="section-header">
              <h2 class="section-title">플레이리스트</h2>
              <button class="more-btn">더보기</button>
            </div>
            
            <div class="playlist-grid">
              <div
                v-for="playlist in searchResults.playlists"
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
                  <p class="playlist-desc">{{ playlist.description }}</p>
                  <p class="playlist-tracks">{{ playlist.trackCount }}곡</p>
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
import { useRoute, useRouter } from 'vue-router'
import VibeHeader from '@/components/vibe/VibeHeader.vue'
import VibeSidebar from '@/components/vibe/VibeSidebar.vue'
import VibePlayer from '@/components/vibe/VibePlayer.vue'

const route = useRoute()
const router = useRouter()

const searchQuery = ref('')
const activeFilter = ref('all')

const searchFilters = ref([
  { id: 'all', name: '전체' },
  { id: 'tracks', name: '곡' },
  { id: 'artists', name: '아티스트' },
  { id: 'albums', name: '앨범' },
  { id: 'playlists', name: '플레이리스트' }
])

const searchResults = ref({
  tracks: [
    {
      id: 1,
      title: '검색된 곡 1',
      artist: '검색 아티스트',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=64&h=64&fit=crop',
      playCount: '1,234,567',
      duration: '3:45'
    },
    {
      id: 2,
      title: '검색된 곡 2',
      artist: '검색 가수',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f1989a2a25?w=64&h=64&fit=crop',
      playCount: '987,654',
      duration: '4:12'
    }
  ],
  artists: [
    {
      id: 1,
      name: '검색 아티스트 1',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
      followers: '1.2M'
    },
    {
      id: 2,
      name: '검색 아티스트 2',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f1989a2a25?w=300&h=300&fit=crop',
      followers: '890K'
    }
  ],
  albums: [
    {
      id: 1,
      title: '검색된 앨범 1',
      artist: '검색 아티스트',
      year: '2023',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop'
    },
    {
      id: 2,
      title: '검색된 앨범 2',
      artist: '검색 가수',
      year: '2022',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f1989a2a25?w=300&h=300&fit=crop'
    }
  ],
  playlists: [
    {
      id: 1,
      title: '검색된 플레이리스트 1',
      description: '검색된 플레이리스트 설명',
      trackCount: 25,
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop'
    },
    {
      id: 2,
      title: '검색된 플레이리스트 2',
      description: '검색된 플레이리스트 설명',
      trackCount: 18,
      image: 'https://images.unsplash.com/photo-1511379938547-c1f1989a2a25?w=300&h=300&fit=crop'
    }
  ]
})

interface Track {
  id: number
  title: string
  artist: string
  image: string
  playCount: string
  duration: string
}

const playTrack = (track: Track) => {
  console.log('트랙 재생:', track)
}

const goToArtist = (id: number) => {
  router.push(`/vibe/artist/${id}`)
}

const goToAlbum = (id: number) => {
  router.push(`/vibe/album/${id}`)
}

const goToPlaylist = (id: number) => {
  router.push(`/vibe/playlist/${id}`)
}

onMounted(() => {
  const query = route.query.q as string
  if (query) {
    searchQuery.value = query
    // 검색 실행
    performSearch(query)
  }
})

const performSearch = (query: string) => {
  console.log('검색 실행:', query)
  // 실제 검색 로직 구현
}
</script>

<style scoped>
.search-page {
  @apply bg-black text-white min-h-screen;
}

.vibe-content {
  @apply flex flex-col lg:flex-row;
}

.main-area {
  @apply flex-1 lg:ml-64 p-4 lg:p-6;
}

.search-header {
  @apply mb-8;
}

.search-title {
  @apply text-3xl font-bold mb-2;
}

.search-query {
  @apply text-lg text-gray-300;
}

.search-filters {
  @apply flex space-x-1 bg-gray-800 rounded-lg p-1 mb-8;
}

.filter-btn {
  @apply px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors;
}

.filter-btn.active {
  @apply text-white bg-gray-700 rounded;
}

.search-results {
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

.more-btn {
  @apply text-sm text-gray-400 hover:text-white transition-colors;
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

.track-actions {
  @apply flex items-center space-x-2;
}

.action-btn {
  @apply p-2 text-gray-400 hover:text-white transition-colors;
}

.artist-grid,
.album-grid,
.playlist-grid {
  @apply grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-6;
}

.artist-card,
.album-card,
.playlist-card {
  @apply cursor-pointer;
}

.artist-image,
.album-image,
.playlist-image {
  @apply relative mb-4;
  aspect-ratio: 1 / 1;
}

.artist-image img,
.album-image img,
.playlist-image img {
  @apply w-full h-full object-cover rounded-lg;
}

.artist-image img {
  @apply rounded-full;
}

.artist-info,
.album-info,
.playlist-info {
  @apply text-center;
}

.artist-name,
.album-title,
.playlist-title {
  @apply font-semibold text-white mb-1 line-clamp-1;
}

.artist-followers,
.album-artist,
.playlist-desc {
  @apply text-sm text-gray-400 line-clamp-1;
}

.album-year,
.playlist-tracks {
  @apply text-xs text-gray-500 mt-1;
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
