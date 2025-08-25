<template>
  <nav
    ref="navigationRef"
    class="v-navigation"
    :class="navigationClasses"
  >
    <!-- 네비게이션 컨테이너 -->
    <div class="v-navigation__container">
      <!-- 네비게이션 아이템들 -->
      <ul class="v-navigation__list">
        <li
          v-for="item in items"
          :key="item.value"
          class="v-navigation__item"
          :class="getItemClasses(item)"
        >
          <!-- 링크 아이템 -->
          <a
            v-if="item.href"
            :href="item.href"
            v-bind="item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {}"
            class="v-navigation__link"
            :class="getLinkClasses(item)"
            @click="handleItemClick(item)"
          >
            <VIcon
              v-if="item.icon"
              :name="item.icon"
              class="v-navigation__icon"
            />
            <span class="v-navigation__label">{{ item.label }}</span>
            <VBadge
              v-if="item.badge"
              :text="item.badge"
              :color="item.badgeColor || 'primary'"
              :size="item.badgeSize || 'small'"
              class="v-navigation__badge"
            />
            <VIcon
              v-if="item.children && item.children.length > 0"
              name="chevron-down"
              class="v-navigation__arrow"
              :class="{ 'v-navigation__arrow--open': isItemOpen(item) }"
            />
          </a>

          <!-- 버튼 아이템 -->
          <button
            v-else
            type="button"
            class="v-navigation__button"
            :class="getLinkClasses(item)"
            @click="handleItemClick(item)"
          >
            <VIcon
              v-if="item.icon"
              :name="item.icon"
              class="v-navigation__icon"
            />
            <span class="v-navigation__label">{{ item.label }}</span>
            <VBadge
              v-if="item.badge"
              :text="item.badge"
              :color="item.badgeColor || 'primary'"
              :size="item.badgeSize || 'small'"
              class="v-navigation__badge"
            />
            <VIcon
              v-if="item.children && item.children.length > 0"
              name="chevron-down"
              class="v-navigation__arrow"
              :class="{ 'v-navigation__arrow--open': isItemOpen(item) }"
            />
          </button>

          <!-- 서브메뉴 -->
          <div
            v-if="item.children && item.children.length > 0"
            class="v-navigation__submenu"
            :class="getSubmenuClasses(item)"
          >
            <ul class="v-navigation__submenu-list">
              <li
                v-for="child in item.children"
                :key="child.value"
                class="v-navigation__submenu-item"
              >
                <a
                  v-if="child.href"
                  :href="child.href"
                  v-bind="child.external ? { target: '_blank', rel: 'noopener noreferrer' } : {}"
                  class="v-navigation__submenu-link"
                  @click="handleSubmenuItemClick(child, item)"
                >
                  <VIcon
                    v-if="child.icon"
                    :name="child.icon"
                    class="v-navigation__submenu-icon"
                  />
                  <span class="v-navigation__submenu-label">{{ child.label }}</span>
                  <VBadge
                    v-if="child.badge"
                    :text="child.badge"
                    :color="child.badgeColor || 'primary'"
                    :size="child.badgeSize || 'small'"
                    class="v-navigation__submenu-badge"
                  />
                </a>
                <button
                  v-else
                  type="button"
                  class="v-navigation__submenu-button"
                  @click="handleSubmenuItemClick(child, item)"
                >
                  <VIcon
                    v-if="child.icon"
                    :name="child.icon"
                    class="v-navigation__submenu-icon"
                  />
                  <span class="v-navigation__submenu-label">{{ child.label }}</span>
                  <VBadge
                    v-if="child.badge"
                    :text="child.badge"
                    :color="child.badgeColor || 'primary'"
                    :size="child.badgeSize || 'small'"
                    class="v-navigation__submenu-badge"
                  />
                </button>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { VIcon, VBadge } from '@/components/ui'

// Navigation item interface
export interface NavigationItem {
  value: string
  label: string
  href?: string
  icon?: string
  badge?: string
  badgeColor?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
  badgeSize?: 'small' | 'default' | 'large'
  external?: boolean
  active?: boolean
  disabled?: boolean
  children?: NavigationItem[]
}

// Props 정의
interface Props {
  // 기본 속성
  items: NavigationItem[]

  // 스타일
  variant?: 'horizontal' | 'vertical' | 'tabs' | 'pills' | 'underline'
  size?: 'small' | 'default' | 'large'
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'

  // 기능
  multiple?: boolean
  collapsible?: boolean
  expandable?: boolean

  // 기타
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  variant: 'horizontal',
  size: 'default',
  color: 'primary',
  multiple: false,
  collapsible: false,
  expandable: true
})

