// App.tsx
// Componente raíz que define las rutas de la aplicación.
// Separa las rutas públicas (login, 404) de las protegidas, que requieren
// una sesión activa de Supabase.

import type { ReactNode } from "react";
// ReactNode es el tipo más amplio para "cualquier cosa renderizable" en React:
// strings, números, elementos, fragmentos, arrays, etc.

import { Navigate, Route, Routes } from "react-router-dom";
// Routes renderiza la primera Route cuyo path coincida.
// Navigate permite redirigir programáticamente desde JSX.

import { useAuthStore } from "./stores/authStore";
// Zustand store que guarda la sesión, usuario, perfil y estado de carga de Supabase.

import AppLayout from "./components/AppLayout";
// Layout compartido con Menu, Outlet (contenido de la ruta hija) y Footer.

import Profile from "./components/Profile";
import LayoutCrypto from "./components/LayoutCrypto";
import CriptoPage from "./components/CriptoPage";
import Login from "./components/Login";
import Page404 from "./components/404";
import Loading from "./components/Loading";
import Favorites from "./components/Favorites";
import Home from "./Home";

// Protected es un wrapper que decide si mostrar sus hijos o redirigir al login.
// Recibe children para poder envolver componentes directamente en JSX.
const Protected = ({ children }: { children: ReactNode }) => {
  // Seleccionamos solo las porciones que necesitamos del store.
  // Esto evita re-renderizados innecesarios cuando cambian otras propiedades.
  const session = useAuthStore((s) => s.session);
  const loading = useAuthStore((s) => s.loading);

  // Mientras Supabase restaura la sesión de forma asíncrona (localStorage/cookie),
  // mostramos un spinner. Si no esperamos, siempre redirigiría a /login al recargar.
  if (loading) return <Loading />; // espera a que Supabase decida

  // Si ya tenemos sesión, renderizamos el contenido protegido.
  // Si no, redirigimos a /login en lugar de renderizar nada.
  return session ? <>{children}</> : <Navigate to="/login" />;
};

// App no recibe props. Solo define el mapa de rutas.
const App = () => (
  <Routes>
    {/* Ruta pública: login. No usa Protected porque es a donde redirige. */}
    <Route path="/login" element={<Login />} />

    {/* Ruta padre protegida. Cualquier ruta anidada hereda la protección. */}
    <Route
      element={
        <Protected>
          <AppLayout />
        </Protected>
      }
    >
      {/* index=false implícito; estas son rutas hijas con su propio path. */}
      <Route path="/" element={<Home />} />
      <Route path="/perfil" element={<Profile />} />
      <Route path="/criptomonedas" element={<LayoutCrypto />} />
      {/* :id es un parámetro dinámico. useParams lo leerá dentro de CriptoPage. */}
      <Route path="/criptomonedas/:id" element={<CriptoPage />} />
      <Route path="/favoritos" element={<Favorites />} />
    </Route>

    {/* El asterisco captura cualquier URL no definida y muestra la página 404. */}
    <Route path="*" element={<Page404 />} />
  </Routes>
);

export default App;
