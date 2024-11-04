import { Outlet, Navigate } from "react-router-dom";
import Menu from "./menu";
import PieDePagina from "./PieDePagina";

const App = () => {
  if (!localStorage.getItem("tokenCriptoBro")) return <Navigate to="/login" />;

  return (
    <>
      <Menu />
      <Outlet />
      <PieDePagina />
    </>
  );
};

export default App;
