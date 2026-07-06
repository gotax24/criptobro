// components/AppLayout.tsx
// Layout compartido para todas las rutas protegidas.
// Renderiza el menú superior, el contenido de la ruta hija (Outlet) y el footer.

import { Outlet } from "react-router-dom";
// Outlet es el placeholder donde React Router inserta el componente de la ruta hija.

import Menu from "./Menu";
// Barra de navegación superior.

import PieDePagina from "./Footer";
// Footer renombrado localmente como PieDePagina para mantener el nombre
// original del archivo CSS sin cambiar el nombre del componente importado.

const AppLayout = () => {
  return (
    <>
      {/* Fragmento <>...</> evita añadir un div contenedor innecesario. */}
      <Menu />
      <Outlet />
      {/* Outlet renderiza Home, Profile, LayoutCrypto, CriptoPage o Favorites. */}
      <PieDePagina />
    </>
  );
};

export default AppLayout;
