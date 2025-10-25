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
      path: '/vibe',
      name: 'vibe',
      component: () => import('@/views/vibe/index.vue'),
      meta: {
        title: 'VIBE'
      }
    },
    {
      path: '/vibe/chart',
      name: 'vibe-chart',
      component: () => import('@/views/vibe/ChartView.vue'),
      meta: {
        title: '차트'
      }
    },
    {
      path: '/vibe/genre/:genre',
      name: 'vibe-genre',
      component: () => import('@/views/vibe/GenreView.vue'),
      meta: {
        title: '장르'
      }
    },
    {
      path: '/vibe/artist/:id',
      name: 'vibe-artist',
      component: () => import('@/views/vibe/ArtistView.vue'),
      meta: {
        title: '아티스트'
      }
    },
    {
      path: '/vibe/album/:id',
      name: 'vibe-album',
      component: () => import('@/views/vibe/AlbumView.vue'),
      meta: {
        title: '앨범'
      }
    },
    {
      path: '/vibe/playlist/:id',
      name: 'vibe-playlist',
      component: () => import('@/views/vibe/PlaylistView.vue'),
      meta: {
        title: '플레이리스트'
      }
    },
    {
      path: '/vibe/search',
      name: 'vibe-search',
      component: () => import('@/views/vibe/SearchView.vue'),
      meta: {
        title: '검색'
      }
    },
    {
      path: '/vibe/my',
      name: 'vibe-my',
      component: () => import('@/views/vibe/MyView.vue'),
      meta: {
        title: '마이뮤직'
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
