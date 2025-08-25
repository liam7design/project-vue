import { config } from '@vue/test-utils'
import { vi } from 'vitest'

// 전역 모킹 설정
if (typeof global !== 'undefined') {
  global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn()
  }))
}

// Vue Test Utils 전역 설정
config.global.stubs = {
  'router-link': true,
  'router-view': true
}
