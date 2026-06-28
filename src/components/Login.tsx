import { useState } from "react";
import { Navigate } from "react-router-dom";
import {
  useSignInWithEmail,
  useSignUpWithEmail,
  signInWithOAuth,
} from "../api/auth";
import { useAuthStore } from "../stores/authStore";
import "../css/login.css";
import Loading from "./Loading";

type AuthMode = "login" | "register";

const Login = () => {
  const session = useAuthStore((s) => s.session);
  const loading = useAuthStore((s) => s.loading);

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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<AuthMode>("login");
  const [oauthError, setOauthError] = useState<string | null>(null);

  if (loading) return <Loading />;

  if (session) return <Navigate to="/" />;

  const isPending = mode === "login" ? signingIn : signingUp;
  const authError = mode === "login" ? signInError : signUpError;
  const displayError = authError?.message || oauthError;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (mode === "register") {
      signUp({ email, password });
    } else {
      signIn({ email, password });
    }
  };

  const handleOAuth = async (provider: "google" | "facebook" | "github") => {
    try {
      setOauthError(null);
      await signInWithOAuth(provider);
    } catch (err) {
      setOauthError(err instanceof Error ? err.message : "Error con OAuth");
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
              className="input-login"
              type="password"
              name="login-password"
              id="login-password"
              required
              value={password}
              minLength={6}
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
            className="btn-oauth btn-facebook"
            onClick={() => handleOAuth("facebook")}
            aria-label="Continuar con Facebook"
          >
            <span className="oauth-icon" aria-hidden="true">f</span>
            Facebook
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
    </div>
  );
};

export default Login;
