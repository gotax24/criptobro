import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import "../css/perfil.css";

const Perfil = () => {
  const usuario = useContext(UserContext);

  return (
    <div className="container-perfil">
      <img
        className="img-perfil"
        src={usuario.avatar}
        alt="foto de perfil del usuario"
      />
      <h1 className="name-perfil">
        {usuario.first_name} {usuario.last_name}
      </h1>
      <h2 className="correo-perfil">Tu correo es: {usuario.email}</h2>
      <p className="advertencia">
        Estoy utilizando los datos de un servicio proporcionado por Reqres para
        practicar la llamada a usuarios desde un servidor. Cabe destacar que
        estos usuarios no son reales; se utilizan únicamente con fines de
        práctica y simulación.
      </p>
    </div>
  );
};

export default Perfil;
