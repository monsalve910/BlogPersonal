import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-100 py-4 px-6 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto">
        <Link to="/" className="inline-block hover:opacity-80 transition-opacity">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 logo-font">
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Blog</span> Personal
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
            Historias, ideas y experiencias
          </p>
        </Link>
      </div>
    </header>
  );
};

export default Header;
