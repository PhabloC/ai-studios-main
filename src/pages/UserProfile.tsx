import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Save, Upload } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/Header";

const UserProfile = () => {
  const { user, isAuthenticated, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(
    user?.avatar
  );
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  // Carrega dados do localStorage ou do usuário
  const getInitialFormData = () => {
    const saved = localStorage.getItem("userProfile");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback para dados do usuário
        return {
          name: user?.name || "",
          email: user?.email || "",
        };
      }
    }
    return {
      name: user?.name || "",
      email: user?.email || "",
    };
  };
  const [formData, setFormData] = useState(getInitialFormData());

  // Redirecionar se não estiver autenticado
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    updateProfile({
      name: formData.name,
      email: formData.email,
      avatar: avatarPreview,
    });
    // Salva no localStorage
    localStorage.setItem(
      "userProfile",
      JSON.stringify({ ...formData, avatar: avatarPreview })
    );
    setIsEditing(false);
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram salvas com sucesso.",
    });
  };
  // Handler para upload de foto
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "Arquivo muito grande",
          description: "Selecione uma imagem de até 2MB.",
          variant: "destructive",
        });
        return;
      }
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    // Restaura dados do localStorage ou do usuário
    setFormData(getInitialFormData());
    setIsEditing(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="max-w-2xl mx-auto">
          {/* Cabeçalho */}
          <div className="flex items-center gap-4 mb-8">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Meu Perfil</h1>
              <p className="text-muted-foreground">
                Gerencie suas informações pessoais
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Card de Informações do Perfil */}
            <Card>
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
                <CardDescription>
                  Suas informações básicas de perfil
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage
                      src={avatarPreview || user?.avatar}
                      alt={user?.name}
                      className="object-cover"
                    />
                    <AvatarFallback className="text-lg">
                      {user?.name ? getInitials(user.name) : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <label htmlFor="avatar-upload">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        disabled={!isEditing}
                      >
                        <span
                          className={`flex items-center ${
                            isEditing ? "cursor-pointer" : "cursor-default"
                          }`}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Alterar Foto
                        </span>
                      </Button>
                      <input
                        id="avatar-upload"
                        type="file"
                        accept="image/png, image/jpeg"
                        style={{ display: "none" }}
                        onChange={handleAvatarChange}
                        disabled={!isEditing}
                      />
                    </label>
                    <p className="text-sm text-muted-foreground">
                      JPG, PNG. Máximo 2MB.
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Formulário */}
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nome completo</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Seu nome completo"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label>ID do usuário</Label>
                    <Input value={user?.id} disabled className="bg-muted" />
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className="flex gap-2 pt-4">
                  {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)}>
                      Editar Perfil
                    </Button>
                  ) : (
                    <>
                      <Button onClick={handleSave}>
                        <Save className="h-4 w-4 mr-2" />
                        Salvar
                      </Button>
                      <Button variant="outline" onClick={handleCancel}>
                        Cancelar
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Card de Segurança */}
            <Card>
              <CardHeader>
                <CardTitle>Segurança</CardTitle>
                <CardDescription>
                  Configurações de segurança da sua conta
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Senha</h4>
                      <p className="text-sm text-muted-foreground">
                        Última alteração há 30 dias
                      </p>
                    </div>
                    <Button variant="outline" size="sm" disabled>
                      Alterar Senha
                    </Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">
                        Autenticação de dois fatores
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Adicione uma camada extra de segurança
                      </p>
                    </div>
                    <Button variant="outline" size="sm" disabled>
                      Configurar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
