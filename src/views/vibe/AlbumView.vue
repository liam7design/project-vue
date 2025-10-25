<template>
  <div class="album-page">
    <!-- VIBE 헤더 -->
    <VibeHeader />
    
    <!-- 메인 컨텐츠 -->
    <div class="vibe-content">
      <!-- 사이드바 -->
      <VibeSidebar />
      
      <!-- 메인 영역 -->
      <main class="main-area">
        <!-- 앨범 헤더 -->
        <div class="album-header">
          <div class="album-info">
            <div class="album-image">
              <img :src="album.image" :alt="album.title" />
            </div>
            <div class="album-details">
              <h1 class="album-title">{{ album.title }}</h1>
              <p class="album-artist">{{ album.artist }}</p>
              <div class="album-meta">
                <span class="album-year">{{ album.year }}</span>
                <span class="album-genre">{{ album.genre }}</span>
                <span class="album-tracks">{{ album.tracks.length }}곡</span>
              </div>
              <div class="album-actions">
                <button class="play-btn">
                  <VIcon name="mdi:play" class="w-5 h-5 mr-2" />
                  재생
                </button>
                <button class="shuffle-btn">
                  <VIcon name="mdi:shuffle" class="w-5 h-5 mr-2" />
                  셔플
                </button>
                <button class="like-btn">
                  <VIcon name="mdi:heart-outline" class="w-5 h-5 mr-2" />
                  좋아요
                </button>
                <button class="share-btn">
                  <VIcon name="mdi:share" class="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 앨범 컨텐츠 -->
        <div class="album-content">
          <!-- 트랙 리스트 -->
          <section class="section">
            <div class="section-header">
              <h2 class="section-title">곡 목록</h2>
              <div class="section-actions">
                <button class="play-all-btn">
                  <VIcon name="mdi:play" class="w-5 h-5 mr-2" />
                  전체 재생
                </button>
                <button class="download-btn">
                  <VIcon name="mdi:download" class="w-5 h-5 mr-2" />
                  다운로드
                </button>
              </div>
            </div>
            
            <div class="track-list">
              <div class="track-header">
                <div class="track-number-header">#</div>
                <div class="track-title-header">제목</div>
                <div class="track-duration-header">시간</div>
                <div class="track-actions-header">작업</div>
              </div>
              
              <div
                v-for="(track, index) in album.tracks"
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
                <div class="track-duration">
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
          
          <!-- 관련 앨범 -->
          <section class="section">
            <div class="section-header">
              <h2 class="section-title">관련 앨범</h2>
              <button class="more-btn">더보기</button>
            </div>
            
            <div class="album-grid">
              <div
                v-for="relatedAlbum in relatedAlbums"
                :key="relatedAlbum.id"
                class="album-card"
                @click="goToAlbum(relatedAlbum.id)"
              >
                <div class="album-image">
                  <img :src="relatedAlbum.image" :alt="relatedAlbum.title" />
                  <div class="play-overlay">
                    <button class="play-btn">
                      <VIcon name="mdi:play" class="w-6 h-6" />
                    </button>
                  </div>
                </div>
                <div class="album-info">
                  <h3 class="album-title">{{ relatedAlbum.title }}</h3>
                  <p class="album-artist">{{ relatedAlbum.artist }}</p>
                  <p class="album-year">{{ relatedAlbum.year }}</p>
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

const album = ref({
  id: 1,
  title: '첫 번째 앨범',
  artist: '김아티스트',
  year: '2023',
  genre: '팝',
  image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
  tracks: [
    {
      id: 1,
      title: '새로운 시작',
      artist: '김아티스트',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=64&h=64&fit=crop',
      duration: '3:45'
    },
    {
      id: 2,
      title: '밤하늘',
      artist: '김아티스트',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f1989a2a25?w=64&h=64&fit=crop',
      duration: '4:12'
    },
    {
      id: 3,
      title: '도시의 밤',
      artist: '김아티스트',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=64&h=64&fit=crop',
      duration: '3:28'
    },
    {
      id: 4,
      title: '꿈을 향해',
      artist: '김아티스트',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=64&h=64&fit=crop',
      duration: '4:05'
    }
  ]
})