// Emits 정의
const emit = defineEmits<{
  'itemClick': [item: NavigationItem]
  'submenuItemClick': [item: NavigationItem, parent: NavigationItem]
}>()

// Reactive 상태
const openItems = ref<Set<string>>(new Set())

// Computed 속성들
const navigationClasses = computed(() => {
  return [
    'v-navigation',
    `v-navigation--${props.variant}`,
    `v-navigation--${props.size}`,
    `v-navigation--${props.color}`,
    {
      'v-navigation--multiple': props.multiple,
      'v-navigation--collapsible': props.collapsible,
      'v-navigation--expandable': props.expandable
    }
  ]
})

// Methods
const getItemClasses = (item: NavigationItem) => {
  return [
    'v-navigation__item',
    {
      'v-navigation__item--active': item.active,
      'v-navigation__item--disabled': item.disabled,
      'v-navigation__item--has-children': item.children && item.children.length > 0,
      'v-navigation__item--open': isItemOpen(item)
    }
  ]
}

const getLinkClasses = (item: NavigationItem) => {
  return [
    'v-navigation__link',
    {
      'v-navigation__link--active': item.active,
      'v-navigation__link--disabled': item.disabled
    }
  ]
}

const getSubmenuClasses = (item: NavigationItem) => {
  return [
    'v-navigation__submenu',
    {
      'v-navigation__submenu--open': isItemOpen(item)
    }
  ]
}

const isItemOpen = (item: NavigationItem) => {
  return openItems.value.has(item.value)
}

const toggleItem = (item: NavigationItem) => {
  if (!props.expandable || !item.children || item.children.length === 0) {
    return
  }

  if (props.multiple) {
    if (openItems.value.has(item.value)) {
      openItems.value.delete(item.value)
    } else {
      openItems.value.add(item.value)
    }
  } else {
    openItems.value.clear()
    openItems.value.add(item.value)
  }
}

const handleItemClick = (item: NavigationItem) => {
  if (item.disabled) {
    return
  }

  if (item.children && item.children.length > 0 && props.expandable) {
    toggleItem(item)
  }

  emit('itemClick', item)
}

const handleSubmenuItemClick = (item: NavigationItem, parent: NavigationItem) => {
  if (item.disabled) {
    return
  }

  emit('submenuItemClick', item, parent)
}
</script>

<style scoped>
.v-navigation {
  @apply w-full;
}

/* Variants */
.v-navigation--horizontal {
  @apply flex;
}

.v-navigation--vertical {
  @apply flex flex-col;
}

.v-navigation--tabs {
  @apply flex border-b border-gray-200;
}

.v-navigation--pills {
  @apply flex gap-2;
}

.v-navigation--underline {
  @apply flex border-b border-gray-200;
}

/* Sizes */
.v-navigation--small {
  @apply text-sm;
}

.v-navigation--default {
  @apply text-base;
}

.v-navigation--large {
  @apply text-lg;
}

/* Colors */
.v-navigation--primary {
  @apply text-primary-600;
}

.v-navigation--secondary {
  @apply text-gray-600;
}

.v-navigation--success {
  @apply text-green-600;
}

.v-navigation--warning {
  @apply text-yellow-600;
}

.v-navigation--error {
  @apply text-red-600;
}

.v-navigation--info {
  @apply text-blue-600;
}

/* Container */
.v-navigation__container {
  @apply w-full;
}

/* List */
.v-navigation__list {
  @apply flex list-none;
  @apply m-0 p-0;
}

.v-navigation--vertical .v-navigation__list {
  @apply flex-col;
}

.v-navigation--horizontal .v-navigation__list {
  @apply flex-row;
}

/* Item */
.v-navigation__item {
  @apply relative;
}

.v-navigation--horizontal .v-navigation__item {
  @apply flex;
}

.v-navigation--vertical .v-navigation__item {
  @apply w-full;
}

.v-navigation__item--active {
  @apply font-medium;
}

.v-navigation__item--disabled {
  @apply opacity-50 cursor-not-allowed;
}

.v-navigation__item--has-children {
  @apply relative;
}

/* Link/Button */
.v-navigation__link,
.v-navigation__button {
  @apply flex items-center gap-2;
  @apply px-4 py-2;
  @apply text-inherit no-underline;
  @apply transition-all duration-200;
  @apply hover:bg-gray-100;
  @apply rounded-md;
}

.v-navigation--tabs .v-navigation__link,
.v-navigation--tabs .v-navigation__button {
  @apply border-b-2 border-transparent;
  @apply rounded-none;
  @apply hover:border-gray-300;
}

