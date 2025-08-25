import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import { createHead } from '@vueuse/head'
import App from './App.vue'
import router from './router'
import './styles/main.css'

// i18n 설정
const i18n = createI18n({
  legacy: false,
  locale: 'ko',
  fallbackLocale: 'en',
  messages: {
    ko: {
      welcome: '환영합니다',
      home: '홈',
      about: '소개'
    },
    en: {
      welcome: 'Welcome',
      home: 'Home',
      about: 'About'
    }
  }
})

// Head 관리
const head = createHead()

// Pinia 스토어
const pinia = createPinia()

// Vue 앱 생성
const app = createApp(App)

// 플러그인 등록
app.use(pinia)
app.use(router)
app.use(i18n)
app.use(head)

// 앱 스토어 초기화
import { useAppStore } from '@/stores/app'
const appStore = useAppStore()
appStore.initialize()

// 앱 마운트
app.mount('#app')
