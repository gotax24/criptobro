import { useParams } from "react-router-dom";
import useData from "../hooks/useData";
import CriptoInfo from "./CriptoInfo";
import Cargando from "./Cargando";
import "../css/CriptoPage.css";
import CriptoGrafica from "./CriptoGrafica";

const CriptoPage = () => {
  const params = useParams();

  const [criptos, cargandoCripto, errorCripto] = useData(
    `assets/${params.id}`,
    true
  );
  const [history, cargandoHistory, errorHistory] = useData(
    `assets/${params.id}/history?interval=d1`,
    false
  );

  if (cargandoCripto || cargandoHistory) return <Cargando />;

  return (
    <>
      <div className="container-main">
        {criptos && <CriptoInfo criptos={criptos} />}
        {history && <CriptoGrafica history={history} />}
        {(errorCripto || errorHistory) && (
          <p>
            {errorCripto?.message ||
              errorHistory?.message ||
              "Ocurrió un error al cargar los datos."}
          </p>
        )}
      </div>
    </>
  );
};

export default CriptoPage;
