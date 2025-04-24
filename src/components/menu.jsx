import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import "../css/menu.css";

const Menu = () => {
  const usuario = useContext(UserContext);
  const navigation = useNavigate();
  const VITE_NAME = import.meta.env.VITE_NAME_PAGE;
  const [menuOpen, setMenuOpen] = useState(false);

  const cerrarSesion = () => {
    localStorage.removeItem("tokenCriptoBro");
    navigation("/login");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);
  

  return (
    <header className="main-menu">
      <div className="logo-title-container">
        <img className="logo-menu" src="/logo.svg" alt="logo de la pagina" />
        <h1 className="tittle-menu">{VITE_NAME}</h1>
      </div>

      <div className="hamburger-menu" onClick={toggleMenu}>
        <div className={`hamburger-icon ${menuOpen ? "open" : ""}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <nav className={`nav-menu ${menuOpen ? "active" : ""}`}>
        <ul>
          <li className="item-nav">
            <NavLink to="/" onClick={() => setMenuOpen(false)}>
              Inicio
            </NavLink>
          </li>
          <li className="item-nav">
            <NavLink to="/criptomonedas" onClick={() => setMenuOpen(false)}>
              Lista de criptos
            </NavLink>
          </li>
          <li className="item-nav">
            <NavLink to="/Perfil" onClick={() => setMenuOpen(false)}>
              Perfil de {usuario.first_name}
            </NavLink>
          </li>
          <li className="item-nav">
            <a
              onClick={() => {
                cerrarSesion();
                setMenuOpen(false);
              }}
              href="#!"
            >
              Cerrar sesión
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
 
export default Menu;
