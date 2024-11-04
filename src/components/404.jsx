import { Link } from "react-router-dom";
import "../css/404.css";

const Pagina404 = () => {
  return (
    <>
      <div className="pagina-404-container">
        <h1 className="h1-404">Te perdiste?</h1>
        <h2 className="h2-404">
          No te preocupes suele pasar. La pagina que has pedido no existe o fue
          movida de lugar
        </h2>
        <img
          src="src\asset\404.svg"
          alt="Persona perdida"
          className="img-404"
        />
        <p className="p-404">Puedes darle regresar o</p>

        <Link to="/" className="Link-404">
          Regresar al inicio
        </Link>
      </div>
    </>
  );
};

export default Pagina404;
