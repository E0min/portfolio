_# Frontend Engineering Standards & Paradigms

이 문서는 프로젝트의 일관성, 유지보수성, 확장성을 보장하기 위한 프론트엔드 엔지니어링 표준입니다.

# 1. Core Paradigms (핵심 패러다임)

### 1.1 Declarative UI (선언형 UI)

- **Do**: "어떤 상태일 때 무엇을 보여준다"라고 명세합니다.
- **Don't**: DOM을 직접 조작하거나 명령적으로 제어하지 않습니다.
- **Why**: 상태(State)와 뷰(View)의 동기화를 보장하고 예측 가능성을 높입니다.

### 1.2 Unidirectional Data Flow (단방향 데이터 흐름)

- 데이터는 부모에서 자식으로 `props`를 통해 흐릅니다.
- 자식은 부모의 상태를 직접 변경하지 않고, 부모가 전달한 `handler` 함수를 호출하여 요청합니다.

### 1.3 Separation of Concerns (관심사의 분리)

- **View (UI)**: 데이터가 어떻게 보여질지만 담당합니다. (Stateless 권장)
- **Logic (Hooks)**: 데이터가 어떻게 변하고 처리되는지를 담당합니다. (Stateful)
- **Data (API/Store)**: 원본 데이터의 Fetching 및 전역 상태 관리를 담당합니다.

---

# 2. React Best Practices

### 2.1 Component Composition (합성)

- 복잡한 컴포넌트를 만들 때, 내부에서 모든 것을 처리하기보다 `children`이나 `slot` 패턴(props로 컴포넌트 전달)을 사용하세요.
- **Example**:
    
    ```tsx
    // Bad
    <Card title="Title" content="Content" footerButton={<Button />} />
    
    // Good
    <Card>
      <CardHeader>Title</CardHeader>
      <CardBody>Content</CardBody>
      <CardFooter><Button /></CardFooter>
    </Card>
    
    ```
    

### 2.2 Custom Hooks Pattern

- UI에서 비즈니스 로직(데이터 필터링, 폼 처리, API 호출 등)이 15줄 이상 차지한다면 Custom Hook으로 분리합니다.
- Hook의 이름은 `use`로 시작하며, 반환 값은 데이터와 함수들로 구성합니다.

### 2.3 Immutable State (불변성)

- 객체나 배열 상태를 수정할 때는 반드시 복사본을 만들어 업데이트합니다. (Spread 연산자 `...` 등 활용)
- 복잡한 객체 로직은 `Immer`와 같은 라이브러리나 `useReducer`를 고려합니다.

---

# 3. Next.js 14+ (App Router) Paradigms

### 3.1 Server Components First

- 기본적으로 모든 컴포넌트는 **Server Component**로 작성합니다.
- `useState`, `useEffect`, 브라우저 API(`window`, `localStorage`)가 필요한 경우에만 파일 최상단에 `"use client"`를 선언합니다.
- **Why**: 번들 사이즈 감소, 초기 로딩 속도 향상, 보안(비밀키 은닉) 강화.

### 3.2 Data Fetching

- **Server Component**: `async/await`를 사용하여 컴포넌트 내부에서 직접 데이터를 가져옵니다. `fetch` API의 캐싱 기능을 활용합니다.
- **Client Component**: `useEffect` 대신 `TanStack Query`나 `SWiR` 같은 라이브러리를 사용하여 서버 상태를 관리합니다.

### 3.3 Colocation (위치시키기)

- 특정 페이지에서만 사용되는 컴포넌트나 유틸리티는 해당 페이지 폴더(`src/app/feature-xyz/_components`) 내부에 위치시킵니다.
- 전역적으로 재사용될 때만 `src/components`로 올립니다.

---

# 4. Conventions

### 4.2 Naming Conventions

