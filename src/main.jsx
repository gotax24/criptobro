// main.jsx
// Punto de entrada de la aplicación React.
// Aquí montamos el árbol de componentes en el DOM y envolvemos la app
// con los proveedores globales: StrictMode, TanStack Query, React Router y tema.

import { StrictMode } from "react";
// StrictMode ayuda a detectar efectos secundarios, APIs obsoletas y
// problemas de renderizado durante el desarrollo. No afecta la build de producción.

import { createRoot } from "react-dom/client";
// createRoot es la API moderna de React 18 para renderizar apps.
// Reemplaza a ReactDOM.render y habilita las nuevas características del concurrent renderer.

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// QueryClient es el cerebro de TanStack Query: almacena caché, configuración
// y estado de todas las peticiones. QueryClientProvider lo pone disponible
// para cualquier componente descendiente que use hooks como useQuery/useMutation.

import { BrowserRouter } from "react-router-dom";
// BrowserRouter usa la API History del navegador para manejar rutas limpias
// (sin hash #). Permite que <Routes> y <Route> funcionen en toda la app.

import { ThemeProvider } from "./context/ThemeContext";
// Proveedor del tema oscuro/claro. Expone el valor del tema y la función
// para alternarlo a través de React Context.

import App from "./App";
// Componente raíz que define el enrutamiento de la aplicación.

import "./App.css";
// Estilos globales que se aplican a toda la aplicación.

// Creamos una única instancia de QueryClient con opciones por defecto.
// Normalmente se crea FUERA del componente para no reiniciar la caché en cada hot reload.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime indica cuánto tiempo los datos se consideran "frescos"
      // antes de volver a fetching. 60_000 ms = 1 minuto.
      staleTime: 60_000,
      // refetchOnWindowFocus: false evita que la petición se dispare cada vez
      // que el usuario vuelve a la pestaña. Útil para datos que no cambian tan rápido.
      refetchOnWindowFocus: false,
    },
  },
});

// createRoot recibe el elemento HTML donde se montará React.
// document.getElementById("root") busca el <div id="root"> de index.html.
// Si ese elemento no existiera, createRoot fallaría; por eso confiamos en que está.
createRoot(document.getElementById("root")).render(
  // StrictMode renderiza dos veces los componentes en desarrollo para detectar
  // efectos secundarios no puros. Si algo se rompe al activarlo, es una señal
  // de que hay un bug de impureza.
  <StrictMode>
    {/* QueryClientProvider inyecta el queryClient en el árbol mediante context. */}
    <QueryClientProvider client={queryClient}>
      {/* BrowserRouter debe envolver cualquier uso de hooks de navegación. */}
      <BrowserRouter>
        {/* ThemeProvider debe envolver a los componentes que consumen useTheme. */}
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
