import "../css/PieDePagina.css";
import githubLogo from "../asset/github.svg"
import emailLogo from "../asset/email.svg"
import linkendlinLogo from "../asset/likendlin.svg"

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
            src={githubLogo}
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
            src={linkendlinLogo}
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
          <img
            src={emailLogo}
            className="img-footer"
            alt="logo de email"
          />
        </a>
      </address>
      <div className="copyright">Creator: Ing. Ernesto Bracho 2024 &#169;</div>
    </footer>
  );
};

export default PieDePagina;
