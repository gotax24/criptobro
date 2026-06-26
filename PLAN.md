# Plan de refactor — CriptoBro

## Objetivo

Refactorizar CriptoBro de JSX/JS a TSX/TS con **TypeScript estricto**, reemplazando toda la capa de datos rota (`UserContext` + `useData` + axios directo) por:

- **CoinGecko Demo API** para datos de criptomonedas.
- **Supabase Auth** para login profesional con OAuth (Google, Facebook, GitHub) y email/contraseña nativo.
- **Supabase Database** con tablas `profiles` y `favorites` + Row Level Security (RLS).
- **Zustand** para estado global de autenticación.
- **TanStack Query** para cacheo de API (CoinGecko + Supabase).
- **React Context** exclusivamente para el **tema oscuro/claro** (ejercicio pedagógico).

Mantener Axios como cliente HTTP para CoinGecko. Todo el código generado se explicará **línea por línea**.

---

## Tecnologías objetivo

| Capa               | Tecnología                                                   |
| ------------------ | ------------------------------------------------------------ |
| Framework          | React 19 + Vite 8 + TypeScript 5.9                           |
| Routing            | React Router 7                                               |
| Estado servidor    | TanStack Query                                               |
| Estado global auth | Zustand                                                      |
| Estado UI tema     | React Context + `localStorage` + `prefers-color-scheme`      |
| HTTP               | Axios (solo CoinGecko) + `@supabase/supabase-js` (auth + DB) |
| API criptos        | CoinGecko Demo API (`x-cg-demo-api-key`)                     |
| Auth / Backend     | Supabase (OAuth + email/password + Postgres)                 |
| Charts             | Chart.js + react-chartjs-2                                   |
| Estilos            | CSS plano en `src/css/*.css` + variables CSS para temas      |

---

## Hallazgos críticos del código actual

### 🔴 Build-breaking (no compila)

1. `index.html` apunta a `/src/main.jsx` en vez de `/src/main.tsx`.
2. `Footer.tsx` y `404.tsx` importan de `../asset/` (singular); el directorio es `../assets/`.
3. `Home.tsx` importa `./home.css` pero el archivo es `Home.css` (Linux es case-sensitive).
4. `LayoutCrypto.tsx` hace `export default Cuadricula` pero la función se llama `LayoutCrypto`.
5. `coinDetail.ts` tiene typo `/coins/makets` → `/coins/markets`.
6. Múltiples errores de TypeScript por parámetros y props sin tipar (`any` implícitos).

### 🔴 Bugs silenciosos / runtime

7. `UserContextProvider` **nunca se monta** → `Menu` y `Profile` crashean al usar `useContext(UserContext)`.
8. `Login.tsx` bypassa `authStore`: escribe `localStorage` directo → el store queda `token: null` → `<Protected>` redirige a `/login` justo después de un login exitoso.
9. `Menu.tsx` logout bypassa `authStore.logout()` → el estado permanece "logueado".
10. `Menu.tsx` usa `to="/Perfil"` pero la ruta es `path="/perfil"` (case-sensitive) → 404.
11. `.env` vacío/faltante: `VITE_API_URL`, `VITE_API_KEY`, `VITE_NAME_PAGE` no existen.
12. Dos capas de datos coexisten: CoinGecko tipado (muerto) y CoinCap sin tipos (usado, roto).
13. `CriptoInfo.tsx` muestra `NaN` cuando `maxSupply` es `null`.

### 🟣 React Compiler / `react-hooks/set-state-in-effect`

14. `UserContext.tsx` llama `Math.random()` durante render (purity violation).
15. `useData.ts` hace `setCargando(true)` / `setError(null)` sincrónicamente dentro del `useEffect`.
16. `CriptoPage.tsx` hace `setErrorDate(...)` sincrónicamente dentro del `useEffect`.
17. `Login.tsx` lee `localStorage.getItem(...)` durante render.

### 🟠 Performance

18. `CriptoGraph.tsx` recrea objetos `data` y `options` cada render.
19. `CriptoPage.tsx` recrea inline arrays en JSX.
20. `Element.tsx` no usa `React.memo`.
21. `App.css` importa Google Fonts vía `@import` (render-blocking).

