// components/Menu.tsx
// Barra de navegación superior con menú hamburguesa, links de navegación,
// toggle de tema y botón de cierre de sesión.

import { NavLink, useNavigate } from "react-router-dom";
// NavLink es como Link pero añade una clase activa a la ruta actual.
// useNavigate permite redirigir programáticamente después del logout.

import { useState, useEffect } from "react";
// useState controla si el menú móvil está abierto.
// useEffect bloquea/desbloquea el scroll del body cuando el menú está abierto.

import { useAuthStore } from "../stores/authStore";
import "../css/menu.css";
import ThemeToggle from "./ThemeToggle";

const Menu = () => {
  // Seleccionamos solo los slices que necesitamos para minimizar re-renders.
  const profile = useAuthStore((s) => s.profile);
  const signOut = useAuthStore((s) => s.signOut);

  const navigate = useNavigate();
  const VITE_NAME = import.meta.env.VITE_NAME_PAGE;
  const [menuOpen, setMenuOpen] = useState(false);

  // Cierra sesión, colapsa el menú móvil y redirige al login.
  const signOutSession = async () => {
    await signOut();
    setMenuOpen(false);
    navigate("/login");
  };

  // Alterna el estado del menú móvil.
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // Efecto secundario: cuando el menú móvil está abierto, bloqueamos el scroll
  // del body para evitar que el usuario haga scroll por detrás del overlay.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";

    return () => {
      // Cleanup: si el componente se desmonta con el menú abierto,
      // restablecemos el scroll para no dejarlo bloqueado.
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  return (
    <header className="main-menu">
      <div className="logo-title-container">
        <img className="logo-menu" src="/logo.svg" alt="logo de la pagina" />
        <h1 className="tittle-menu">{VITE_NAME}</h1>
      </div>

      <button
        className={`hamburger-menu ${menuOpen ? "open" : ""}`}
        onClick={toggleMenu}
        aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={menuOpen}
        // type="button" es obligatorio para que no envíe un formulario si el
        // botón está dentro de uno. Además mejora la accesibilidad.
      >
        <div className="hamburger-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

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
            <NavLink to="/favoritos" onClick={() => setMenuOpen(false)}>
              Favoritos
            </NavLink>
          </li>
          <li className="item-nav">
            <NavLink to="/perfil" onClick={() => setMenuOpen(false)}>
              Perfil de {profile?.full_name ?? "Usuario"}
            </NavLink>
          </li>
          <li className="item-nav theme-toggle-item">
            <ThemeToggle />
          </li>
          <li className="item-nav">
            <button
              type="button"
              className="logout-button"
              onClick={signOutSession}
            >
              Cerrar sesión
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Menu;
