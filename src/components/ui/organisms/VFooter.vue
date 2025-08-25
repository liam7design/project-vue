<template>
  <footer
    ref="footerRef"
    class="v-footer"
    :class="footerClasses"
  >
    <!-- 푸터 컨테이너 -->
    <div class="v-footer__container">
      <!-- 푸터 콘텐츠 -->
      <div class="v-footer__content">
        <!-- 브랜딩 -->
        <div
          v-if="showBranding"
          class="v-footer__branding"
          :class="brandingClasses"
        >
          <slot name="branding">
            <div class="v-footer__brand">
              <img
                v-if="logo"
                :src="logo"
                :alt="logoAlt"
                class="v-footer__logo"
              />
              <span v-else class="v-footer__title">{{ title }}</span>
            </div>
            <p v-if="description" class="v-footer__description">
              {{ description }}
            </p>
          </slot>
        </div>

        <!-- 링크 섹션들 -->
        <div
          v-if="showLinks"
          class="v-footer__links"
          :class="linksClasses"
        >
          <slot name="links">
            <div
              v-for="section in linkSections"
              :key="section.title"
              class="v-footer__link-section"
            >
              <h3 class="v-footer__link-title">{{ section.title }}</h3>
              <ul class="v-footer__link-list">
                <li
                  v-for="link in section.links"
                  :key="link.value"
                  class="v-footer__link-item"
                >
                  <a
                    :href="link.href"
                    v-bind="link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {}"
                    class="v-footer__link"
                    @click="handleLinkClick(link)"
                  >
                    {{ link.label }}
                  </a>
                </li>
              </ul>
            </div>
          </slot>
        </div>

        <!-- 소셜 미디어 -->
        <div
          v-if="showSocial"
          class="v-footer__social"
          :class="socialClasses"
        >
          <slot name="social">
            <h3 v-if="socialTitle" class="v-footer__social-title">
              {{ socialTitle }}
            </h3>
            <div class="v-footer__social-links">
              <a
                v-for="social in socialLinks"
                :key="social.platform"
                :href="social.href"
                v-bind="social.external ? { target: '_blank', rel: 'noopener noreferrer' } : {}"
                class="v-footer__social-link"
                :class="getSocialLinkClasses(social)"
                @click="handleSocialClick(social)"
              >
                <VIcon
                  :name="social.icon"
                  class="v-footer__social-icon"
                />
                <span v-if="showSocialLabels" class="v-footer__social-label">
                  {{ social.label }}
                </span>
              </a>
            </div>
          </slot>
        </div>
      </div>

      <!-- 푸터 하단 -->
      <div
        v-if="showBottom"
        class="v-footer__bottom"
        :class="bottomClasses"
      >
        <slot name="bottom">
          <div class="v-footer__bottom-content">
            <div class="v-footer__copyright">
              <slot name="copyright">
                <p class="v-footer__copyright-text">
                  © {{ currentYear }} {{ copyrightText }}. All rights reserved.
                </p>
              </slot>
            </div>
            <div class="v-footer__legal">
              <slot name="legal">
                <a
                  v-for="legal in legalLinks"
                  :key="legal.value"
                  :href="legal.href"
                  class="v-footer__legal-link"
                  @click="handleLegalClick(legal)"
                >
                  {{ legal.label }}
                </a>
              </slot>
            </div>
          </div>
        </slot>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { VIcon } from '@/components/ui'

// Link interface
interface FooterLink {
  value: string
  label: string
  href: string
  external?: boolean
}

// Link section interface
interface LinkSection {
  title: string
  links: FooterLink[]
}

// Social link interface
interface SocialLink {
  platform: string
  label: string
  href: string
  icon: string
  external?: boolean
}

// Legal link interface
interface LegalLink {
  value: string
  label: string
  href: string
}

// Props 정의
interface Props {
  // 기본 속성
  title?: string
  logo?: string
  logoAlt?: string
  description?: string

  // 링크
  linkSections?: LinkSection[]
  showLinks?: boolean

