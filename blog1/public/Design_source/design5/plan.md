# Next.js 단계적 마이그레이션 계획 (Incremental Migration)

기존 HTML 파일을 삭제하지 않고, 작은 작업 단위로 나누어 하나씩 Next.js로 이관하는 계획입니다. 모든 작업은 빌드 성공을 우선으로 하며, 기존 데이터는 `pages/` 및 `css/`에 보존합니다.

## Phase 0: 기초 환경 설정 (Next.js Scaffold)
- [ ] `package.json`에 Next.js, React, TypeScript 의존성 및 스크립트 추가
- [ ] `tsconfig.json`, `next.config.mjs` 생성 (절대 경로 `@/*` 설정 포함)
- [ ] `src/app/layout.tsx` (기본 레이아웃) 생성
- [ ] `src/app/globals.css` 생성 (기존 `common.css` 기반)

## Phase 1: 정적 자산 및 전역 스타일 이관
- [ ] `images/` 폴더를 `public/images/`로 안전하게 복사 (원본 유지)
- [ ] `css/common.css` 내용을 `src/app/globals.css`로 이관 (폰트 및 리셋)
- [ ] `script.js`의 인터랙션 로직(커서 등)을 Client Component(`src/components/CustomCursor.tsx`)로 이관

## Phase 2: 공통 UI 컴포넌트화 (추출 및 검증)
- [ ] `src/components/Header.tsx` 구현 (기본 HTML 구조 유지)
- [ ] `src/components/Footer.tsx` 구현
- [ ] `Header`, `Footer`가 모든 페이지에서 정상 렌더링되는지 빈 페이지로 테스트

## Phase 3: 페이지별 순차 마이그레이션 (소규모 단위)

### 3-1. 홈 페이지 (`pages/index.html`)
- [ ] `src/app/page.tsx` 생성 및 `pages/index.html` 본문 구조 이관
- [ ] `css/home.css` 내용을 `src/app/home.css`로 이관 및 연결
- [ ] 이미지 경로 `/images/...`로 수정 및 `next/image` 적용 검토

### 3-2. 영화 목록 페이지 (`pages/all_films.html`)
- [ ] `src/app/all-films/page.tsx` 생성 및 본문 이관
- [ ] `css/all_films.css` 이관 및 연결
- [ ] 그리드 레이아웃 및 호버 인터랙션 작동 확인

### 3-3. 문서 페이지 (`pages/Docs/docs.html`)
- [ ] `src/app/docs/page.tsx` 생성 및 본문 이관
- [ ] `css/Docs/docs.css` 이관 및 연결

### 3-4. 컬렉션 페이지 (`pages/collections/...`)
- [ ] `src/app/collections/collections-lists/page.tsx` 생성 및 이관
- [ ] `css/collections.css` 이관 및 연결

## Phase 4: 동적 상세 페이지 및 데이터화 (Editors' Note)

### 4-1. 데이터 추출 및 JSON 스키마 정의
- [ ] `src/data/editors-notes.json` 표준 데이터 구조 확립
- [ ] 8개 영화별 상세 데이터 추출 및 통합
  - [ ] Anatomy of a Fall, Anora, Parasite 데이터 추출
  - [ ] No Other Choice, Past Lives 데이터 추출
  - [ ] Triangle of Sadness, It Was Just an Accident 데이터 추출
  - [ ] film_detail.html 데이터 추출 및 통합

### 4-2. 상세 페이지 전용 스타일 이관
- [ ] `css/film_showcase.css` 이관 및 연결
- [ ] `css/film_detail.css` 이관 및 연결
- [ ] 쇼케이스 전용 헤더 스타일 대응

### 4-3. 동적 라우트([slug]) 구현 및 렌더링
- [ ] `src/app/editors-note/[slug]/page.tsx` 생성 및 JSON 연동
- [ ] 섹션별(Hero, Scene, Info, Footer) 렌더링 로직 구현
- [ ] 이미지 경로 `/images/` 및 Link 컴포넌트 적용

### 4-4. 검증 및 수정
- [ ] 8개 라우트 정상 작동 확인
- [ ] 레이아웃 및 스타일 최종 보정

## Phase 5: 최종 링크 및 최적화

### 5-1. 내부 링크 전수 검사 및 수정
- [ ] 모든 페이지(/, /all-films, /docs, /collections-lists, /[slug]) 내 .html 링크 전수 제거 및 Link 적용 확인
- [ ] 이미지 경로 /images/ 시작 여부 및 대소문자 불일치 검사

### 5-2. 정적 자산 및 메타데이터 최적화
- [ ] layout.tsx 내 폰트 로딩 및 Metadata 설정 고도화
- [ ] public/images 폴더 구조 및 파일명 정규화 (Vercel 배포 대비)

### 5-3. 빌드 및 배포 검증
- [ ] `npm run build` 성공 여부 확인
- [ ] Vercel 프로덕션 배포 및 라이브 사이트 최종 점검
