<template>
  <ComponentSection title="Button 컴포넌트" :is-active="isActive">
    <!-- Variants -->
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">Variants</h3>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div class="text-center">
          <VButton variant="filled" class="mb-2">Filled</VButton>
          <p class="text-sm text-gray-600">filled</p>
        </div>
        <div class="text-center">
          <VButton variant="outlined" class="mb-2">Outlined</VButton>
          <p class="text-sm text-gray-600">outlined</p>
        </div>
        <div class="text-center">
          <VButton variant="text" class="mb-2">Text</VButton>
          <p class="text-sm text-gray-600">text</p>
        </div>
        <div class="text-center">
          <VButton variant="tonal" class="mb-2">Tonal</VButton>
          <p class="text-sm text-gray-600">tonal</p>
        </div>
        <div class="text-center">
          <VButton variant="elevated" class="mb-2">Elevated</VButton>
          <p class="text-sm text-gray-600">elevated</p>
        </div>
        <div class="text-center">
          <VButton variant="flat" class="mb-2">Flat</VButton>
          <p class="text-sm text-gray-600">flat</p>
        </div>
      </div>
    </div>

    <!-- Colors -->
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">Colors</h3>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div class="text-center">
          <VButton color="primary" class="mb-2">Primary</VButton>
          <p class="text-sm text-gray-600">primary</p>
        </div>
        <div class="text-center">
          <VButton color="secondary" class="mb-2">Secondary</VButton>
          <p class="text-sm text-gray-600">secondary</p>
        </div>
        <div class="text-center">
          <VButton color="success" class="mb-2">Success</VButton>
          <p class="text-sm text-gray-600">success</p>
        </div>
        <div class="text-center">
          <VButton color="warning" class="mb-2">Warning</VButton>
          <p class="text-sm text-gray-600">warning</p>
        </div>
        <div class="text-center">
          <VButton color="error" class="mb-2">Error</VButton>
          <p class="text-sm text-gray-600">error</p>
        </div>
        <div class="text-center">
          <VButton color="info" class="mb-2">Info</VButton>
          <p class="text-sm text-gray-600">info</p>
        </div>
      </div>
    </div>

    <!-- Sizes -->
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">Sizes</h3>
      <div class="flex items-center gap-4">
        <VButton size="x-small">X-Small</VButton>
        <VButton size="small">Small</VButton>
        <VButton size="default">Default</VButton>
        <VButton size="large">Large</VButton>
        <VButton size="x-large">X-Large</VButton>
      </div>
    </div>

    <!-- States -->
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">States</h3>
      <div class="flex items-center gap-4">
        <VButton>Normal</VButton>
        <VButton disabled>Disabled</VButton>
        <VButton loading>Loading</VButton>
      </div>
    </div>

    <!-- Icons -->
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">Icons</h3>
      <div class="flex items-center gap-4">
        <VButton icon="mdi:plus">Add Item</VButton>
        <VButton icon="mdi:delete" icon-position="right">Delete</VButton>
        <VButton icon="mdi:heart" />
      </div>
    </div>

    <!-- Block -->
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">Block Button</h3>
      <VButton block>Full Width Button</VButton>
    </div>
  </ComponentSection>
</template>

<script setup lang="ts">
import { VButton } from '@/components/ui'
import ComponentSection from './ComponentSection.vue'

interface Props {
  isActive: boolean
}

defineProps<Props>()
</script>


