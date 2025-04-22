import axios from "axios";
import { useEffect, useState } from "react";

const useData = (url,whatSign) => {
  const API_URL = import.meta.env.API_URL;
  const API_KEY = import.meta.env.API_KEY;
  const [data, setData] = useState();
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    setCargando(true);

    const axiosUrl = whatSign ? `${API_URL}${url}?apiKey=${API_KEY}` : `${API_URL}${url}&apiKey=${API_KEY}`;

    axios
      .get(axiosUrl)
      .then((data) => {
        setData(data.data.data);
        setCargando(false);
      })
      .catch((e) => {
        setCargando(false);
        console.error(e);
      });
  }, [API_URL, url, API_KEY, whatSign]);

  return [data,cargando];
};

export default useData;
