import { Outlet } from "react-router-dom";
import Menu from "./Menu";
import PieDePagina from "./Footer";

const AppLayout = () => {
  return (
    <>
      <Menu />
      <Outlet />
      <PieDePagina />
    </>
  );
};

export default AppLayout;
