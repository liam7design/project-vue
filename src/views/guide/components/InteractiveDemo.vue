<template>
  <div class="interactive-demo">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 컨트롤 패널 -->
      <div class="bg-gray-50 rounded-lg p-4">
        <h4 class="text-lg font-medium mb-4">컨트롤</h4>
        <div class="space-y-4">
          <slot name="controls" />
        </div>
      </div>

      <!-- 결과 미리보기 -->
      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <h4 class="text-lg font-medium mb-4">미리보기</h4>
        <div class="flex items-center justify-center min-h-[200px] border-2 border-dashed border-gray-300 rounded-lg">
          <slot name="preview" />
        </div>
      </div>
    </div>

    <!-- 코드 출력 -->
    <div class="mt-6">
      <h4 class="text-lg font-medium mb-4">생성된 코드</h4>
      <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
        <pre class="text-green-400 text-sm"><code>{{ generatedCode }}</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  props: Record<string, unknown>
  componentName: string
}

const props = defineProps<Props>()

const generatedCode = computed(() => {
  const propStrings = Object.entries(props.props)
    .filter(([_, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => {
      if (typeof value === 'string') {
        return `:${key}="${value}"`
      } else if (typeof value === 'boolean') {
        return value ? key : `:${key}="false"`
      } else {
        return `:${key}="${value}"`
      }
    })
    .join(' ')

  return `<${props.componentName} ${propStrings} />`
})
</script>
