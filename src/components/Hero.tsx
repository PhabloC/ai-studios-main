import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/ai-brain-hero.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 pb-8 sm:pt-20 sm:pb-12">
      {/* Background with Overlay */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img
          src={heroImage}
          alt="AI Brain Neural Network"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 gradient-hero opacity-90"></div>
      </motion.div>

      <div className="relative container mx-auto px-4 sm:px-6 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-0">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
          >
            <Sparkles className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm text-primary font-medium">
              Revolução da Inteligência Artificial
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Transforme
            </span>
            <br />
            seu negócio com{" "}
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              IA
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-base sm:text-xl md:text-2xl text-muted-foreground mb-6 sm:mb-8 md:mb-12 leading-relaxed px-2 sm:px-0"
          >
            Revolucione sua empresa com soluções de inteligência artificial que
            automatizam processos, aumentam a produtividade e geram resultados
            extraordinários.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2 sm:px-0"
          >
            <Button
              size="lg"
              className="gradient-primary btn-hover text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6"
            >
              Começar Transformação
              <ArrowRight className="ml-2 w-4 sm:w-5 h-4 sm:h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 border-primary/30 transition-colors hover:bg-primary/10 hover:border-primary/50"
            >
              Ver Demonstração
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-12 md:mt-16 px-2 sm:px-0"
          >
            <div className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-1 sm:mb-2">
                500+
              </div>
              <div className="text-xs sm:text-sm md:text-base text-muted-foreground">
                Empresas Transformadas
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-accent mb-1 sm:mb-2">
                85%
              </div>
              <div className="text-xs sm:text-sm md:text-base text-muted-foreground">
                Aumento na Produtividade
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-secondary mb-1 sm:mb-2">
                24/7
              </div>
              <div className="text-xs sm:text-sm md:text-base text-muted-foreground">
                Suporte Especializado
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
