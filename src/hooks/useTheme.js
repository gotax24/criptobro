// hooks/useTheme.js
// Hook personalizado para consumir el tema.
// Está en su propio archivo para que ThemeContext.jsx solo exporte el
// componente ThemeProvider. Esto satisface la regla
// react-refresh/only-export-components de ESLint.

import { useContext } from "react";
// useContext es el hook que conecta un componente con un React Context.

import { ThemeContext } from "../context/ThemeContext";
// Importamos el contexto creado en ThemeContext.jsx.

// Devuelve el objeto { theme, toggleTheme } que provee ThemeProvider.
export const useTheme = () => {
  const context = useContext(ThemeContext);
  // Si context es undefined, significa que se llamó fuera de <ThemeProvider>.
  if (!context) {
    throw new Error("useTheme debe usarse dentro de un ThemeProvider");
    // Lanzar un error claro en desarrollo ayuda a detectar problemas de
    // jerarquía de componentes mucho antes de que lleguen a producción.
  }
  return context;
};
