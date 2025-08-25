import { createRouter, createWebHistory } from 'vue-router'
import { useAppStore } from '@/stores/app'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: {
        title: '홈'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
      meta: {
        title: '소개'
      }
    },
    {
      path: '/components',
      name: 'components',
      component: () => import('@/views/guide/index.vue'),
      meta: {
        title: '컴포넌트 가이드'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
      meta: {
        title: '페이지를 찾을 수 없습니다'
      }
    }
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach((_to, _from, next) => {
  const appStore = useAppStore()
  appStore.setLoading(true)
  next()
})

router.afterEach((to) => {
  const appStore = useAppStore()
  appStore.setLoading(false)

  // 페이지 제목 설정
  if (to.meta?.title) {
    document.title = `${to.meta.title} - ${import.meta.env.VITE_APP_TITLE}`
  }
})

export default router
