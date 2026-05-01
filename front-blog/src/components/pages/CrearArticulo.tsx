import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const CrearArticulo = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [imagen, setImagen] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState<"success" | "error" | "">("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setMensaje("");
    setTipoMensaje("");

    if (!isAuthenticated || !user) {
      setMensaje("Debes iniciar sesión para crear un artículo");
      setTipoMensaje("error");
      return;
    }

    setLoading(true);

    const body = {
      titulo,
      contenido,
      fecha: new Date().toISOString(),
      imagen: imagen || "https://placehold.co/50x50",
      userId: user._id,
    };

    try {
      const res = await fetch("https://blogpersonal-etde.onrender.com/api/articulos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (data.status === "success") {
        setMensaje("Artículo creado exitosamente");
        setTipoMensaje("success");
        setTitulo("");
        setContenido("");
        setImagen("");
      } else {
        setMensaje(data.message || "Error al crear el artículo");
        setTipoMensaje("error");
      }
    } catch {
      setMensaje("Error de conexión con el servidor");
      setTipoMensaje("error");
    }

    setLoading(false);
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 bg-gray-50">
        <div className="w-full max-w-md text-center animate-slide-up">
          <div className="bg-white border border-gray-100 shadow-xl rounded-2xl p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Sesión requerida
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              Debes iniciar sesión para crear artículos
            </p>
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition text-sm"
            >
              Ir al Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 animate-fade-in">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white border border-gray-100 shadow-xl rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-1 logo-font">
            Nueva Publicación
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            Publicando como: <span className="text-blue-600 font-medium">{user?.name}</span>
          </p>

          {mensaje && (
            <div
              className={`px-4 py-3 rounded-lg text-sm mb-5 ${
                tipoMensaje === "success"
                  ? "bg-green-50 border border-green-200 text-green-600"
                  : "bg-red-50 border border-red-200 text-red-600"
              }`}
            >
              {mensaje}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="titulo"
                className="block text-gray-700 font-medium mb-1.5 text-sm"
              >
                Título
              </label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
                placeholder="Título del artículo"
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition placeholder:text-gray-400"
              />
            </div>

            <div>
              <label
                htmlFor="contenido"
                className="block text-gray-700 font-medium mb-1.5 text-sm"
              >
                Contenido
              </label>
              <textarea
                id="contenido"
                name="contenido"
                value={contenido}
                onChange={(e) => setContenido(e.target.value)}
                required
                rows={8}
                placeholder="Escribe el contenido del artículo..."
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition placeholder:text-gray-400 resize-none"
              />
            </div>

            <div>
              <label
                htmlFor="imagen"
                className="block text-gray-700 font-medium mb-1.5 text-sm"
              >
                Imagen (URL)
              </label>
              <input
                type="text"
                id="imagen"
                name="imagen"
                value={imagen}
                onChange={(e) => setImagen(e.target.value)}
                placeholder="https://ejemplo.com/imagen.jpg"
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition placeholder:text-gray-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-lg shadow-blue-600/20"
            >
              {loading ? "Publicando..." : "Publicar Artículo"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CrearArticulo;
