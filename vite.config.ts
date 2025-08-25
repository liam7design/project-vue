import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { VitePWA } from 'vite-plugin-pwa'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      script: {
        defineModel: true,
        propsDestructure: true
      }
    }),

    // 자동 import 설정
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia',
        '@vueuse/core',
        '@vueuse/head',
        {
          'vue-i18n': ['useI18n', 'createI18n'],
          'vee-validate': ['useField', 'useForm'],
          'dayjs': [['default', 'dayjs']],
          'lodash-es': [
            'debounce',
            'throttle',
            'cloneDeep',
            'isEqual',
            'get',
            'set'
          ]
        }
      ],
      dts: true,
      dirs: ['src/composables', 'src/stores'],
      vueTemplate: true,
      eslintrc: {
        enabled: true
      }
    }),

    // 컴포넌트 자동 등록
    Components({
      dts: true,
      dirs: ['src/components'],
      resolvers: [
        IconsResolver({
          componentPrefix: 'Icon'
        })
      ]
    }),

    // 아이콘 자동 import
    Icons({
      autoInstall: true,
      compiler: 'vue3'
    }),

    // PWA 설정
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\./,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 // 24시간
              }
            }
          }
        ]
      },
      manifest: {
        name: 'Project Vue',
        short_name: 'Vue App',
        description: 'Vue 3 + TypeScript + Vite Application',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    }),

    // Gzip 압축
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz'
    })
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/variables.scss";'
      }
    }
  },

  server: {
    port: 3000,
    host: true,
    open: true
  },

  build: {
    target: 'esnext',
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          'ui-vendor': ['@vueuse/core', 'dayjs', 'lodash-es']
        }
      }
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },

  optimizeDeps: {
    include: ['vue', 'vue-router', 'pinia', '@vueuse/core']
  }
})
