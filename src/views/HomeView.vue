<template>
  <div class="animate-fade-in">
    <div class="max-w-4xl mx-auto">
      <!-- 히어로 섹션 -->
      <section class="text-center py-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          Vue 3 + TypeScript + Vite
        </h1>
        <p class="text-xl text-gray-600 mb-8">
          현대적인 웹 애플리케이션 개발을 위한 완벽한 기술 스택
        </p>
        <div class="flex justify-center space-x-4">
          <router-link to="/vibe" class="btn btn-primary">
            <Icon name="mdi:music" class="w-5 h-5 mr-2" />
            VIBE 클론 체험
          </router-link>
          <button @click="showSuccessNotification" class="btn btn-secondary">
            성공 알림
          </button>
          <button @click="showErrorNotification" class="btn btn-danger">
            에러 알림
          </button>
          <button @click="toggleTheme" class="btn btn-outline">
            {{ isDarkMode ? '라이트 모드' : '다크 모드' }}
          </button>
        </div>
      </section>

      <!-- 기능 카드 섹션 -->
      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div class="card">
          <div class="flex items-center mb-4">
            <Icon name="mdi:vuejs" class="w-8 h-8 text-green-500 mr-3" />
            <h3 class="text-lg font-semibold">Vue 3</h3>
          </div>
          <p class="text-gray-600">
            Composition API와 최신 Vue 기능들을 활용한 현대적인 개발 경험
          </p>
        </div>

        <div class="card">
          <div class="flex items-center mb-4">
            <Icon name="mdi:language-typescript" class="w-8 h-8 text-blue-500 mr-3" />
            <h3 class="text-lg font-semibold">TypeScript</h3>
          </div>
          <p class="text-gray-600">
            타입 안전성을 보장하는 강력한 개발 환경
          </p>
        </div>

        <div class="card">
          <div class="flex items-center mb-4">
            <Icon name="mdi:lightning-bolt" class="w-8 h-8 text-yellow-500 mr-3" />
            <h3 class="text-lg font-semibold">Vite</h3>
          </div>
          <p class="text-gray-600">
            빠른 개발 서버와 최적화된 빌드 성능
          </p>
        </div>

        <div class="card">
          <div class="flex items-center mb-4">
            <Icon name="mdi:pinia" class="w-8 h-8 text-orange-500 mr-3" />
            <h3 class="text-lg font-semibold">Pinia</h3>
          </div>
          <p class="text-gray-600">
            Vue 3의 공식 상태 관리 라이브러리
          </p>
        </div>

        <div class="card">
          <div class="flex items-center mb-4">
            <Icon name="mdi:tailwind" class="w-8 h-8 text-cyan-500 mr-3" />
            <h3 class="text-lg font-semibold">Tailwind CSS</h3>
          </div>
          <p class="text-gray-600">
            유틸리티 우선 CSS 프레임워크
          </p>
        </div>

        <div class="card">
          <div class="flex items-center mb-4">
            <Icon name="mdi:test-tube" class="w-8 h-8 text-purple-500 mr-3" />
            <h3 class="text-lg font-semibold">Vitest</h3>
          </div>
          <p class="text-gray-600">
            빠르고 현대적인 테스트 프레임워크
          </p>
        </div>
      </section>

      <!-- 통계 섹션 -->
      <section class="card">
        <h2 class="text-2xl font-bold mb-6">프로젝트 통계</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="text-center">
            <div class="text-3xl font-bold text-blue-600">{{ stats.components }}</div>
            <div class="text-sm text-gray-600">컴포넌트</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-green-600">{{ stats.pages }}</div>
            <div class="text-sm text-gray-600">페이지</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-purple-600">{{ stats.stores }}</div>
            <div class="text-sm text-gray-600">스토어</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-orange-600">{{ stats.tests }}</div>
            <div class="text-sm text-gray-600">테스트</div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAppStore } from '@/stores/app'

// 스토어 사용
const appStore = useAppStore()
const { isDarkMode, addNotification, toggleTheme } = appStore

// 통계 데이터
const stats = ref({
  components: 0,
  pages: 0,
  stores: 0,
  tests: 0
})

// 알림 함수들
const showSuccessNotification = () => {
  addNotification({
    type: 'success',
    message: '성공적으로 처리되었습니다!',
    duration: 3000
  })
}

const showErrorNotification = () => {
  addNotification({
    type: 'error',
    message: '오류가 발생했습니다. 다시 시도해주세요.',
    duration: 5000
  })
}

// 컴포넌트 마운트 시 통계 업데이트
onMounted(() => {
  // 실제 프로젝트에서는 API 호출이나 파일 시스템 스캔으로 통계를 가져올 수 있습니다
  stats.value = {
    components: 12,
    pages: 3,
    stores: 2,
    tests: 8
  }
})
</script>
