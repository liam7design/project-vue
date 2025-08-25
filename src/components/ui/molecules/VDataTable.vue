<template>
  <div class="v-data-table" :class="tableClasses">
    <!-- 테이블 헤더 -->
    <div v-if="title || $slots.header" class="v-data-table__header">
      <slot name="header">
        <h3 v-if="title" class="v-data-table__title">{{ title }}</h3>
      </slot>
    </div>

    <!-- 테이블 컨테이너 -->
    <div class="v-data-table__container">
      <table class="v-data-table__table">
        <!-- 테이블 헤더 -->
        <thead class="v-data-table__thead">
          <tr class="v-data-table__tr">
            <th
              v-for="column in visibleColumns"
              :key="column.key"
              class="v-data-table__th"
              :class="getHeaderClasses(column)"
              @click="handleSort(column)"
            >
              <div class="v-data-table__th-content">
                <span class="v-data-table__th-text">{{ column.title }}</span>
                <Icon
                  v-if="column.sortable"
                  :name="getSortIcon(column)"
                  class="v-data-table__sort-icon"
                />
              </div>
            </th>
          </tr>
        </thead>

        <!-- 테이블 바디 -->
        <tbody class="v-data-table__tbody">
          <tr
            v-for="(item, index) in paginatedItems"
            :key="getItemKey(item, index)"
            class="v-data-table__tr"
            :class="getRowClasses(item, index)"
            @click="handleRowClick(item, index)"
          >
            <td
              v-for="column in visibleColumns"
              :key="column.key"
              class="v-data-table__td"
              :class="getCellClasses(column)"
            >
              <slot
                :name="`item.${column.key}`"
                :item="item"
                :column="column"
                :value="getItemValue(item, column)"
              >
                {{ getItemValue(item, column) }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- 빈 상태 -->
      <div
        v-if="!items.length"
        class="v-data-table__empty"
      >
        <slot name="empty">
          <div class="v-data-table__empty-content">
            <Icon name="mdi:database-off" class="v-data-table__empty-icon" />
            <p class="v-data-table__empty-text">데이터가 없습니다.</p>
          </div>
        </slot>
      </div>
    </div>

    <!-- 페이지네이션 -->
    <div
      v-if="showPagination && totalPages > 1"
      class="v-data-table__pagination"
    >
      <slot name="pagination">
        <div class="v-data-table__pagination-info">
          {{ paginationInfo }}
        </div>
        <div class="v-data-table__pagination-controls">
          <VButton
            size="small"
            variant="outlined"
            :disabled="currentPage === 1"
            @click="goToPage((currentPage || 1) - 1)"
          >
            이전
          </VButton>
          <div class="v-data-table__page-numbers">
            <VButton
              v-for="page in visiblePages"
              :key="page"
              size="small"
              :variant="page === (currentPage || 1) ? 'filled' : 'outlined'"
              @click="goToPage(page)"
            >
              {{ page }}
            </VButton>
          </div>
          <VButton
            size="small"
            variant="outlined"
            :disabled="(currentPage || 1) === totalPages"
            @click="goToPage((currentPage || 1) + 1)"
          >
            다음
          </VButton>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import VButton from '../atoms/VButton.vue'

// Types
export interface DataTableColumn {
  key: string
  title: string
  sortable?: boolean
  width?: string | number
  align?: 'left' | 'center' | 'right'
  fixed?: boolean
  hidden?: boolean
}

export interface SortConfig {
  key: string
  direction: 'asc' | 'desc'
}

export interface DataTableItem {
  [key: string]: string | number | boolean | null | undefined
}

// Props 정의
interface Props {
  // 데이터
  items: DataTableItem[]
  columns: DataTableColumn[]

  // 기본 속성
  title?: string

  // 정렬
  sortBy?: string
  sortDesc?: boolean

  // 페이지네이션
  itemsPerPage?: number
  currentPage?: number
  showPagination?: boolean

  // 선택
  selectable?: boolean
  selectedItems?: DataTableItem[]

  // 스타일
  dense?: boolean
  hover?: boolean
  striped?: boolean
  bordered?: boolean

  // 기타
  itemKey?: string
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  columns: () => [],
  title: '',
  sortBy: '',
  sortDesc: false,
  itemsPerPage: 10,
  currentPage: 1,
  showPagination: true,
  selectable: false,
  selectedItems: () => [],
  dense: false,
  hover: true,
  striped: false,
  bordered: false,
  itemKey: 'id',
  loading: false
})

