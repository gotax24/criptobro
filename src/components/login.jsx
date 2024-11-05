import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import "../css/login.css";

const Login = () => {
  const navigation = useNavigate();

  const VITE_NAME = import.meta.env.VITE_NAME_PAGE;

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setCargando(true);
    setError(null);
    axios
      .post(`https://reqres.in/api/login`, user)
      .then((data) => {
        setCargando(false);
        localStorage.setItem("tokenCriptoBro", data.data.token);
        navigation("/");
      })
      .catch((e) => {
        setCargando(false);
        console.error(e);
        setError(e.response.data.error);
      });
  };

  if (localStorage.getItem("tokenCriptoBro")) return <Navigate to="/" />;

  return (
    <>
      <div className="Login-container">
        <div className="title-logo-container">
          <img className="logo-login" src="/logo.svg" alt="Logo" />
          <h1 className="tittle-login">{VITE_NAME}</h1>
        </div>
        <h2 className="sub-tittle-login">Iniciar Sesion</h2>
        <form className="form-login" onSubmit={submit}>
          <div className="field">
            <label className="label-login" htmlFor="email">
              Email
            </label>
            <input
              autoComplete="on"
              className="input-login"
              type="email"
              name="email"
              required
              onChange={(e) => {
                setUser({
                  ...user,
                  email: e.target.value,
                });
              }}
            />
          </div>
          <div className="field">
            <label className="label-login" htmlFor="password">
              Contraseña
            </label>
            <input
              autoComplete="current-password"
              className="input-login"
              type="password"
              name="password"
              required
              onChange={(e) => {
                setUser({
                  ...user,
                  password: e.target.value,
                });
              }}
            />
          </div>
          <div className="submit">
            <input
              className="button-login"
              type="submit"
              value={cargando ? "Cargando..." : "Ingresar"}
            />
          </div>
        </form>
        {error && <span className="error">Error: {error}</span>}
        <p className="disclaimer">
          Este formulario utiliza una API gratuita para simular un inicio de
          sesión en un servidor real. Puedes probar el sistema utilizando estos
          datos de prueba:
          <br />
          <strong>Email:</strong> eve.holt@reqres.in <br />
          <strong>Contraseña:</strong> cityslicka <br />
          Introduce estos datos en los campos correspondientes para experimentar
          el proceso de inicio de sesión.
        </p>
      </div>
    </>
  );
};

export default Login;
