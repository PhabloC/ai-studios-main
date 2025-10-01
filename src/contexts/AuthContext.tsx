import React, { useState, useEffect } from "react";
import {
  AuthContext,
  AuthContextType,
  User,
  AuthResponse,
} from "@/lib/auth-context";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simular verificação de token no localStorage ao inicializar
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("userData");

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        // Se houver erro ao parsear, limpar dados
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log("Tentando fazer login com:", { email });

      const response = await fetch(
        "https://n8n.srv948123.hstgr.cloud/webhook/auth",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data: AuthResponse = await response.json();
      console.log("Resposta da API:", data);

      // A API retorna status: "success" para sucesso e status: "erro" para erro
      if (data.status === "success") {
        // Como a API não retorna dados do usuário, vamos criar um usuário básico
        const user: User = {
          id: "user-" + Date.now(),
          name: email.split("@")[0], // Usar a parte antes do @ como nome
          email: email,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        };

        const token = "auth-token-" + Date.now();

        localStorage.setItem("authToken", token);
        localStorage.setItem("userData", JSON.stringify(user));

        setUser(user);
        setIsAuthenticated(true);

        console.log("Login realizado com sucesso, usuário:", user);
        return true;
      }

      // Se status não é "success", são credenciais inválidas
      console.log("Login falhou:", data.message);
      return false;
    } catch (error) {
      console.error("Erro na autenticação:", error);
      // Re-throw o erro para que o componente Login possa tratá-lo adequadamente
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateProfile = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("userData", JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    login,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
