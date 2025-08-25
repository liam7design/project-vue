<template>
  <div class="notification-toast">
    <TransitionGroup
      name="notification"
      tag="div"
      class="fixed top-4 right-4 z-50 space-y-2"
    >
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="notification-item"
        :class="notificationClasses(notification)"
      >
        <div class="notification-content">
          <Icon
            :name="getIcon(notification.type)"
            class="notification-icon"
          />
          <div class="notification-text">
            <h4 v-if="notification.title" class="notification-title">
              {{ notification.title }}
            </h4>
            <p class="notification-message">
              {{ notification.message }}
            </p>
          </div>
          <button
            @click="removeNotification(notification.id)"
            class="notification-close"
          >
            <Icon name="mdi:close" class="w-4 h-4" />
          </button>
        </div>
        <div
          v-if="notification.duration !== 0"
          class="notification-progress"
          :style="{ animationDuration: `${notification.duration}ms` }"
        />
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useNotificationStore } from '@/stores/notification'

interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title?: string
  message: string
  duration: number
}

const notificationStore = useNotificationStore()

const notifications = computed(() => notificationStore.notifications)

const notificationClasses = (notification: Notification) => {
  return [
    'notification-item',
    `notification-item--${notification.type}`
  ]
}

const getIcon = (type: string) => {
  const icons = {
    success: 'mdi:check-circle',
    error: 'mdi:alert-circle',
    warning: 'mdi:alert',
    info: 'mdi:information'
  }
  return icons[type as keyof typeof icons] || 'mdi:information'
}

const removeNotification = (id: string) => {
  notificationStore.removeNotification(id)
}
</script>

<style scoped>
.notification-item {
  @apply bg-white rounded-lg shadow-lg border-l-4 p-4 min-w-[320px] max-w-[480px];
  @apply transform transition-all duration-300 ease-in-out;
}

.notification-item--success {
  @apply border-green-500;
}

.notification-item--error {
  @apply border-red-500;
}

.notification-item--warning {
  @apply border-yellow-500;
}

.notification-item--info {
  @apply border-blue-500;
}

.notification-content {
  @apply flex items-start gap-3;
}

.notification-icon {
  @apply w-5 h-5 mt-0.5 flex-shrink-0;
}

.notification-item--success .notification-icon {
  @apply text-green-500;
}

.notification-item--error .notification-icon {
  @apply text-red-500;
}

.notification-item--warning .notification-icon {
  @apply text-yellow-500;
}

.notification-item--info .notification-icon {
  @apply text-blue-500;
}

.notification-text {
  @apply flex-1 min-w-0;
}

.notification-title {
  @apply text-sm font-medium text-gray-900 mb-1;
}

.notification-message {
  @apply text-sm text-gray-600;
}

.notification-close {
  @apply text-gray-400 hover:text-gray-600 transition-colors;
  @apply p-1 rounded-full hover:bg-gray-100;
}

.notification-progress {
  @apply absolute bottom-0 left-0 h-1 bg-current opacity-20;
  @apply animate-progress;
}

/* Transitions */
.notification-enter-active,
.notification-leave-active {
  @apply transition-all duration-300 ease-in-out;
}

.notification-enter-from {
  @apply opacity-0 transform translate-x-full;
}

.notification-leave-to {
  @apply opacity-0 transform translate-x-full;
}

.notification-move {
  @apply transition-transform duration-300 ease-in-out;
}

/* Progress animation */
@keyframes progress {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}

.animate-progress {
  animation: progress linear forwards;
}
</style>
