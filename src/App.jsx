import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [criptos, setCripto] = useState();

  const api = async () => {
    try {
      const res = await axios.get(`${API_URL}assets`);
      console.log(res.data.data)
      const data = res.data;
      setCripto(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    api();
  }, []);

  if (!criptos) return <span>Cargando...</span>;

  return (
    <>
      <h1>Lista de criptomoneda</h1>
      <ol>
        {criptos.map(({ id, name, priceUsd }) => (
          <li key={id}>
            Nombre: {name} - Precio: {Number(priceUsd).toFixed(2)}$
          </li>
        ))}
      </ol>
    </>
  );
}

export default App;
