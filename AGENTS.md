# CriptoBro — AGENTS.md

## Stack

- React 19 + Vite 8 + TypeScript 6.0 (with `noEmit`, typecheck as pre-build step)
- React Router 7, Axios, Chart.js (react-chartjs-2), dayjs
- **Zustand** (global state for auth), **TanStack Query** (server state / API queries), **React Context** (UI theme only)
- **@supabase/supabase-js** (Auth with OAuth Google/Facebook/GitHub + email/password, Postgres for `profiles` and `favorites` tables)
- pnpm (lockfile: `pnpm-lock.yaml`). **Do NOT use yarn/npm** — `README.md` is outdated.
- React Compiler enabled via `babel-plugin-react-compiler` in `vite.config.js`
- ESLint 9 flat config with `tseslint`, `react-compiler/react-compiler: error`, and `react-hooks/set-state-in-effect` rules

## Commands

| Command        | Notes                                               |
| -------------- | --------------------------------------------------- |
| `pnpm dev`     | dev server (Vite)                                   |
| `pnpm build`   | `tsc && vite build` — runs typecheck **then** build |
| `pnpm lint`    | `eslint .` — includes React Compiler purity checks  |
| `pnpm preview` | Vite preview                                        |

There are **no tests**. No test framework is installed.

## Environment

```bash
VITE_NAME_PAGE=CriptoBro
VITE_COINGECKO_API_URL=https://api.coingecko.com/api/v3
VITE_COINGECKO_API_KEY=<key>
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<key>
```

The CoinGecko key travels via the `x-cg-demo-api-key` header (not query string). The Supabase `publishable` key (formerly called `anon`) is safe to expose in the frontend (it is subject to Row Level Security).

## Project context

This is a **complete JSX → TSX refactor** of an existing project that did not compile or pass the linter. It is the author's first TypeScript project, which aims to learn while modernizing the stack.

**Refactor plan** documented in `PLAN.md`.

## Code Generation Rules

**All generated code must be explained line by line.** The user is learning TypeScript. Every change must be accompanied by a clear explanation of:

- what each line does
- why it is written that way (not just _what_, but the underlying reasoning)
- which TypeScript error it prevents or which convention it follows

No exceptions. Prioritize pedagogy over speed.

## Architecture

- Entry point: `index.html` → `src/main.tsx` → `src/components/App.tsx`
- **Zustand stores** reside in `src/stores/`; `authStore` manages Supabase session (subscribes to `supabase.auth.onAuthStateChange` — does NOT poll `localStorage`).
- **TanStack Query hooks** reside in `src/api/`; `coin.ts` / `coinDetail.ts` / `coinHistory.ts` wrap the CoinGecko API, `favorites.ts` wraps Supabase, `auth.ts` wraps Supabase Auth.
- **React Context** resides in `src/context/`; `ThemeContext` manages dark/light mode. This is the only valid use of Context in the app (UI state that changes rarely and is read everywhere). Auth and server state use Zustand / TanStack Query instead.
- Shared TypeScript types are located in `src/types/`
- Auth: Supabase JS handles the JWT; session is restored asynchronously on app load. `<Protected>` must wait for `loading: false` before deciding to redirect (otherwise it flashes to `/login` on every reload).
- Crypto data: CoinGecko Demo API v3 (`api.coingecko.com/api/v3`).
- Helper files (`.ts`): `FormatNumber`, `CambioEmoji`, `RedAndGreen` — these contain pure utility functions.
- **Styling:** Plain CSS in `src/css/*.css` (NOT Tailwind). Dark/light themes are implemented via CSS variables on `[data-theme="dark|light"]` selector on `<html>`, plus an anti-FOUC inline script in `index.html` that reads `localStorage` before React mounts.

## Configuration

- `.gitignore` excludes `.env` and `dist`
- `.npmrc` enforces `ignore-scripts=true`, `engine-strict=true`, `save-exact=true`, and `prefer-offline=true`
- `vite.config.js` and `eslint.config.js` (both `.js`, not `.ts`)
- `tsconfig.json` with `strict: true`, `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`

## CLI Tools (via mise)

| Tool | Command | Description |
| --- | --- | --- |
| Node.js | `node` | Runtime JS/TS (v24.x) |
| pnpm | `pnpm` | Package manager |
| Supabase CLI | `supabase` | Gestionar proyecto Supabase (migraciones, edge functions, etc.) |
| Vercel CLI | `vercel` | Desplegar en Vercel |
| Railway CLI | `railway` | Desplegar en Railway |
| GitHub CLI | `gh` | Interactuar con GitHub (PRs, issues, releases) |
| Socket CLI | `socket` | Análisis de seguridad de dependencias |