// Emits 정의
const emit = defineEmits<{
  'update:sortBy': [value: string]
  'update:sortDesc': [value: boolean]
  'update:currentPage': [value: number]
  'update:selectedItems': [value: DataTableItem[]]
  'rowClick': [item: DataTableItem, index: number]
  'sort': [config: SortConfig]
}>()

// Local state
const localSortBy = ref(props.sortBy || '')
const localSortDesc = ref(props.sortDesc)
const localCurrentPage = ref(props.currentPage)
const localSelectedItems = ref([...props.selectedItems])

// Computed 속성들
const tableClasses = computed(() => {
  return [
    'v-data-table',
    {
      'v-data-table--dense': props.dense,
      'v-data-table--hover': props.hover,
      'v-data-table--striped': props.striped,
      'v-data-table--bordered': props.bordered,
      'v-data-table--loading': props.loading
    }
  ]
})

const visibleColumns = computed(() => {
  return props.columns.filter(column => !column.hidden)
})

const sortedItems = computed(() => {
  if (!localSortBy.value) return props.items

  return [...props.items].sort((a, b) => {
    const aValue = a[localSortBy.value] ?? ''
    const bValue = b[localSortBy.value] ?? ''

    let comparison = 0
    if (aValue < bValue) comparison = -1
    if (aValue > bValue) comparison = 1

    return localSortDesc.value ? -comparison : comparison
  })
})

const totalPages = computed(() => {
  return Math.ceil(sortedItems.value.length / props.itemsPerPage)
})

const paginatedItems = computed(() => {
  const start = (localCurrentPage.value - 1) * props.itemsPerPage
  const end = start + props.itemsPerPage
  return sortedItems.value.slice(start, end)
})

const paginationInfo = computed(() => {
  const start = (localCurrentPage.value - 1) * props.itemsPerPage + 1
  const end = Math.min(localCurrentPage.value * props.itemsPerPage, sortedItems.value.length)
  return `${start}-${end} / ${sortedItems.value.length}`
})

