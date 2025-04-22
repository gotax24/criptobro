import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors()); // para permitir solicitudes desde tu frontend

app.get("/api/coincap", async (req, res) => {
  const { id, type } = req.query;

  const BASE_URL = "https://rest.coincap.io/v3/";
  const API_KEY = process.env.API_KEY;

  let endpoint = "";

  if (type === "history") {
    endpoint = `assets/${id}/history?interval=d1`;
  } else {
    endpoint = `assets/${id}`;
  }

  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error en el backend:", error.message);
    res.status(500).json({ error: "Error al obtener datos de CoinCap." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
