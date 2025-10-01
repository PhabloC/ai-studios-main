import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Zap, Target, Shield, Cog, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import businessImage from "@/assets/business-transformation.jpg";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "IA Avançada",
      description:
        "Algoritmos de machine learning de última geração que se adaptam ao seu negócio.",
    },
    {
      icon: Zap,
      title: "Automação Inteligente",
      description:
        "Automatize processos complexos e libere sua equipe para tarefas estratégicas.",
    },
    {
      icon: Target,
      title: "Precisão de Dados",
      description:
        "Análises preditivas com 99% de precisão para tomadas de decisão assertivas.",
    },
    {
      icon: Shield,
      title: "Segurança Máxima",
      description:
        "Criptografia militar e compliance total com LGPD e regulamentações internacionais.",
    },
    {
      icon: Cog,
      title: "Integração Simples",
      description:
        "Conecte-se facilmente aos seus sistemas existentes sem complicações técnicas.",
    },
    {
      icon: TrendingUp,
      title: "ROI Garantido",
      description:
        "Retorno do investimento comprovado em até 90 dias ou seu dinheiro de volta.",
    },
  ];

  return (
    <section id="recursos" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Recursos{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Revolucionários
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Descubra as tecnologias mais avançadas de IA que irão transformar
            completamente a forma como seu negócio opera e compete no mercado.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={businessImage}
              alt="Transformação de Negócios com IA"
              className="rounded-2xl card-hover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold mb-6">
              A Nova Era dos Negócios Digitais
            </h3>
            <p className="text-base sm:text-lg text-muted-foreground mb-6">
              Nossa plataforma de IA não é apenas uma ferramenta - é um parceiro
              estratégico que evolui com seu negócio, aprende com seus dados e
              antecipa suas necessidades.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                Implementação em 48 horas
              </li>
              <li className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                Treinamento completo da equipe
              </li>
              <li className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                Suporte 24/7 em português
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="card-hover bg-card/50 backdrop-blur-sm border-border/50 h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                    <feature.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
