# Neo-Brutalism Design System Guide

This project follows a **Neo-Brutalism** design aesthetic characterized by high contrast, bold typography, thick borders, and hard shadows. The goal is to create a raw, honest, and impactful user interface.

## 1. Color Palette
The site uses a strict monochrome palette to maintain visual clarity and impact.

| Variable | Value | Usage |
|----------|-------|-------|
| `--bg-color` | `#ffffff` (White) | Main background |
| `--text-main` | `#000000` (Black) | Primary text color |
| `--accent-red` | `#FF0000` (Red) | Hover text color for high contrast |

## 2. Typography
We use **Pretendard** as the primary font family for its clean, modern aesthetic and excellent Korean language support.

- **Font Family**: `"Pretendard", -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif`
- **Headings**: Uppercase, Bold/Black weights (`800`-`900`), often with bottom borders.
- **Body**: Regular weight, legible size (`1rem`-`1.2rem`).

## 3. Borders & Shadows
The core identity of the design comes from its definition of boundaries and depth.

### CSS Variables
```css
:root {
  --border-thick: 3px solid #000000;  /* Primary structural borders */
  --border-thin: 1px solid #000000;   /* Secondary dividers */
  --shadow-hard: 5px 5px 0px 0px #000000; /* Default depth */
  --shadow-hover: 2px 2px 0px 0px #000000; /* Compressed depth on interaction */
}
```

## 4. Components & Utilities

### Neo Box (`.neo-box`)
Used for cards, containers, and sections.
- **Default**: White background, thick border, hard shadow (`5px`).
- **Hover**: Translates `-2px` (up/left) and increases shadow to `7px` for a "pop" effect.
- **Static Variant** (`.neo-box.static`): Disables the hover movement.

### Neo Button (`.neo-button`)
Used for call-to-action elements.
- **Default**: White background, Black text, Thick border.
- **Hover**: 
  - Background becomes **Black** (`#000000`).
  - Text becomes **Red** (`#FF0000`).
  - Translates `-2px` for lift.
- **Active**: Translates back to origin, shadow shrinks to `2px`.

### Neo Link (`.neo-link`)
Used for navigation items and important text links.
- **Default**: Underlined (`2px` thickness).
- **Hover**: 
  - Background becomes **Black** (`#000000`).
  - Text becomes **Red** (`#FF0000`).
  - Underline removed.
  - Appears as a highlighted block.

### Neo Scrollbar
Custom scrollbar to match the theme.
- **Track**: White background.
- **Thumb**: Black background with White border (to separate from track).
- **Hover**: Thumb turns **Red**.
- **Width**: `16px`.

## 5. Spacing
Consistent spacing ensures rhythm.
- `--spacing-sm`: `8px`
- `--spacing-md`: `16px`
- `--spacing-lg`: `32px`
- `--spacing-xl`: `64px`

## 6. Implementation Examples

### Button
```tsx
<button className="neo-button">
  Click Me
</button>
```

### Card
```tsx
<div className="neo-box">
  <h2>Title</h2>
  <p>Content goes here.</p>
</div>
```

### Navbar Link
```tsx
<Link href="/path" className="neo-link">
  Menu Item
</Link>
```
