<template>
  <div class="vibe-player">
    <div class="player-container">
      <!-- 현재 재생 중인 곡 정보 -->
      <div class="track-info">
        <img
          :src="currentTrack?.image || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=64&h=64&fit=crop'"
          :alt="currentTrack?.title"
          class="track-image"
        />
        <div class="track-details">
          <h4 class="track-title">{{ currentTrack?.title || '재생 중인 곡이 없습니다' }}</h4>
          <p class="track-artist">{{ currentTrack?.artist || '' }}</p>
        </div>
        <button class="like-btn">
          <VIcon name="mdi:heart-outline" class="w-5 h-5" />
        </button>
      </div>
      
      <!-- 플레이어 컨트롤 -->
      <div class="player-controls">
        <div class="control-buttons">
          <button class="control-btn">
            <VIcon name="mdi:shuffle" class="w-5 h-5" />
          </button>
          <button class="control-btn">
            <VIcon name="mdi:skip-previous" class="w-6 h-6" />
          </button>
          <button @click="togglePlay" class="play-btn">
            <VIcon :name="isPlaying ? 'mdi:pause' : 'mdi:play'" class="w-6 h-6" />
          </button>
          <button class="control-btn">
            <VIcon name="mdi:skip-next" class="w-6 h-6" />
          </button>
          <button class="control-btn">
            <VIcon name="mdi:repeat" class="w-5 h-5" />
          </button>
        </div>
        
        <!-- 진행 바 -->
        <div class="progress-container">
          <span class="time-text">{{ formatTime(currentTime) }}</span>
          <div class="progress-bar">
            <div class="progress-track">
              <div
                class="progress-fill"
                :style="{ width: `${progressPercentage}%` }"
              ></div>
            </div>
            <input
              type="range"
              min="0"
              :max="duration"
              :value="currentTime"
              @input="handleSeek"
              class="progress-slider"
            />
          </div>
          <span class="time-text">{{ formatTime(duration) }}</span>
        </div>
      </div>
      
      <!-- 추가 컨트롤 -->
      <div class="player-actions">
        <button class="action-btn">
          <VIcon name="mdi:playlist-music" class="w-5 h-5" />
        </button>
        <div class="volume-control">
          <VIcon name="mdi:volume-low" class="w-4 h-4" />
          <div class="volume-slider">
            <div class="volume-track">
              <div
                class="volume-fill"
                :style="{ width: `${volume}%` }"
              ></div>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              :value="volume"
              @input="handleVolumeChange"
              class="volume-input"
            />
          </div>
        </div>
        <button class="action-btn">
          <VIcon name="mdi:fullscreen" class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Track {
  id: number
  title: string
  artist: string
  image: string
  duration: number
}

const currentTrack = ref<Track | null>({
  id: 1,
  title: '새로운 시작',
  artist: '김아티스트',
  image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=64&h=64&fit=crop',
  duration: 225
})

const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(225)
const volume = ref(70)

const progressPercentage = computed(() => {
  return duration.value > 0 ? (currentTime.value / duration.value) * 100 : 0
})

const togglePlay = () => {
  isPlaying.value = !isPlaying.value
  // 실제 재생 로직 구현
}

const handleSeek = (event: Event) => {
  const target = event.target as HTMLInputElement
  currentTime.value = parseInt(target.value)
  // 실제 시크 로직 구현
}

const handleVolumeChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  volume.value = parseInt(target.value)
  // 실제 볼륨 조절 로직 구현
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}
</script>

<style scoped>
.vibe-player {
  @apply fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 z-40;
}

.player-container {
  @apply flex flex-col lg:flex-row items-center justify-between px-4 lg:px-6 py-4 space-y-4 lg:space-y-0;
}

.track-info {
  @apply flex items-center space-x-4 flex-1 min-w-0 order-1 lg:order-none;
}

.track-image {
  @apply w-14 h-14 object-cover rounded;
}

.track-details {
  @apply min-w-0 flex-1;
}

.track-title {
  @apply font-semibold text-white truncate;
}

.track-artist {
  @apply text-sm text-gray-400 truncate;
}

.like-btn {
  @apply p-2 text-gray-400 hover:text-white transition-colors;
}

.player-controls {
  @apply flex flex-col items-center space-y-2 flex-1 max-w-2xl order-2 lg:order-none;
}

.control-buttons {
  @apply flex items-center space-x-4;
}

.control-btn {
  @apply p-2 text-gray-400 hover:text-white transition-colors;
}

.play-btn {
  @apply p-3 bg-white rounded-full hover:scale-105 transition-transform;
}

.play-btn .w-6 {
  @apply text-black;
}

.progress-container {
  @apply flex items-center space-x-3 w-full;
}

.time-text {
  @apply text-xs text-gray-400;
}

.progress-bar {
  @apply flex-1 relative;
}

.progress-track {
  @apply w-full bg-gray-600 rounded-full h-1;
}

.progress-fill {
  @apply bg-white h-1 rounded-full transition-all;
}

.progress-slider {
  @apply absolute inset-0 w-full h-1 opacity-0 cursor-pointer;
}

.player-actions {
  @apply flex items-center space-x-4 flex-1 justify-end order-3 lg:order-none;
}

.action-btn {
  @apply p-2 text-gray-400 hover:text-white transition-colors;
}

.volume-control {
  @apply flex items-center space-x-2;
}

.volume-slider {
  @apply w-20 relative;
}

.volume-track {
  @apply w-full bg-gray-600 rounded-full h-1;
}

.volume-fill {
  @apply bg-white h-1 rounded-full transition-all;
}

.volume-input {
  @apply absolute inset-0 w-full h-1 opacity-0 cursor-pointer;
}
</style>
