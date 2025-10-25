<template>
  <div class="vibe-app">
    <!-- VIBE 헤더 -->
    <VibeHeader />

    <!-- 메인 컨텐츠 -->
    <div class="vibe-content">
      <!-- 사이드바 -->
      <VibeSidebar />

      <!-- 메인 영역 -->
      <main class="main-area">
        <!-- 홈 섹션 -->
        <section class="home-section">
          <!-- 추천 플레이리스트 -->
          <div class="section-header">
            <h2 class="section-title">추천 플레이리스트</h2>
            <button class="more-btn">더보기</button>
          </div>
          <div class="playlist-grid">
            <div
              v-for="playlist in featuredPlaylists"
              :key="playlist.id"
              class="playlist-card group"
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
              </div>
            </div>
          </div>

          <!-- 최신 음악 -->
          <div class="section-header">
            <h2 class="section-title">최신 음악</h2>
            <button class="more-btn">더보기</button>
          </div>
          <div class="music-grid">
            <div
              v-for="track in latestMusic"
              :key="track.id"
              class="music-card group"
              @click="playTrack(track)"
            >
              <div class="music-image">
                <img :src="track.image" :alt="track.title" />
                <div class="play-overlay">
                  <button class="play-btn">
                    <VIcon name="mdi:play" class="w-6 h-6" />
                  </button>
                </div>
              </div>
              <div class="music-info">
                <h3 class="music-title">{{ track.title }}</h3>
                <p class="music-artist">{{ track.artist }}</p>
              </div>
            </div>
          </div>

          <!-- 인기 아티스트 -->
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

// 샘플 데이터
const featuredPlaylists = ref([
  {
    id: 1,
    title: '오늘의 히트곡',
    description: '지금 가장 인기 있는 음악들',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop'
  },
  {
    id: 2,
    title: '감성 발라드',
    description: '마음을 울리는 아름다운 발라드',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f1989a2a25?w=300&h=300&fit=crop'
  },
  {
    id: 3,
    title: '에너지 넘치는 댄스',
    description: '몸을 움직이고 싶게 만드는 음악',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop'
  },
  {
    id: 4,
    title: '잔잔한 재즈',
    description: '편안한 시간을 위한 재즈 모음',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop'
  }
])

const latestMusic = ref([
  {
    id: 1,
    title: '새로운 시작',
    artist: '김아티스트',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop'
  },
  {
    id: 2,
    title: '밤하늘',
    artist: '박가수',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f1989a2a25?w=300&h=300&fit=crop'
  },
  {
    id: 3,
    title: '도시의 밤',
    artist: '이뮤지션',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop'
  },
  {
    id: 4,
    title: '꿈을 향해',
    artist: '최싱어',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop'
  }
])

const popularArtists = ref([
  {
    id: 1,
    name: '김아티스트',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    followers: '1.2M'
  },
  {
    id: 2,
    name: '박가수',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f1989a2a25?w=300&h=300&fit=crop',
    followers: '890K'
  },
  {
    id: 3,
    name: '이뮤지션',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop',
    followers: '2.1M'
  },
  {
    id: 4,
    name: '최싱어',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    followers: '756K'
  }
])

const goToPlaylist = (id: number) => {
  router.push(`/vibe/playlist/${id}`)
}

const goToArtist = (id: number) => {
  router.push(`/vibe/artist/${id}`)
}

interface Track {
  id: number
  title: string
  artist: string
  image: string
}

const playTrack = (track: Track) => {
  console.log('트랙 재생:', track)
}

onMounted(() => {
  // 초기 데이터 로딩
})
</script>

<style scoped>
.vibe-app {
  @apply bg-black text-white min-h-screen;
}

.vibe-content {
  @apply flex flex-col lg:flex-row;
}

.main-area {
  @apply flex-1 lg:ml-64 p-4 lg:p-6;
}

.section-header {
  @apply flex justify-between items-center mb-6;
}

.section-title {
  @apply text-2xl font-bold;
}

.more-btn {
  @apply text-sm text-gray-400 hover:text-white transition-colors;
}

.playlist-grid {
  @apply grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-6 mb-8 lg:mb-12;
}

.music-grid {
  @apply grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-6 mb-8 lg:mb-12;
}

.artist-grid {
  @apply grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-6 mb-8 lg:mb-12;
}

.playlist-card,
.music-card,
.artist-card {
  @apply cursor-pointer;
}

.playlist-image,
.music-image,
.artist-image {
  @apply relative mb-4;
  aspect-ratio: 1 / 1;
}

.playlist-image img,
.music-image img,
.artist-image img {
  @apply w-full h-full object-cover rounded-lg;
}

.artist-image img {
  @apply rounded-full;
}

.play-overlay {
  @apply absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-lg flex items-center justify-center transition-all;
}

.play-btn {
  @apply opacity-0 group-hover:opacity-100 bg-green-500 rounded-full p-3 hover:bg-green-400 transition-all;
}

.playlist-info,
.music-info,
.artist-info {
  @apply text-center;
}

.playlist-title,
.music-title,
.artist-name {
  @apply font-semibold text-white mb-1 line-clamp-1;
}

.playlist-desc,
.music-artist,
.artist-followers {
  @apply text-sm text-gray-400 line-clamp-1;
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
