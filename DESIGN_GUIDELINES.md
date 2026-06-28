# CriptoBro — Design Guidelines

> **Sistema "Precision Finance"**: minimalismo japonés aplicado a fintech. Cada elemento tiene un propósito. Los datos son los protagonistas.

---

## 1. Principios

1. **Datos como protagonista**: la interfaz desaparece. Los precios, las gráficas y la información son lo que importa.
2. **Monocromático + un acento**: la paleta es 90% neutros. El coral (`#ff4d6a`) es el único color vibrante — úsalo con intención, no por decoración.
3. **Espacio negativo es diseño**: si dudás entre agregar algo o dejarlo en blanco, dejalo en blanco.
4. **Contraste tipográfico**: una sans-serif cálida (Work Sans) para UI + una monoespaciada (JetBrains Mono) para datos. El contraste hace que los números se sientan "técnicos" y la UI se sienta "humana".
5. **Movimiento con propósito**: solo animaciones que mejoran la UX (focus, feedback, transiciones). Nada de movimiento decorativo.

---

## 2. Tokens

Todos los tokens están definidos como CSS custom properties en `src/App.css`. **No hardcodear valores** en otros archivos CSS — siempre usar la variable.

### 2.1 Colores

```css
/* Dark mode (default) */
:root,
[data-theme="dark"] {
  --bg: #0c0c0c; /* Fondo principal */
  --bg-elevated: #1a1a1a; /* Cards, inputs, modales */
  --surface: #1a1a1a; /* Sinónimo de bg-elevated */
  --surface-hover: #222222; /* Estado hover de cards/botones */
  --border: #2d2d2d; /* Bordes sutiles */
  --border-strong: #3a3a3a; /* Bordes en hover/focus */
  --text: #f5f5f5; /* Texto principal */
  --text-muted: #888888; /* Texto secundario (labels, captions) */
  --text-subtle: #555555; /* Texto muy sutil (placeholders, dividers) */

  --accent: #ff4d6a; /* Coral — color de acento principal */
  --accent-hover: #ff6b82; /* Coral claro en hover */
  --accent-soft: rgba(255, 77, 106, 0.1); /* Coral al 10% para fondos */

  --positive: #22c55e; /* Verde para ganancias */
  --negative: #ef4444; /* Rojo para pérdidas */
}

[data-theme="light"] {
  --bg: #fafaf8; /* Off-white cálido */
  --bg-elevated: #ffffff;
  --surface: #ffffff;
  --surface-hover: #f4f4f1;
  --border: #e6e6e3;
  --border-strong: #d0d0cc;
  --text: #0a0a0a;
  --text-muted: #666666;
  --text-subtle: #999999;

  --accent: #e63946; /* Coral oscuro en modo claro */
  --accent-hover: #c1121f;
  --accent-soft: rgba(230, 57, 70, 0.08);

  --positive: #16a34a;
  --negative: #dc2626;
}
```

### 2.2 Sombras

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3); /* dark */
--shadow-md: 0 2px 24px rgba(0, 0, 0, 0.4); /* cards */
--shadow-lg: 0 8px 40px rgba(0, 0, 0, 0.5); /* modales */
```

En modo claro las opacidades son menores (`0.04`, `0.06`, `0.08`).

### 2.3 Tipografía

```css
--font-body: "Work Sans", -apple-system, BlinkMacSystemFont, sans-serif;
--font-mono: "JetBrains Mono", "Fira Code", Menlo, monospace;

/* Tamaños */
--fs-xs: 0.75rem; /* 12px — captions, micro labels */
--fs-sm: 0.875rem; /* 14px — labels, body small */
--fs-base: 1rem; /* 16px — body */
--fs-lg: 1.125rem; /* 18px */
--fs-xl: 1.25rem; /* 20px — section titles */
--fs-2xl: 1.5rem; /* 24px — page titles */
--fs-3xl: 2rem; /* 32px */
--fs-4xl: 2.5rem; /* 40px — hero */

/* Pesos */
--fw-light: 300;
--fw-regular: 400;
--fw-medium: 500;
--fw-semibold: 600;
--fw-bold: 700;

/* Line heights */
--lh-tight: 1.2; /* Headings */
--lh-normal: 1.5; /* Body */
--lh-relaxed: 1.7; /* Lectura cómoda */

