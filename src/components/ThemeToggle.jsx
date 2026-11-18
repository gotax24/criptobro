// components/ThemeToggle.jsx
// Interruptor (switch) animado que alterna entre modo oscuro y modo claro.
// Usa iconos SVG de sol y luna con pista deslizante, evitando emojis de UI.

import { useTheme } from "../hooks/useTheme";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  // theme indica el tema actual ("dark" | "light"); toggleTheme lo alterna.
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      className={`theme-switch ${isDark ? "is-dark" : "is-light"}`}
      onClick={toggleTheme}
      aria-checked={isDark}
      // aria-checked junto a role="switch" comunica a lectores de pantalla el estado del interruptor.
      aria-label={
        isDark ? "Modo oscuro activo. Cambiar a modo claro" : "Modo claro activo. Cambiar a modo oscuro"
      }
      title={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      <span className="theme-switch-track" aria-hidden="true">
        <span className="theme-switch-icon theme-switch-sun">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </svg>
        </span>
        <span className="theme-switch-icon theme-switch-moon">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </span>
        <span className="theme-switch-thumb" />
      </span>
    </button>
  );
};

export default ThemeToggle;
