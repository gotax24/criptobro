import type { ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Home from "./Home";
import Profile from "./components/Profile";
import LayoutCrypto from "./components/LayoutCrypto";
import CriptoPage from "./components/CriptoPage";
import Login from "./components/Login";
import Page404 from "./components/404";
import Loading from "./components/Loading";
import { useAuthStore } from "./stores/authStore";

const Protected = ({ children }: { children: ReactNode }) => {
  const session = useAuthStore((s) => s.session);
  const loading = useAuthStore((s) => s.loading);

  if (loading) return <Loading />;                          // espera a que Supabase decida
  return session ? <>{children}</> : <Navigate to="/login" />;
};

const App = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route
      element={
        <Protected>
          <AppLayout />
        </Protected>
      }
    >
      <Route path="/" element={<Home />} />
      <Route path="/perfil" element={<Profile />} />
      <Route path="/criptomonedas" element={<LayoutCrypto />} />
      <Route path="/criptomonedas/:id" element={<CriptoPage />} />
    </Route>
    <Route path="*" element={<Page404 />} />
  </Routes>
);

export default App;