/* Letter spacing */
--ls-tight: -0.02em; /* Headings, números */
--ls-normal: 0;
--ls-wide: 0.05em; /* Uppercase labels */
```

### 2.4 Espaciado

Escala base 4px:

```css
--space-1: 0.25rem; /* 4px */
--space-2: 0.5rem; /* 8px */
--space-3: 0.75rem; /* 12px */
--space-4: 1rem; /* 16px */
--space-5: 1.25rem; /* 20px */
--space-6: 1.5rem; /* 24px */
--space-8: 2rem; /* 32px */
--space-10: 2.5rem; /* 40px */
--space-12: 3rem; /* 48px */
--space-16: 4rem; /* 64px */
```

### 2.5 Radios

```css
--radius-sm: 8px; /* Inputs, buttons, small elements */
--radius-md: 12px; /* Cards, larger buttons */
--radius-lg: 16px; /* Modal, prominent cards (Login form) */
--radius-xl: 24px; /* Hero, large surfaces */
--radius-full: 9999px; /* Pills, avatars */
```

### 2.6 Transiciones

```css
--transition-fast: 150ms ease; /* Hover micro-interactions */
--transition-base: 200ms ease; /* Default para borders, colors */
--transition-slow: 300ms ease; /* Page transitions, opacity fades */
```

---

## 3. Patrones de componentes

### 3.1 Botón primario (submit)

```css
.button-primary {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  font-family: var(--font-body);
  font-size: var(--fs-base);
  font-weight: var(--fw-semibold);
  background: var(--accent);
  color: #ffffff;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition:
    background-color var(--transition-base),
    transform var(--transition-fast);
}

.button-primary:hover:not(:disabled) {
  background: var(--accent-hover);
  transform: translateY(-1px);
}

.button-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.8;
  }
}
```

### 3.2 Botón secundario / OAuth (outline)

```css
.btn-outline {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  width: 100%;
  padding: var(--space-3) var(--space-4);
  font-family: var(--font-body);
  font-size: var(--fs-sm);
  font-weight: var(--fw-medium);
  color: var(--text);
  background: transparent;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition:
    border-color var(--transition-base),
    background-color var(--transition-base),
    transform var(--transition-fast);
}

.btn-outline:hover {
  border-color: var(--border-strong);
  background: var(--surface-hover);
  transform: translateY(-1px);
}
```

### 3.3 Input con border-bottom

```css
.input {
  width: 100%;
  padding: var(--space-3) 0;
  font-family: var(--font-mono); /* Mono en inputs de datos */
  font-size: var(--fs-base);
  color: var(--text);
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--border);
  outline: none;
  transition: border-color var(--transition-base);
}

.input:focus {
  border-bottom-color: var(--accent);
  border-bottom-width: 2px;
  padding-bottom: calc(var(--space-3) - 1px);
}

.input::placeholder {
  color: var(--text-subtle);
}
```

### 3.4 Card (formulario, contenido)

```css
.card {
  padding: var(--space-10);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}
```

### 3.5 Mensaje de error

```css
.error {
  padding: var(--space-3) var(--space-4);
  background: var(--accent-soft);
  border-left: 3px solid var(--accent);
  border-radius: var(--radius-sm);
  color: var(--accent);
  font-size: var(--fs-sm);
  font-weight: var(--fw-medium);
}
```

### 3.6 Divisor con texto

```css
.divider {
  display: flex;
  align-items: center;
  color: var(--text-subtle);
  font-size: var(--fs-xs);
  letter-spacing: var(--ls-wide);
  text-transform: uppercase;
}

.divider::before,
.divider::after {
  content: "";
  flex: 1;
  height: 1px;
  background: var(--border);
}

.divider span {
  padding: 0 var(--space-3);
}
```

### 3.7 Link-button (toggle login/register)

```css
.link-button {
  font-family: inherit;
  font-size: inherit;
  font-weight: var(--fw-semibold);
  color: var(--accent);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: opacity var(--transition-base);
}

.link-button:hover {
  opacity: 0.7;
  text-decoration: underline;
  text-underline-offset: 3px;
}
```

### 3.8 Texto de datos (precios, números)

```css
.mono {
  font-family: var(--font-mono);
  font-feature-settings:
    "tnum" 1,
    "zero" 1; /* tabular nums + slashed zero */
}
```

Aplicar a:

- Precios de criptomonedas
- Porcentajes de cambio
- Valores numéricos en general
- Símbolos, hashes, IDs

---

## 4. Animaciones

### 4.1 Entrada de página (fade + slide up)

```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.4s ease both;
}

/* Stagger: usar animation-delay */
.stagger-1 {
  animation-delay: 0.1s;
}
.stagger-2 {
  animation-delay: 0.2s;
}
.stagger-3 {
  animation-delay: 0.3s;
}
```

### 4.2 Hover lift (cards, botones)

```css
.lift {
  transition: transform var(--transition-fast);
}
.lift:hover {
  transform: translateY(-2px);
}
```

### 4.3 Pulse (loading)

```css
@keyframes pulse {
  0%,
  100% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.8;
  }
}

