import { createRoot } from "react-dom/client";
import App from "./componentes/App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Pagina404 from "./componentes/404.jsx";
import Menu from "./componentes/menu/menu.jsx";

createRoot(document.getElementById("root")).render(
 <>
 <Menu />
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="*" element={<Pagina404/>}/>
    </Routes>
  </BrowserRouter>
 </>
);
