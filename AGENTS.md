# CriptoBro — AGENTS.md

## Stack
- React 19 + Vite 8 + TypeScript 5.9 (with `noEmit`, typecheck as pre-build step)
- React Router 7, Axios, Chart.js (react-chartjs-2), react-hook-form 7
- pnpm (lockfile: `pnpm-lock.yaml`). **Do NOT use yarn/npm** — `README.md` is outdated.
- React Compiler enabled via `babel-plugin-react-compiler` in `vite.config.js`
- ESLint 9 flat config with `tseslint`, `react-compiler/react-compiler: error`, and `react-hooks/set-state-in-effect` rules

## Commands
| Command | Notes |
|---|---|
| `pnpm dev` | dev server (Vite) |
| `pnpm build` | `tsc && vite build` — runs typecheck **then** build |
| `pnpm lint` | `eslint .` — includes React Compiler purity checks |
| `pnpm preview` | Vite preview |

There are **no tests**. No test framework is installed.

## Environment
```bash
VITE_API_URL=https://rest.coincap.io/v3/
VITE_API_KEY=<key>
VITE_URL_lOGIN=https://reqres.in/api
VITE_API_KEY_LOGIN=<key>
```
Note: `VITE_URL_lOGIN` has a lowercase `l` in `lOGIN` — keep as-is.

## Known issues (build/lint will fail until fixed)
- `src/components/login.tsx` — `useForm` and `UserCredentials` are unused; spread types on `string | null` cause TS error
- `src/components/CriptoPage.jsx` — `setState` called inside `useEffect` (react-hooks/set-state-in-effect)
- `src/hooks/useData.js` — `setState` called inside `useEffect`
- `src/context/UserContext.jsx` — `Math.random` called during render (purity violation)

## Architecture quirks
- Mix of `.tsx`, `.ts`, `.jsx` files. `tsconfig.json` includes `src/` regardless of extension.
- Entry: `index.html` → `src/main.jsx` → `src/components/App.jsx`
- `login.tsx` is the only TSX file; all other components are `.jsx`
- Auth: static token stored in `localStorage` key `tokenCriptoBro`; login via `reqres.in/api`
- Crypto data: CoinCap API v3 (`rest.coincap.io`), fetched via custom `useData` hook
- Helper files (`.ts`): `FormatNumber`, `CambioEmoji`, `RedAndGreen` — pure utility functions

## Config
- `.gitignore` excludes `.env` and `dist`
- `.npmrc` enforces `ignore-scripts=true`, `engine-strict=true`, `save-exact=true`, `prefer-offline=true`
