import { createContext, useState, useEffect } from "react";

const ThemeContext = createContext(undefined);

function getInitialTheme() {
  if (typeof window === "undefined") return "dark";

  const stored = localStorage.getItem("theme");
  if (stored === "dark" || stored === "light") return stored;

  if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    return "light";
  }

  return "dark";
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext };
