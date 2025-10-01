import { Separator } from "@/components/ui/separator";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Instagram,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    solucoes: [
      { label: "Automação de Processos", href: "#recursos" },
      { label: "Análise Preditiva", href: "#recursos" },
      { label: "Inteligência de Negócios", href: "#recursos" },
      { label: "Chatbots Inteligentes", href: "#recursos" },
    ],
    empresa: [
      { label: "Nosso Método", href: "#metodo" },
      { label: "Cases de Sucesso", href: "#experiencia" },
      { label: "Sobre Nós", href: "#" },
      { label: "Carreira", href: "#" },
    ],
    suporte: [
      { label: "Central de Ajuda", href: "#" },
      { label: "Documentação", href: "#" },
      { label: "Treinamentos", href: "#" },
      { label: "Status da Plataforma", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo e Descrição */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                AI Studios
              </span>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Transformamos negócios através de soluções de inteligência
              artificial inovadoras e personalizadas. Sua empresa mais
              eficiente, mais inteligente e mais competitiva.
            </p>

            {/* Contato */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="w-4 h-4 text-primary" />
                <span>contato@aitransform.com.br</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="w-4 h-4 text-primary" />
                <span>+55 (11) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                <span>São Paulo, SP - Brasil</span>
              </div>
            </div>
          </div>

          {/* Soluções */}
          <div>
            <h3 className="font-semibold mb-4">Soluções</h3>
            <ul className="space-y-3">
              {footerLinks.solucoes.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="font-semibold mb-4">Empresa</h3>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Suporte */}
          <div>
            <h3 className="font-semibold mb-4">Suporte</h3>
            <ul className="space-y-3">
              {footerLinks.suporte.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <p className="text-sm text-muted-foreground">
              © {currentYear} AI Studios Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 text-xs text-muted-foreground">
              <a
                href="#"
                className="hover:text-foreground transition-colors duration-200"
              >
                Política de Privacidade
              </a>
              <a
                href="#"
                className="hover:text-foreground transition-colors duration-200"
              >
                Termos de Uso
              </a>
              <a
                href="#"
                className="hover:text-foreground transition-colors duration-200"
              >
                LGPD
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                aria-label={social.label}
                className="w-8 h-8 rounded-lg bg-muted/50 hover:bg-primary/20 flex items-center justify-center transition-all duration-300 group hover:scale-110"
              >
                <social.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
