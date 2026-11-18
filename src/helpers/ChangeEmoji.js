// helpers/ChangeEmoji.js
// Utilidad pura que devuelve un emoji según el signo del número recibido.
// Se usa junto a RedAndGreen para dar feedback visual rápido de la variación de precio.

// La función recibe un número y devuelve un texto (el emoji).
// Uso del operador ternario: condición ? valorSiVerdadero : valorSiFalso.
const changeEmoji = (numero) => (numero < 0 ? "⛔" : "⬆️");
// Si el número es negativo, mostramos ⛔ (bajada). De lo contrario, ⬆️ (subida).
// Los paréntesis alrededor del ternario son opcionales; los ponemos para que
// quede claro que todo el ternario es lo que devuelve la función.

export default changeEmoji;
