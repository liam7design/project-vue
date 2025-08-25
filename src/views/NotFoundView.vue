<template>
  <div class="min-h-screen flex items-center justify-center animate-fade-in">
    <div class="text-center">
      <div class="mb-8">
        <Icon name="mdi:alert-circle-outline" class="w-24 h-24 text-gray-400 mx-auto mb-4" />
        <h1 class="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 class="text-2xl font-semibold text-gray-700 mb-4">
          페이지를 찾을 수 없습니다
        </h2>
        <p class="text-gray-600 mb-8 max-w-md mx-auto">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
      </div>

      <div class="space-x-4">
        <router-link to="/" class="btn btn-primary">
          홈으로 돌아가기
        </router-link>
        <button @click="goBack" class="btn btn-secondary">
          이전 페이지
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useHead } from '@vueuse/head'

const router = useRouter()

// 메타데이터 설정
useHead({
  title: '페이지를 찾을 수 없습니다 - Project Vue',
  meta: [
    { name: 'description', content: '요청하신 페이지를 찾을 수 없습니다.' }
  ]
})

// 이전 페이지로 돌아가기
const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/')
  }
}
</script>
