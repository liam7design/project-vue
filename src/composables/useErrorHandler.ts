import { ref } from 'vue'

export function useErrorHandler() {
  const errors = ref<Error[]>([])

  const handleError = (error: Error, context?: string) => {
    console.error(`Error${context ? ` in ${context}` : ''}:`, error)

    errors.value.push(error)

    // 에러 알림 표시 (실제 구현에서는 알림 스토어를 사용)
  // const notification: Notification = {
  //   id: Date.now().toString(),
  //   type: 'error',
  //   title: '오류가 발생했습니다',
  //   message: error.message || '알 수 없는 오류가 발생했습니다.',
  //   duration: 5000
  // }
  // useNotificationStore().add(notification)
  }

  const clearErrors = () => {
    errors.value = []
  }

  const getLastError = () => {
    return errors.value[errors.value.length - 1]
  }

  const hasErrors = () => {
    return errors.value.length > 0
  }

  // API 에러 처리
  const handleApiError = (error: unknown, fallbackMessage = 'API 요청 중 오류가 발생했습니다.') => {
    let message = fallbackMessage

    if (error && typeof error === 'object' && 'response' in error) {
      const response = (error as { response?: { data?: { message?: string } } }).response
      if (response?.data?.message) {
        message = response.data.message
      }
    } else if (error && typeof error === 'object' && 'message' in error) {
      message = (error as { message: string }).message
    }

    const apiError = new Error(message)
    handleError(apiError, 'API')
  }

  // 네트워크 에러 처리
  const handleNetworkError = (_error: unknown) => {
    const message = '네트워크 연결을 확인해주세요.'
    const networkError = new Error(message)
    handleError(networkError, 'Network')
  }

  // 유효성 검사 에러 처리
  const handleValidationError = (errors: Record<string, string[]>) => {
    const errorMessages = Object.values(errors).flat()
    const message = errorMessages.join(', ')
    const validationError = new Error(message)
    handleError(validationError, 'Validation')
  }

  return {
    errors,
    handleError,
    clearErrors,
    getLastError,
    hasErrors,
    handleApiError,
    handleNetworkError,
    handleValidationError
  }
}
