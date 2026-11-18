import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../stores/authStore";
import ThemeToggle from "./ThemeToggle";
import "../css/menu.css";

const Menu = () => {
  const session = useAuthStore((s) => s.session);
  const profile = useAuthStore((s) => s.profile);
  const loading = useAuthStore((s) => s.loading);
  const signOut = useAuthStore((s) => s.signOut);

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const VITE_NAME = import.meta.env.VITE_NAME_PAGE;
  const [menuOpen, setMenuOpen] = useState(false);

  const signOutSession = async () => {
    setMenuOpen(false);
    navigate("/");
    await signOut();
    queryClient.removeQueries({ queryKey: ["favorites"] });
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  return (
    <header className="main-menu">
      <div className="logo-title-container">
        <img className="logo-menu" src="/logo-black.svg" alt="logo de la pagina" />
        <h1 className="tittle-menu">{VITE_NAME}</h1>
      </div>

      <button
        className={`hamburger-menu ${menuOpen ? "open" : ""}`}
        onClick={toggleMenu}
        aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={menuOpen}
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

          {session && (
            <>
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
            </>
          )}

          <li className="item-nav theme-toggle-item">
            <ThemeToggle />
          </li>

          {!loading && (
            <li className="item-nav">
              {session ? (
                <button
                  type="button"
                  className="logout-button"
                  onClick={signOutSession}
                >
                  Cerrar sesión
                </button>
              ) : (
                <NavLink to="/login" onClick={() => setMenuOpen(false)}>
                  Iniciar sesión
                </NavLink>
              )}
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Menu;
