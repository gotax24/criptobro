import { useParams } from "react-router-dom";
import useData from "../hooks/useData";
import CriptoInfo from "./CriptoInfo/CriptoInfo";
import CriptoHistory from "./CriptoInfo/CriptoHistory";

const CriptoPage = () => {
  const params = useParams();

  const [criptos, cargandoCripto] = useData(`assets/${params.id}`);
  const [history, cargandoHistory] = useData(`assets/${params.id}/history?interval=d1`);

  if (cargandoCripto || cargandoHistory) return <span>Cargando...</span>;

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