.v-navigation--pills .v-navigation__link,
.v-navigation--pills .v-navigation__button {
  @apply rounded-full;
}

.v-navigation--underline .v-navigation__link,
.v-navigation--underline .v-navigation__button {
  @apply border-b-2 border-transparent;
  @apply rounded-none;
  @apply hover:border-current;
}

.v-navigation__link--active,
.v-navigation__button--active {
  @apply bg-primary-50 text-primary-700;
}

.v-navigation--tabs .v-navigation__link--active,
.v-navigation--tabs .v-navigation__button--active {
  @apply border-primary-500 text-primary-700;
  @apply bg-transparent;
}

.v-navigation--pills .v-navigation__link--active,
.v-navigation--pills .v-navigation__button--active {
  @apply bg-primary-500 text-white;
}

.v-navigation--underline .v-navigation__link--active,
.v-navigation--underline .v-navigation__button--active {
  @apply border-current;
  @apply bg-transparent;
}

.v-navigation__link--disabled,
.v-navigation__button--disabled {
  @apply opacity-50 cursor-not-allowed;
  @apply hover:bg-transparent;
}

/* Icon */
.v-navigation__icon {
  @apply w-4 h-4;
  @apply flex-shrink-0;
}

/* Label */
.v-navigation__label {
  @apply whitespace-nowrap;
}

/* Badge */
.v-navigation__badge {
  @apply ml-auto;
}

/* Arrow */
.v-navigation__arrow {
  @apply w-4 h-4;
  @apply transition-transform duration-200;
  @apply flex-shrink-0;
}

.v-navigation__arrow--open {
  @apply rotate-180;
}

/* Submenu */
.v-navigation__submenu {
  @apply absolute top-full left-0;
  @apply min-w-48;
  @apply bg-white border border-gray-200 rounded-md shadow-lg;
  @apply opacity-0 invisible;
  @apply transform -translate-y-2;
  @apply transition-all duration-200;
  @apply z-50;
}

.v-navigation--vertical .v-navigation__submenu {
  @apply relative top-auto left-auto;
  @apply min-w-full;
  @apply border-0 shadow-none;
  @apply transform-none;
  @apply max-h-0 overflow-hidden;
}

.v-navigation__submenu--open {
  @apply opacity-100 visible;
  @apply transform translate-y-0;
}

.v-navigation--vertical .v-navigation__submenu--open {
  @apply max-h-96;
}

/* Submenu List */
.v-navigation__submenu-list {
  @apply list-none;
  @apply m-0 p-2;
}

/* Submenu Item */
.v-navigation__submenu-item {
  @apply w-full;
}

/* Submenu Link/Button */
.v-navigation__submenu-link,
.v-navigation__submenu-button {
  @apply flex items-center gap-2;
  @apply w-full px-3 py-2;
  @apply text-gray-700 no-underline;
  @apply hover:bg-gray-100;
  @apply rounded-md;
  @apply transition-colors;
}

/* Submenu Icon */
.v-navigation__submenu-icon {
  @apply w-4 h-4;
  @apply flex-shrink-0;
}

/* Submenu Label */
.v-navigation__submenu-label {
  @apply flex-1;
  @apply text-left;
}

/* Submenu Badge */
.v-navigation__submenu-badge {
  @apply ml-auto;
}

/* Responsive */
@media (max-width: 768px) {
  .v-navigation--horizontal {
    @apply flex-col;
  }

  .v-navigation--horizontal .v-navigation__list {
    @apply flex-col;
  }

  .v-navigation__submenu {
    @apply relative top-auto left-auto;
    @apply min-w-full;
    @apply border-0 shadow-none;
    @apply transform-none;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .v-navigation__link:hover,
  .v-navigation__button:hover {
    @apply bg-gray-700;
  }

  .v-navigation__link--active,
  .v-navigation__button--active {
    @apply bg-primary-900 text-primary-300;
  }

  .v-navigation--tabs .v-navigation__link--active,
  .v-navigation--tabs .v-navigation__button--active {
    @apply border-primary-400 text-primary-300;
    @apply bg-transparent;
  }

  .v-navigation--pills .v-navigation__link--active,
  .v-navigation--pills .v-navigation__button--active {
    @apply bg-primary-600 text-white;
  }

  .v-navigation__submenu {
    @apply bg-gray-800 border-gray-700;
  }

  .v-navigation__submenu-link,
  .v-navigation__submenu-button {
    @apply text-gray-300;
    @apply hover:bg-gray-700;
  }
}
</style>
