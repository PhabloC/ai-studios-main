import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, ArrowLeft, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirecionar se já estiver autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(formData.email, formData.password);

      if (success) {
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo de volta!",
        });
        navigate("/");
      } else {
        toast({
          title: "Credenciais inválidas",
          description:
            "Email ou senha incorretos. Verifique seus dados e tente novamente.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erro no login:", error);

      // Tratamento específico para diferentes tipos de erro
      let errorMessage = "Ocorreu um erro inesperado. Tente novamente.";

      if (error instanceof Error) {
        if (
          error.message.includes("Failed to fetch") ||
          error.message.includes("NetworkError")
        ) {
          errorMessage =
            "Erro de conexão. Verifique sua internet e tente novamente.";
        } else if (error.message.includes("HTTP error")) {
          errorMessage =
            "Erro no servidor. Tente novamente em alguns instantes.";
        }
      }

      toast({
        title: "Erro de conexão",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background com gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/10 to-background" />

      {/* Efeito de partículas/grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full bg-[radial-gradient(circle_400px_at_50%_300px,rgba(120,119,198,0.1),transparent)]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Botão voltar */}
        <Link
          to="/"
          className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors duration-200 mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:-translate-x-1" />
          Voltar ao site
        </Link>

        <Card className="bg-card/50 backdrop-blur-lg border-border shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <div className="flex items-center justify-center mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                AI Studios
              </span>
            </div>
            <CardTitle className="text-2xl font-bold">
              Bem-vindo de volta
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Entre com sua conta para acessar nossa plataforma de IA
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    required
                  />
                </div>
              </div>

              {/* Senha */}
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Lembrar e Esqueci a senha */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-primary focus:ring-primary border-border rounded"
                  />
                  <span className="text-muted-foreground">Lembrar de mim</span>
                </label>
                <a
                  href="#"
                  className="text-primary hover:text-primary/80 transition-colors duration-200"
                >
                  Esqueci a senha
                </a>
              </div>

              {/* Botão de Login */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full gradient-primary btn-hover text-white font-medium py-2.5 transition-all duration-200"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Entrando...</span>
                  </div>
                ) : (
                  "Entrar"
                )}
              </Button>

              {/* Divisor */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Ou continue com
                  </span>
                </div>
              </div>

              {/* Login Social */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="transition-all duration-200 hover:bg-muted/50"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="transition-all duration-200 hover:bg-muted/50"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </Button>
              </div>
            </form>

            {/* Rodapé */}
            <div className="mt-6 text-center text-sm text-muted-foreground">
              Não tem uma conta?{" "}
              <a
                href="#"
                className="text-primary hover:text-primary/80 transition-colors duration-200 font-medium"
              >
                Cadastre-se gratuitamente
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Informações adicionais */}
        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p>
            Ao entrar, você concorda com nossos{" "}
            <a
              href="#"
              className="text-primary hover:text-primary/80 transition-colors duration-200"
            >
              Termos de Uso
            </a>{" "}
            e{" "}
            <a
              href="#"
              className="text-primary hover:text-primary/80 transition-colors duration-200"
            >
              Política de Privacidade
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
