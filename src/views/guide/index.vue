<template>
  <div class="component-guide">
    <div class="container mx-auto px-4 py-8">
      <!-- 헤더 -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Vue UI 컴포넌트 라이브러리</h1>
        <p class="text-lg text-gray-600 mb-4">
          Vuetify 수준의 완전한 기능을 갖춘 Vue 3 + TypeScript UI 컴포넌트 라이브러리입니다.
        </p>
        <div class="flex items-center gap-4 text-sm text-gray-500">
          <span class="flex items-center">
            <Icon name="mdi:package-variant" class="w-4 h-4 mr-1" />
            {{ sections.length }}개의 컴포넌트
          </span>
          <span class="flex items-center">
            <Icon name="mdi:update" class="w-4 h-4 mr-1" />
            최신 업데이트: {{ lastUpdate }}
          </span>
        </div>
      </div>

      <!-- 네비게이션 -->
      <GuideNavigation
        :sections="sections"
        :active-section="activeSection"
        @sectionChange="handleSectionChange"
      />

      <!-- 섹션별 내용 -->
      <div class="space-y-12">
        <Suspense>
          <template #default>
            <component
              :is="currentSectionComponent"
              :is-active="true"
            />
          </template>
          <template #fallback>
            <div class="flex items-center justify-center py-12">
              <div class="text-center">
                <Icon name="mdi:loading" class="w-8 h-8 animate-spin mx-auto mb-4 text-primary-600" />
                <p class="text-gray-600">컴포넌트를 불러오는 중...</p>
              </div>
            </div>
          </template>
        </Suspense>
      </div>

      <!-- 푸터 -->
      <div class="mt-16 pt-8 border-t border-gray-200">
        <div class="text-center text-gray-500">
          <p>Vue UI 컴포넌트 라이브러리 v1.0.0</p>
          <p class="text-sm mt-2">
            Made with ❤️ using Vue 3, TypeScript, and Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineAsyncComponent } from 'vue'
import GuideNavigation from './components/GuideNavigation.vue'

// 지연 로딩을 위한 섹션 컴포넌트들
const ButtonSection = defineAsyncComponent(() => import('./sections/ButtonSection.vue'))
const InputSection = defineAsyncComponent(() => import('./sections/InputSection.vue'))
const SelectSection = defineAsyncComponent(() => import('./sections/SelectSection.vue'))
const CheckboxSection = defineAsyncComponent(() => import('./sections/CheckboxSection.vue'))
const RadioSection = defineAsyncComponent(() => import('./sections/RadioSection.vue'))
const SwitchSection = defineAsyncComponent(() => import('./sections/SwitchSection.vue'))
const TextareaSection = defineAsyncComponent(() => import('./sections/TextareaSection.vue'))
const ProgressSection = defineAsyncComponent(() => import('./sections/ProgressSection.vue'))
const AvatarSection = defineAsyncComponent(() => import('./sections/AvatarSection.vue'))
const IconSection = defineAsyncComponent(() => import('./sections/IconSection.vue'))
const FormSection = defineAsyncComponent(() => import('./sections/FormSection.vue'))
const TooltipSection = defineAsyncComponent(() => import('./sections/TooltipSection.vue'))
const MenuSection = defineAsyncComponent(() => import('./sections/MenuSection.vue'))
const AccordionSection = defineAsyncComponent(() => import('./sections/AccordionSection.vue'))
const TabsSection = defineAsyncComponent(() => import('./sections/TabsSection.vue'))
const StepperSection = defineAsyncComponent(() => import('./sections/StepperSection.vue'))
const NavigationSection = defineAsyncComponent(() => import('./sections/NavigationSection.vue'))
const HeaderSection = defineAsyncComponent(() => import('./sections/HeaderSection.vue'))
const SidebarSection = defineAsyncComponent(() => import('./sections/SidebarSection.vue'))
const FooterSection = defineAsyncComponent(() => import('./sections/FooterSection.vue'))
const LayoutSection = defineAsyncComponent(() => import('./sections/LayoutSection.vue'))
const PageSection = defineAsyncComponent(() => import('./sections/PageSection.vue'))

const activeSection = ref('buttons')
const lastUpdate = new Date().toLocaleDateString('ko-KR')

const sections = [
  { id: 'buttons', title: 'Buttons', category: 'atoms', component: ButtonSection },
  { id: 'inputs', title: 'Inputs', category: 'atoms', component: InputSection },
  { id: 'selects', title: 'Selects', category: 'atoms', component: SelectSection },
  { id: 'checkboxes', title: 'Checkboxes', category: 'atoms', component: CheckboxSection },
  { id: 'radios', title: 'Radios', category: 'atoms', component: RadioSection },
  { id: 'switches', title: 'Switches', category: 'atoms', component: SwitchSection },
  { id: 'textareas', title: 'Textareas', category: 'atoms', component: TextareaSection },
  { id: 'progress', title: 'Progress', category: 'atoms', component: ProgressSection },
  { id: 'avatars', title: 'Avatars', category: 'atoms', component: AvatarSection },
  { id: 'icons', title: 'Icons', category: 'atoms', component: IconSection },
  { id: 'forms', title: 'Forms', category: 'molecules', component: FormSection },
  { id: 'tooltips', title: 'Tooltips', category: 'molecules', component: TooltipSection },
  { id: 'menus', title: 'Menus', category: 'molecules', component: MenuSection },
  { id: 'accordions', title: 'Accordions', category: 'molecules', component: AccordionSection },
  { id: 'tabs', title: 'Tabs', category: 'molecules', component: TabsSection },
  { id: 'steppers', title: 'Steppers', category: 'molecules', component: StepperSection },
  { id: 'navigation', title: 'Navigation', category: 'molecules', component: NavigationSection },
  { id: 'headers', title: 'Headers', category: 'organisms', component: HeaderSection },
  { id: 'sidebars', title: 'Sidebars', category: 'organisms', component: SidebarSection },
  { id: 'footers', title: 'Footers', category: 'organisms', component: FooterSection },
  { id: 'layouts', title: 'Layouts', category: 'templates', component: LayoutSection },
  { id: 'pages', title: 'Pages', category: 'templates', component: PageSection }
]

const currentSectionComponent = computed(() => {
  const section = sections.find(s => s.id === activeSection.value)
  return section?.component || ButtonSection
})

const handleSectionChange = (sectionId: string) => {
  activeSection.value = sectionId
  // URL 해시 업데이트
  window.location.hash = sectionId
}

// URL 해시에서 초기 섹션 로드
const initializeFromHash = () => {
  const hash = window.location.hash.slice(1)
  if (hash && sections.find(s => s.id === hash)) {
    activeSection.value = hash
  }
}

// 컴포넌트 마운트 시 해시 확인
initializeFromHash()
</script>

<style scoped>
.component-guide {
  @apply min-h-screen bg-gray-50;
}
</style>
