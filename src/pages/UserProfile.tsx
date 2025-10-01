import { useState, useEffect } from "react";
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
import { ArrowLeft, Save, Upload, Loader2 } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import { supabase } from "@/lib/supabase";

const UserProfile = () => {
  const { user, isAuthenticated, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(
    user?.avatar
  );
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  // Atualizar formData quando o usuário mudar
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
      });
      setAvatarPreview(user.avatar);
    }
  }, [user]);

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

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Atualizar perfil no Supabase
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: formData.name,
        },
      });

      if (error) {
        throw error;
      }

      // Atualizar contexto local
      await updateProfile({
        name: formData.name,
        email: formData.email,
        avatar: avatarPreview,
      });

      setIsEditing(false);
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram salvas com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível atualizar seu perfil. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Handler para upload de foto no Supabase Storage
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Validar tamanho
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: "Selecione uma imagem de até 2MB.",
        variant: "destructive",
      });
      return;
    }

    // Validar tipo
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Arquivo inválido",
        description: "Por favor, selecione uma imagem.",
        variant: "destructive",
      });
      return;
    }

    setIsUploadingAvatar(true);

    try {
      // Verificar se já existe um avatar para deletar (opcional - economiza espaço)
      const currentAvatarUrl = user.avatar;
      let oldFilePath = null;

      if (
        currentAvatarUrl &&
        currentAvatarUrl.includes("supabase") &&
        currentAvatarUrl.includes("avatars/")
      ) {
        const urlParts = currentAvatarUrl.split("/");
        const fileName = urlParts[urlParts.length - 1];
        if (fileName.startsWith(user.id)) {
          oldFilePath = `avatars/${fileName}`;
        }
      }

      // Criar nome único para o arquivo
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Upload para o Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false, // Usar false para garantir nome único
        });

      if (uploadError) {
        console.error("Erro no upload:", uploadError);
        throw new Error(`Erro no upload: ${uploadError.message}`);
      }

      // Obter URL pública da imagem
      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(filePath);

      // Atualizar metadata do usuário no Supabase
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          avatar_url: publicUrl,
        },
      });

      if (updateError) {
        console.error("Erro ao atualizar usuário:", updateError);
        throw new Error(`Erro ao atualizar perfil: ${updateError.message}`);
      }

      // Deletar a foto antiga se existir (para economizar espaço)
      if (oldFilePath) {
        const { error: deleteError } = await supabase.storage
          .from("avatars")
          .remove([oldFilePath]);

        if (deleteError) {
          console.warn(
            "Aviso: Não foi possível deletar a foto anterior:",
            deleteError
          );
          // Não interromper o fluxo se não conseguir deletar a foto antiga
        }
      }

      // Atualizar preview local
      setAvatarPreview(publicUrl);

      // Atualizar contexto
      await updateProfile({
        avatar: publicUrl,
      });

      toast({
        title: "Foto atualizada",
        description: "Sua foto de perfil foi alterada com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao fazer upload do avatar:", error);

      // Mensagem de erro mais específica
      let errorMessage =
        "Não foi possível atualizar sua foto. Tente novamente.";

      if (error instanceof Error) {
        if (error.message.includes("upload")) {
          errorMessage =
            "Erro ao enviar a imagem. Verifique sua conexão e tente novamente.";
        } else if (error.message.includes("perfil")) {
          errorMessage =
            "Imagem enviada, mas erro ao atualizar perfil. Tente recarregar a página.";
        } else if (error.message.includes("storage")) {
          errorMessage =
            "Erro de armazenamento. Verifique se o arquivo não está corrompido.";
        }
      }

      toast({
        title: "Erro ao enviar foto",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsUploadingAvatar(false);
      // Limpar o input para permitir reenvio do mesmo arquivo
      e.target.value = "";
    }
  };

  // Handler para remover foto do perfil
  const handleRemoveAvatar = async () => {
    if (!user || !user.avatar || user.avatar.includes("dicebear.com")) return;

    setIsUploadingAvatar(true);

    try {
      // Extrair caminho do arquivo da URL
      let filePath = null;
      if (
        user.avatar.includes("supabase") &&
        user.avatar.includes("avatars/")
      ) {
        const urlParts = user.avatar.split("/");
        const fileName = urlParts[urlParts.length - 1];
        if (fileName.startsWith(user.id)) {
          filePath = `avatars/${fileName}`;
        }
      }

      // Gerar avatar padrão baseado no email
      const defaultAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`;

      // Atualizar metadata do usuário no Supabase
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          avatar_url: defaultAvatar,
        },
      });

      if (updateError) {
        console.error("Erro ao remover avatar:", updateError);
        throw new Error(`Erro ao remover avatar: ${updateError.message}`);
      }

      // Deletar o arquivo do storage se conseguiu identificar o caminho
      if (filePath) {
        const { error: deleteError } = await supabase.storage
          .from("avatars")
          .remove([filePath]);

        if (deleteError) {
          console.warn(
            "Aviso: Não foi possível deletar o arquivo:",
            deleteError
          );
          // Não interromper o fluxo se não conseguir deletar
        }
      }

      // Atualizar preview local
      setAvatarPreview(defaultAvatar);

      // Atualizar contexto
      await updateProfile({
        avatar: defaultAvatar,
      });

      toast({
        title: "Foto removida",
        description: "Sua foto de perfil foi removida com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao remover avatar:", error);
      toast({
        title: "Erro ao remover foto",
        description: "Não foi possível remover sua foto. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleCancel = () => {
    // Restaurar dados originais
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
    });
    setAvatarPreview(user?.avatar);
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
                  <div className="relative">
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
                    {isUploadingAvatar && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                        <Loader2 className="h-6 w-6 text-white animate-spin" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <label htmlFor="avatar-upload">
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          disabled={!isEditing || isUploadingAvatar}
                        >
                          <span
                            className={`flex items-center ${
                              isEditing && !isUploadingAvatar
                                ? "cursor-pointer"
                                : "cursor-default"
                            }`}
                          >
                            {isUploadingAvatar ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Enviando...
                              </>
                            ) : (
                              <>
                                <Upload className="h-4 w-4 mr-2" />
                                Alterar Foto
                              </>
                            )}
                          </span>
                        </Button>
                        <input
                          id="avatar-upload"
                          type="file"
                          accept="image/png, image/jpeg, image/jpg, image/webp"
                          style={{ display: "none" }}
                          onChange={handleAvatarChange}
                          disabled={!isEditing || isUploadingAvatar}
                        />
                      </label>

                      {user?.avatar &&
                        !user.avatar.includes("dicebear.com") &&
                        isEditing && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleRemoveAvatar}
                            disabled={isUploadingAvatar}
                          >
                            Remover
                          </Button>
                        )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      JPG, PNG ou WEBP. Máximo 2MB.
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
                      disabled
                      placeholder="seu@email.com"
                      className="bg-muted cursor-not-allowed"
                    />
                    <p className="text-xs text-muted-foreground">
                      O email não pode ser alterado após o cadastro
                    </p>
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
                      <Button onClick={handleSave} disabled={isSaving}>
                        {isSaving ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Salvando...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Salvar
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleCancel}
                        disabled={isSaving}
                      >
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
                        Mantenha sua conta segura
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={async () => {
                        try {
                          const { error } =
                            await supabase.auth.resetPasswordForEmail(
                              user?.email || "",
                              {
                                redirectTo: `${window.location.origin}/reset-password`,
                              }
                            );

                          if (error) throw error;

                          toast({
                            title: "Email enviado",
                            description:
                              "Verifique sua caixa de entrada para redefinir sua senha.",
                          });
                        } catch (error) {
                          console.error("Erro ao solicitar reset:", error);
                          toast({
                            title: "Erro",
                            description:
                              "Não foi possível enviar o email. Tente novamente.",
                            variant: "destructive",
                          });
                        }
                      }}
                    >
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
                        Em breve: adicione uma camada extra de segurança
                      </p>
                    </div>
                    <Button variant="outline" size="sm" disabled>
                      Em breve
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
