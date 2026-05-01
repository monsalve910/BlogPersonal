import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const ok = await login(email, password);
    setLoading(false);

    if (ok) {
      navigate("/");
    } else {
      setError("Credenciales inválidas. Intenta de nuevo.");
    }
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md animate-slide-up">
        <div className="bg-white border border-gray-100 shadow-xl rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-1 logo-font">
            Bienvenido
          </h2>
          <p className="text-center text-gray-400 text-sm mb-6">
            Ingresa a tu cuenta para continuar
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1.5 text-sm"
              >
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="tu@correo.com"
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition placeholder:text-gray-400"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-1.5 text-sm"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Tu contraseña"
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition placeholder:text-gray-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-lg shadow-blue-600/20"
            >
              {loading ? "Ingresando..." : "Iniciar Sesión"}
            </button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-6">
            ¿No tienes cuenta?{" "}
            <Link to="/registro" className="text-blue-600 hover:text-blue-700 font-medium transition">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