.loading {
  animation: pulse 1.5s ease-in-out infinite;
}
```

### 4.4 Rotación (theme toggle)

```css
.theme-toggle-icon {
  transition: transform var(--transition-slow);
}
.theme-toggle:hover .theme-toggle-icon {
  transform: rotate(180deg);
}
```

---

## 5. Accesibilidad

### 5.1 Focus visible

```css
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
```

### 5.2 Reducción de movimiento

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 5.3 Contraste mínimo

| Combinación                 | Ratio                          | Uso                      |
| --------------------------- | ------------------------------ | ------------------------ |
| `--text` sobre `--bg`       | 13.5:1 (dark) / 16.0:1 (light) | Texto principal — AAA    |
| `--text-muted` sobre `--bg` | 4.7:1 (dark) / 5.3:1 (light)   | Labels — AA              |
| `--accent` sobre `--bg`     | 4.6:1 (dark) / 5.5:1 (light)   | Links, bordes focus — AA |
| blanco sobre `--accent`     | 4.0:1                          | Texto de botón — AA      |

---

## 6. Convenciones

### 6.1 Estructura de cada CSS de componente

```css
/* === Sección: nombre del componente === */
/* Descripción breve (1 línea) */

/* === Subsección === */

.clase-principal {
  /* Estilos */
}

/* === Estados === */

.clase-principal:hover {
  /* Hover */
}
.clase-principal:focus-visible {
  /* Focus */
}
.clase-principal:disabled {
  /* Disabled */
}

/* === Responsive === */
@media (max-width: 480px) { ... }
```

### 6.2 Naming de clases

- **Componentes**: PascalCase + guiones para multi-palabra
  - `.Login-container`, `.form-login`, `.input-login`
  - `LayoutCrypto`, `Menu-header`, `CryptoCard`
- **Estado**: prefijo `is-`, `has-`
  - `.is-active`, `.is-loading`, `.has-error`
- **Modificadores**: BEM-like
  - `.btn-oauth.btn-google`, `.btn-oauth.btn-github`
- **Utilities**: kebab-case
  - `.fade-in`, `.mono`, `.muted`

### 6.3 Reglas de oro

1. **No hardcodear valores**: usar siempre `var(--token)`. Si necesitás un valor que no existe, **añadilo a `App.css` primero**.
2. **No anidar más de 2 niveles** en CSS plano.
3. **Mobile-first**: empezar con la versión base, añadir breakpoints con `min-width` cuando sea posible.
4. **Transiciones en todo elemento interactivo**: si tiene `:hover`, debe tener `transition`.
5. **No usar `!important`** salvo para casos extremos (overrides de librería).

---

## 7. Estructura de archivos CSS

```carpeta
src/
├── App.css                    ← Sistema de diseño (variables, reset, base)
└── css/
    ├── login.css              ← Login + OAuth
    ├── menu.css               ← Navegación
    ├── PieDePagina.css        ← Footer
    ├── Cuadricula.css         ← Grid de criptos
    ├── CriptoPage.css         ← Detalle individual
    ├── perfil.css             ← Perfil de usuario
    ├── 404.css                ← Página no encontrada
    ├── spinner.css            ← Loading
    ├── favorites.css          ← Grid de favoritos
    └── themeToggle.css        ← Toggle dark/light
```

Cada archivo CSS importa solo lo que necesita de `App.css` (que se importa globalmente desde `main.tsx`).

---

## 8. Aplicación por pantalla

| Pantalla   | Estilo dominante            | Acento                   | Animación            |
| ---------- | --------------------------- | ------------------------ | -------------------- |
| Login      | Card central, mucho espacio | Coral en submit + focus  | Fade-in + stagger    |
| Home       | Lista densa, datos en grid  | Coral en hover y links   | Fade-in stagger      |
| CriptoPage | Info + gráfica lado a lado  | Coral en select activo   | Fade-in + chart fade |
| Profile    | Avatar + datos centrados    | Coral en logout          | Fade-in simple       |
| Favorites  | Grid similar a Home         | Coral en estrella activa | Stagger cards        |
| 404        | Mensaje grande, link sutil  | Coral solo en link       | Fade-in              |
| Loading    | 3 dots o pulse sutil        | Coral en punto activo    | Pulse continuo       |

---

## 9. Checklist de revisión

Antes de hacer commit con cambios de CSS, verificar:

- [ ] Todas las variables nuevas añadidas a `App.css` (no hardcoded)
- [ ] Estados `:hover`, `:focus-visible`, `:disabled` cubiertos
- [ ] Contraste mínimo AA verificado
- [ ] `prefers-reduced-motion` respetado
- [ ] Responsive verificado en mobile (≤480px)
- [ ] Tema dark y light funcionan
- [ ] No se rompió el layout de otros componentes
- [ ] No hay `!important` innecesarios

---

## 10. Anti-patrones (NO hacer)

- ❌ No usar `Inter`, `Roboto`, `Arial`, fuentes del sistema
- ❌ No usar gradientes púrpura sobre fondo blanco (estética genérica de IA)
- ❌ No usar emojis como íconos principales de UI (solo decorativos)
- ❌ No crear cards con muchas sombras / box-shadows dramáticos
- ❌ No usar glassmorphism / blur excesivo
- ❌ No usar Tailwind (el proyecto usa CSS plano)
- ❌ No usar dark mode con negro puro `#000` (usar `--bg: #0c0c0c` que es negro cálido)
- ❌ No usar bright colors sin contexto (el coral es el único acento)
