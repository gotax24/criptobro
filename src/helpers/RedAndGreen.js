// helpers/RedAndGreen.js
// Utilidad pura que devuelve el nombre de una clase CSS según el signo del número.
// Se usa para pintar de rojo las variaciones negativas y de verde las positivas.

const RedAndGreen = (numero) => (numero < 0 ? "red" : "green");
// Si numero es menor que 0, retorna "red"; si es cero o positivo, retorna "green".
// Siempre devuelve uno de esos dos textos, que luego usamos como nombre de clase CSS.

export default RedAndGreen;
