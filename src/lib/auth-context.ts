import { createContext } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface AuthResponse {
  status: string;
  message?: string;
  redirect?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  token?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading?: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register?: (
    email: string,
    password: string,
    name?: string
  ) => Promise<boolean>;
  loginWithProvider?: (provider: "google" | "github") => Promise<void>;
  logout: () => void | Promise<void>;
  updateProfile: (userData: Partial<User>) => void | Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
