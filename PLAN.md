# Plan de refactor — CriptoBro

## Objetivo

Refactorizar CriptoBro de JSX a TSX, reemplazar la capa de datos rota (UserContext + useData + axios directo) por **Zustand** (estado global) + **TanStack Query** (consultas a API), manteniendo Axios como cliente HTTP. Todo el código generado se explicará línea por línea.

---

## FASE 1 — Capa de datos (Zustand + TanStack Query)

| Archivo                       | Acción                                                                                                   |
| ----------------------------- | -------------------------------------------------------------------------------------------------------- |
| `src/types/index.ts`          | Crear — tipos compartidos (`CryptoAsset`, `CryptoHistory`, `LoginCredentials`, etc.)                     |
| `src/stores/authStore.ts`     | Crear — store Zustand mínimo (`token`, `login()`, `logout()`, `isAuthenticated`)                         |
| `src/api/crypto.ts`           | Crear — hooks TanStack Query: `useCryptoList()`, `useCryptoDetail(id)`, `useCryptoHistory(id, interval)` |
| `src/api/auth.ts`             | Crear — mutación TanStack Query: `useLoginMutation()`                                                    |
| `src/main.jsx`                | Modificar — envolver con `QueryClientProvider`                                                           |
| `src/context/UserContext.jsx` | Eliminar — reemplazado por authStore                                                                     |
| `src/hooks/useData.js`        | Eliminar — reemplazado por hooks TanStack Query                                                          |

---

## FASE 2 — Conversión JSX→TSX (componente por componente)

Orden recomendado (de menor a mayor dependencia):

| Archivo                                     | Acción                           |
| ------------------------------------------- | -------------------------------- |
| `src/components/Cargando.jsx` → `.tsx`      | Convertir + tipar props          |
| `src/components/Elemento.jsx` → `.tsx`      | Convertir + tipar props          |
| `src/components/404.jsx` → `.tsx`           | Convertir                        |
| `src/components/Cuadricaula.jsx` → `.tsx`   | Convertir + tipar props          |
| `src/components/CriptoInfo.jsx` → `.tsx`    | Convertir + tipar props          |
| `src/components/CriptoGrafica.jsx` → `.tsx` | Convertir + tipar props          |
| `src/components/menu.jsx` → `.tsx`          | Convertir + conectar authStore   |
| `src/components/Perfil.jsx` → `.tsx`        | Convertir + conectar authStore   |
| `src/components/PieDePagina.jsx` → `.tsx`   | Convertir                        |
| `src/components/CriptoPage.jsx` → `.tsx`    | Convertir + hooks TanStack Query |
| `src/components/login.tsx`                  | Reparar errores TS existentes    |
| `src/components/App.jsx` → `.tsx`           | Convertir + ajustar providers    |
| `src/main.jsx` → `.tsx`                     | Convertir entry point            |

---

## FASE 3 — Limpieza y verificación

- `pnpm run build` — debe pasar sin errores
- `pnpm run lint` — 0 errores
- Eliminar `PropTypes` de todos los componentes (innecesario con TypeScript)
- Verificar que `pnpm dev` funciona correctamente
