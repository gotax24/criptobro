# CriptoBro — AGENTS.md

##Stack

- React 19 + Vite 8 + TypeScript 5.9 (with `noEmit`, typecheck as pre-build step)
- React Router 7, Axios, Chart.js (react-chartjs-2), react-hook-form 7
- **Zustand** (global state), **TanStack Query** (server state / API queries)
- pnpm (lockfile: `pnpm-lock.yaml`). **Do NOT use yarn/npm** — `README.md` is outdated.
- React Compiler enabled via `babel-plugin-react-compiler` in `vite.config.js`
- ESLint 9 flat config with `tseslint`, `react-compiler/react-compiler: error`, and `react-hooks/set-state-in-effect` rules

##Commands

| Command        | Notes                                               |
| -------------- | --------------------------------------------------- |
| `pnpm dev`     | dev server (Vite)                                   |
| `pnpm build`   | `tsc && vite build` — runs typecheck **then** build |
| `pnpm lint`    | `eslint .` — includes React Compiler purity checks  |
| `pnpm preview` | Vite preview                                        |

There are **no tests**. No test framework is installed.

##Environment

```bash
VITE_API_URL=https://rest.coincap.io/v3/
VITE_API_KEY=<key>
VITE_URL_lOGIN=https://reqres.in/api
VITE_API_KEY_LOGIN=<key>
```

Note: `VITE_URL_lOGIN` has a lowercase `l` in `lOGIN` — keep as-is.

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

- `src/components/login.tsx` — `useForm` and `UserCredentials` are unused; spread types on `string | null` cause a TS error
- `src/components/CriptoPage.jsx` — `setState` called inside `useEffect` (react-hooks/set-state-in-effect)
- `src/hooks/useData.js` — `setState` called inside `useEffect`
- `src/context/UserContext.jsx` — `Math.random` called during render (purity violation)

## Architecture Quirks

- Currently being refactored from `.jsx` → `.tsx`. All new code is in TypeScript.
- Entry point: `index.html` → `src/main.tsx` → `src/components/App.tsx`
- **Zustand stores** reside in `src/stores/`; `authStore` manages token/login state
- **TanStack Query hooks** reside in `src/api/`; `crypto.ts` wraps the CoinCap API, `auth.ts` wraps the reqres.in login functionality
- Shared TypeScript types are located in `src/types/`
- Auth: A static token is stored in `localStorage` under the key `tokenCriptoBro`
- Crypto data: CoinCap API v3 (`rest.coincap.io`)
- Helper files (`.ts`): `FormatNumber`, `CambioEmoji`, `RedAndGreen` — these contain pure utility functions
- **Styling:** Uses Tailwind CSS

## Configuration

- `.gitignore` excludes `.env` and `dist`
- `.npmrc` enforces `ignore-scripts=true`, `engine-strict=true`, `save-exact=true`, and `prefer-offline=true`
