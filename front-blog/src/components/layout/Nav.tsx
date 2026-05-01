import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Nav = () => {
  const { user, isAuthenticated, logout } = useAuth();

  const linkBase = "text-sm font-medium transition-colors duration-200 hover:text-blue-600 px-3 py-2 rounded-lg";
  const linkActive = "text-blue-600 bg-blue-50";

  return (
    <nav className="bg-white border-b border-gray-100 py-2 px-6 flex justify-between items-center sticky top-16 z-40">
      <ul className="flex gap-1">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : "text-gray-600"}`
            }
          >
            Inicio
          </NavLink>
        </li>
        {isAuthenticated && (
          <li>
            <NavLink
              to="/creararticulo"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : "text-gray-600"}`
              }
            >
              Crear Artículo
            </NavLink>
          </li>
        )}
      </ul>

      <div className="flex items-center gap-3">
        {isAuthenticated ? (
          <>
            <span className="text-sm text-gray-500 hidden sm:inline">
              Hola, <span className="text-gray-900 font-semibold">{user?.name}</span>
            </span>
            <button
              onClick={logout}
              className="text-sm text-gray-500 hover:text-red-500 font-medium transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-red-50"
            >
              Salir
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : "text-gray-600"}`
              }
            >
              Entrar
            </NavLink>
            <NavLink
              to="/registro"
              className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Registro
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
