import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { i18n } from './i18n'

// 스타일
import '@/styles/main.css'
import '@/styles/music.css'

// 앱 생성
const app = createApp(App)

// 플러그인 등록
app.use(createPinia())
app.use(router)
app.use(i18n)

// 앱 마운트
app.mount('#app')

// 앱 스토어 초기화
import { useAppStore } from '@/stores/app'
useAppStore().initialize()
