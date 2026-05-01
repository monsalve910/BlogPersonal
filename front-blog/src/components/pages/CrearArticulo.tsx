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

  // 🔥 AQUÍ VA TODO EL FETCH
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!isAuthenticated || !user) {
      setMensaje("Debes iniciar sesión");
      setTipoMensaje("error");
      return;
    }

    setLoading(true);

    const body = {
      titulo,
      contenido,
      fecha: new Date().toISOString(),
      imagen: imagen || "default.png",
      userId: Number(user._id),
    };

    try {
      const res = await fetch(
        "https://blogpersonal-etde.onrender.com/api/articulos",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.error("Error backend:", data);
        setMensaje(data.message || "Error al crear artículo");
        setTipoMensaje("error");
        setLoading(false);
        return;
      }

      setMensaje("Artículo creado correctamente");
      setTipoMensaje("success");

      setTitulo("");
      setContenido("");
      setImagen("");
    } catch (error) {
      console.error(error);
      setMensaje("Error de conexión");
      setTipoMensaje("error");
    }

    setLoading(false);
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 bg-gray-50">
        <div className="w-full max-w-md text-center">
          <div className="bg-white shadow-xl rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-3">Sesión requerida</h2>
            <p className="text-gray-500 mb-6">
              Debes iniciar sesión para crear artículos
            </p>
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
              Ir al Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6">Nueva Publicación</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Título"
            className="w-full border p-3 rounded"
            required
          />

          <textarea
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            placeholder="Contenido"
            className="w-full border p-3 rounded"
            rows={6}
            required
          />

          <input
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
            placeholder="URL imagen"
            className="w-full border p-3 rounded"
          />

          {mensaje && (
            <p
              className={
                tipoMensaje === "success"
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {mensaje}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded w-full"
          >
            {loading ? "Publicando..." : "Publicar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CrearArticulo;