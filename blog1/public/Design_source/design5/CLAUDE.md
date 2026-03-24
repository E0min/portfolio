# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

영화 큐레이션 웹사이트 (17기 박민경). Figma 디자인 기반, 순수 HTML/CSS/JavaScript 정적 사이트.

## 개발 환경

- **빌드/번들러 없음** — HTML 파일을 브라우저에서 직접 열거나 간단한 HTTP 서버로 실행
- `fetch_layout.js`는 Figma API 레이아웃 추출용 Node.js 스크립트 (프론트엔드와 무관)
- `package.json`에는 `dotenv`만 의존성으로 포함 (Figma API용)

## 기술 스택

- HTML5, CSS3, Vanilla JavaScript
- Fonts: Bebas Neue (헤딩), Oswald (본문/UI) — Google Fonts
- Icons: Font Awesome 6.6

## 디렉토리 구조 규칙

`pages/`와 `css/`는 동일한 디렉토리 구조를 유지한다. `pages/` 하위에 디렉토리가 추가되면 `css/`에도 동일한 디렉토리를 만들어야 한다.

```
pages/index.html        ↔ css/home.css
pages/all_films.html    ↔ css/all_films.css
pages/Docs/docs.html    ↔ css/Docs/docs.css
pages/EditorsNote/*.html ↔ css/film_detail.css, css/film_showcase.css
```

## 아키텍처

### CSS 구조
- **common.css**: 모든 페이지가 임포트하는 공통 스타일 (헤더, 푸터, 네비게이션, 커스텀 커서, `.content-wrapper` 레이아웃)
- 각 페이지는 `common.css` + 페이지별 CSS를 함께 로드
- 네비게이션(헤더/푸터)은 템플릿 없이 각 HTML에 수동으로 복사되어 있음 — 네비 수정 시 모든 페이지를 업데이트해야 함

### JavaScript (script.js)
단일 파일이 모든 페이지의 인터랙션을 처리:
- 커스텀 커서 (`mousemove` → `.custom-cursor` 위치 업데이트)
- Grid/List 뷰 토글 (`#view-grid` / `#view-list` 전환, All Films 페이지)
- 리스트 호버 시 `data-image` 속성으로 이미지 미리보기
- 커서 따라다니는 이미지 (`#cursor-img`)
- Docs 탭 필터링 (`data-tab` 속성 기반)

### 네비게이션
SPA가 아닌 멀티페이지 구조. 모든 링크는 상대 경로 사용:
- `pages/` 루트 → `all_films.html`, `collections/collections_lists.html`
- 서브디렉토리 → `../all_films.html`, `../index.html`

### 이미지 경로
- `pages/` 루트 페이지: `../images/...`
- 서브디렉토리 페이지: `../../images/...`

## 디자인 규칙

- **반응형 단위**: `vw` 기반 (기준 너비 1920px, `1.0417vw` ≈ 20px)
- **색상**: Primary Pink `#C45481`, Primary Green `#90FC82`, Text Dark `#2B2929`, Text Red `#AA0C1C`
- **레이아웃**: `.content-wrapper` (사이드 마진 `1.0417vw`), `.section` (상단 마진 `7.7083vw`)
- **타이포그래피**: Bebas Neue (제목, uppercase), Oswald (본문/UI, weight 200-600)
- **상세 디자인 규칙은 `DESIGN_GUIDE.md` 참조**

## 코드 컨벤션

- CSS 클래스: kebab-case (예: `.content-wrapper`, `.site-title`)
- 크기 단위: px 대신 vw 사용 권장
- HTML 구조: `#app` > `header` > `.content-wrapper` > 각 섹션

## 주의사항

- `.env` 파일에 Figma API 토큰 포함 — 커밋 금지
- `style_backup.css`는 백업 파일
