# CriptoBro — AGENTS.md

## Stack

- React 19 + Vite 8 + TypeScript 5.9 (with `noEmit`, typecheck as pre-build step)
- React Router 7, Axios, Chart.js (react-chartjs-2)
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
VITE_SUPABASE_ANON_KEY=<key>
```

The CoinGecko key travels via the `x-cg-demo-api-key` header (not query string). The Supabase `anon` key is safe to expose in the frontend (it is subject to Row Level Security).

## Project context

This is a **complete JSX → TSX refactor** of an existing project that did not compile or pass the linter. It is the author's first TypeScript project, which aims to learn while modernizing the stack.

**Refactor plan** documented in `PLAN.md`.

## Code Generation Rules

**All generated code must be explained line by line.** The user is learning TypeScript. Every change must be accompanied by a clear explanation of:

- what each line does
- why it is written that way (not just _what_, but the underlying reasoning)
- which TypeScript error it prevents or which convention it follows

No exceptions. Prioritize pedagogy over speed.

## Known Issues (all will be fixed during refactor)

- `src/components/Login.tsx` — `useState<string | null>` then spread `{...user, email}` causes a TS error; bypasses `authStore` (writes `localStorage` directly so zustand `token` stays `null` after login)
- `src/components/CriptoPage.tsx` — `setState` called inside `useEffect` (react-hooks/set-state-in-effect); reads `localStorage` during render; two `useData` calls (will be replaced by TanStack Query)
- `src/hooks/useData.ts` — params `(url, whatSign)` lack types; `useState()`/`useState(null)` inferred wrong; `setState` inside `useEffect`
- `src/context/UserContext.tsx` — `Math.random` called during render (purity violation); `createContext()` with no type; provider is never mounted
- `src/components/Menu.tsx` — `useContext(UserContext)` returns `undefined` (crash on `usuario.first_name`); hamburger is `<div onClick>`; logout is `<a href="#!">`; `to="/Perfil"` case mismatch
- `src/components/Profile.tsx` — same `useContext` crash
- `src/components/LayoutCrypto.tsx` — `export default Cuadricula` but function is `LayoutCrypto`
- `src/api/coinDetail.ts` — typo `/coins/makets`
- `index.html` — references `/src/main.jsx` (file is `main.tsx`); `lang="en"` but content is Spanish; Google Fonts via render-blocking `@import`
- `src/Home.tsx` — imports `./home.css` (Linux case-sensitive fails; file is `Home.css`)
- `src/components/Footer.tsx` / `404.tsx` — imports from `../asset/` (singular); directory is `../assets/`
- `src/stores/authStore.ts` — typo `"tokenCriptroBro"` in `getItem` (set/remove use correct spelling → token never restored on reload)
- `src/api/auth.ts` (renamed to fix typo from `auth,ts`) — points to `reqres.in` (will be replaced by Supabase)

## Architecture Quirks

- Currently being refactored from `.jsx` → `.tsx`. All new code is in TypeScript.
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
