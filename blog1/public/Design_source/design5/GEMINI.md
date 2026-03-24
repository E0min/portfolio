# GEMINI.md - Mean Girl Project Context

This file provides essential context and instructions for AI agents working on the Mean Girl project, a film editorial platform.

## Project Overview

Mean Girl is a high-end editorial platform for film selection, interpretation, and archiving. The project is currently being migrated from a legacy static site (HTML/CSS/JS) to a modern **Next.js 14** application using the App Router.

- **Status:** Incremental migration in progress.
- **Legacy Files:** `pages/` (HTML) and `css/` (CSS).
- **Modern Files:** `src/app/` (Next.js pages), `src/components/` (React components).
- **Core Goal:** Maintain the high-fidelity design while moving to a component-based architecture with dynamic data fetching.

## Technical Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Vanilla CSS (located in `src/app/*.css` and `src/components/*.css`)
- **Fonts:**
  - `Bebas Neue`: Headings (Uppercase)
  - `Oswald`: Body, UI, Navigation
  - `Noto Sans KR`: Korean text support
- **Icons:** Font Awesome 6.6

## Building and Running

- **Development:** `npm run dev` (Starts Next.js dev server)
- **Build:** `npm run build` (Generates production build)
- **Linting:** `npm run lint` (Runs ESLint)
- **Start:** `npm run start` (Runs the built production application)

## Architecture & Conventions

### Directory Structure

- `src/app/`: Contains the App Router pages and global layouts/styles.
- `src/components/`: Reusable UI components (e.g., `Header`, `Footer`, `CustomCursor`, `WishlistButton`).
- `src/data/`: JSON data files for dynamic content (e.g., `editors-notes.json`).
- `public/images/`: Centralized static assets (migrated from legacy `images/`).
- `pages/` & `css/`: **Read-only** legacy files used as references for migration.

### Design System (Mandatory)

Adhere strictly to `DESIGN_GUIDE.md` for any UI changes.

- **Responsiveness:** Use `vw` units instead of `px` where possible. Base reference width is 1920px.
  - `1.0417vw` ≈ 20px
- **Colors:**
  - Primary Pink: `#C45481` (Logo, Links)
  - Primary Green: `#90FC82` (Collections)
  - Text Dark: `#2B2929`
  - Text Red: `#AA0C1C`
- **Typography:** Use the CSS variables defined in `layout.tsx`:
  - `--font-bebas-neue`
  - `--font-oswald`
  - `--font-noto-kr`

### Development Workflow

1. **Migration Path:** Follow the roadmap in `plan.md`.
2. **Componentization:** When migrating a section from legacy HTML, extract it into a React component in `src/components/` if it is likely to be reused.
3. **Data Handling:** Prefer dynamic rendering using `src/data/editors-notes.json` for film details rather than hardcoding content in pages.
4. **Custom Cursor:** The project uses a custom cursor implemented in `src/components/CustomCursor.tsx`. Ensure UI interactions (like hovers) are compatible with this.

## Key Files for Reference

- `CLAUDE.md`: General project guidance and legacy structure rules.
- `DESIGN_GUIDE.md`: Detailed typography and spacing rules.
- `plan.md`: The step-by-step migration roadmap.
- `src/app/layout.tsx`: Root layout, fonts, and global metadata.
- `src/app/globals.css`: Global styles and CSS variables.
