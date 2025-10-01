import { useState, useEffect } from "react";
import { AuthContext, AuthContextType, User } from "@/lib/auth-context";
import { supabase } from "@/lib/supabase";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar sessão ao inicializar
  useEffect(() => {
    const checkSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user) {
          const formattedUser = formatSupabaseUser(session.user);
          setUser(formattedUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Erro ao verificar sessão:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    // Escutar mudanças na autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session);

      if (session?.user) {
        const formattedUser = formatSupabaseUser(session.user);
        setUser(formattedUser);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }

      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatSupabaseUser = (supabaseUser: any): User => {
    // Lógica melhorada para capturar nome de diferentes provedores
    let userName = "Usuário";

    if (supabaseUser.user_metadata) {
      const metadata = supabaseUser.user_metadata;

      // Tentar diferentes campos onde o nome pode estar armazenado
      userName =
        metadata.full_name || // Google e alguns outros
        metadata.name || // GitHub e outros
        metadata.user_name || // GitHub username
        metadata.preferred_username || // Alguns provedores
        supabaseUser.email?.split("@")[0] || // Fallback para email
        "Usuário";
    }

    // Para o avatar, também melhorar a lógica
    let userAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${supabaseUser.email}`;

    if (supabaseUser.user_metadata) {
      const metadata = supabaseUser.user_metadata;
      userAvatar =
        metadata.avatar_url || // Google e GitHub
        metadata.picture || // Google alternative
        userAvatar; // Fallback
    }

    return {
      id: supabaseUser.id,
      email: supabaseUser.email || "",
      name: userName,
      avatar: userAvatar,
    };
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log("Tentando fazer login com:", { email });

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Erro no login:", error.message);
        return false;
      }

      if (data.user) {
        const formattedUser = formatSupabaseUser(data.user);
        setUser(formattedUser);
        setIsAuthenticated(true);
        console.log("Login realizado com sucesso:", formattedUser);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Erro na autenticação:", error);
      throw error;
    }
  };

  const register = async (
    email: string,
    password: string,
    name?: string
  ): Promise<boolean> => {
    try {
      console.log("Tentando criar conta para:", { email, name });

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name || email.split("@")[0],
          },
        },
      });

      if (error) {
        console.error("Erro no registro:", error.message);
        throw new Error(error.message);
      }

      if (data.user) {
        console.log("Registro realizado com sucesso");
        return true;
      }

      return false;
    } catch (error) {
      console.error("Erro ao criar conta:", error);
      throw error;
    }
  };

  const loginWithProvider = async (
    provider: "google" | "github"
  ): Promise<void> => {
    try {
      console.log(`Tentando login com ${provider}`);

      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });

      if (error) {
        console.error(`Erro no login com ${provider}:`, error.message);
        throw error;
      }
    } catch (error) {
      console.error(`Erro ao fazer login com ${provider}:`, error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Erro ao fazer logout:", error);
        throw error;
      }

      setUser(null);
      setIsAuthenticated(false);
      console.log("Logout realizado com sucesso");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      throw error;
    }
  };

  const updateProfile = async (userData: Partial<User>) => {
    try {
      if (!user) return;

      // Preparar dados para atualizar no Supabase
      const updateData: { full_name?: string; avatar_url?: string } = {};

      if (userData.name) {
        updateData.full_name = userData.name;
      }

      if (userData.avatar) {
        updateData.avatar_url = userData.avatar;
      }

      const { error } = await supabase.auth.updateUser({
        data: updateData,
      });

      if (error) {
        console.error("Erro ao atualizar perfil:", error);
        throw error;
      }

      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      console.log("Perfil atualizado com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    loginWithProvider,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
