// helpers/FormatNumber.js
// Utilidad pura para formatear números como moneda en dólares estadounidenses.
// "Pura" significa que siempre devuelve el mismo resultado para los mismos argumentos
// y no tiene efectos secundarios (no toca DOM, no llama a APIs, no depende de estado externo).

// Recibe un número y devuelve un texto con formato de moneda (ej. "$1,234.567").
const FormatNumber = (numero) => {
  // Intl.NumberFormat es la API nativa de JavaScript para formatear números
  // según localización y opciones. Aquí usamos "en-US" para puntos de miles y punto decimal.
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    // style: "currency" indica que queremos formato monetario.
    currency: "USD",
    // Moneda objetivo: dólar estadounidense.
    minimumFractionDigits: 3,
    // Siempre muestra al menos 3 decimales.
    maximumFractionDigits: 3,
    // Nunca muestra más de 3 decimales.
  }).format(numero);
  // .format(numero) aplica el formato al valor recibido y devuelve un string.
};

export default FormatNumber;
// Exportación por defecto para poder importarla con cualquier nombre:
// import FormatNumber from "../helpers/FormatNumber";
