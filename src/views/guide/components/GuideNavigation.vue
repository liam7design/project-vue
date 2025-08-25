<template>
  <nav class="mb-8">
    <div class="flex flex-col gap-4">
      <!-- 검색 -->
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="컴포넌트 검색..."
          class="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        <Icon
          name="mdi:magnify"
          class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
        />
      </div>

      <!-- 카테고리별 네비게이션 -->
      <div class="flex flex-wrap gap-2">
        <VChip
          v-for="section in filteredSections"
          :key="section.id"
          :label="section.title"
          :selected="activeSection === section.id"
          filter
          @click="$emit('sectionChange', section.id)"
        />
      </div>

      <!-- 카테고리 필터 -->
      <div class="flex flex-wrap gap-2">
        <button
          v-for="category in categories"
          :key="category.id"
          @click="selectedCategory = category.id"
          class="px-3 py-1 text-sm rounded-md transition-colors" :class="[
            selectedCategory === category.id
              ? 'bg-primary-100 text-primary-700'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          ]"
        >
          {{ category.name }}
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { VChip } from '@/components/ui'

interface Section {
  id: string
  title: string
  category: string
  component: unknown
}

interface Props {
  sections: Section[]
  activeSection: string
}

const props = defineProps<Props>()

defineEmits<{
  sectionChange: [sectionId: string]
}>()

const searchQuery = ref('')
const selectedCategory = ref('all')

const categories = computed(() => {
  const categorySet = new Set(props.sections.map(s => s.category))
  return [
    { id: 'all', name: '전체' },
    ...Array.from(categorySet).map(cat => ({
      id: cat,
      name: getCategoryName(cat)
    }))
  ]
})

const filteredSections = computed(() => {
  let filtered = props.sections

  // 카테고리 필터
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(s => s.category === selectedCategory.value)
  }

  // 검색 필터
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(s =>
      s.title.toLowerCase().includes(query) ||
      s.id.toLowerCase().includes(query)
    )
  }

  return filtered
})

const getCategoryName = (category: string): string => {
  const categoryNames: Record<string, string> = {
    'atoms': '기본 요소',
    'molecules': '분자',
    'organisms': '유기체',
    'templates': '템플릿',
    'layouts': '레이아웃'
  }
  return categoryNames[category] || category
}
</script>
