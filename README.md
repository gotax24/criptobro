# CriptoBro

**CriptoBro** es una aplicación web que proporciona información detallada sobre el mundo de las criptomonedas. Los usuarios pueden explorar las criptomonedas más populares, ver sus precios históricos y obtener detalles en tiempo real. La aplicación está desarrollada con React y utiliza una API para obtener datos actualizados del mercado de criptomonedas.

## Características

- **Inicio de Sesión Seguro**: Autenticación con OAuth (Google, Facebook, GitHub) y email/contraseña via Supabase.
- **Lista de Criptomonedas**: Muestra una lista de las 100 criptomonedas más populares, junto con detalles básicos.
- **Detalles de Criptomoneda**: Información detallada de cada criptomoneda, incluyendo:
  - Precio actual
  - Cambio porcentual en las últimas 24 horas
  - Volumen de operaciones en las últimas 24 horas
  - Suministro disponible y total
  - Histórico de precios diario
- **Gráfica de Precios Históricos**: Visualización de los precios históricos con Chart.js.
- **Favoritos**: Los usuarios autenticados pueden guardar criptomonedas como favoritas.
- **Modo Oscuro/Claro**: Tema con persistencia en localStorage y detección de preferencias del sistema.
- **Diseño Responsivo y Minimalista**: Interfaz simple y atractiva, adaptada para dispositivos móviles y de escritorio.
- **Página de Error 404**: Página de error personalizada cuando se navega a una URL incorrecta.
- **Pie de Página con Créditos y Redes Sociales**: Con enlaces a GitHub, LinkedIn y contacto por correo.

## Tecnologías Utilizadas

| Capa               | Tecnología                                            |
| ------------------ | ----------------------------------------------------- |
| Framework          | React 19 + Vite 8 + TypeScript 6                      |
| Routing            | React Router 7                                        |
| Estado servidor    | TanStack Query                                        |
| Estado global auth | Zustand                                               |
| Estado UI tema     | React Context                                         |
| HTTP               | Axios (CoinGecko) + @supabase/supabase-js (Auth + DB) |
| API criptos        | CoinGecko Demo API                                    |
| Auth / Backend     | Supabase (OAuth + email/password + Postgres)          |
| Charts             | Chart.js + react-chartjs-2                            |
| Estilos            | CSS plano + variables CSS para temas                  |
| Linter             | ESLint 9 + React Compiler                             |

## Instalación y Configuración

1. **Clona el repositorio**:

   ```bash
   git clone https://github.com/tu_usuario/criptoBro.git
   cd criptoBro
   ```

2. **Instala las dependencias** (usar **pnpm**, no yarn/npm):

   ```bash
   pnpm install
   ```

3. **Configura las variables de entorno**:
   Crea un archivo `.env` en la raíz del proyecto:

   ```env
   VITE_NAME_PAGE=CriptoBro
   VITE_COINGECKO_API_URL=https://api.coingecko.com/api/v3
   VITE_COINGECKO_API_KEY=tu_api_key_de_coingecko
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=tu_publishable_key
   ```

4. **Inicia el servidor de desarrollo**:

   ```bash
   pnpm dev
   ```

5. **Compila para producción**:

   ```bash
   pnpm build
   ```

## Comandos

| Comando        | Descripción                     |
| -------------- | ------------------------------- |
| `pnpm dev`     | Servidor de desarrollo (Vite)   |
| `pnpm build`   | Typecheck + build de producción |
| `pnpm lint`    | ESLint con React Compiler       |
| `pnpm preview` | Preview del build de producción |

## Uso

- **Inicio de Sesión**: Ingresa con OAuth (Google/Facebook/GitHub) o email/contraseña.
- **Explora Criptomonedas**: Navega a la lista de criptomonedas para ver las 100 principales.
- **Detalles**: Haz clic en cualquier criptomoneda para ver información detallada y su historial de precios.
- **Favoritos**: Guarda tus criptomonedas favoritas (requiere sesión).
- **Tema**: Cambia entre modo oscuro y claro desde el menú.
- **Navegación**: Usa el menú superior para moverte entre las diferentes secciones de la aplicación.

## Contribución

Las contribuciones son bienvenidas. Por favor, abre un issue para discutir cambios importantes o propuestas antes de hacer un pull request.

## Licencia

Este proyecto está bajo la Licencia MIT.

© 2026 **CriptoBro** - Desarrollado por Ernesto Bracho
