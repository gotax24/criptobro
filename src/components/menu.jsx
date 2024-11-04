import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import "../css/menu.css"

const Menu = () => {
  const usuario = useContext(UserContext);

  const navigation = useNavigate();

  const VITE_NAME = import.meta.env.VITE_NAME_PAGE;

  const cerrarSesion = () => {
    localStorage.removeItem("tokenCriptoBro");
    navigation("/login");
  };

  return (
    <header className="main-menu">
    <div className="logo-title-container">
      <img className="logo-menu" src="/logo.svg" alt="logo de la pagina" />
      <h1 className="tittle-menu">{VITE_NAME}</h1>
    </div>
    <nav className="nav-menu">
      <ul>
        <li className="item-nav">
          <NavLink to="/">Inicio</NavLink>
        </li>
        <li className="item-nav">
          <NavLink to="/criptomonedas">Lista de criptos</NavLink>
        </li>
        <li className="item-nav">
          <NavLink to="/Perfil">Perfil de {usuario.name}</NavLink>
        </li>
        <li className="item-nav">
          <a onClick={cerrarSesion} href="#!">
            Cerrar sesión
          </a>
        </li>
      </ul>
    </nav>
  </header>
  
  );
};

export default Menu;
