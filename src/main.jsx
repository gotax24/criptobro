import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import App from "./App";
import "./App.css";

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

createRoot(document.getElementById("root")).render(
  // StrictMode renderiza dos veces los componentes en desarrollo para detectar
  // efectos secundarios no puros. Si algo se rompe al activarlo, es una señal
  // de que hay un bug de impureza.
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
