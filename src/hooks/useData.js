import axios from "axios";
import { useEffect, useState } from "react";

const useData = (url, whatSign) => {
  const [data, setData] = useState();
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    setCargando(true);
    setError(null);
    const sign = whatSign ? "?" : "&";
    axios
      .get(`${API_URL}${url}${sign}apiKey=${API_KEY}`)
      .then((response) => {
        setData(response.data.data);
        setCargando(false);
        setError(null);
      })
      .catch((error) => {
        setCargando(false);
        console.error("Error al obtener datos del backend:", error);
        setError(error);
      });
  }, [url, whatSign, API_KEY, API_URL]);

  return [data, cargando, error];
};

export default useData;
