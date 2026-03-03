# UI

This project uses [shadcn/ui](https://ui.shadcn.com/) with Tailwind CSS v4.

## Setup

- **Tailwind CSS v4** via `@tailwindcss/vite` plugin — no `tailwind.config.js` needed
- **shadcn/ui** with Neutral base color, configured in `components.json`
- CSS variables defined in `src/index.css`
- Path alias `@/` → `src/` (configured in `vite.config.ts` and `tsconfig.app.json`)

## Adding components

```bash
npx shadcn@latest add <component-name>
```

Components are scaffolded into `src/components/ui/`.

## Components in use

| Component | Path | Usage |
|-----------|------|-------|
| `Card`, `CardHeader`, `CardTitle`, `CardContent` | `src/components/ui/card.tsx` | Price display container |
| `Badge` | `src/components/ui/badge.tsx` | WebSocket connection status |

## Theming

CSS custom properties in `src/index.css` control all colors. Light and dark mode variables are both defined — toggle with the `.dark` class on `<html>`.

Key tokens: `--background`, `--foreground`, `--card`, `--muted-foreground`, `--destructive`.
