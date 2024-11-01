import { useParams } from "react-router-dom";
import useData from "../hooks/useData";
import CriptoInfo from "./CriptoInfo/CriptoInfo";
import CriptoHistory from "./CriptoInfo/CriptoHistory";
import Cargando from "./Cargando";

const CriptoPage = () => {
  const params = useParams();

  const [criptos, cargandoCripto] = useData(`assets/${params.id}`);
  const [history, cargandoHistory] = useData(
    `assets/${params.id}/history?interval=d1`
  );

  if (cargandoCripto || cargandoHistory) return <Cargando />;

  return (
    <>
      <div className="container-main">
        {criptos && <CriptoInfo criptos={criptos} />}
        {history && <CriptoHistory history={history} />}
      </div>
    </>
  );
};

export default CriptoPage;