### 🔵 Accesibilidad

22. Hamburguesa del menú es un `<div onClick>` (no botón, no teclado, no aria).
23. Logout es un `<a href="#!">` en vez de `<button>`.
24. Labels de login usan `htmlFor="email"` pero los inputs no tienen `id="email"`.
25. `CriptoGraph.tsx` carece de `role="img"` / `aria-label`.
26. `Loading.tsx` carece de `role="status"`.
27. `index.html` tiene `lang="en"` pero el contenido es español.
28. Cada tarjeta en `Element.tsx` usa `<h1>` → múltiples `<h1>`.
29. `Footer.tsx` usa `target="_blank"` en `mailto:`.

---

## FASE 0 — Fixes urgentes del build

Cambios pequeños que permiten que `pnpm dev` arranque y que luego `pnpm build` pueda llegar a 0 errores.

| #   | Archivo             | Cambio                                                                                                                |
| --- | ------------------- | --------------------------------------------------------------------------------------------------------------------- |
| 0.1 | `index.html`        | `src/main.jsx` → `src/main.tsx`; `lang="es"`; `<meta name="description">`; Google Fonts por `<link rel="preconnect">` |
| 0.2 | `Footer.tsx`        | `../asset/*` → `../assets/*`                                                                                          |
| 0.3 | `404.tsx`           | `../asset/404.svg` → `../assets/404.svg`                                                                              |
| 0.4 | `Home.tsx`          | `./home.css` → `./Home.css`; componente `home` → `Home`                                                               |
| 0.5 | `LayoutCrypto.tsx`  | `export default Cuadricula` → `export default LayoutCrypto`                                                           |
| 0.6 | `coinDetail.ts`     | `/coins/makets` → `/coins/markets`                                                                                    |
| 0.7 | `.env`              | Añadir `VITE_NAME_PAGE`, `VITE_COINGECKO_API_URL`, `VITE_COINGECKO_API_KEY`                                           |
| 0.8 | `src/vite-env.d.ts` | Declarar `ImportMetaEnv` con todas las `VITE_*` (incluidas las de Supabase)                                           |

---

## FASE 1 — Infraestructura: Supabase + CoinGecko

### 1.1 Dependencias

```bash
pnpm add @supabase/supabase-js
# @tanstack/react-query y zustand ya están instalados
```

### 1.2 Configuración Supabase (dashboard)

1. Nuevo proyecto en supabase.com.
2. Authentication → Providers → habilitar **Google, Facebook, GitHub** y **Email**.
3. Authentication → URL Configuration → Site URL `http://localhost:5173`, Redirect URLs `http://localhost:5173/**`.
4. Copiar al `.env`:

   ```bash
   VITE_SUPABASE_URL=https://xxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=sb_publishable_xxxx
   ```

### 1.3 SQL — tablas `profiles` y `favorites`

Ejecutar en SQL Editor:

```sql
create table public.profiles (
  id uuid primary key references auth.users on delete cascade,
  full_name text,
  avatar_url text,
  updated_at timestamptz default now()
);

create table public.favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  coin_id text not null,
  coin_name text not null,
  coin_symbol text not null,
  created_at timestamptz default now(),
  unique (user_id, coin_id)
);

alter table public.profiles enable row level security;
alter table public.favorites enable row level security;

create policy "profiles_select_own" on public.profiles for select to authenticated using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert to authenticated with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);

create policy "favorites_select_own" on public.favorites for select to authenticated using (auth.uid() = user_id);
create policy "favorites_insert_own" on public.favorites for insert to authenticated with check (auth.uid() = user_id);
create policy "favorites_delete_own" on public.favorites for delete to authenticated using (auth.uid() = user_id);

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
```

### 1.4 Archivos a crear

| Archivo                     | Responsabilidad                                         |
| --------------------------- | ------------------------------------------------------- |
| `src/lib/supabaseClient.ts` | `createClient(url, key)` singleton para el browser      |
| `src/types/index.ts`        | Tipos `Coin`, `CoinHistoryPoint`, `Profile`, `Favorite` |

