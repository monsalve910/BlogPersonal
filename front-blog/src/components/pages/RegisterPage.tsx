import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const ok = await register(name, email, password);
    setLoading(false);

    if (ok) {
      navigate("/login");
    } else {
      setError("No se pudo crear la cuenta. El correo podría estar en uso.");
    }
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md animate-slide-up">
        <div className="bg-white border border-gray-100 shadow-xl rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-1 logo-font">
            Crear Cuenta
          </h2>
          <p className="text-center text-gray-400 text-sm mb-6">
            Únete para compartir tus historias
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-1.5 text-sm"
              >
                Nombre
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                minLength={2}
                placeholder="Tu nombre"
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition placeholder:text-gray-400"
              />
            </div>

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
                minLength={6}
                placeholder="Mínimo 6 caracteres"
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition placeholder:text-gray-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-lg shadow-blue-600/20"
            >
              {loading ? "Creando cuenta..." : "Registrarse"}
            </button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-6">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium transition">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
