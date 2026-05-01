import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface User {
  _id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("blog_user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  async function login(email: string, password: string): Promise<boolean> {
    try {
      const res = await fetch("/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.status === "success") {
        setUser(data.usuario);
        localStorage.setItem("blog_user", JSON.stringify(data.usuario));
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  async function register(name: string, email: string, password: string): Promise<boolean> {
    try {
      const res = await fetch("/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (data.status === "success") {
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("blog_user");
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
