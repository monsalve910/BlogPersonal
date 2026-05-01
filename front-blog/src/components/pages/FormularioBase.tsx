import { useState } from "react";

const FormularioBase = () => {
  const [formulario, setFormulario] = useState({
    titulo: "",
    contenido: "",
    imagen: null as File | null,
  });

  // Cambios en inputs de texto
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  // Cambio de archivo (imagen)
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormulario({
        ...formulario,
        imagen: e.target.files[0],
      });
    }
  };

  // Enviar formulario
  const obtenerDatos = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Datos enviados:", formulario);

    // Aquí luego conectarías con tu backend:
    // fetch("http://localhost:3000/api/articulos", {
    //   method: "POST",
    //   body: JSON.stringify(formulario)
    // });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={obtenerDatos}
        className="bg-gray-100 shadow-lg rounded-xl p-8 w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Crear Artículo
        </h2>

        {/* TÍTULO */}
        <label className="block text-gray-700 font-medium mb-2">
          Título del artículo
        </label>
        <input
          type="text"
          name="titulo"
          value={formulario.titulo}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* CONTENIDO */}
        <label className="block text-gray-700 font-medium mb-2">
          Contenido del artículo
        </label>
        <textarea
          name="contenido"
          value={formulario.contenido}
          onChange={handleChange}
          rows={5}
          className="border border-gray-300 rounded-md p-3 w-full mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* IMAGEN */}
        <label className="block text-gray-700 font-medium mb-2">
          Imagen del artículo
        </label>
        <input
          type="file"
          name="imagen"
          onChange={handleFile}
          className="p-4 mb-6 w-full text-sm text-black bg-blue-200 rounded-lg border border-gray-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* BOTÓN */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-md font-semibold hover:bg-blue-600 transition duration-200"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default FormularioBase;