# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server with HMR
npm run build     # Type-check + build for production
npm run lint      # Run ESLint
npm run preview   # Preview production build locally
```

## Architecture

**Stack:** React 19, TypeScript 5.9, Vite 7

**Entry flow:** `index.html` → `src/main.tsx` → `src/App.tsx`

This project is named `xrp-tracker` in package.json. The current `App.tsx` is boilerplate — the intended purpose is a real-time WebSocket demo, likely for tracking XRP (Ripple) data.

## TypeScript Config

- Strict mode enabled with `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`
- Target: ES2022, module: ESNext
- JSX uses automatic transform (`react-jsx`) — no need to import React in component files

## ESLint

Uses flat config format (ESLint 9+). Config is in `eslint.config.js`.

## Git

Never add `Co-Authored-By` trailers to commit messages.
