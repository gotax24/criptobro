// components/Loading.tsx
// Spinner animado reutilizable que se muestra mientras se cargan datos
// o se restaura la sesión de Supabase.

import "../css/spinner.css";

const Loading = () => (
  <div
    className="spinner-container"
    role="status"
    // role="status" indica que es un mensaje de estado (no interactivo).
    aria-live="polite"
    // aria-live="polite" avisa a los lectores de pantalla cuando aparezca,
    // sin interrumpir al usuario.
    aria-label="Cargando"
  >
    <div className="dots">
      <span className="dot" />
      <span className="dot" />
      <span className="dot" />
    </div>
    <p className="loading-text">Cargando</p>
  </div>
);

export default Loading;
