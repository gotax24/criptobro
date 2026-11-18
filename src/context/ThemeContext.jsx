// context/ThemeContext.jsx
// Proveedor del tema visual (oscuro/claro) mediante React Context.
// Context es adecuado aquí porque el tema es estado global que cambia raramente
// y se lee en muchos componentes. Auth y datos del servidor usan Zustand/TanStack Query.

import { createContext, useState, useEffect } from "react";
// createContext crea el contexto. useState guarda el tema actual.
// useEffect sincroniza el tema con <html> y localStorage.

// El valor inicial es undefined a propósito: así detectamos si alguien usa
// useTheme fuera del Provider (useTheme lanza un error en ese caso).
const ThemeContext = createContext(undefined);

function getInitialTheme() {
  // typeof window === "undefined" protege contra SSR / renderizado en servidor.
  // Aunque esta app es CSR, es una buena práctica defensiva.
  if (typeof window === "undefined") return "dark";

  const stored = localStorage.getItem("theme");
  // stored puede ser "dark", "light" o null. Solo aceptamos los dos valores válidos
  // para que un valor corrupto en localStorage no rompa el tema.
  if (stored === "dark" || stored === "light") return stored;

  // matchMedia("(prefers-color-scheme: light)") consulta la preferencia del SO.
  // Las media queries CSS siempre van entre paréntesis, no entre llaves.
  if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    return "light";
  }

  // Si no hay nada guardado y el sistema prefiere oscuro (o no podemos saberlo),
  // usamos dark como tema por defecto de la app.
  return "dark";
}

export const ThemeProvider = ({ children }) => {
  // useState(getInitialTheme) recibe la función como lazy initializer.
  // Solo se ejecuta en el primer render; en renders posteriores React la ignora.
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    // setAttribute escribe/actualiza el atributo data-theme en <html>.
    // getAttribute solo lee; no sirve para cambiar el atributo.
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    // El array de dependencias [theme] hace que este efecto se ejecute
    // cada vez que el tema cambia, no en cada render.
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    // Usamos la forma funcional de setState porque la nueva depende del valor anterior.
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
  // Cualquier descendiente puede consumir { theme, toggleTheme } con useTheme().
};

// Exportamos el contexto para que el hook useTheme pueda consumirlo
// desde su propio archivo. Separar el hook del Provider evita la
// advertencia de react-refresh/only-export-components y mantiene el
// Provider como la única exportación de componente en este archivo.
export { ThemeContext };
