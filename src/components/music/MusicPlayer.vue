<template>
  <div class="music-player fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-4 z-50">
    <div class="flex items-center justify-between">
      <!-- 현재 재생 중인 곡 정보 -->
      <div class="flex items-center space-x-4 flex-1 min-w-0">
        <img
          :src="currentTrack?.image || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=64&h=64&fit=crop'"
          :alt="currentTrack?.title"
          class="w-14 h-14 object-cover rounded"
        />
        <div class="min-w-0 flex-1">
          <h4 class="font-semibold text-white truncate">{{ currentTrack?.title || '재생 중인 곡이 없습니다' }}</h4>
          <p class="text-sm text-gray-400 truncate">{{ currentTrack?.artist || '' }}</p>
        </div>
        <button class="p-2 hover:bg-gray-800 rounded-full transition-colors">
          <VIcon name="mdi:heart-outline" class="w-5 h-5 text-gray-400 hover:text-white" />
        </button>
      </div>

      <!-- 플레이어 컨트롤 -->
      <div class="flex flex-col items-center space-y-2 flex-1 max-w-2xl">
        <!-- 컨트롤 버튼 -->
        <div class="flex items-center space-x-4">
          <button class="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <VIcon name="mdi:shuffle" class="w-5 h-5 text-gray-400 hover:text-white" />
          </button>
          <button class="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <VIcon name="mdi:skip-previous" class="w-6 h-6 text-white" />
          </button>
            <button
              @click="togglePlay"
              class="p-3 bg-white rounded-full hover:scale-105 transition-transform play-button"
            >
            <VIcon :name="isPlaying ? 'mdi:pause' : 'mdi:play'" class="w-6 h-6 text-black" />
          </button>
          <button class="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <VIcon name="mdi:skip-next" class="w-6 h-6 text-white" />
          </button>
          <button class="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <VIcon name="mdi:repeat" class="w-5 h-5 text-gray-400 hover:text-white" />
          </button>
        </div>

        <!-- 진행 바 -->
        <div class="flex items-center space-x-3 w-full">
          <span class="text-xs text-gray-400">{{ formatTime(currentTime) }}</span>
          <div class="flex-1 relative">
            <div class="w-full bg-gray-600 rounded-full h-1">
              <div
                class="bg-white h-1 rounded-full transition-all"
                :style="{ width: `${progressPercentage}%` }"
              ></div>
            </div>
            <input
              type="range"
              min="0"
              :max="duration"
              :value="currentTime"
              @input="handleSeek"
              class="absolute inset-0 w-full h-1 opacity-0 cursor-pointer"
            />
          </div>
          <span class="text-xs text-gray-400">{{ formatTime(duration) }}</span>
        </div>
      </div>

      <!-- 볼륨 및 추가 컨트롤 -->
      <div class="flex items-center space-x-4 flex-1 justify-end">
        <button class="p-2 hover:bg-gray-800 rounded-full transition-colors">
          <VIcon name="mdi:playlist-music" class="w-5 h-5 text-gray-400 hover:text-white" />
        </button>
        <div class="flex items-center space-x-2">
          <VIcon name="mdi:volume-low" class="w-4 h-4 text-gray-400" />
          <div class="w-20 relative">
            <div class="w-full bg-gray-600 rounded-full h-1">
              <div
                class="bg-white h-1 rounded-full transition-all"
                :style="{ width: `${volume}%` }"
              ></div>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              :value="volume"
              @input="handleVolumeChange"
              class="absolute inset-0 w-full h-1 opacity-0 cursor-pointer"
            />
          </div>
        </div>
        <button class="p-2 hover:bg-gray-800 rounded-full transition-colors">
          <VIcon name="mdi:fullscreen" class="w-5 h-5 text-gray-400 hover:text-white" />
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
  duration: 225 // 3분 45초
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
