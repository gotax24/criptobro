import { Outlet, Navigate } from "react-router-dom";
import Menu from "./menu";

const App = () => {
  if (!localStorage.getItem("tokenCriptoBro")) return <Navigate to="/login" />;

  return (
    <>
      <Menu />
      <Outlet />
    </>
  );
};

export default App;
