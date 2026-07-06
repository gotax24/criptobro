// components/Profile.tsx
// Página de perfil del usuario autenticado.
// Muestra avatar, nombre, email y un mensaje explicativo sobre la sincronización
// de datos con Supabase.

import { useAuthStore } from "../stores/authStore";
import Loading from "./Loading";
import "../css/perfil.css";

const Profile = () => {
  const session = useAuthStore((s) => s.session);
  const profile = useAuthStore((s) => s.profile);
  const loading = useAuthStore((s) => s.loading);

  // Mientras se restaura la sesión o carga el perfil, mostramos spinner.
  if (loading) return <Loading />;

  // Usamos optional chaining y valores por defecto para evitar crashes
  // si los datos aún no están disponibles.
  const email = session?.user.email ?? "Sin correo";
  const fullName = profile?.full_name ?? "Usuario";
  const avatarUrl = profile?.avatar_url;

  return (
    <div className="container-perfil">
      <img
        className="img-perfil"
        src={avatarUrl ?? "/profile.svg"}
        // Si no hay avatar personalizado, usamos la imagen por defecto.
        alt="foto de perfil del usuario"
      />
      <h1 className="name-perfil">{fullName}</h1>
      <h2 className="correo-perfil">Tu correo es: {email}</h2>
      <p className="advertencia">
        Tu información de perfil se sincroniza automáticamente con Supabase. Los
        datos de autenticación (correo, proveedor OAuth) los gestiona Supabase
        Auth. Los datos adicionales (nombre, avatar) se almacenan en la tabla
        &quot;profiles&quot; con Row Level Security.
      </p>
    </div>
  );
};

export default Profile;
