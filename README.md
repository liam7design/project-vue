# Project Vue 🚀

30년차 Vue 개발자의 경험을 바탕으로 구축된 **완벽한 현대적인 Vue 3 개발 환경**입니다.

## ✨ 주요 특징

- **🔄 Vue 3 Composition API** - 최신 Vue 3 기능 활용
- **🔒 TypeScript** - 엄격한 타입 체크로 런타임 오류 방지
- **⚡ Vite** - 초고속 개발 서버와 빌드 성능
- **📦 Pinia** - Vue 3 공식 상태 관리
- **🎨 Tailwind CSS** - 유틸리티 우선 CSS 프레임워크
- **🧪 Vitest** - 빠르고 현대적인 테스트 환경
- **🔧 자동화 도구** - Auto Import, Component Registration, Icon Import
- **📱 PWA 지원** - Progressive Web App 기능
- **🌍 i18n** - 다국어 지원
- **🎯 코드 품질** - ESLint, Prettier, Husky, lint-staged

## 🛠️ 기술 스택

### 핵심 프레임워크
- **Vue 3.4+** - Composition API와 최신 Vue 기능들
- **TypeScript 5.3+** - 엄격한 타입 체크와 타입 안전성
- **Vite 5.0+** - 초고속 개발 서버와 최적화된 빌드

### 상태 관리 & 라우팅
- **Pinia 2.1+** - Vue 3의 공식 상태 관리 라이브러리
- **Vue Router 4.2+** - 클라이언트 사이드 라우팅
- **VueUse** - Vue Composition API 유틸리티

### 스타일링 & UI
- **Tailwind CSS 3.4+** - 유틸리티 우선 CSS 프레임워크
- **PostCSS** - CSS 전처리 및 최적화
- **Material Design Icons** - 아이콘 라이브러리

### 개발 도구
- **ESLint 8.56+** - 코드 품질 검사
- **Prettier 3.1+** - 코드 포맷팅
- **Husky** - Git hooks
- **lint-staged** - 스테이징된 파일만 검사

### 테스트
- **Vitest 1.1+** - 빠르고 현대적인 테스트 프레임워크
- **Vue Test Utils** - Vue 컴포넌트 테스트

### 자동화 & 최적화
- **Auto Import** - 자동 import 기능
- **Component Auto Registration** - 컴포넌트 자동 등록
- **Icon Auto Import** - 아이콘 자동 import
- **PWA Plugin** - Progressive Web App 지원
- **Compression Plugin** - Gzip 압축

## 🚀 빠른 시작

### 필수 요구사항
- **Node.js** 18.0+ 
- **npm** 9.0+ 또는 **yarn** 1.22+ 또는 **pnpm** 8.0+

### 설치 및 실행

```bash
# 1. 의존성 설치
npm install

# 2. 개발 서버 실행
npm run dev

# 3. 브라우저에서 확인
# http://localhost:3000
```

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview

# 타입 체크
npm run type-check
```

### 개발 도구

```bash
# 코드 포맷팅
npm run format

# 린팅 (자동 수정)
npm run lint

# 린팅 (검사만)
npm run lint:check

# 테스트 실행
npm run test

# 테스트 UI
npm run test:ui

# 테스트 커버리지
npm run test:coverage
```

## 📁 프로젝트 구조

```
project-vue/
├── public/                 # 정적 파일들
│   ├── favicon.ico
│   └── vite.svg
├── src/
│   ├── assets/            # 이미지, 폰트 등 정적 자산
│   ├── components/        # 재사용 가능한 Vue 컴포넌트
│   │   └── NotificationToast.vue
│   ├── composables/       # Composition API 훅들
│   ├── router/            # Vue Router 설정
│   │   └── index.ts
│   ├── stores/            # Pinia 스토어
│   │   ├── index.ts
│   │   └── app.ts
│   ├── styles/            # 전역 스타일
│   │   ├── main.css
│   │   └── variables.scss
│   ├── types/             # TypeScript 타입 정의
│   ├── utils/             # 유틸리티 함수들
│   ├── views/             # 페이지 컴포넌트
│   │   ├── HomeView.vue
│   │   ├── AboutView.vue
│   │   └── NotFoundView.vue
│   ├── App.vue            # 루트 컴포넌트
│   └── main.ts            # 애플리케이션 진입점
├── .eslintrc.cjs          # ESLint 설정
├── .gitignore             # Git 무시 파일
├── .husky/                # Git hooks
│   └── pre-commit
├── .prettierrc            # Prettier 설정
├── env.d.ts               # 환경 변수 타입 정의
├── index.html             # HTML 템플릿
├── package.json           # 프로젝트 설정 및 의존성
├── postcss.config.js      # PostCSS 설정
├── tailwind.config.js     # Tailwind CSS 설정
├── tsconfig.json          # TypeScript 설정
├── vite.config.ts         # Vite 설정
├── vitest.config.ts       # Vitest 설정
└── README.md              # 프로젝트 문서
```

## 🎯 개발 가이드

### 컴포넌트 작성
- **Composition API** 사용으로 로직 재사용성 향상
- **TypeScript** 타입 정의로 타입 안전성 보장
- **Props와 Emits** 타입 안전성 보장
- **자동 import** 기능으로 개발 생산성 향상

### 상태 관리
- **Pinia** 스토어 사용으로 반응형 상태 관리
- **Composition API** 스토어 패턴 활용
- **타입 안전한** 상태 관리
- **지속성** 지원 (localStorage)

### 라우팅
- **Vue Router 4** 사용
- **라우트 가드** 구현
- **코드 스플리팅** 지원
- **타입 안전한** 라우팅

### 스타일링
- **Tailwind CSS** 유틸리티 클래스 활용
- **컴포넌트 기반** 스타일링
- **반응형 디자인** 지원
- **다크모드** 지원

## 🔧 주요 기능

### 자동화 도구
- **Auto Import**: Vue, Vue Router, Pinia 등 자동 import
- **Component Auto Registration**: 컴포넌트 자동 등록
- **Icon Auto Import**: Material Design Icons 자동 import
- **Path Aliases**: `@/` 경로 별칭 지원

### 개발 도구
- **Hot Module Replacement**: 실시간 코드 변경 반영
- **TypeScript**: 엄격한 타입 체크
- **ESLint + Prettier**: 코드 품질 및 포맷팅
- **Husky + lint-staged**: Git hooks를 통한 코드 품질 관리

### 최적화
- **Tree Shaking**: 사용하지 않는 코드 제거
- **Code Splitting**: 코드 분할로 초기 로딩 속도 개선
- **Gzip Compression**: 파일 압축으로 전송 크기 감소
- **PWA Support**: Progressive Web App 기능

## 🧪 테스트

```bash
# 단위 테스트 실행
npm run test

# 테스트 UI 실행
npm run test:ui

# 커버리지 리포트 생성
npm run test:coverage
```

## 📦 배포

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이센스

이 프로젝트는 MIT 라이센스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 🙏 감사의 말

- [Vue.js](https://vuejs.org/) - Progressive JavaScript Framework
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Pinia](https://pinia.vuejs.org/) - The Vue Store
- [VueUse](https://vueuse.org/) - Collection of Vue Composition Utilities