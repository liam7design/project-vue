<template>
  <div class="music-grid">
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
      <div
        v-for="item in items"
        :key="item.id"
        class="group cursor-pointer"
        @click="handleItemClick(item)"
      >
        <!-- 플레이리스트 카드 -->
        <div v-if="type === 'playlist'" class="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors music-card">
          <div class="relative mb-4">
            <img
              :src="(item as PlaylistItem).image"
              :alt="(item as PlaylistItem).title"
              class="w-full aspect-square object-cover rounded-lg"
            />
            <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-lg flex items-center justify-center transition-all">
              <button class="opacity-0 group-hover:opacity-100 bg-green-500 rounded-full p-3 hover:bg-green-400 transition-all">
                <VIcon name="mdi:play" class="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
          <h3 class="font-semibold text-white mb-1 line-clamp-1">{{ (item as PlaylistItem).title }}</h3>
          <p class="text-sm text-gray-400 line-clamp-2">{{ (item as PlaylistItem).description }}</p>
          <p class="text-xs text-gray-500 mt-1">{{ (item as PlaylistItem).trackCount }}곡</p>
        </div>

        <!-- 트랙 카드 -->
        <div v-else-if="type === 'track'" class="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors music-card">
          <div class="relative mb-4">
            <img
              :src="(item as TrackItem).image"
              :alt="(item as TrackItem).title"
              class="w-full aspect-square object-cover rounded-lg"
            />
            <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-lg flex items-center justify-center transition-all">
              <button class="opacity-0 group-hover:opacity-100 bg-green-500 rounded-full p-3 hover:bg-green-400 transition-all">
                <VIcon name="mdi:play" class="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
          <h3 class="font-semibold text-white mb-1 line-clamp-1">{{ (item as TrackItem).title }}</h3>
          <p class="text-sm text-gray-400 line-clamp-1">{{ (item as TrackItem).artist }}</p>
          <p class="text-xs text-gray-500 mt-1">{{ (item as TrackItem).duration }}</p>
        </div>

        <!-- 아티스트 카드 -->
        <div v-else-if="type === 'artist'" class="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors music-card artist-card">
          <div class="relative mb-4">
            <img
              :src="(item as ArtistItem).image"
              :alt="(item as ArtistItem).name"
              class="w-full aspect-square object-cover rounded-full"
            />
            <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-full flex items-center justify-center transition-all">
              <button class="opacity-0 group-hover:opacity-100 bg-green-500 rounded-full p-3 hover:bg-green-400 transition-all">
                <VIcon name="mdi:play" class="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
          <h3 class="font-semibold text-white mb-1 line-clamp-1">{{ (item as ArtistItem).name }}</h3>
          <p class="text-sm text-gray-400">{{ (item as ArtistItem).followers }} 팔로워</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface PlaylistItem {
  id: number
  title: string
  description: string
  image: string
  trackCount: number
}

interface TrackItem {
  id: number
  title: string
  artist: string
  album: string
  image: string
  duration: string
}

interface ArtistItem {
  id: number
  name: string
  image: string
  followers: string
}

interface Props {
  items: PlaylistItem[] | TrackItem[] | ArtistItem[]
  type: 'playlist' | 'track' | 'artist'
}

const props = defineProps<Props>()

const handleItemClick = (item: PlaylistItem | TrackItem | ArtistItem) => {
  if (props.type === 'playlist') {
    // 플레이리스트 페이지로 이동
    console.log('플레이리스트 클릭:', item)
  } else if (props.type === 'track') {
    // 트랙 재생
    console.log('트랙 재생:', item)
  } else if (props.type === 'artist') {
    // 아티스트 페이지로 이동
    console.log('아티스트 클릭:', item)
  }
}
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
