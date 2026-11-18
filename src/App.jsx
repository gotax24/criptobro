// App.jsx
// Componente raíz que define las rutas de la aplicación.
// La navegación es pública: cualquiera puede ver el inicio, la lista y el detalle de las criptos.
// Solo favoritos y perfil requieren sesión; esas rutas se envuelven con <Protected>.

import { Navigate, Route, Routes, useLocation } from "react-router-dom";
// Routes renderiza la primera Route cuyo path coincida.
// Navigate permite redirigir programáticamente desde JSX.
// useLocation nos dice la ruta actual para recordarla al enviar al usuario a /login.

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
// Solo lo usamos en las rutas que de verdad necesitan sesión (favoritos y perfil).
const Protected = ({ children }) => {
  // Seleccionamos solo las porciones que necesitamos del store.
  // Esto evita re-renderizados innecesarios cuando cambian otras propiedades.
  const session = useAuthStore((s) => s.session);
  const loading = useAuthStore((s) => s.loading);
  const location = useLocation();

  // Mientras Supabase restaura la sesión de forma asíncrona (localStorage/cookie),
  // mostramos un spinner. Si no esperamos, siempre redirigiría a /login al recargar.
  if (loading) return <Loading />; // espera a que Supabase decida

  // Si ya tenemos sesión, renderizamos el contenido protegido.
  // Si no, redirigimos a /login y guardamos la ruta actual en state.from
  // para volver a ella después de iniciar sesión.
  return session ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  );
};

// App no recibe props. Solo define el mapa de rutas.
const App = () => (
  <Routes>
    {/* Ruta de login. Es opcional: también la usamos para pedir sesión al guardar un favorito. */}
    <Route path="/login" element={<Login />} />

    {/* Ruta padre pública: cualquier visitante puede navegar aquí sin iniciar sesión. */}
    <Route element={<AppLayout />}>
      {/* index=false implícito; estas son rutas hijas con su propio path. */}
      <Route path="/" element={<Home />} />
      <Route path="/criptomonedas" element={<LayoutCrypto />} />
      {/* :id es un parámetro dinámico. useParams lo leerá dentro de CriptoPage. */}
      <Route path="/criptomonedas/:id" element={<CriptoPage />} />

      {/* Rutas que requieren sesión: cada una se envuelve con Protected. */}
      <Route
        path="/favoritos"
        element={
          <Protected>
            <Favorites />
          </Protected>
        }
      />
      <Route
        path="/perfil"
        element={
          <Protected>
            <Profile />
          </Protected>
        }
      />
    </Route>

    {/* El asterisco captura cualquier URL no definida y muestra la página 404. */}
    <Route path="*" element={<Page404 />} />
  </Routes>
);

export default App;
