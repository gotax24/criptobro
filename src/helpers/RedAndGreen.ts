// helpers/RedAndGreen.ts
// Utilidad pura que devuelve el nombre de una clase CSS según el signo del número.
// Se usa para pintar de rojo las variaciones negativas y de verde las positivas.

const RedAndGreen = (numero: number): string => (numero < 0 ? "red" : "green");
// Si numero es menor que 0, retorna "red"; si es cero o positivo, retorna "green".
// El tipo de retorno string es explícito para que TypeScript obligue a devolver
// siempre un string y no, por ejemplo, un booleano por accidente.

export default RedAndGreen;
