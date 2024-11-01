import { Link } from "react-router-dom";
import "./home.css"

const home = () => {
  const VITE_NAME = import.meta.env.VITE_NAME_PAGE;

  return (
    <>
      <h1 className="title-home">Hola Bienvenido a {VITE_NAME}</h1>
      <h2 className="sub-title">¿Que son las criptomonedas?</h2>
      <p className="p-home">
        Las criptomonedas son una forma de dinero
        digital, como una versión virtual del efectivo. A diferencia de las
        monedas tradicionales (como el dólar o el euro) que están controladas
        por gobiernos o bancos, las criptomonedas son descentralizadas, lo que
        significa que no hay una institución que las maneje. Esto se logra a
        través de una tecnología llamada blockchain, que es como un gran libro
        de contabilidad digital que registra todas las transacciones de forma
        segura. Ejemplos populares de criptomonedas son Bitcoin y Ethereum.
      </p>
      <h3 className="h3-home">Conoce las 100 criptos mas usadas</h3>
      <Link className="link-home" to="/criptomonedas">Ver Cripto mondeas</Link>
    </>
  );
};

export default home;