### 1.5 Archivos a mantener / ajustar

| Archivo            | Acción                                                                             |
| ------------------ | ---------------------------------------------------------------------------------- |
| `src/lib/axios.ts` | Verificar que use `VITE_COINGECKO_API_URL` + header `x-cg-demo-api-key`            |
| `src/main.tsx`     | Envolver con `QueryClientProvider`, `BrowserRouter`; preparar para `ThemeProvider` |

---

## FASE 2 — Auth con Supabase + Zustand

### 2.1 `src/stores/authStore.ts` (refactorizar)

Escuchar `supabase.auth.onAuthStateChange` en lugar de leer `localStorage` manualmente:

- `session: Session | null`
- `user: User | null`
- `profile: Profile | null`
- `loading: boolean` — **`true` mientras Supabase restaura la sesión al cargar la app** (lee `localStorage` + valida el JWT con el servidor). Se inicializa en `true` y pasa a `false` después del primer `INITIAL_SESSION` o `SIGNED_OUT`.
- `signOut(): Promise<void>`
- `setSession(session)`

#### `<Protected>` debe esperar a `loading: false`

Al cargar la app, Supabase tarda un instante en restaurar la sesión. Si `<Protected>` solo comprueba `session`, redirige a `/login` en cada reload (flash visible). Implementación correcta:

```tsx
const { session, loading } = useAuthStore((s) => ({ session: s.session, loading: s.loading }));
if (loading) return <Loading />;                                   // espera, no redirige
return session ? <>{children}</> : <Navigate to="/login" />;       // ya decidido
```

Explicación: el `useEffect` en `authStore` se suscribe a `onAuthStateChange` y al recibir el primer evento (`INITIAL_SESSION` o ausencia de él) marca `loading: false`. Hasta entonces, mostramos `<Loading />` en vez de redirigir.

### 2.2 `src/api/auth.ts` (reescribir)

Eliminar reqres.in. Crear:

| Hook / función              | Uso                                                             |
| --------------------------- | --------------------------------------------------------------- |
| `useSignInWithEmail()`      | Login email/contraseña con `supabase.auth.signInWithPassword()` |
| `useSignUpWithEmail()`      | Registro email/contraseña con `supabase.auth.signUp()`          |
| `signInWithOAuth(provider)` | Función helper para Google/Facebook/GitHub                      |

### 2.3 `src/components/Login.tsx` (reescribir)

- Formulario email/contraseña usando la mutation de Supabase.
- Botones "Continuar con Google / Facebook / GitHub".
- Manejo de errores y loading.
- A11y: `id`/`htmlFor`, `role="alert"`, botones reales.
- **No leer `localStorage` durante render**.

### 2.4 Eliminar

- `src/context/UserContext.tsx` (reemplazado por Zustand).
- `src/hooks/useData.ts` (reemplazado por TanStack Query).
- Cualquier referencia a reqres.in.

---

## FASE 3 — Datos de CoinGecko con TanStack Query

### 3.1 Archivos a ajustar

| Archivo                  | Acción                                                             |
| ------------------------ | ------------------------------------------------------------------ |
| `src/api/coin.ts`        | `useCoins()` → `/coins/markets`                                    |
| `src/api/coinDetail.ts`  | Fix typo `/coins/markets`; `useCoinDetail(id)`                     |
| `src/api/coinHistory.ts` | `useCoinHistory(id, days)` → `/coins/{id}/market_chart`            |
| `src/api/favorites.ts`   | NUEVO: `useFavorites()`, `useAddFavorite()`, `useRemoveFavorite()` |

#### `useFavorites` con `enabled` reactivo

El `enabled` de TanStack Query debe ser reactivo a `session`. Si usamos `useAuthStore.getState().session` dentro del query, no se re-evalúa cuando el usuario hace login (es un valor estático leído una vez). Hay que leer la sesión con el hook de Zustand para que la query se habilite/deshabilite automáticamente:

