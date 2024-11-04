import "../css/PieDePagina.css"

const PieDePagina = () => {
  return (
    <footer className="credits">
      <address className="social-network-icons">
        <a
          href="https://github.com/gotax24?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="link-networks"
        >
          <img
            src="src/asset/github.svg"
            className="img-footer"
            alt="logo de github"
          />
        </a>
        <a
          href="https://www.linkedin.com/in/ernesto-bracho/"
          target="_blank"
          rel="noopener noreferrer"
          className="link-networks"
        >
          <img
            src="src/asset/likendlin.svg"
            className="img-footer"
            alt="logo de likendlin"
          />
        </a>
        <a
          href="mailto:dev.ejbr@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="link-networks"
        >
          <img src="src/asset/email.svg" className="img-footer" alt="logo de email" />
        </a>
      </address>
      <div className="copyright">Creator: Ing. Ernesto Bracho 2024 &#169;</div>
    </footer>
  );
};

export default PieDePagina;
