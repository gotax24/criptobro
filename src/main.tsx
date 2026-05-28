import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Pagina404 from "./components/404.tsx";
import Home from "./home.tsx";
import App from "./components/App.tsx";
import Cuadricula from "./components/Cuadricaula.tsx";
import CriptoPage from "./components/CriptoPage.tsx";
import { UserContextProvider } from "./context/UserContext.tsx";
import Perfil from "./components/Perfil.tsx";
import Login from "./components/login.tsx";
import "./main.css"

createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
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
