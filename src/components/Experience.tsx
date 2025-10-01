import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Quote,
  ArrowRight,
  Users,
  Building,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import dashboardImage from "@/assets/ai-dashboard.jpg";

const Experience = () => {
  const testimonials = [
    {
      name: "Carlos Silva",
      role: "CEO, TechCorp",
      company: "Empresa de Tecnologia",
      rating: 5,
      content:
        "Em 60 dias, nossa produtividade aumentou 78% e reduzimos custos operacionais em 45%. A IA transformou completamente nossa operação.",
      results: "+78% produtividade",
    },
    {
      name: "Ana Rodrigues",
      role: "Diretora de Operações",
      company: "RetailMax",
      rating: 5,
      content:
        "O sistema de IA prevê demanda com 95% de precisão. Eliminamos desperdícios e aumentamos margem de lucro em 32%.",
      results: "+32% margem",
    },
    {
      name: "Roberto Lima",
      role: "Founder",
      company: "LogiSmart",
      rating: 5,
      content:
        "Automatizamos 80% dos processos manuais. Nossa equipe agora foca em estratégia enquanto a IA cuida das operações.",
      results: "80% automação",
    },
  ];

  const metrics = [
    {
      icon: Users,
      value: "500+",
      label: "Clientes Ativos",
      description: "Empresas transformadas",
    },
    {
      icon: Building,
      value: "15+",
      label: "Setores Atendidos",
      description: "Diferentes indústrias",
    },
    {
      icon: TrendingUp,
      value: "127%",
      label: "ROI Médio",
      description: "Retorno garantido",
    },
  ];

  return (
    <section id="experiencia" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Experiência{" "}
            <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
              na Prática
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Veja como empresas reais estão transformando seus resultados com
            nossas soluções de IA e alcançando crescimento exponencial.
          </p>
        </motion.div>

        {/* Dashboard Demo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16 lg:mb-20 px-4">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Demo Interativa
            </Badge>
            <h3 className="text-2xl sm:text-3xl font-bold mb-6">
              Veja a IA em Ação
            </h3>
            <p className="text-base sm:text-lg text-muted-foreground mb-6">
              Dashboard em tempo real mostrando como nossa IA analisa dados,
              identifica padrões e gera insights acionáveis para seu negócio.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-primary mr-3"></div>
                Análise preditiva em tempo real
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-accent mr-3"></div>
                Alertas inteligentes e automáticos
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-secondary mr-3"></div>
                Relatórios gerados automaticamente
              </li>
            </ul>
            <Button className="gradient-primary btn-hover">
              Solicitar Demo Personalizada
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src={dashboardImage}
              alt="Dashboard de IA em tempo real"
              className="rounded-2xl card-hover animate-glow"
            />
          </motion.div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16 px-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="text-center card-hover bg-card/50 backdrop-blur-sm group h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg gradient-secondary mx-auto flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                    <metric.icon className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <div className="text-4xl font-bold text-primary mb-2 transition-colors duration-300 group-hover:text-accent">
                    {metric.value}
                  </div>
                  <CardTitle className="text-lg">{metric.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{metric.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
