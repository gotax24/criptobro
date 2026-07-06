// helpers/ChangeEmoji.ts
// Utilidad pura que devuelve un emoji según el signo del número recibido.
// Se usa junto a RedAndGreen para dar feedback visual rápido de la variación de precio.

// La función recibe un número y devuelve un string (el emoji).
// Uso del operador ternario: condición ? valorSiVerdadero : valorSiFalso.
const changeEmoji = (numero: number): string => (numero < 0 ? "⛔" : "⬆️");
// Si el número es negativo, mostramos ⛔ (bajada). De lo contrario, ⬆️ (subida).
// El paréntesis alrededor de la arrow function con cuerpo implícito es necesario
// para que TypeScript entienda que todo el ternario es el valor de retorno.

export default changeEmoji;
