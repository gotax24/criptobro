import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import type { ThemeContextValue } from "../context/ThemeContext";

// Hook personalizado para consumir el tema.
// Está en su propio archivo para que ThemeContext.tsx solo exporte el
// componente ThemeProvider. Esto satisface la regla
// react-refresh/only-export-components de ESLint.
export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme debe usarse dentro de un ThemeProvider");
  }
  return context;
};
