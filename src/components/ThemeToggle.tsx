// components/ThemeToggle.tsx
// Botón que permite alternar entre modo oscuro y modo claro.
// Consume el tema desde el contexto mediante el hook useTheme.

import { useTheme } from "../hooks/useTheme";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  // theme indica el tema actual; toggleTheme lo alterna.

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-pressed={theme === "dark"}
      // aria-pressed indica si el botón está "presionado" (modo oscuro activo).
      aria-label={
        theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
      }
      // aria-label describe la acción, no el icono, para lectores de pantalla.
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
};

export default ThemeToggle;