  // 소셜 미디어
  socialLinks?: SocialLink[]
  showSocial?: boolean
  socialTitle?: string
  showSocialLabels?: boolean

  // 법적 링크
  legalLinks?: LegalLink[]
  copyrightText?: string

  // 표시 옵션
  showBranding?: boolean
  showBottom?: boolean

  // 스타일
  variant?: 'default' | 'minimal' | 'extended'
  size?: 'small' | 'default' | 'large'
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'

  // 기능
  fixed?: boolean
  shadow?: boolean

  // 기타
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Vue UI',
  logo: '',
  logoAlt: 'Logo',
  description: 'Vue 3 + TypeScript + Tailwind CSS로 구축된 현대적인 UI 컴포넌트 라이브러리입니다.',
  linkSections: () => [],
  showLinks: true,
  socialLinks: () => [],
  showSocial: false,
  socialTitle: 'Follow us',
  showSocialLabels: false,
  legalLinks: () => [],
  copyrightText: 'Vue UI',
  showBranding: true,
  showBottom: true,
  variant: 'default',
  size: 'default',
  color: 'primary',
  fixed: false,
  shadow: true
})

// Emits 정의
const emit = defineEmits<{
  'linkClick': [link: FooterLink]
  'socialClick': [social: SocialLink]
  'legalClick': [legal: LegalLink]
}>()

// Computed 속성들
const footerClasses = computed(() => {
  return [
    'v-footer',
    `v-footer--${props.variant}`,
    `v-footer--${props.size}`,
    `v-footer--${props.color}`,
    {
      'v-footer--fixed': props.fixed,
      'v-footer--shadow': props.shadow
    }
  ]
})

const brandingClasses = computed(() => {
  return [
    'v-footer__branding',
    {
      'v-footer__branding--hidden': !props.showBranding
    }
  ]
})

const linksClasses = computed(() => {
  return [
    'v-footer__links',
    {
      'v-footer__links--hidden': !props.showLinks
    }
  ]
})

const socialClasses = computed(() => {
  return [
    'v-footer__social',
    {
      'v-footer__social--hidden': !props.showSocial
    }
  ]
})

const bottomClasses = computed(() => {
  return [
    'v-footer__bottom',
    {
      'v-footer__bottom--hidden': !props.showBottom
    }
  ]
})

const currentYear = computed(() => {
  return new Date().getFullYear()
})

// Methods
const getSocialLinkClasses = (social: SocialLink) => {
  return [
    'v-footer__social-link',
    `v-footer__social-link--${social.platform}`
  ]
}

const handleLinkClick = (link: FooterLink) => {
  emit('linkClick', link)
}

const handleSocialClick = (social: SocialLink) => {
  emit('socialClick', social)
}

const handleLegalClick = (legal: LegalLink) => {
  emit('legalClick', legal)
}
</script>

<style scoped>
.v-footer {
  @apply w-full bg-gray-900 text-white;
  @apply transition-all duration-200;
}

/* Variants */
.v-footer--default {
  @apply bg-gray-900;
}

.v-footer--minimal {
  @apply bg-gray-800;
}

.v-footer--extended {
  @apply bg-gray-900;
}

/* Sizes */
.v-footer--small {
  @apply py-8;
}

.v-footer--default {
  @apply py-12;
}

.v-footer--large {
  @apply py-16;
}

/* Colors */
.v-footer--primary {
  @apply bg-primary-900;
}

.v-footer--secondary {
  @apply bg-gray-800;
}

.v-footer--success {
  @apply bg-green-900;
}

.v-footer--warning {
  @apply bg-yellow-900;
}

.v-footer--error {
  @apply bg-red-900;
}

.v-footer--info {
  @apply bg-blue-900;
}

/* Fixed */
.v-footer--fixed {
  @apply fixed bottom-0 left-0 right-0 z-30;
}

/* Shadow */
.v-footer--shadow {
  @apply shadow-lg;
}

/* Container */
.v-footer__container {
  @apply max-w-7xl mx-auto px-4;
}

/* Content */
.v-footer__content {
  @apply grid gap-8;
}

