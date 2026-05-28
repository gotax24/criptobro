import { Outlet, Navigate } from "react-router-dom";
import Menu from "./menu";
import PieDePagina from "./PieDePagina";

const App = () => {
  return (
    <>
      <Menu />
      <Outlet />
      <PieDePagina />
    </>
  );
};

export default App;
