const Foder = () => {
    return (
      <footer className="bg-white border-t border-gray-100 py-8 mt-auto">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Blog Personal. Todos los derechos reservados.
          </p>
          <div className="flex justify-center gap-6 mt-4">
            <a href="#" className="text-gray-400 hover:text-blue-600 text-sm transition-colors">
              Sobre mí
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-600 text-sm transition-colors">
              Contacto
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-600 text-sm transition-colors">
              Política de privacidad
            </a>
          </div>
        </div>
      </footer>
    );
}

export default Foder;