.v-footer--default .v-footer__content {
  @apply grid-cols-1 md:grid-cols-2 lg:grid-cols-4;
}

.v-footer--minimal .v-footer__content {
  @apply grid-cols-1 md:grid-cols-2;
}

.v-footer--extended .v-footer__content {
  @apply grid-cols-1 md:grid-cols-2 lg:grid-cols-5;
}

/* Branding */
.v-footer__branding {
  @apply space-y-4;
}

.v-footer__branding--hidden {
  @apply hidden;
}

.v-footer__brand {
  @apply flex items-center;
}

.v-footer__logo {
  @apply h-8 w-auto;
}

.v-footer__title {
  @apply text-xl font-bold text-white;
}

.v-footer__description {
  @apply text-gray-300 text-sm leading-relaxed;
}

/* Links */
.v-footer__links {
  @apply grid gap-8;
}

.v-footer--default .v-footer__links {
  @apply grid-cols-1 md:grid-cols-3;
}

.v-footer--minimal .v-footer__links {
  @apply grid-cols-1;
}

.v-footer--extended .v-footer__links {
  @apply grid-cols-1 md:grid-cols-4;
}

.v-footer__links--hidden {
  @apply hidden;
}

.v-footer__link-section {
  @apply space-y-4;
}

.v-footer__link-title {
  @apply text-white font-semibold text-sm uppercase tracking-wider;
}

.v-footer__link-list {
  @apply space-y-2;
}

.v-footer__link-item {
  @apply list-none;
}

.v-footer__link {
  @apply text-gray-300 hover:text-white;
  @apply text-sm transition-colors;
}

/* Social */
.v-footer__social {
  @apply space-y-4;
}

.v-footer__social--hidden {
  @apply hidden;
}

.v-footer__social-title {
  @apply text-white font-semibold text-sm uppercase tracking-wider;
}

.v-footer__social-links {
  @apply flex flex-wrap gap-4;
}

.v-footer__social-link {
  @apply flex items-center gap-2 px-3 py-2;
  @apply text-gray-300 hover:text-white;
  @apply rounded-md transition-colors;
}

.v-footer__social-link--facebook:hover {
  @apply bg-blue-600 text-white;
}

.v-footer__social-link--twitter:hover {
  @apply bg-blue-400 text-white;
}

.v-footer__social-link--instagram:hover {
  @apply bg-pink-600 text-white;
}

.v-footer__social-link--linkedin:hover {
  @apply bg-blue-700 text-white;
}

.v-footer__social-link--youtube:hover {
  @apply bg-red-600 text-white;
}

.v-footer__social-icon {
  @apply w-5 h-5;
}

.v-footer__social-label {
  @apply text-sm;
}

/* Bottom */
.v-footer__bottom {
  @apply mt-8 pt-8 border-t border-gray-700;
}

.v-footer__bottom--hidden {
  @apply hidden;
}

.v-footer__bottom-content {
  @apply flex flex-col md:flex-row justify-between items-center gap-4;
}

.v-footer__copyright {
  @apply text-gray-300 text-sm;
}

.v-footer__copyright-text {
  @apply text-gray-300 text-sm;
}

.v-footer__legal {
  @apply flex flex-wrap gap-6;
}

.v-footer__legal-link {
  @apply text-gray-300 hover:text-white;
  @apply text-sm transition-colors;
}

/* Responsive */
@media (max-width: 768px) {
  .v-footer__content {
    @apply grid-cols-1 gap-6;
  }

  .v-footer__links {
    @apply grid-cols-1 gap-6;
  }

  .v-footer__bottom-content {
    @apply flex-col text-center;
  }

  .v-footer__legal {
    @apply justify-center;
  }
}

/* Light mode variants */
.v-footer--primary {
  @apply bg-primary-600;
}

.v-footer--secondary {
  @apply bg-gray-600;
}

.v-footer--success {
  @apply bg-green-600;
}

.v-footer--warning {
  @apply bg-yellow-600;
}

.v-footer--error {
  @apply bg-red-600;
}

.v-footer--info {
  @apply bg-blue-600;
}
</style>