```ts
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabaseClient";
import { useAuthStore } from "../stores/authStore";
import type { Favorite } from "../types";

export const useFavorites = () => {
  const session = useAuthStore((s) => s.session);    // reactivo, no getState()

  return useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("favorites")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Favorite[];
    },
    enabled: !!session,   // se habilita cuando hay sesión
  });
};
```

Explicación: `useAuthStore((s) => s.session)` se suscribe al slice de Zustand y fuerza re-render del componente cuando `session` cambia. La query observa `enabled` y arranca el fetch en cuanto es `true`.

### 3.2 Conectar con componentes

- `LayoutCrypto.tsx`: `useData("assets")` → `useCoins()`.
- `CriptoPage.tsx`: dos `useData` → `useCoinDetail(id)` + `useCoinHistory(id, days)`.
- Eliminar `useData.ts` al final.

---

## FASE 4 — Conversión de componentes a TSX tipados + fixes

Orden de menor a mayor dependencia:

| #    | Archivo            | Acciones                                                                                                                 |
| ---- | ------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| 4.1  | `Loading.tsx`      | `role="status"`, `aria-live="polite"`                                                                                    |
| 4.2  | `Element.tsx`      | Props `{ coin: Coin }`; mapeo CoinGecko; `React.memo`; botón favorito                                                    |
| 4.3  | `404.tsx`          | Fix import `assets`; tipar                                                                                               |
| 4.4  | `LayoutCrypto.tsx` | `useCoins()`; `isLoading`/`error`; export correcto; `<h1>` único                                                         |
| 4.5  | `CriptoInfo.tsx`   | Props `{ coin: Coin }`; fix `NaN` en `maxSupply`                                                                         |
| 4.6  | `CriptoGraph.tsx`  | Props `{ history: CoinHistoryPoint[] }`; `useMemo`; `aria-label`; tema                                                   |
| 4.7  | `CriptoPage.tsx`   | Reemplazar `useData`; eliminar `setState` en `useEffect`; tipar estados                                                  |
| 4.8  | `Menu.tsx`         | `useAuthStore` en vez de `useContext`; hamburguesa `<button>`; logout `<button>`; fix `/perfil`; cleanup `body.overflow` |
| 4.9  | `Profile.tsx`      | `useAuthStore` perfil; campos `full_name`/`avatar_url`; loading                                                          |
| 4.10 | `Footer.tsx`       | Fix imports; `mailto:` sin `target="_blank"`                                                                             |
| 4.11 | `App.tsx`          | Verificar `<Protected>` con `session`; importar `ReactNode` correctamente                                                |
| 4.12 | `Home.tsx`         | Fix CSS + casing; fallback `VITE_NAME_PAGE`                                                                              |

---

## FASE 5 — Favoritos + nueva ruta

### 5.1 `src/components/Favorites.tsx` (nuevo)

- Lista los favoritos del usuario con `useFavorites()`.
- Link a cada cripto.
- Botón "Quitar" con `useRemoveFavorite()`.
- Estado vacío.

### 5.2 Ruta

Añadir en `App.tsx` dentro del layout protegido:

```tsx
<Route path="/favoritos" element={<Favorites />} />
```

### 5.3 Menu

Añadir link `<NavLink to="/favoritos">Favoritos</NavLink>`.

### 5.4 Botón favorito en `Element.tsx`

- Mostrar estrella llena/vacía según `useFavorites()`.
- `useAddFavorite()` / `useRemoveFavorite()`.
- Solo visible si hay sesión.

---

## FASE 6 — Modo oscuro / claro con React Context

> Estado de UI global que cambia poco: caso de uso legítimo de Context.

### 6.1 Archivos a crear

| Archivo                          | Responsabilidad                                                                      |
| -------------------------------- | ------------------------------------------------------------------------------------ |
| `src/context/ThemeContext.tsx`   | `ThemeProvider`, `useTheme()`, lazy init desde `localStorage`/`prefers-color-scheme` |
| `src/components/ThemeToggle.tsx` | Botón sol/luna con `aria-pressed`, `aria-label`                                      |

### 6.2 `index.html`