- **Component**: `kebab-case` (e.g., `use-profile.tsx`)
- **Hook**: `camelCase` (e.g., `use-auth.ts`)
- **Interface/Type**: 명사형 `kebab-case` (e.g., `user`, `topic-data`)
- **Event Handler**: `handle-[action]` (e.g., `handle-submit`, `handle-click`)
- **Props Handler**: `on-[action]` (e.g., `on-submit`, `on-click`)
- **File/Directory**: `kebab-case` 권장 (e.g., `user-profile.tsx`, `auth-guard/`) - *함수나 컴포넌트 파일명에 대쉬(-) 사용 가능*


### 4.4 Directory Structure & Constants

- **Types**: 컴포넌트 내부에서만 쓰이는 타입이 아니면 `src/types` 또는 `src/api/types.ts`로 분리하여 순환 참조를 방지합니다.
- **Constants**: 매직 넘버나 설정값은 `src/constants` 폴더에서 관리합니다.

---

# 5. AI Coding Guide

- **Step-by-Step**: 한 번에 하나의 기능만 구현하고 승인을 받는다.
- **No Unused Code**: 사용하지 않는 라이브러리나 주석 처리된 코드를 생성하지 않는다.
- **Error Handling**: 모든 비동기 작업에는 에러 핸들링 로직(Try-Catch, Error Boundary)을 포함한다.
- AI는 코드를 제안할 때 '왜 이 방식이 최적인지' 짧게 설명한다.
- 승인 전까지는 코드베이스 전체를 수정하는 명령을 금지한다.

# **6. Code Quality & Automation Tools**

표준은 명문화되는 것보다 **자동화되어 강제될 때** 가장 큰 효과를 발휘합니다. 우리 프로젝트는 다음 도구들을 통해 코드 품질을 상시 관리합니다.
**6.1 Static Analysis (ESLint & Prettier)**

- **ESLint**: 단순 문법 오류를 넘어, 프로젝트 패러다임(Strict Mode, Hook 규칙 등)을 강제합니다.
    ◦ `eslint-plugin-react-hooks`: Hook의 규칙 준수 여부 확인.
    ◦ `eslint-plugin-import`: import 순서(Internal vs External) 정렬 및 순환 참조 방지.
    ◦ `unused-imports`: 사용하지 않는 변수 및 임포트 자동 제거.
- **Prettier**: 팀원 간의 코드 스타일(Tabs vs Spaces, Quotes 등) 논쟁을 종결합니다.
    ◦ 저장 시 자동 포맷팅(Format on Save) 설정을 필수로 사용합니다.

### **6.2 Git Hooks (Husky & lint-staged)**

- **Husky**: Git 작업(Commit, Push) 전후에 특정 스크립트를 실행합니다.
- **lint-staged**: 전체 파일이 아닌 **'수정된 파일'**에 대해서만 Lint와 Prettier를 실행하여 커밋 속도를 유지합니다.
- **Rule**: Lint 에러가 있거나 테스트를 통과하지 못한 코드는 절대로 레포지토리에 커밋될 수 없습니다.

### **6.3 Commit Convention (Commitlint)**

- **Standard**: `type: description` 형식을 준수합니다. (e.g., `feat: login logic implementation`)
- **Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.
- **Why**: 변경 이력을 한눈에 파악하고, 자동화된 Release Note 생성을 가능하게 합니다

### **6.4 Type Safety (TypeScript)**

- `any` 사용을 엄격히 금지하며, 불가피한 경우 `unknown`을 사용한 후 타입 가드를 적용합니다.
- API 응답값은 반드시 Interface 또는 Type으로 정의하여 전역에서 타입 추론이 가능하게 합니다

### **🛠️ 개발 환경 적용 가이드 (Prompt for Setup)**

위 도구들을 프로젝트에 빠르게 이식하기 위한 설정 예시입니다.**도구핵심 설정 목적Husky**`pre-commit` 단계에서 `npx lint-staged` 실행**lint-staged**`.ts, .tsx` 파일에 대해 `eslint --fix` 및 `prettier --write` 실행 **Commitlint**`@commitlint/config-conventional`을 통한 메시지 규격화**Note**: AI에게 코드를 요청할 때, "위의 Lint 규칙과 Naming Convention을 준수해서 작성해줘"라고 명시하면 표준에 부합하는 결과물을 더 정확하게 얻을 수 있습니다.