import { useState, useEffect } from "react";
import axios from "axios";
import Cuadricula from "./Cuadricula";
import "./css/App.css";


function App() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [criptos, setCripto] = useState();

  useEffect(() => {
    const api = async () => {
      try {
        const res = await axios.get(`${API_URL}assets`);
        const data = res.data;
        setCripto(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    api();
  }, [API_URL]);

  if (!criptos) return <span>Cargando...</span>;

  return (
    <>
      <h1 className="titulo">Lista de Criptomonedas</h1>
      <div className="container">
        {criptos.map(
          ({ id, name, symbol, priceUsd, changePercent24Hr, rank }) => (
            <Cuadricula
              key={id}
              rank={rank}
              name={name}
              symbol={symbol}
              priceUsd={priceUsd}
              change={Number(changePercent24Hr).toFixed(3)}
            />
          )
        )}
      </div>
    </>
  );
}

export default App;
