import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    nome: "",
    empresa: "",
    email: "",
    whatsapp: "",
    mensagem: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatWhatsApp = (value: string) => {
    // Remove todos os caracteres não numéricos
    const numbers = value.replace(/\D/g, "");

    // Aplica a máscara (XX) XXXXX-XXXX
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(
        7,
        11
      )}`;
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "whatsapp") {
      const formattedValue = formatWhatsApp(value);
      setFormData((prev) => ({
        ...prev,
        [name]: formattedValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envio do formulário
    setTimeout(() => {
      toast.success(
        "Mensagem enviada com sucesso! Entraremos em contato em até 2 horas."
      );
      setFormData({
        nome: "",
        empresa: "",
        email: "",
        whatsapp: "",
        mensagem: "",
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "contato@aitransform.com.br",
      description: "Resposta em até 2 horas",
    },
    {
      icon: Phone,
      title: "WhatsApp",
      value: "+55 (11) 99999-9999",
      description: "Atendimento 24/7",
    },
    {
      icon: MapPin,
      title: "Escritório",
      value: "São Paulo, SP",
      description: "Agende uma visita",
    },
    {
      icon: Clock,
      title: "Horário",
      value: "24/7 Online",
      description: "Suporte ininterrupto",
    },
  ];

  return (
    <section id="contato" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Pronto para{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Começar?
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Entre em contato conosco e descubra como a IA pode revolucionar seu
            negócio. Primeira consulta gratuita!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto px-4">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1"
          >
            <Card className="bg-card/70 backdrop-blur-sm mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  Fale Conosco
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{info.title}</div>
                      <div className="text-sm text-muted-foreground mb-1">
                        {info.value}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {info.description}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-4"
            >
              <Badge className="bg-primary/10 text-primary border-primary/20 w-full justify-center py-2">
                <CheckCircle className="w-4 h-4 mr-2" />
                Resposta garantida em 2h
              </Badge>
              <Badge className="bg-accent/10 text-accent border-accent/20 w-full justify-center py-2">
                <CheckCircle className="w-4 h-4 mr-2" />
                Primeira consulta gratuita
              </Badge>
              <Badge className="bg-secondary/10 text-secondary border-secondary/20 w-full justify-center py-2">
                <CheckCircle className="w-4 h-4 mr-2" />
                Proposta em 24h
              </Badge>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="card-hover bg-card/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl">
                  Solicitar Consultoria Gratuita
                </CardTitle>
                <p className="text-muted-foreground">
                  Preencha o formulário e receba uma análise personalizada do
                  potencial de IA para seu negócio.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome Completo *</Label>
                      <Input
                        id="nome"
                        name="nome"
                        type="text"
                        value={formData.nome}
                        onChange={handleInputChange}
                        placeholder="Seu nome completo"
                        required
                        className="bg-background/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="empresa">Empresa *</Label>
                      <Input
                        id="empresa"
                        name="empresa"
                        type="text"
                        value={formData.empresa}
                        onChange={handleInputChange}
                        placeholder="Nome da sua empresa"
                        required
                        className="bg-background/50"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Corporativo *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="seu@email.com.br"
                        required
                        className="bg-background/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="whatsapp">WhatsApp *</Label>
                      <Input
                        id="whatsapp"
                        name="whatsapp"
                        type="tel"
                        value={formData.whatsapp}
                        onChange={handleInputChange}
                        placeholder="(11) 99999-9999"
                        required
                        maxLength={15}
                        className="bg-background/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mensagem">Como podemos ajudar? *</Label>
                    <Textarea
                      id="mensagem"
                      name="mensagem"
                      value={formData.mensagem}
                      onChange={handleInputChange}
                      placeholder="Conte-nos sobre seus desafios e objetivos com IA..."
                      rows={4}
                      required
                      className="bg-background/50 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full gradient-primary btn-hover text-lg py-6"
                  >
                    {isSubmitting ? (
                      "Enviando..."
                    ) : (
                      <>
                        Solicitar Consultoria Gratuita
                        <Send className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Ao enviar este formulário, você concorda com nossa política
                    de privacidade e autoriza o contato da nossa equipe.
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
