// components/Login.jsx
// Página de autenticación (opcional). Permite iniciar sesión o registrarse con email/password
// y también ofrece login mediante OAuth (Google, GitHub).

import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import {
  useSignInWithEmail,
  useSignUpWithEmail,
  signInWithOAuth,
} from "../api/auth";
import { useAuthStore } from "../stores/authStore";
import "../css/login.css";
import Loading from "./Loading";

// Modo actual del formulario: "login" (iniciar sesión) o "register" (crear cuenta).

const Login = () => {
  // Observamos el estado global de sesión y carga.
  const session = useAuthStore((s) => s.session);
  const loading = useAuthStore((s) => s.loading);

  // La página que nos envía aquí guarda en location.state la ruta de origen (from)
  // y, si aplica, un mensaje que explica por qué pedimos sesión.
  const location = useLocation();
  const from = location.state?.from ?? "/";
  const infoMessage = location.state?.message ?? null;

  // Mutaciones de TanStack Query para email/password.
  const {
    mutate: signIn,
    isPending: signingIn,
    error: signInError,
  } = useSignInWithEmail();

  const {
    mutate: signUp,
    isPending: signingUp,
    error: signUpError,
  } = useSignUpWithEmail();

  // Estado local del formulario.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");
  const [oauthError, setOauthError] = useState(null);

  // Mientras Supabase decide si hay sesión, mostramos el spinner.
  if (loading) return <Loading />;

  // Si ya hay sesión, volvemos a la página de origen. Navigate es un componente, no un hook.
  if (session) return <Navigate to={from} replace />;

  // Deriva el estado de carga y el error según el modo actual.
  const isPending = mode === "login" ? signingIn : signingUp;
  const authError = mode === "login" ? signInError : signUpError;
  const displayError = authError?.message || oauthError;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prevenimos el envío nativo del formulario para manejarlo con React.

    if (mode === "register") {
      signUp({ email, password });
    } else {
      signIn({ email, password });
    }
  };

  const handleOAuth = async (provider) => {
    try {
      setOauthError(null);
      // Limpiamos errores previos antes de intentar un nuevo login.
      await signInWithOAuth(provider, from);
    } catch (err) {
      setOauthError(err instanceof Error ? err.message : "Error con OAuth");
      // Si el error no es una instancia de Error, mostramos un mensaje genérico.
    }
  };

  return (
    <div className="Login-container">
      <div className="title-logo-container">
        <img className="logo-login" src="/logo.svg" alt="Logo CriptoBro" />
        <h1 className="tittle-login">CriptoBro</h1>
      </div>
      <form className="form-login" onSubmit={handleSubmit}>
        <h2>{mode === "login" ? "Iniciar sesión" : "Crear cuenta"}</h2>

        {infoMessage && (
          <p className="info-login" role="status">
            {infoMessage}
          </p>
        )}

          {displayError && (
            <p className="error" role="alert">
              {displayError}
            </p>
          )}

          <div className="field">
            <label className="label-login" htmlFor="login-email">
              Email
            </label>
            <input
              id="login-email"
              autoComplete="email"
              // autoComplete ayuda al navegador a autocompletar el campo.
              className="input-login"
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              disabled={isPending}
            />
          </div>
          <div className="field">
            <label className="label-login" htmlFor="login-password">
              Contraseña
            </label>
            <input
              autoComplete={
                mode === "login" ? "current-password" : "new-password"
              }
              // Diferenciamos el autocompletado según sea login o registro.
              className="input-login"
              type="password"
              name="login-password"
              id="login-password"
              required
              value={password}
              minLength={6}
              // Supabase requiere mínimo 6 caracteres para la contraseña.
              onChange={(e) => setPassword(e.target.value)}
              disabled={isPending}
            />
          </div>
          <div className="submit">
            <button className="button-login" type="submit" disabled={isPending}>
              {isPending
                ? "Cargando ..."
                : mode === "login"
                  ? "Iniciar sesion"
                  : "Crear cuenta"}
            </button>
          </div>
          <p className="toggle-mode">
            {mode === "login" ? (
              <>
                ¿No tienes cuenta?{" "}
                <button
                  type="button"
                  className="link-button"
                  onClick={() => setMode("register")}
                >
                  Crear una
                </button>
              </>
            ) : (
              <>
                ¿Ya tienes cuenta?{" "}
                <button
                  type="button"
                  className="link-button"
                  onClick={() => setMode("login")}
                >
                  Iniciar sesión
                </button>
              </>
            )}
          </p>
      </form>

      {/* Separador visual y botones OAuth */}
      <div className="oauth-section">
        <p className="oauth-divider">
          <span>o continúa con</span>
        </p>

        <div className="oauth-buttons">
          {/* type="button" evita que disparen el submit del form */}
          <button
            type="button"
            className="btn-oauth btn-google"
            onClick={() => handleOAuth("google")}
            aria-label="Continuar con Google"
          >
            <span className="oauth-icon" aria-hidden="true">G</span>
            Google
          </button>

          <button
            type="button"
            className="btn-oauth btn-github"
            onClick={() => handleOAuth("github")}
            aria-label="Continuar con GitHub"
          >
            <span className="oauth-icon" aria-hidden="true">⌘</span>
            GitHub
          </button>
        </div>
      </div>
      <Link to="/criptomonedas" className="link-explorar">
        ← Explorar criptos sin iniciar sesión
      </Link>
    </div>
  );
};

export default Login;
