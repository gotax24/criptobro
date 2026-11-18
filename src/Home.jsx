// Home.jsx
// Página de inicio pública. Muestra un mensaje de bienvenida, una breve
// explicación sobre criptomonedas y un enlace a la lista de criptomonedas.

import { Link } from "react-router-dom";
// Link es el componente de navegación de React Router. Renderiza un <a>
// real en el DOM, pero intercepta el click para hacer SPA navigation
// sin recargar la página.

import "./Home.css";
// Estilos específicos de la página de inicio. Nota: en Linux el sistema de
// archivos distingue mayúsculas/minúsculas, por eso el import coincide
// exactamente con el nombre del archivo Home.css.

const Home = () => {
  // Leemos el nombre de la app desde variables de entorno de Vite.
  // import.meta.env expone solo las variables que empiezan con VITE_.
  // El operador ?? (nullish coalescing) proporciona un valor por defecto
  // si la variable es undefined o null.
  const VITE_NAME = import.meta.env.VITE_NAME_PAGE ?? "CriptoBro";

  return (
    // section es más semántico que div para agrupar contenido temático.
    <section className="home-content">
      {/* Mostramos el nombre de la app dinámicamente. */}
      <h1 className="title-home">Hola Bienvenido a {VITE_NAME}</h1>
      <h2 className="sub-title">¿Qué son las criptomonedas?</h2>
      <p className="p-home">
        Las criptomonedas son una forma de dinero digital, como una versión
        virtual del efectivo. A diferencia de las monedas tradicionales (como el
        dólar o el euro) que están controladas por gobiernos o bancos, las
        criptomonedas son descentralizadas, lo que significa que no hay una
        institución que las maneje. Esto se logra a través de una tecnología
        llamada blockchain, que es como un gran libro de contabilidad digital
        que registra todas las transacciones de forma segura. Ejemplos populares
        de criptomonedas son Bitcoin y Ethereum.
      </p>
      <h3 className="h3-home">Conoce las 100 criptos más usadas</h3>
      {/* Link to="/criptomonedas" navega a la ruta definida en App.tsx. */}
      <Link className="link-home" to="/criptomonedas">
        Ver Cripto monedas
      </Link>
    </section>
  );
};

export default Home;
