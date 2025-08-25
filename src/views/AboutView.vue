<template>
  <div class="animate-fade-in">
    <div class="max-w-4xl mx-auto">
      <!-- 헤더 섹션 -->
      <section class="text-center py-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          프로젝트 소개
        </h1>
        <p class="text-xl text-gray-600">
          30년차 Vue 개발자의 경험을 바탕으로 구축된 현대적인 개발 환경
        </p>
      </section>

      <!-- 기술 스택 상세 -->
      <section class="card mb-8">
        <h2 class="text-2xl font-bold mb-6">핵심 기술 스택</h2>
        <div class="space-y-6">
          <div class="border-l-4 border-blue-500 pl-4">
            <h3 class="text-lg font-semibold mb-2">Vue 3 + Composition API</h3>
            <p class="text-gray-600 mb-2">
              최신 Vue 3의 Composition API를 활용하여 더 나은 코드 구성과 재사용성을 제공합니다.
            </p>
            <ul class="text-sm text-gray-500 space-y-1">
              <li>• TypeScript와 완벽한 통합</li>
              <li>• 반응형 시스템의 개선</li>
              <li>• 더 나은 트리 쉐이킹</li>
            </ul>
          </div>

          <div class="border-l-4 border-green-500 pl-4">
            <h3 class="text-lg font-semibold mb-2">TypeScript</h3>
            <p class="text-gray-600 mb-2">
              엄격한 타입 체크를 통해 런타임 오류를 컴파일 타임에 방지합니다.
            </p>
            <ul class="text-sm text-gray-500 space-y-1">
              <li>• 모든 설정에서 strict 모드 활성화</li>
              <li>• 자동 import 및 타입 추론</li>
              <li>• 컴포넌트 Props/Emits 타입 안전성</li>
            </ul>
          </div>

          <div class="border-l-4 border-yellow-500 pl-4">
            <h3 class="text-lg font-semibold mb-2">Vite</h3>
            <p class="text-gray-600 mb-2">
              ES 모듈 기반의 빠른 개발 서버와 최적화된 빌드 도구입니다.
            </p>
            <ul class="text-sm text-gray-500 space-y-1">
              <li>• HMR (Hot Module Replacement)</li>
              <li>• 코드 스플리팅 및 지연 로딩</li>
              <li>• PWA 지원</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 개발 도구 -->
      <section class="card mb-8">
        <h2 class="text-2xl font-bold mb-6">개발 도구</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-semibold mb-3">코드 품질</h3>
            <ul class="space-y-2 text-gray-600">
              <li class="flex items-center">
                <Icon name="mdi:check-circle" class="w-5 h-5 text-green-500 mr-2" />
                ESLint - 코드 품질 검사
              </li>
              <li class="flex items-center">
                <Icon name="mdi:check-circle" class="w-5 h-5 text-green-500 mr-2" />
                Prettier - 코드 포맷팅
              </li>
              <li class="flex items-center">
                <Icon name="mdi:check-circle" class="w-5 h-5 text-green-500 mr-2" />
                Husky - Git hooks
              </li>
              <li class="flex items-center">
                <Icon name="mdi:check-circle" class="w-5 h-5 text-green-500 mr-2" />
                lint-staged - 스테이징된 파일만 검사
              </li>
            </ul>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-3">개발 편의성</h3>
            <ul class="space-y-2 text-gray-600">
              <li class="flex items-center">
                <Icon name="mdi:check-circle" class="w-5 h-5 text-green-500 mr-2" />
                Auto Import - 자동 import
              </li>
              <li class="flex items-center">
                <Icon name="mdi:check-circle" class="w-5 h-5 text-green-500 mr-2" />
                Component Auto Registration
              </li>
              <li class="flex items-center">
                <Icon name="mdi:check-circle" class="w-5 h-5 text-green-500 mr-2" />
                Icon Auto Import
              </li>
              <li class="flex items-center">
                <Icon name="mdi:check-circle" class="w-5 h-5 text-green-500 mr-2" />
                Path Aliases
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 프로젝트 구조 -->
      <section class="card">
        <h2 class="text-2xl font-bold mb-6">프로젝트 구조</h2>
        <div class="bg-gray-50 rounded-lg p-4 font-mono text-sm">
          <pre class="whitespace-pre-wrap"><code>project-vue/
├── public/                 # 정적 파일들
├── src/
│   ├── assets/            # 이미지, 폰트 등 정적 자산
│   ├── components/        # 재사용 가능한 Vue 컴포넌트
│   ├── composables/       # Composition API 훅들
│   ├── router/            # Vue Router 설정
│   ├── stores/            # Pinia 스토어
│   ├── styles/            # 전역 스타일
│   ├── types/             # TypeScript 타입 정의
│   ├── utils/             # 유틸리티 함수들
│   ├── views/             # 페이지 컴포넌트
│   ├── App.vue            # 루트 컴포넌트
│   └── main.ts            # 애플리케이션 진입점
├── index.html             # HTML 템플릿
├── package.json           # 프로젝트 설정 및 의존성
├── vite.config.ts         # Vite 설정
├── tsconfig.json          # TypeScript 설정
└── README.md              # 프로젝트 문서</code></pre>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'

// 메타데이터 설정
useHead({
  title: '소개 - Project Vue',
  meta: [
    { name: 'description', content: 'Vue 3 + TypeScript + Vite 프로젝트 소개' }
  ]
})
</script>
