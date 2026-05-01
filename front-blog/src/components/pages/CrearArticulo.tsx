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
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!isAuthenticated || !user) {
      setMensaje("Debes iniciar sesión");
      return;
    }

    // 🔥 VALIDACIÓN IMPORTANTE
    const userId = Number((user as any).id);

    if (!userId || isNaN(userId)) {
      console.error("USER INVALIDO:", user);
      setMensaje("Error: usuario inválido");
      return;
    }

    setLoading(true);

    const body = {
      titulo,
      contenido,
      fecha: new Date().toISOString(),
      imagen: imagen || "default.png",
      userId,
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
        return;
      }

      setMensaje("Artículo creado correctamente");

      setTitulo("");
      setContenido("");
      setImagen("");
    } catch (err) {
      console.error(err);
      setMensaje("Error de conexión con el servidor");
    }

    setLoading(false);
  }

  if (!isAuthenticated) {
    return (
      <div className="p-10 text-center">
        <p>Debes iniciar sesión</p>
        <button onClick={() => navigate("/login")}>
          Ir al login
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Crear artículo</h1>

      {mensaje && <p className="mb-3 text-red-500">{mensaje}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="border p-2 w-full"
        />

        <textarea
          placeholder="Contenido"
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          className="border p-2 w-full"
        />

        <input
          type="text"
          placeholder="Imagen URL"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
          className="border p-2 w-full"
        />

        <button
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2"
        >
          {loading ? "Publicando..." : "Publicar"}
        </button>
      </form>
    </div>
  );
};

export default CrearArticulo;