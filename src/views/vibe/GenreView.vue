<template>
  <div class="genre-page">
    <!-- VIBE 헤더 -->
    <VibeHeader />
    
    <!-- 메인 컨텐츠 -->
    <div class="vibe-content">
      <!-- 사이드바 -->
      <VibeSidebar />
      
      <!-- 메인 영역 -->
      <main class="main-area">
        <!-- 장르 헤더 -->
        <div class="genre-header">
          <div class="genre-info">
            <h1 class="genre-title">{{ genreInfo.name }}</h1>
            <p class="genre-description">{{ genreInfo.description }}</p>
          </div>
          <div class="genre-image">
            <img :src="genreInfo.image" :alt="genreInfo.name" />
          </div>
        </div>
        
        <!-- 장르 컨텐츠 -->
        <div class="genre-content">
          <!-- 인기 곡 -->
          <section class="section">
            <div class="section-header">
              <h2 class="section-title">인기 곡</h2>
              <button class="play-all-btn">
                <VIcon name="mdi:play" class="w-5 h-5 mr-2" />
                전체 재생
              </button>
            </div>
            
            <div class="track-list">
              <div
                v-for="(track, index) in popularTracks"
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
          
          <!-- 인기 아티스트 -->
          <section class="section">
            <div class="section-header">
              <h2 class="section-title">인기 아티스트</h2>
              <button class="more-btn">더보기</button>
            </div>
            
            <div class="artist-grid">
              <div
                v-for="artist in popularArtists"
                :key="artist.id"
                class="artist-card group"
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
          
          <!-- 최신 앨범 -->
          <section class="section">
            <div class="section-header">
              <h2 class="section-title">최신 앨범</h2>
              <button class="more-btn">더보기</button>
            </div>
            
            <div class="album-grid">
              <div
                v-for="album in latestAlbums"
                :key="album.id"
                class="album-card group"
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
                  <p class="album-date">{{ album.releaseDate }}</p>
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

const genreInfo = ref({
  name: '팝',
  description: '대중적인 팝 음악의 모든 것',
  image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop'
})

const popularTracks = ref([
  {
    id: 1,
    title: '팝 히트곡 1',
    artist: '팝 아티스트',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=64&h=64&fit=crop',
    playCount: '1,234,567'
  },
  {
    id: 2,
    title: '팝 히트곡 2',
    artist: '팝 가수',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f1989a2a25?w=64&h=64&fit=crop',
    playCount: '987,654'
  },
  {
    id: 3,
    title: '팝 히트곡 3',
    artist: '팝 뮤지션',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=64&h=64&fit=crop',
    playCount: '876,543'
  }
])

const popularArtists = ref([
  {
    id: 1,
    name: '팝 아티스트 1',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    followers: '1.2M'
  },
  {
    id: 2,
    name: '팝 아티스트 2',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f1989a2a25?w=300&h=300&fit=crop',
    followers: '890K'
  },
  {
    id: 3,
    name: '팝 아티스트 3',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop',
    followers: '2.1M'
  },
  {
    id: 4,
    name: '팝 아티스트 4',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    followers: '756K'
  }
])

const latestAlbums = ref([
  {
    id: 1,
    title: '최신 팝 앨범 1',
    artist: '팝 아티스트',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    releaseDate: '2024.01.15'
  },
  {
    id: 2,
    title: '최신 팝 앨범 2',
    artist: '팝 가수',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f1989a2a25?w=300&h=300&fit=crop',
    releaseDate: '2024.01.10'
  },
  {
    id: 3,
    title: '최신 팝 앨범 3',
    artist: '팝 뮤지션',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop',
    releaseDate: '2024.01.05'
  },
  {
    id: 4,
    title: '최신 팝 앨범 4',
    artist: '팝 싱어',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    releaseDate: '2024.01.01'
  }
])

interface Track {
  id: number
  title: string
  artist: string
  image: string
  playCount: string
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

onMounted(() => {
  const genre = route.params.genre as string
  console.log('장르:', genre)
  
  // 장르별 데이터 로딩
  if (genre === 'pop') {
    genreInfo.value = {
      name: '팝',
      description: '대중적인 팝 음악의 모든 것',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop'
    }
  } else if (genre === 'rock') {
    genreInfo.value = {
      name: '록',
      description: '강렬한 록 음악의 세계',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f1989a2a25?w=300&h=300&fit=crop'
    }
  }
})
</script>

<style scoped>
.genre-page {
  @apply bg-black text-white min-h-screen;
}

.vibe-content {
  @apply flex flex-col lg:flex-row;
}

.main-area {
  @apply flex-1 lg:ml-64 p-4 lg:p-6;
}

.genre-header {
  @apply flex flex-col lg:flex-row items-center justify-between mb-8 p-4 lg:p-8 bg-gradient-to-r from-purple-900 to-black rounded-lg space-y-4 lg:space-y-0;
}

.genre-info {
  @apply flex-1;
}

.genre-title {
  @apply text-4xl font-bold mb-4;
}

.genre-description {
  @apply text-lg text-gray-300;
}

.genre-image {
  @apply w-32 h-32 lg:w-48 lg:h-48;
}

.genre-image img {
  @apply w-full h-full object-cover rounded-lg;
}

.genre-content {
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
  @apply w-24 text-right;
}

.play-count {
  @apply text-sm text-gray-400;
}

.track-actions {
  @apply flex items-center space-x-2;
}

.action-btn {
  @apply p-2 text-gray-400 hover:text-white transition-colors;
}

.artist-grid {
  @apply grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-6;
}

.album-grid {
  @apply grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-6;
}

.artist-card,
.album-card {
  @apply cursor-pointer;
}

.artist-image,
.album-image {
  @apply relative mb-4;
  aspect-ratio: 1 / 1;
}

.artist-image img,
.album-image img {
  @apply w-full h-full object-cover rounded-lg;
}

.artist-image img {
  @apply rounded-full;
}

.artist-info,
.album-info {
  @apply text-center;
}

.artist-name,
.album-title {
  @apply font-semibold text-white mb-1 line-clamp-1;
}

.artist-followers,
.album-artist {
  @apply text-sm text-gray-400 line-clamp-1;
}

.album-date {
  @apply text-xs text-gray-500 mt-1;
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
