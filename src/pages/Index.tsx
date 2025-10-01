import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Method from "@/components/Method";
import Experience from "@/components/Experience";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Features />
      <Method />
      <Experience />
      <Pricing />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
