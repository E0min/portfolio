# Design Guide - Mean Girls Project

**Extracted from:** `css/common.css`, `css/home.css`, `css/all_films.css`
**Purpose:** Maintain design consistency across all pages (including new `film_detail.html`).

## 1. Core Principles

-   **Responsiveness:** The site relies heavily on `vw` (viewport width) units for fluid scaling.
    -   Base reference width: `1920px` (implied).
    -   `1.0417vw` ≈ `20px`
    -   `0.0521vw` ≈ `1px`
-   **Typography**: Distinct separation between titles (Bebas Neue) and UI text (Oswald).

## 2. Color Palette

| Usage | Hex Color | Variable Name (Recommended) |
| :--- | :--- | :--- |
| **Primary Pink** (Site Logo, Links) | `#C45481` | `--color-primary-pink` |
| **Primary Green** (Collections) | `#90FC82` | `--color-primary-green` |
| **Text Dark** (Body, Titles) | `#2B2929` | `--color-text-dark` |
| **Text Red** (Hero Titles) | `#AA0C1C` | `--color-text-red` |
| **Meta/Accent Yellow** | `#f1c40f` | `--color-accent-yellow` |
| **Background Light** | `#ffffff` | `--color-bg-light` |
| **Background Dark** | `#000000` | `--color-bg-dark` |
| **Borders** | `#ECECEC` | `--color-border` |

## 3. Typography System

### Fonts
-   **Headings**: `Bebas Neue` (Condensed, Uppercase)
-   **Body / UI**: `Oswald` (Sans-serif, various weights)

### Type Scale (Desktop Reference)

| Element | Font Family | Size (px) | Size (vw) | Weight | Line Height |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Title** | Bebas Neue | ~160px | `8.3333vw` | 400 | 0.85 - 0.9 |
| **Section Title** | Bebas Neue | ~62px | `3.2292vw` | 400 | Normal |
| **Site Logo** | Oswald | ~48px | `2.5000vw` | 300 | Normal |
| **Nav Links** | Oswald | 18px | N/A | 200 | Normal |
| **Card Title** | Oswald | ~50px | `2.6042vw` | 600 | 1.0 |
| **Body Text** | Oswald | ~32px | `1.6667vw` | 300 | Normal |
| **Caption** | Oswald | ~14px | `0.7292vw` | 400/500 | Normal |

## 4. Layout & Spacing

-   **Content Wrapper**:
    -   Class: `.content-wrapper`
    -   Margin: `0 1.0417vw` (Side margins)
-   **Section Spacing**:
    -   Class: `.section`
    -   Margin Top: `7.7083vw` (~148px)
-   **Grid Systems**:
    -   Common gap: `1.0417vw` (20px)
    -   2-Column Grid: `.grid-2-col` (Split 50/50 approx)

## 5. UI Components

### Buttons / Links
-   **"Show More"**: Oswald, 14px (`0.7292vw`), Medium weight, often with `+` icon.
-   **Nav Items**: Uppercase, Light weight, no underline unless active/hover.

### Image Placeholders
-   Class: `.placeholder-img`
-   Background: `#e5e5e5`
-   Text Color: `#999`

### Effects
-   **Hover**: Simple opacity changes or underline offsets.
-   **Scroll**: Smooth scroll behavior enabled globally.
