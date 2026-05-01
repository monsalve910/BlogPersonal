
import "./App.css";

import Rutas from "./Router/Rutas";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <Rutas />
      </AuthProvider>
    </>
  );
}

export default App;
