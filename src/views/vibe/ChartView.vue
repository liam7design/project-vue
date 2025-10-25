<template>
  <div class="chart-page">
    <!-- VIBE 헤더 -->
    <VibeHeader />
    
    <!-- 메인 컨텐츠 -->
    <div class="vibe-content">
      <!-- 사이드바 -->
      <VibeSidebar />
      
      <!-- 메인 영역 -->
      <main class="main-area">
        <!-- 차트 헤더 -->
        <div class="chart-header">
          <h1 class="chart-title">차트</h1>
          <div class="chart-tabs">
            <button
              v-for="tab in chartTabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              class="chart-tab"
              :class="{ active: activeTab === tab.id }"
            >
              {{ tab.name }}
            </button>
          </div>
        </div>
        
        <!-- 차트 컨텐츠 -->
        <div class="chart-content">
          <!-- 실시간 차트 -->
          <div v-if="activeTab === 'realtime'" class="chart-section">
            <div class="section-header">
              <h2 class="section-title">실시간 차트</h2>
              <div class="chart-filters">
                <select v-model="selectedGenre" class="genre-select">
                  <option value="all">전체</option>
                  <option value="pop">팝</option>
                  <option value="rock">록</option>
                  <option value="hiphop">힙합</option>
                  <option value="ballad">발라드</option>
                </select>
              </div>
            </div>
            
            <div class="chart-list">
              <div
                v-for="(track, index) in chartTracks"
                :key="track.id"
                class="chart-item group"
                @click="playTrack(track)"
              >
                <div class="chart-rank">
                  <span class="rank-number">{{ index + 1 }}</span>
                  <div class="rank-change" :class="getRankChangeClass(track.rankChange)">
                    <VIcon :name="getRankChangeIcon(track.rankChange)" class="w-4 h-4" />
                  </div>
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
          </div>
          
          <!-- 주간 차트 -->
          <div v-else-if="activeTab === 'weekly'" class="chart-section">
            <div class="section-header">
              <h2 class="section-title">주간 차트</h2>
              <div class="chart-filters">
                <select v-model="selectedWeek" class="week-select">
                  <option value="this-week">이번 주</option>
                  <option value="last-week">지난 주</option>
                  <option value="2weeks-ago">2주 전</option>
                </select>
              </div>
            </div>
            
            <div class="chart-list">
              <div
                v-for="(track, index) in weeklyChartTracks"
                :key="track.id"
                class="chart-item group"
                @click="playTrack(track)"
              >
                <div class="chart-rank">
                  <span class="rank-number">{{ index + 1 }}</span>
                  <div class="rank-change" :class="getRankChangeClass(track.rankChange)">
                    <VIcon :name="getRankChangeIcon(track.rankChange)" class="w-4 h-4" />
                  </div>
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
          </div>
        </div>
      </main>
    </div>
    
    <!-- 하단 플레이어 -->
    <VibePlayer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import VibeHeader from '@/components/vibe/VibeHeader.vue'
import VibeSidebar from '@/components/vibe/VibeSidebar.vue'
import VibePlayer from '@/components/vibe/VibePlayer.vue'

const activeTab = ref('realtime')
const selectedGenre = ref('all')
const selectedWeek = ref('this-week')

const chartTabs = ref([
  { id: 'realtime', name: '실시간' },
  { id: 'weekly', name: '주간' },
  { id: 'monthly', name: '월간' },
  { id: 'yearly', name: '연간' }
])

const chartTracks = ref([
  {
    id: 1,
    title: '새로운 시작',
    artist: '김아티스트',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=64&h=64&fit=crop',
    playCount: '1,234,567',
    duration: '3:45',
    rankChange: 1
  },
  {
    id: 2,
    title: '밤하늘',
    artist: '박가수',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f1989a2a25?w=64&h=64&fit=crop',
    playCount: '987,654',
    duration: '4:12',
    rankChange: -1
  },
  {
    id: 3,
    title: '도시의 밤',
    artist: '이뮤지션',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=64&h=64&fit=crop',
    playCount: '876,543',
    duration: '3:28',
    rankChange: 0
  }
])

const weeklyChartTracks = ref([
  {
    id: 1,
    title: '주간 1위 곡',
    artist: '주간 아티스트',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=64&h=64&fit=crop',
    playCount: '5,678,901',
    duration: '3:45',
    rankChange: 2
  },
  {
    id: 2,
    title: '주간 2위 곡',
    artist: '주간 가수',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f1989a2a25?w=64&h=64&fit=crop',
    playCount: '4,567,890',
    duration: '4:12',
    rankChange: -1
  }
])

const getRankChangeClass = (change: number) => {
  if (change > 0) return 'rank-up'
  if (change < 0) return 'rank-down'
  return 'rank-same'
}

const getRankChangeIcon = (change: number) => {
  if (change > 0) return 'mdi:trending-up'
  if (change < 0) return 'mdi:trending-down'
  return 'mdi:minus'
}

interface Track {
  id: number
  title: string
  artist: string
  image: string
  playCount: string
  duration: string
  rankChange: number
}

const playTrack = (track: Track) => {
  console.log('트랙 재생:', track)
}

onMounted(() => {
  // 차트 데이터 로딩
})
</script>

<style scoped>
.chart-page {
  @apply bg-black text-white min-h-screen;
}

.vibe-content {
  @apply flex flex-col lg:flex-row;
}

.main-area {
  @apply flex-1 lg:ml-64 p-4 lg:p-6;
}

.chart-header {
  @apply mb-8;
}

.chart-title {
  @apply text-3xl font-bold mb-6;
}

.chart-tabs {
  @apply flex space-x-1 bg-gray-800 rounded-lg p-1;
}

.chart-tab {
  @apply px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors;
}

.chart-tab.active {
  @apply text-white bg-gray-700 rounded;
}

.chart-content {
  @apply space-y-8;
}

.section-header {
  @apply flex justify-between items-center mb-6;
}

.section-title {
  @apply text-2xl font-semibold;
}

.chart-filters {
  @apply flex space-x-4;
}

.genre-select,
.week-select {
  @apply px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:border-green-500 focus:outline-none;
}

.chart-list {
  @apply space-y-2;
}

.chart-item {
  @apply flex items-center space-x-4 p-4 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer;
}

.chart-rank {
  @apply flex items-center space-x-2 w-16;
}

.rank-number {
  @apply text-lg font-bold text-white;
}

.rank-change {
  @apply flex items-center;
}

.rank-up {
  @apply text-green-500;
}

.rank-down {
  @apply text-red-500;
}

.rank-same {
  @apply text-gray-400;
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
</style>
