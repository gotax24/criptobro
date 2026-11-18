// components/Favorites.jsx
// Página de favoritos del usuario.
// Lista las criptomonedas guardadas en Supabase y permite eliminarlas.

import { Link } from "react-router-dom";
import { useFavorites, useRemoveFavorite } from "../api/favorites";
import Loading from "./Loading";
import "../css/favorites.css";

const Favorites = () => {
  const { data: favorites, isLoading, error } = useFavorites();
  const {
    mutate: removeFavorite,
    isPending: removing,
    variables: removingId,
  } = useRemoveFavorite();
  // removingId guarda el argumento (fav.id) de la mutación en curso,
  // para deshabilitar y mostrar "Quitando..." únicamente en esa fila.

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <div className="favoritos-error">
        <p className="favoritos-error-message">Error: {error.message}</p>
      </div>
    );
  }

  if (!favorites || favorites.length === 0) {
    return (
      <div className="container-favoritos">
        <h1 className="titulo-favoritos">Mis Favoritos</h1>
        <p className="empty-message">
          No tienes criptomonedas favoritas aún. Explora la lista y añade
          algunas con el botón de estrella.
        </p>
        <Link to="/criptomonedas" className="link-ver-criptos">
          Ver criptomonedas
        </Link>
      </div>
    );
  }

  return (
    <div className="container-favoritos">
      <h1 className="titulo-favoritos">Mis Favoritos</h1>
      <ul className="lista-favoritos">
        {favorites.map((fav) => (
          <li key={fav.id} className="item-favorito">
            <Link
              to={`/criptomonedas/${fav.coin_id}`}
              className="link-favorito"
            >
              <span className="favorito-nombre">{fav.coin_name}</span>
              <span className="favorito-simbolo">
                {fav.coin_symbol.toUpperCase()}
              </span>
            </Link>
            <button
              type="button"
              className="btn-quitar-favorito"
              onClick={() => removeFavorite(fav.id)}
              disabled={removing && removingId === fav.id}
              aria-label={`Quitar ${fav.coin_name} de favoritos`}
            >
              {removing && removingId === fav.id ? "Quitando..." : "Quitar"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
