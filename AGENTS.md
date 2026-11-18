# CriptoBro — AGENTS.md

## Stack

- React 19 + Vite 8 + **JavaScript** (JSX, módulos ES). **No usar TypeScript**: no añadas archivos `.ts`/`.tsx`, tipos ni `tsconfig.json` salvo que el usuario lo pida.
- React Router 7, Axios, Chart.js (react-chartjs-2), dayjs
- **Zustand** (global state for auth), **TanStack Query** (server state / API queries), **React Context** (UI theme only)
- **@supabase/supabase-js** (Auth with OAuth Google/GitHub + email/password, Postgres for `profiles` and `favorites` tables)
- pnpm (lockfile: `pnpm-lock.yaml`). **Do NOT use yarn/npm.**
- React Compiler enabled via `babel-plugin-react-compiler` in `vite.config.js`
- ESLint 9 flat config in `eslint.config.js` (JS/JSX only) with `react-compiler/react-compiler: error`, plus `react-hooks` and `react-refresh` rules

## Commands

| Command        | Notes                                              |
| -------------- | -------------------------------------------------- |
| `pnpm dev`     | dev server (Vite)                                  |
| `pnpm build`   | `vite build` — production build in `dist/`         |
| `pnpm lint`    | `eslint .` — includes React Compiler purity checks |
| `pnpm preview` | Vite preview                                       |

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

- The code is **JavaScript (JSX)**. The Git history contains earlier TypeScript commits, but the current code has no TypeScript: do not reintroduce `.ts`/`.tsx` files, types, or `tsconfig.json` unless the user asks.
- Login is **optional**. Visitors can browse the home page, the coin list and coin details without an account. Only favorites and the profile require a session.

## Code Generation Rules

**All generated code must be explained line by line.** The user is learning JavaScript and React. Every change must be accompanied by a clear explanation of:

- what each line does
- why it is written that way (not just _what_, but the underlying reasoning)
- which bug or convention it prevents or follows

No exceptions. Prioritize pedagogy over speed.

## Architecture

- Entry point: `index.html` → `src/main.jsx` → `src/App.jsx` (route map) → `src/components/AppLayout.jsx` (Menu, Outlet and Footer)
- **Public routes:** `/`, `/criptomonedas`, `/criptomonedas/:id` and `/login`. Any other URL shows the 404 page.
- **Protected routes:** `/favoritos` and `/perfil`, each wrapped in `<Protected>`. Without a session they redirect to `/login` and keep the origin path in `location.state.from`, so the user returns there after signing in.
- **Favorites:** the star on each card (`components/Element.jsx`) and the detail button (`components/CriptoInfo.jsx`) share `hooks/useFavoriteToggle.js`. A guest is sent to `/login` with `state.from` and `state.message`; `Login.jsx` shows the message and returns the user to `from`.
- **Zustand stores** reside in `src/stores/`; `authStore.js` manages the Supabase session (subscribes to `supabase.auth.onAuthStateChange` — does NOT poll `localStorage`).
- **TanStack Query hooks** reside in `src/api/`; `coin.js` / `coinDetail.js` / `coinHistory.js` wrap the CoinGecko API, `favorites.js` wraps Supabase (its query key includes the user id), `auth.js` wraps Supabase Auth.
- **Custom hooks** reside in `src/hooks/` (`useTheme.js`, `useFavoriteToggle.js`).
- **React Context** resides in `src/context/`; `ThemeContext.jsx` manages dark/light mode. This is the only valid use of Context in the app (UI state that changes rarely and is read everywhere). Auth and server state use Zustand / TanStack Query instead.
- Auth: Supabase JS handles the JWT; the session is restored asynchronously on app load. `<Protected>` and the menu must wait for `loading: false` before deciding what to render (otherwise they flash to `/login` or show the wrong options on every reload).
- Crypto data: CoinGecko Demo API v3 (`api.coingecko.com/api/v3`).
- Helper files (`.js`): `FormatNumber`, `ChangeEmoji`, `RedAndGreen` — pure utility functions.
- **Styling:** Plain CSS in `src/css/*.css` (NOT Tailwind). Dark/light themes are implemented via CSS variables on `[data-theme="dark|light"]` selector on `<html>`, plus an anti-FOUC inline script in `index.html` that reads `localStorage` before React mounts.

## Supabase

- Tables: `profiles` (id, full_name, avatar_url, updated_at) and `favorites` (id, user_id, coin_id, coin_name, coin_symbol, created_at). Both have RLS enabled; each user can only read and write their own rows.
- The `on_auth_user_created` trigger calls `public.handle_new_user()`. The function is `SECURITY DEFINER` with `search_path = ''` and is not executable by `anon` or `authenticated`. Keep its table references schema-qualified (`public.profiles`): with an empty `search_path`, an unqualified name is not found.
- OAuth returns to the app only if the URL is listed in Supabase → Authentication → URL Configuration. Expected: Site URL `https://criptobro.gotax.dev`; Redirect URLs `https://criptobro.gotax.dev/**` and `http://localhost:5173/**`.

## Configuration

- `.gitignore` excludes `.env` and `dist`
- `.npmrc` enforces `ignore-scripts=true`, `engine-strict=true`, `save-exact=true`, and `prefer-offline=true`
- `vite.config.js` and `eslint.config.js` are ES module JavaScript files

## CLI Tools (via mise)

| Tool | Command | Description |
| --- | --- | --- |
| Node.js | `node` | Runtime JS (v24.x) |
| pnpm | `pnpm` | Package manager |
| Supabase CLI | `supabase` | Gestionar proyecto Supabase (migraciones, edge functions, etc.) |
| Vercel CLI | `vercel` | Desplegar en Vercel |
| Railway CLI | `railway` | Desplegar en Railway |
| GitHub CLI | `gh` | Interactuar con GitHub (PRs, issues, releases) |
| Socket CLI | `socket` | Análisis de seguridad de dependencias |