Script anti-FOUC al inicio de `<head>`:

```html
<script>
  (function () {
    var t = localStorage.getItem("theme");
    if (t !== "dark" && t !== "light") {
      t = matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";
    }
    document.documentElement.setAttribute("data-theme", t);
  })();
</script>
```

### 6.3 Variables CSS (`src/App.css`)

Reemplazar `:root` por dos bloques:

```css
:root,
[data-theme="dark"] {
  /* azul marino actual */
}

[data-theme="light"] {
  /* slate claro */
}
```

### 6.4 Refactor de CSS

- `src/css/*.css` (8 archivos): reemplazar colores hardcodeados por `var(--*)`.
- Añadir transición suave `background-color 0.2s, color 0.2s`.

### 6.5 Integración

- `main.tsx`: envolver app con `<ThemeProvider>`.
- `Menu.tsx`: incluir `<ThemeToggle />`.
- `CriptoGraph.tsx`: colores del tema via `useTheme()` + `useMemo([theme])`.

---

## FASE 7 — Limpieza y verificación final

- [ ] `pnpm build` → 0 errores de TypeScript y Vite.
- [ ] `pnpm lint` → 0 errores (incluyendo `react-compiler/react-compiler`).
- [ ] `pnpm dev` → probar flujos:
  - Login con Google / Facebook / GitHub.
  - Login con email/contraseña.
  - Registro con email/contraseña.
  - Logout.
  - Lista de criptos, detalle, gráfica, selector de días.
  - Añadir/quitar favoritos.
  - Ver página de favoritos.
  - Cambiar tema oscuro/claro (persistencia + sin flash).
  - 404 y perfil.
- [ ] Eliminar dependencias sin uso: `date-fns`, `react-date-range` (si no se usan).
- [ ] Verificar que no queden imports a `reqres.in`, `UserContext`, `useData`.
- [ ] Revisar que no haya `any` implícitos ni `console.error` sin manejo.

---

## Estructura final esperada de `src/`

```tree
src/
├── api/
│   ├── auth.ts              # Supabase auth mutations
│   ├── coin.ts              # CoinGecko list
│   ├── coinDetail.ts        # CoinGecko detail
│   ├── coinHistory.ts       # CoinGecko history
│   └── favorites.ts         # Supabase favorites CRUD
├── components/
│   ├── 404.tsx
│   ├── AppLayout.tsx
│   ├── CriptoGraph.tsx
│   ├── CriptoInfo.tsx
│   ├── CriptoPage.tsx
│   ├── Element.tsx
│   ├── Favorites.tsx        # NUEVO
│   ├── Footer.tsx
│   ├── LayoutCrypto.tsx
│   ├── Loading.tsx
│   ├── Login.tsx
│   ├── Menu.tsx
│   ├── Profile.tsx
│   └── ThemeToggle.tsx      # NUEVO
├── context/
│   └── ThemeContext.tsx     # NUEVO (UserContext eliminado)
├── helpers/
│   ├── ChangeEmoji.ts
│   ├── FormatNumber.ts
│   └── RedAndGreen.ts
├── hooks/
│   └── (vacío tras eliminar useData.ts)
├── lib/
│   ├── axios.ts             # CoinGecko
│   └── supabaseClient.ts    # NUEVO
├── stores/
│   └── authStore.ts         # Zustand + Supabase session
├── types/
│   └── index.ts
├── css/                     # Refactorizados a variables
├── App.tsx
├── Home.tsx
├── main.tsx
└── vite-env.d.ts
```

---

## Variables de entorno finales (`.env`)

```bash
VITE_NAME_PAGE=CriptoBro
VITE_COINGECKO_API_URL=https://api.coingecko.com/api/v3
VITE_COINGECKO_API_KEY=tu_demo_key_aqui
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_tu_key_aqui
```

**Nota de seguridad**: la API key de CoinGecko y el `anon key` de Supabase viajan en el bundle del frontend. Esto es aceptable para una aplicación de práctica sin backend propio, pero en producción real se debería usar un backend intermedio o Edge Functions.
