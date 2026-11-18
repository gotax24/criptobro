import "../css/spinner.css";

const Loading = () => (
  <div
    className="spinner-container"
    role="status"
    aria-live="polite"
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
