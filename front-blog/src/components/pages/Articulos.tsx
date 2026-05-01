import { useState, useEffect } from "react";
interface Articulo {
  _id: number;
  titulo: string;
  contenido: string;
  fecha: string;
  imagen?: string;
  User?: { name: string };
}
const Articulos = () => {
  const [articulos, setArticulos] = useState<Articulo[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    consumirApi();
  }, []);
  async function consumirApi() {
    setLoading(true);
    const url = "https://blogpersonal-etde.onrender.com/api/articulos/";
    const peticion = await fetch(url, { method: "GET" });
    const datos = await peticion.json();
    if (datos.status === "success") {
      setArticulos(datos.articulos);
    }
    setLoading(false);
  }

  function formatearFecha(fecha: string) {
    return new Date(fecha).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  function resumen(texto: string, max: number) {
    return texto.length > max ? texto.substring(0, max) + "..." : texto;
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="h-48 bg-gray-200" />
            <div className="p-5 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
              <div className="space-y-2">
                <div className="h-3 bg-gray-100 rounded" />
                <div className="h-3 bg-gray-100 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {articulos.length >= 1 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articulos.map((articulo) => (
            <article
              key={articulo._id}
              className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
            >
              <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center overflow-hidden">
                {articulo.imagen && articulo.imagen !== "default.png" ? (
                  <img
                    src={articulo.imagen}
                    alt={articulo.titulo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <svg className="w-16 h-16 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                )}
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs">
                    {articulo.User?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <span className="text-xs text-gray-500">
                    {articulo.User?.name || "Usuario"}
                  </span>
                  <span className="text-xs text-gray-300">·</span>
                  <span className="text-xs text-gray-400">
                    {formatearFecha(articulo.fecha)}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                  {articulo.titulo}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                  {resumen(articulo.contenido, 120)}
                </p>

                <div className="mt-4 pt-4 border-t border-gray-50">
                  <button className="text-sm text-blue-600 font-medium hover:text-blue-700 transition-colors">
                    Leer más →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">📝</div>
          <p className="text-gray-400 text-lg font-medium">Aún no hay artículos</p>
          <p className="text-gray-400 text-sm mt-1">Sé el primero en compartir una historia</p>
        </div>
      )}
    </div>
  );
};
export default Articulos;
