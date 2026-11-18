import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuthStore } from "./stores/authStore";
import AppLayout from "./components/AppLayout";
import Profile from "./components/Profile";
import LayoutCrypto from "./components/LayoutCrypto";
import CriptoPage from "./components/CriptoPage";
import Login from "./components/Login";
import Page404 from "./components/404";
import Loading from "./components/Loading";
import Favorites from "./components/Favorites";
import Home from "./Home";

const Protected = ({ children }) => {
  const session = useAuthStore((s) => s.session);
  const loading = useAuthStore((s) => s.loading);
  const location = useLocation();

  if (loading) return <Loading />;

  return session ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  );
};

const App = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route element={<AppLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/criptomonedas" element={<LayoutCrypto />} />
      <Route path="/criptomonedas/:id" element={<CriptoPage />} />
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
    <Route path="*" element={<Page404 />} />
  </Routes>
);

export default App;
