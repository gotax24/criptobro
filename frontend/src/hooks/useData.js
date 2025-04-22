import axios from "axios";
import { useEffect, useState } from "react";

const useData = (endpoint, whatSign) => {
  const [data, setData] = useState();
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const API_URL = "http://localhost:3001/api/coincap";

  useEffect(() => {
    if (!endpoint) return;

    setCargando(true);

    // Extraemos el id y el tipo a partir del endpoint
    const [base, secondPart] = endpoint.split("/");
    const id = base === "assets" ? secondPart?.split("?")[0] : null;

    const type = endpoint.includes("history") ? "history" : "";

    axios
      .get(`${API_URL}?id=${id || ""}&type=${type}`)
      .then((response) => {
        setData(response.data.data);
        setCargando(false);
        setError(null);
      })
      .catch((error) => {
        setCargando(false);
        console.error("Error al obtener datos del backend:", error);
        setError("Error al obtener datos del backend.");
      });
  }, [endpoint, whatSign]);

  return [data, cargando, error];
};

export default useData;
