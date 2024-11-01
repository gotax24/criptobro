import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Pagina404 from "./components/404.jsx";
import App from "./components/App.jsx";
import Home from "./home.jsx";
import Cuadricula from "./components/Cuadricaula.jsx";
import CriptoPage from "./components/CriptoPage.jsx";
import { UserContextProvider } from "./context/UserContext.jsx";
import Perfil from "./components/Perfil.jsx";
import Login from "./components/login.jsx";
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
