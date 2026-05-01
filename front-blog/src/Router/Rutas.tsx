import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Nav from "../components/layout/Nav";
import Articulos from "../components/pages/Articulos";
import CrearArticulo from "../components/pages/CrearArticulo";
import Foder from "../components/layout/Foder";
import FormularioBase from "../components/pages/FormularioBase";
import LoginPage from "../components/pages/LoginPage";
import RegisterPage from "../components/pages/RegisterPage";
import { useAuth } from "../context/AuthContext";
import React from "react";

function ProtectedRoute({ children }: { children: React.JSX.Element }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

const Rutas = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Nav />
        <main className="min-h-screen bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Articulos />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/registro" element={<RegisterPage />} />
              <Route
                path="/creararticulo"
                element={
                  <ProtectedRoute>
                    <CrearArticulo />
                  </ProtectedRoute>
                }
              />
              <Route path="/formulariobase" element={<FormularioBase />} />
            </Routes>
          </div>
        </main>
        <Foder />
      </BrowserRouter>
    </>
  );
};

export default Rutas;
