import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Home from "./Home";
import Profile from "./components/Profile";
import LayoutCrypto from "./components/LayoutCrypto";
import CriptoPage from "./components/CriptoPage";
import Login from "./components/Login";
import Page404 from "./components/404";
import { useAuthStore } from "./stores/authStore";

const Protected = ({ children }: { children: React.ReactNode }) => {
  const token = useAuthStore((s) => s.token);
  return token ? <>{children}</> : <Navigate to="/login" />;
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