const visiblePages = computed(() => {
  const pages: number[] = []
  const maxVisible = 5
  const halfVisible = Math.floor(maxVisible / 2)

  let start = Math.max(1, localCurrentPage.value - halfVisible)
  const end = Math.min(totalPages.value, start + maxVisible - 1)

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

// Methods
const getItemKey = (item: DataTableItem, index: number) => {
  const key = item[props.itemKey]
  return key != null ? String(key) : index
}

const getItemValue = (item: DataTableItem, column: DataTableColumn) => {
  return item[column.key]
}

const getHeaderClasses = (column: DataTableColumn) => {
  return [
    {
      'v-data-table__th--sortable': column.sortable,
      'v-data-table__th--sorted': localSortBy.value === column.key,
      [`v-data-table__th--${column.align || 'left'}`]: true
    }
  ]
}

const getCellClasses = (column: DataTableColumn) => {
  return [
    {
      [`v-data-table__td--${column.align || 'left'}`]: true
    }
  ]
}

const getRowClasses = (item: DataTableItem, index: number) => {
  return [
    {
      'v-data-table__tr--selected': isItemSelected(item),
      'v-data-table__tr--striped': props.striped && index % 2 === 1
    }
  ]
}

const getSortIcon = (column: DataTableColumn) => {
  if (localSortBy.value !== column.key) {
    return 'mdi:unfold-more-horizontal'
  }
  return localSortDesc.value ? 'mdi:chevron-down' : 'mdi:chevron-up'
}

const isItemSelected = (item: DataTableItem) => {
  return localSelectedItems.value.some(selected =>
    getItemKey(selected, 0) === getItemKey(item, 0)
  )
}

const handleSort = (column: DataTableColumn) => {
  if (!column.sortable) return

  if (localSortBy.value === column.key) {
    localSortDesc.value = !localSortDesc.value
  } else {
    localSortBy.value = column.key
    localSortDesc.value = false
  }

  emit('update:sortBy', localSortBy.value)
  emit('update:sortDesc', localSortDesc.value)
  emit('sort', { key: localSortBy.value, direction: localSortDesc.value ? 'desc' : 'asc' })
}

const handleRowClick = (item: DataTableItem, index: number) => {
  if (props.selectable) {
    const itemKey = getItemKey(item, index)
    const selectedIndex = localSelectedItems.value.findIndex(selected =>
      getItemKey(selected, 0) === itemKey
    )

    if (selectedIndex > -1) {
      localSelectedItems.value.splice(selectedIndex, 1)
    } else {
      localSelectedItems.value.push(item)
    }

    emit('update:selectedItems', [...localSelectedItems.value])
  }

  emit('rowClick', item, index)
}

const goToPage = (page: number) => {
  if (page < 1 || page > totalPages.value) return

  localCurrentPage.value = page
  emit('update:currentPage', page)
}

// Watchers
watch(() => props.sortBy, (newValue) => {
  localSortBy.value = newValue || ''
})

watch(() => props.sortDesc, (newValue) => {
  localSortDesc.value = newValue
})

watch(() => props.currentPage, (newValue) => {
  localCurrentPage.value = newValue
})

watch(() => props.selectedItems, (newValue) => {
  localSelectedItems.value = [...newValue]
})
</script>

<style scoped>
.v-data-table {
  @apply w-full;
}

/* Header */
.v-data-table__header {
  @apply p-4 border-b border-gray-200;
}

.v-data-table__title {
  @apply text-lg font-semibold text-gray-900;
}

/* Container */
.v-data-table__container {
  @apply relative overflow-x-auto;
}

/* Table */
.v-data-table__table {
  @apply w-full border-collapse;
}

/* Thead */
.v-data-table__thead {
  @apply bg-gray-50;
}

.v-data-table__th {
  @apply px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider;
  @apply border-b border-gray-200;
}

.v-data-table__th--sortable {
  @apply cursor-pointer hover:bg-gray-100 transition-colors;
}

.v-data-table__th--sorted {
  @apply bg-gray-100;
}

.v-data-table__th--center {
  @apply text-center;
}

.v-data-table__th--right {
  @apply text-right;
}

.v-data-table__th-content {
  @apply flex items-center gap-2;
}

.v-data-table__th-text {
  @apply flex-1;
}

.v-data-table__sort-icon {
  @apply w-4 h-4 text-gray-400;
}

/* Tbody */
.v-data-table__tbody {
  @apply bg-white divide-y divide-gray-200;
}

.v-data-table__tr {
  @apply transition-colors;
}

.v-data-table__tr--hover:hover {
  @apply bg-gray-50;
}

.v-data-table__tr--selected {
  @apply bg-primary-50;
}

.v-data-table__tr--striped {
  @apply bg-gray-50;
}

/* Td */
.v-data-table__td {
  @apply px-4 py-3 text-sm text-gray-900;
  @apply border-b border-gray-200;
}

.v-data-table__td--center {
  @apply text-center;
}

.v-data-table__td--right {
  @apply text-right;
}

/* Dense */
.v-data-table--dense .v-data-table__th,
.v-data-table--dense .v-data-table__td {
  @apply px-2 py-2;
}

/* Bordered */
.v-data-table--bordered .v-data-table__th,
.v-data-table--bordered .v-data-table__td {
  @apply border border-gray-200;
}

/* Empty */
.v-data-table__empty {
  @apply flex items-center justify-center py-12;
}

.v-data-table__empty-content {
  @apply text-center;
}

.v-data-table__empty-icon {
  @apply w-12 h-12 text-gray-400 mx-auto mb-4;
}

.v-data-table__empty-text {
  @apply text-gray-500;
}

/* Pagination */
.v-data-table__pagination {
  @apply flex items-center justify-between px-4 py-3 border-t border-gray-200;
}

.v-data-table__pagination-info {
  @apply text-sm text-gray-700;
}

.v-data-table__pagination-controls {
  @apply flex items-center gap-2;
}

.v-data-table__page-numbers {
  @apply flex items-center gap-1;
}

/* Loading */
.v-data-table--loading {
  @apply opacity-50 pointer-events-none;
}
</style>
