import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title?: string
  message: string
  duration: number
}

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref<Notification[]>([])

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Date.now().toString()
    const newNotification = { ...notification, id }

    notifications.value.push(newNotification)

    // 자동 제거 (duration이 0이 아닌 경우)
    if (notification.duration !== 0) {
      setTimeout(() => {
        removeNotification(id)
      }, notification.duration)
    }

    return id
  }

  const removeNotification = (id: string) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  const clearAllNotifications = () => {
    notifications.value = []
  }

  // 편의 메서드들
  const success = (message: string, title?: string, duration = 5000) => {
    return addNotification({ type: 'success', message, title: title || '', duration })
  }

  const error = (message: string, title?: string, duration = 5000) => {
    return addNotification({ type: 'error', message, title: title || '', duration })
  }

  const warning = (message: string, title?: string, duration = 5000) => {
    return addNotification({ type: 'warning', message, title: title || '', duration })
  }

  const info = (message: string, title?: string, duration = 5000) => {
    return addNotification({ type: 'info', message, title: title || '', duration })
  }

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications,
    success,
    error,
    warning,
    info
  }
})
