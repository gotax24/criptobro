// components/Footer.tsx
// Pie de página fijo con enlaces a redes sociales y copyright.
// Usa <address> para los contactos, que es el elemento semántico adecuado.

import githubLogo from "../assets/github.svg";
import emailLogo from "../assets/email.svg";
import linkedinLogo from "../assets/linkedin.svg";
import "../css/PieDePagina.css";

const Footer = () => {
  return (
    <footer className="credits">
      <address className="social-network-icons">
        <a
          href="https://github.com/gotax24?tab=repositories"
          target="_blank"
          // target="_blank" abre el enlace en una nueva pestaña.
          rel="noopener noreferrer"
          // rel="noopener noreferrer" es obligatorio con target="_blank" por seguridad:
          // evita que la nueva página acceda a window.opener.
          className="link-networks"
        >
          <img src={githubLogo} className="img-footer" alt="logo de github" />
        </a>
        <a
          href="https://www.linkedin.com/in/ernesto-bracho/"
          target="_blank"
          rel="noopener noreferrer"
          className="link-networks"
        >
          <img
            src={linkedinLogo}
            className="img-footer"
            alt="logo de linkedin"
          />
        </a>
        <a href="mailto:dev.ejbr@gmail.com" className="link-networks">
          <img src={emailLogo} className="img-footer" alt="logo de email" />
        </a>
      </address>
      <div className="copyright">Creator: Ing. Ernesto Bracho 2024 ©</div>
    </footer>
  );
};

export default Footer;
