import { useState } from "react";


const FormularioBase = () => {
    const [Formulario, setFormulario] = useState({
    })
const obtenerDatos = ()=>{}

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="bg-gray-100 shadow-lg rounded-xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Crear Artículo
        </h2>
        <label
          htmlFor="titulo"
          className="block text-gray-700 font-medium mb-2"
        >
          Título del artículo
        </label>
        <input
          type="text"
          className="border border-gray-300 rounded-md p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          name="titulo"
          id="titulo"
        />
        <label
          htmlFor="contenido"
          className="block text-gray-700 font-medium mb-2"
        >
          Contenido del artículo
        </label>
        <textarea
          name="contenido"
          id="contenido"
          rows={5}
          className="border border-gray-300 rounded-md p-3 w-full mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        ></textarea>
        <label
          htmlFor="imagen"
          className="block text-gray-700 font-medium mb-2"
        >
          Imagen del artículo
        </label>
        <input
          name="imagen"
          id="imagen"
          type="file"
          className=" p-4 mb-6 w-full text-sm text-black bg-blue-200 rounded-lg border border-gray-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

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
