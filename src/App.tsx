import { BrowserRouter, Route, Routes } from "react-router-dom";
import Pagina404 from "./components/404.tsx";
import Home from "./Home.tsx";
import AppLayout from "./components/AppLayout.tsx";
import Cuadricula from "./components/LayoutCrypto.tsx";
import CriptoPage from "./components/CriptoPage.tsx";
import { UserContextProvider } from "./context/UserContext.tsx";
import Perfil from "./components/Profile.tsx";
import Login from "./components/Login.tsx";
import "./App.css";

const App = () => {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="perfil" element={<Perfil />} />
          </Route>
          <Route path="/criptomonedas" element={<App />}>
            <Route index element={<Cuadricula />} />
            <Route path=":id" element={<CriptoPage />}></Route>
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Pagina404 />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
};

export default App;
