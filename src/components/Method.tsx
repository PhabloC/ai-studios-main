import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import workflowImage from "@/assets/ai-workflow.jpg";

const Method = () => {
  const steps = [
    {
      number: "01",
      title: "Análise Diagnóstica",
      description:
        "Avaliamos profundamente seus processos atuais e identificamos oportunidades de melhoria com IA.",
      details: [
        "Mapeamento completo dos processos",
        "Identificação de gargalos operacionais",
        "Análise de potencial de automação",
      ],
    },
    {
      number: "02",
      title: "Estratégia Personalizada",
      description:
        "Desenvolvemos uma roadmap único para sua empresa, alinhado aos seus objetivos de negócio.",
      details: [
        "Definição de KPIs e métricas",
        "Cronograma de implementação",
        "Estimativa de ROI e resultados",
      ],
    },
    {
      number: "03",
      title: "Implementação Ágil",
      description:
        "Executamos a solução de IA de forma gradual e sem interromper suas operações.",
      details: [
        "Deploy em ambiente controlado",
        "Testes A/B e validações",
        "Treinamento da equipe",
      ],
    },
    {
      number: "04",
      title: "Otimização Contínua",
      description:
        "Monitoramos performance e otimizamos constantemente para maximizar seus resultados.",
      details: [
        "Monitoramento 24/7",
        "Ajustes baseados em dados",
        "Evolução contínua do sistema",
      ],
    },
  ];

  return (
    <section id="metodo" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Nosso{" "}
            <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
              Método Comprovado
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Uma metodologia testada e refinada em centenas de projetos que
            garante implementação bem-sucedida e resultados mensuráveis.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={workflowImage}
              alt="Fluxo de Trabalho de IA"
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
              4 Passos para o Sucesso
            </h3>
            <p className="text-base sm:text-lg text-muted-foreground mb-8">
              Nossa metodologia única combina expertise técnica com conhecimento
              de negócios para entregar soluções que realmente transformam
              empresas.
            </p>
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="font-medium">Resultados em 30 dias</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span className="font-medium">ROI garantido</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-secondary" />
                <span className="font-medium">Zero interrupções</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="font-medium">Suporte 24/7</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 px-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="card-hover bg-card/70 backdrop-blur-sm border-border/50 relative overflow-hidden group h-full">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full transition-all duration-300 group-hover:from-primary/20"></div>
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl font-bold text-primary/30 transition-colors duration-300 group-hover:text-primary/50">
                      {step.number}
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    {step.description}
                  </p>
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li
                        key={detailIndex}
                        className="flex items-center text-sm"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Method;
