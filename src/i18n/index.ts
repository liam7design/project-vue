import { createI18n } from 'vue-i18n'

const messages = {
  ko: {
    app: {
      title: 'Vue UI 라이브러리',
      toggleTheme: '테마 변경'
    },
    nav: {
      home: '홈',
      about: '소개'
    }
  },
  en: {
    app: {
      title: 'Vue UI Library',
      toggleTheme: 'Toggle Theme'
    },
    nav: {
      home: 'Home',
      about: 'About'
    }
  }
}

export const i18n = createI18n({
  legacy: false,
  locale: 'ko',
  fallbackLocale: 'en',
  messages
})

