import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAppStore = defineStore('app', () => {
  // 상태
  const isLoading = ref(false)
  const theme = ref<'light' | 'dark'>('light')
  const locale = ref<'ko' | 'en'>('ko')
  const notifications = ref<Array<{
    id: string
    type: 'success' | 'error' | 'warning' | 'info'
    message: string
    duration?: number
  }>>([])

  // 게터
  const isDarkMode = computed(() => theme.value === 'dark')
  const currentLocale = computed(() => locale.value)

  // 액션
  const setLoading = (loading: boolean) => {
    isLoading.value = loading
  }

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    // 로컬 스토리지에 저장
    localStorage.setItem('theme', theme.value)
  }

  const setLocale = (newLocale: 'ko' | 'en') => {
    locale.value = newLocale
    localStorage.setItem('locale', newLocale)
  }

  const addNotification = (notification: {
    type: 'success' | 'error' | 'warning' | 'info'
    message: string
    duration?: number
  }) => {
    const id = Date.now().toString()
    const newNotification = { id, ...notification }
    notifications.value.push(newNotification)

    // 자동 제거
    if (notification.duration !== 0) {
      setTimeout(() => {
        removeNotification(id)
      }, notification.duration || 5000)
    }
  }

  const removeNotification = (id: string) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  const clearNotifications = () => {
    notifications.value = []
  }

  // 초기화
  const initialize = () => {
    // 로컬 스토리지에서 설정 복원
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark'
    const savedLocale = localStorage.getItem('locale') as 'ko' | 'en'

    if (savedTheme) theme.value = savedTheme
    if (savedLocale) locale.value = savedLocale
  }

  return {
    // 상태
    isLoading,
    theme,
    locale,
    notifications,

    // 게터
    isDarkMode,
    currentLocale,

    // 액션
    setLoading,
    toggleTheme,
    setLocale,
    addNotification,
    removeNotification,
    clearNotifications,
    initialize
  }
})
