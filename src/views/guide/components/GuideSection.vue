<template>
  <section v-if="isActive" class="component-section">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-semibold">{{ title }}</h2>
      <div class="flex items-center gap-2">
        <button
          v-if="componentProps.showCode"
          @click="toggleCode"
          class="text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <Icon name="mdi:code-tags" class="w-4 h-4 mr-1" />
          {{ showCodeExample ? '숨기기' : '코드 보기' }}
        </button>
        <button
          v-if="componentProps.showProps"
          @click="toggleProps"
          class="text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <Icon name="mdi:cog" class="w-4 h-4 mr-1" />
          {{ showPropsTable ? '숨기기' : 'Props 보기' }}
        </button>
      </div>
    </div>

    <!-- Props 테이블 -->
    <div v-if="componentProps.showProps && showPropsTable" class="mb-8">
      <h3 class="text-lg font-medium mb-4">Props</h3>
      <div class="bg-gray-50 rounded-lg p-4 overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="text-left py-2 px-2">Prop</th>
              <th class="text-left py-2 px-2">Type</th>
              <th class="text-left py-2 px-2">Default</th>
              <th class="text-left py-2 px-2">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="prop in componentProps.props" :key="prop.name" class="border-b border-gray-100">
              <td class="py-2 px-2 font-mono text-blue-600">{{ prop.name }}</td>
              <td class="py-2 px-2 font-mono text-gray-700">{{ prop.type }}</td>
              <td class="py-2 px-2 font-mono text-gray-600">{{ prop.default || '-' }}</td>
              <td class="py-2 px-2 text-gray-700">{{ prop.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 메인 콘텐츠 -->
    <div class="mb-8">
      <slot />
    </div>

    <!-- 코드 예시 -->
    <div v-if="componentProps.showCode && showCodeExample" class="mb-8">
      <h3 class="text-lg font-medium mb-4">코드 예시</h3>
      <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
        <pre class="text-green-400 text-sm"><code>{{ componentProps.codeExample }}</code></pre>
      </div>
    </div>

    <!-- 인터랙티브 데모 -->
    <div v-if="componentProps.showInteractive" class="mb-8">
      <h3 class="text-lg font-medium mb-4">인터랙티브 데모</h3>
      <slot name="interactive" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Prop {
  name: string
  type: string
  default?: string
  description: string
}

interface Props {
  title: string
  isActive: boolean
  showCode?: boolean
  showProps?: boolean
  showInteractive?: boolean
  props?: Prop[]
  codeExample?: string
}

const componentProps = withDefaults(defineProps<Props>(), {
  showCode: true,
  showProps: true,
  showInteractive: true,
  props: () => [],
  codeExample: ''
})

const showCodeExample = ref(false)
const showPropsTable = ref(false)

const toggleCode = () => {
  showCodeExample.value = !showCodeExample.value
}

const toggleProps = () => {
  showPropsTable.value = !showPropsTable.value
}
</script>

<style scoped>
.component-section {
  @apply bg-white rounded-lg shadow-sm p-6;
}

.component-section h2 {
  @apply border-b border-gray-200 pb-4;
}
</style>
