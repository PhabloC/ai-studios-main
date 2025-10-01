import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, ArrowRight, Zap } from "lucide-react";
import { motion } from "framer-motion";

const Pricing = () => {
  const plans = [
    {
      name: "Essencial",
      price: "R$ 15.000",
      period: "/ano",
      description: "Business Intelligence",
      featured: false,
      features: [
        "BI Interativo em Tempo Real",
        "Sem Assistente de IA",
        "Sem Análise de CRM",
      ],
      cta: "Começar Agora",
    },
    {
      name: "Avançado",
      price: "R$ 25.000",
      period: "/ano",
      description: "Inteligência Estratégica",
      featured: true,
      features: [
        "BI Interativo em Tempo Real",
        "Assistente de IA no Celular",
        "Sem Análise de CRM",
      ],
      cta: "Mais Popular",
    },
    {
      name: "Ultimate",
      price: "R$ 35.000",
      period: "/ano",
      description: "Solução Completa",
      featured: false,
      features: [
        "BI Interativo em Tempo Real",
        "Assistente AI (Web + App)",
        "Análise Completa de CRM",
      ],
      cta: "Falar com Vendas",
    },
  ];

  return (
    <section id="planos" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Planos que{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Cabem no seu Bolso
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Escolha o plano ideal para o tamanho da sua empresa e comece a
            transformar seus resultados com IA hoje mesmo.
          </p>
        </motion.div>

        {/* Pricing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-card rounded-full p-1 border">
            <div className="flex">
              <button className="px-6 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                Mensal
              </button>
              <button className="px-6 py-2 rounded-full text-muted-foreground text-sm font-medium hover:text-foreground">
                Anual (20% off)
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto px-4">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card
                className={`card-hover relative ${
                  plan.featured
                    ? "border-primary shadow-lg scale-105 bg-gradient-to-b from-card/90 to-card/70"
                    : "bg-card/70"
                } backdrop-blur-sm h-full`}
              >
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                      <Star className="w-3 h-3 mr-1" />
                      Mais Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <p className="text-muted-foreground text-sm mb-6">
                    {plan.description}
                  </p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <Button
                    className={`w-full ${
                      plan.featured
                        ? "gradient-primary btn-hover"
                        : "border-primary/30 hover:bg-primary/10 transition-colors duration-200"
                    }`}
                    variant={plan.featured ? "default" : "outline"}
                  >
                    {plan.cta}
                    {plan.featured && <Zap className="ml-2 w-4 h-4" />}
                    {!plan.featured && <ArrowRight className="ml-2 w-4 h-4" />}
                  </Button>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
            <Check className="w-5 h-5 text-primary mr-2" />
            <span className="text-primary font-medium">
              Garantia de 30 dias ou seu dinheiro de volta
            </span>
          </div>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Teste nossa plataforma sem riscos. Se não ficar 100% satisfeito nos
            primeiros 30 dias, devolvemos seu investimento integral.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