const relatedAlbums = ref([
  {
    id: 2,
    title: '관련 앨범 1',
    artist: '관련 아티스트',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f1989a2a25?w=300&h=300&fit=crop'
  },
  {
    id: 3,
    title: '관련 앨범 2',
    artist: '관련 아티스트',
    year: '2022',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop'
  },
  {
    id: 4,
    title: '관련 앨범 3',
    artist: '관련 아티스트',
    year: '2021',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop'
  },
  {
    id: 5,
    title: '관련 앨범 4',
    artist: '관련 아티스트',
    year: '2020',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f1989a2a25?w=300&h=300&fit=crop'
  }
])

interface Track {
  id: number
  title: string
  artist: string
  image: string
  duration: string
}

const playTrack = (track: Track) => {
  console.log('트랙 재생:', track)
}

const goToAlbum = (id: number) => {
  router.push(`/vibe/album/${id}`)
}

onMounted(() => {
  const albumId = route.params.id
  console.log('앨범 ID:', albumId)
  
  // 앨범 데이터 로딩
})
</script>

<style scoped>
.album-page {
  @apply bg-black text-white min-h-screen;
}

.vibe-content {
  @apply flex flex-col lg:flex-row;
}

.main-area {
  @apply flex-1 lg:ml-64 p-4 lg:p-6;
}

.album-header {
  @apply mb-8 p-4 lg:p-8 bg-gradient-to-r from-purple-900 to-black rounded-lg;
}

.album-info {
  @apply flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-8;
}

.album-image {
  @apply w-32 h-32 lg:w-48 lg:h-48;
}

.album-image img {
  @apply w-full h-full object-cover rounded-lg;
}

.album-details {
  @apply flex-1;
}

.album-title {
  @apply text-4xl font-bold mb-2;
}

.album-artist {
  @apply text-lg text-gray-300 mb-4;
}

.album-meta {
  @apply flex space-x-4 mb-6;
}

.album-year,
.album-genre,
.album-tracks {
  @apply text-sm text-gray-400;
}

.album-actions {
  @apply flex items-center space-x-4;
}

.play-btn {
  @apply flex items-center px-6 py-3 bg-green-500 text-black font-semibold rounded-full hover:bg-green-400 transition-colors;
}

.shuffle-btn {
  @apply flex items-center px-6 py-3 border border-gray-400 text-white font-semibold rounded-full hover:border-white transition-colors;
}

.like-btn {
  @apply flex items-center px-6 py-3 border border-gray-400 text-white font-semibold rounded-full hover:border-white transition-colors;
}

.share-btn {
  @apply p-3 border border-gray-400 text-white rounded-full hover:border-white transition-colors;
}

.album-content {
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

.section-actions {
  @apply flex items-center space-x-4;
}

.play-all-btn {
  @apply flex items-center px-4 py-2 bg-green-500 text-black font-semibold rounded-full hover:bg-green-400 transition-colors;
}

.download-btn {
  @apply flex items-center px-4 py-2 border border-gray-400 text-white font-semibold rounded-full hover:border-white transition-colors;
}

.more-btn {
  @apply text-sm text-gray-400 hover:text-white transition-colors;
}

.track-list {
  @apply space-y-2;
}

.track-header {
  @apply flex items-center px-4 py-2 text-sm text-gray-400 border-b border-gray-800;
}

.track-number-header {
  @apply w-8 text-center;
}

.track-title-header {
  @apply flex-1 ml-4;
}

.track-duration-header {
  @apply w-16 text-right;
}

.track-actions-header {
  @apply w-24 text-center;
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

.track-duration {
  @apply w-16 text-right;
}

.duration {
  @apply text-sm text-gray-500;
}

.track-actions {
  @apply flex items-center space-x-2 w-24 justify-center;
}

.action-btn {
  @apply p-2 text-gray-400 hover:text-white transition-colors;
}

.album-grid {
  @apply grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-6;
}

.album-card {
  @apply cursor-pointer;
}

.album-image {
  @apply relative mb-4;
  aspect-ratio: 1 / 1;
}

.album-image img {
  @apply w-full h-full object-cover rounded-lg;
}

.album-info {
  @apply text-center;
}

.album-title {
  @apply font-semibold text-white mb-1 line-clamp-1;
}

.album-artist {
  @apply text-sm text-gray-400 line-clamp-1;
}

.album-year {
  @apply text-xs text-gray-500 mt-1;
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
