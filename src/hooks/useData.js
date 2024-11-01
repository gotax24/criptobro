import axios from "axios";
import { useEffect, useState } from "react";

const useData = (url) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [data, setData] = useState();
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    setCargando(true);

    axios
      .get(`${API_URL}${url}`)
      .then((data) => {
        setData(data.data.data);
        setCargando(false);
      })
      .catch((e) => {
        setCargando(false);
        console.error(e);
      });
  }, [API_URL, url]);

  return [data,cargando];
};

export default useData;
