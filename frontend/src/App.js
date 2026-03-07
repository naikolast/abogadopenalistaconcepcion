import { useState, useEffect, useRef } from "react";
import "@/App.css";
import { motion, useInView, AnimatePresence } from "framer-motion";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;
import { 
  Phone, Mail, MapPin, Clock, Shield, Scale, Users, FileCheck, 
  ChevronDown, ChevronRight, Menu, X, MessageCircle, Award,
  Briefcase, Target, Eye, Lock, CheckCircle, ArrowRight,
  Gavel, Building, AlertTriangle, DollarSign, Send
} from "lucide-react";

const WHATSAPP_NUMBER = "+56935436770";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, '')}`;

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// Section wrapper with scroll animation
const AnimatedSection = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Header Component
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#especialidades", label: "Especialidades" },
    { href: "#equipo", label: "Equipo" },
    { href: "#proceso", label: "Proceso" },
    { href: "#faq", label: "FAQ" },
    { href: "#contacto", label: "Contacto" },
  ];

  return (
    <header
      data-testid="header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass shadow-premium py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <a href="#" className="flex items-center gap-3" data-testid="logo">
          <div className={`font-serif text-2xl font-bold tracking-tight ${isScrolled ? 'text-primary' : 'text-white'}`}>
            Díaz & Cía
          </div>
          <span className={`text-sm font-medium tracking-widest uppercase ${isScrolled ? 'text-primary/70' : 'text-white/80'}`}>
            Abogados
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8" data-testid="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium tracking-wide transition-colors hover:text-accent ${
                isScrolled ? "text-primary/80" : "text-white/90"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href={`${WHATSAPP_LINK}?text=${encodeURIComponent("¡Hola! Necesito una asesoría legal urgente.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent hover:bg-accent-dark text-white px-6 py-2.5 rounded-md font-semibold text-sm transition-all hover:scale-105 shadow-lg"
            data-testid="header-cta"
          >
            Consulta Urgente
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`lg:hidden p-2 ${isScrolled ? 'text-primary' : 'text-white'}`}
          data-testid="mobile-menu-btn"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-primary/10"
            data-testid="mobile-menu"
          >
            <nav className="container-custom py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-primary font-medium py-2 border-b border-primary/10"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={`${WHATSAPP_LINK}?text=${encodeURIComponent("¡Hola! Necesito una asesoría legal urgente.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent text-white px-6 py-3 rounded-md font-semibold text-center mt-4"
                data-testid="mobile-cta"
              >
                Consulta Urgente por WhatsApp
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// Hero Section
const Hero = () => {
  const stats = [
    { number: "500+", label: "Clientes Satisfechos" },
    { number: "93%", label: "Casos Exitosos" },
    { number: "1000+", label: "Asesorías Realizadas" },
  ];

  return (
    <section 
      data-testid="hero-section"
      className="relative min-h-screen flex items-center bg-primary noise-overlay overflow-hidden"
    >
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&q=80')` }}
      />
      
      <div className="container-custom relative z-10 py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-accent font-semibold text-sm tracking-widest uppercase mb-6">
              Abogados Penalistas en Concepción
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif text-white mb-6 leading-tight">
              Defensa Penal<br />
              <span className="text-accent">Estratégica</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl mb-8 max-w-xl leading-relaxed">
              Protegemos su libertad y su futuro con un enfoque moderno, riguroso y confidencial. 
              Reciba respuestas claras a su problema legal.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a
                href={`${WHATSAPP_LINK}?text=${encodeURIComponent("¡Hola! Necesito una asesoría legal urgente.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-md font-bold text-lg transition-all hover:scale-105 shadow-xl flex items-center justify-center gap-3"
                data-testid="hero-whatsapp-btn"
              >
                <MessageCircle size={22} />
                Consulta Urgente
              </a>
              <a
                href="#especialidades"
                className="border-2 border-white/30 text-white hover:bg-white hover:text-primary px-8 py-4 rounded-md font-semibold text-lg transition-all flex items-center justify-center gap-3"
                data-testid="hero-secondary-btn"
              >
                Ver Especialidades
                <ChevronRight size={20} />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-accent/20 rounded-lg blur-2xl" />
              <img
                src="https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=600&q=80"
                alt="Abogados Penalistas en Concepción - Díaz & Cía"
                className="relative rounded-lg shadow-2xl w-full object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-3 gap-6 max-w-3xl"
          data-testid="hero-stats"
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center lg:text-left">
              <div className="text-3xl md:text-4xl font-serif font-bold text-white mb-1">{stat.number}</div>
              <div className="text-white/60 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Specialties Section
const Specialties = () => {
  const specialties = [
    {
      icon: AlertTriangle,
      title: "Delitos Sexuales",
      description: "Estupro, violación, abuso sexual y otros delitos contra la libertad sexual. Defensa especializada y confidencial.",
      color: "bg-red-50 text-red-700",
    },
    {
      icon: Gavel,
      title: "Delitos Violentos",
      description: "Homicidios, lesiones graves, secuestros y delitos contra la integridad física. Estrategia penal rigurosa.",
      color: "bg-orange-50 text-orange-700",
    },
    {
      icon: Building,
      title: "Delitos contra la Propiedad",
      description: "Robo con violencia o intimidación, hurtos y delitos patrimoniales. Defensa efectiva de sus derechos.",
      color: "bg-blue-50 text-blue-700",
    },
    {
      icon: DollarSign,
      title: "Delitos Económicos",
      description: "Estafa, fraudes cibernéticos, colusión y delitos financieros. Asesoría experta en derecho penal económico.",
      color: "bg-emerald-50 text-emerald-700",
    },
  ];

  return (
    <section id="especialidades" className="py-24 lg:py-32 bg-secondary" data-testid="specialties-section">
      <div className="container-custom">
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-accent font-semibold text-sm tracking-widest uppercase mb-4 block">
              Áreas de Práctica
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-primary mb-6">
              Especialidades en Derecho Penal
            </h2>
            <p className="text-foreground/70 text-lg">
              Ofrecemos defensa integral en las principales áreas del derecho penal, 
              con un equipo multidisciplinario altamente capacitado.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8" data-testid="specialties-grid">
          {specialties.map((spec, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <a
                href={`${WHATSAPP_LINK}?text=${encodeURIComponent(`¡Hola! Necesito asesoría legal por un caso de ${spec.title.toLowerCase()}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-white p-8 rounded-lg border border-primary/5 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
                data-testid={`specialty-card-${i}`}
              >
                <div className={`inline-flex p-3 rounded-lg ${spec.color} mb-5`}>
                  <spec.icon size={28} />
                </div>
                <h3 className="text-xl lg:text-2xl font-serif text-primary mb-3 group-hover:text-accent transition-colors">
                  {spec.title}
                </h3>
                <p className="text-foreground/70 mb-4 leading-relaxed">
                  {spec.description}
                </p>
                <span className="inline-flex items-center gap-2 text-accent font-semibold text-sm group-hover:gap-3 transition-all">
                  Consultar ahora <ArrowRight size={16} />
                </span>
              </a>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

// Why Us Section
const WhyUs = () => {
  const features = [
    {
      icon: Target,
      title: "Estrategia Preventiva",
      description: "Analizamos cada caso desde múltiples ángulos para diseñar la mejor estrategia de defensa.",
    },
    {
      icon: Lock,
      title: "Confidencialidad Absoluta",
      description: "Su caso es tratado con la máxima discreción y secreto profesional.",
    },
    {
      icon: Clock,
      title: "Disponibilidad Inmediata",
      description: "Respondemos rápidamente a situaciones urgentes. Estamos cuando más nos necesita.",
    },
    {
      icon: Award,
      title: "Resultados Comprobados",
      description: "93% de éxito en las causas que defendemos, respaldado por cientos de clientes satisfechos.",
    },
    {
      icon: Users,
      title: "Equipo Multidisciplinario",
      description: "Abogados, peritos forenses y especialistas trabajando juntos en su defensa.",
    },
    {
      icon: Eye,
      title: "Transparencia Total",
      description: "Le mantenemos informado en cada etapa del proceso. Sin sorpresas, sin letra chica.",
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-white" data-testid="why-us-section">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <span className="text-accent font-semibold text-sm tracking-widest uppercase mb-4 block">
              Por Qué Elegirnos
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-primary mb-6">
              Garantizar la Confianza de Nuestros Clientes es Nuestro Principal Objetivo
            </h2>
            <p className="text-foreground/70 text-lg mb-8 leading-relaxed">
              Nos comprometemos con una asesoría legal integral. Combinamos experiencia, 
              dedicación y un enfoque personalizado para ofrecer soluciones eficaces 
              adaptadas a las necesidades de cada cliente.
            </p>
            <a
              href={`${WHATSAPP_LINK}?text=${encodeURIComponent("¡Hola! Quiero agendar una consulta.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-md font-bold transition-all hover:scale-105 shadow-xl"
              data-testid="why-us-cta"
            >
              <MessageCircle size={20} />
              Agendar Consulta
            </a>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 gap-6" data-testid="features-grid">
            {features.map((feature, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="p-6 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                  <div className="inline-flex p-2 rounded-md bg-primary/10 text-primary mb-4">
                    <feature.icon size={22} />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{feature.title}</h3>
                  <p className="text-foreground/60 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Team Section
const Team = () => {
  const team = [
    {
      name: "Carlos Francisco J. Díaz",
      role: "Abogado Litigante",
      bio: "Licenciado en Ciencias Jurídicas, Universidad Autónoma de Chile. Diplomado en Derecho Penal Económico y Litigación Penal.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
    },
    {
      name: "Fabián Jerez Carrillo",
      role: "Perito Judicial, Asesor Criminalista Forense",
      bio: "Comisario (R) PDI, Investigador con más de 24 años de experiencia en Delitos Sexuales, Homicidios y Delitos Violentos.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    },
    {
      name: "Pamela Burgos Manríquez",
      role: "Perito Judicial, Asistente Social",
      bio: "Mg. Psicología Jurídica. Postítulos en Criminología, Valoración de Prueba en Delitos Sexuales y Análisis de Entrevistas Video Grabadas.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    },
    {
      name: "Eduardo Zapata Montero",
      role: "Perito Judicial, Asesor Criminalista Forense",
      bio: "Prefecto (R) PDI, Investigador con más de 30 años de experiencia en Robos, Homicidios y Búsqueda de Personas Extraviadas.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    },
  ];

  return (
    <section id="equipo" className="py-24 lg:py-32 bg-primary noise-overlay" data-testid="team-section">
      <div className="container-custom relative z-10">
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-accent font-semibold text-sm tracking-widest uppercase mb-4 block">
              Nuestro Equipo
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-6">
              Profesionales Comprometidos con su Defensa
            </h2>
            <p className="text-white/70 text-lg">
              Contamos con un equipo multidisciplinario altamente capacitado y comprometido 
              con la excelencia en cada caso.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" data-testid="team-grid">
          {team.map((member, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="bg-white rounded-lg overflow-hidden shadow-premium group" data-testid={`team-member-${i}`}>
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-lg text-primary font-bold mb-1">{member.name}</h3>
                  <p className="text-accent text-sm font-semibold mb-3">{member.role}</p>
                  <p className="text-foreground/60 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

// Process Section
const Process = () => {
  const steps = [
    {
      number: "01",
      title: "Contacto Inicial",
      description: "Nos contacta por WhatsApp, teléfono o formulario. Respondemos de forma rápida y confidencial.",
    },
    {
      number: "02",
      title: "Análisis del Caso",
      description: "Evaluamos los antecedentes, pruebas y circunstancias para entender completamente su situación.",
    },
    {
      number: "03",
      title: "Estrategia de Defensa",
      description: "Diseñamos un plan de acción personalizado, explicándole cada paso y posible escenario.",
    },
    {
      number: "04",
      title: "Defensa Activa",
      description: "Ejecutamos la estrategia en todas las instancias judiciales, protegiendo sus derechos.",
    },
    {
      number: "05",
      title: "Seguimiento Continuo",
      description: "Le mantenemos informado del avance y ajustamos la estrategia según sea necesario.",
    },
  ];

  return (
    <section id="proceso" className="py-24 lg:py-32 bg-secondary" data-testid="process-section">
      <div className="container-custom">
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-accent font-semibold text-sm tracking-widest uppercase mb-4 block">
              Cómo Trabajamos
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-primary mb-6">
              Proceso de Trabajo Transparente
            </h2>
            <p className="text-foreground/70 text-lg">
              Un método claro y estructurado para garantizar la mejor defensa posible.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-5 gap-6" data-testid="process-steps">
          {steps.map((step, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="text-center group" data-testid={`process-step-${i}`}>
                <div className="text-5xl font-serif font-bold text-primary/10 group-hover:text-accent/30 transition-colors mb-4">
                  {step.number}
                </div>
                <h3 className="font-semibold text-primary mb-2">{step.title}</h3>
                <p className="text-foreground/60 text-sm leading-relaxed">{step.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const Testimonials = () => {
  const testimonials = [
    {
      text: "Excelente atención y profesionalismo. Me explicaron todo el proceso de forma clara y me mantuvieron informado en cada etapa. Totalmente recomendados.",
      author: "Cliente Anónimo",
      case: "Defensa Penal",
    },
    {
      text: "En un momento muy difícil, encontré en Díaz & Cía un equipo comprometido y estratégico. Su experiencia marcó la diferencia en mi caso.",
      author: "Cliente Anónimo",
      case: "Delitos Económicos",
    },
    {
      text: "La tranquilidad de saber que estás en buenas manos no tiene precio. Agradecido por su trabajo profesional y humano.",
      author: "Cliente Anónimo",
      case: "Defensa Penal",
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-white" data-testid="testimonials-section">
      <div className="container-custom">
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-accent font-semibold text-sm tracking-widest uppercase mb-4 block">
              Testimonios
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-primary mb-6">
              Historias de Confianza y Resultados
            </h2>
            <p className="text-foreground/70 text-lg">
              Conoce las experiencias de quienes confiaron en nuestro equipo.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8" data-testid="testimonials-grid">
          {testimonials.map((testimonial, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="bg-secondary p-8 rounded-lg relative" data-testid={`testimonial-${i}`}>
                <div className="text-6xl text-primary/10 font-serif absolute top-4 left-6">"</div>
                <p className="text-foreground/80 mb-6 relative z-10 leading-relaxed pt-8">
                  {testimonial.text}
                </p>
                <div className="border-t border-primary/10 pt-4">
                  <p className="font-semibold text-primary">{testimonial.author}</p>
                  <p className="text-sm text-accent">{testimonial.case}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

// Metrics Section
const Metrics = () => {
  const metrics = [
    { number: "500+", label: "Clientes Satisfechos" },
    { number: "93%", label: "Tasa de Éxito" },
    { number: "1000+", label: "Asesorías Realizadas" },
    { number: "24/7", label: "Disponibilidad" },
  ];

  return (
    <section className="py-20 bg-accent" data-testid="metrics-section">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8" data-testid="metrics-grid">
          {metrics.map((metric, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="text-center" data-testid={`metric-${i}`}>
                <div className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-2">
                  {metric.number}
                </div>
                <div className="text-white/80 font-medium">{metric.label}</div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

// FAQ Section
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "¿Qué hago si soy citado a declarar por un delito?",
      answer: "Lo primero es mantener la calma y contactar a un abogado penalista antes de declarar. Tiene derecho a guardar silencio y a contar con asistencia legal. Contáctenos de inmediato para orientarle sobre los pasos a seguir.",
    },
    {
      question: "¿Cuánto cuesta una asesoría inicial?",
      answer: "Ofrecemos una primera evaluación de su caso sin compromiso. Los honorarios dependen de la complejidad del caso, tipo de delito y etapa procesal. Le entregamos un presupuesto claro y transparente desde el inicio.",
    },
    {
      question: "¿Trabajan casos en otras ciudades de Chile?",
      answer: "Aunque estamos ubicados en Concepción, podemos representarle en causas de otras ciudades del país. Evaluamos cada caso de forma individual.",
    },
    {
      question: "¿Qué tan confidencial es mi caso?",
      answer: "La confidencialidad es absoluta. El secreto profesional es un pilar fundamental de nuestra práctica. Toda la información que comparta con nosotros está protegida.",
    },
    {
      question: "¿Cuánto tiempo puede durar un proceso penal?",
      answer: "Depende de múltiples factores: tipo de delito, complejidad probatoria, etapa procesal actual. Puede variar desde meses hasta años. Le explicaremos los plazos estimados según su caso específico.",
    },
    {
      question: "¿Qué diferencia a Díaz & Cía de otros estudios?",
      answer: "Contamos con un equipo multidisciplinario que incluye abogados especializados y peritos forenses con décadas de experiencia en la PDI. Esta combinación nos permite diseñar estrategias de defensa más completas y efectivas.",
    },
  ];

  return (
    <section id="faq" className="py-24 lg:py-32 bg-secondary" data-testid="faq-section">
      <div className="container-custom">
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-accent font-semibold text-sm tracking-widest uppercase mb-4 block">
              Preguntas Frecuentes
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-primary mb-6">
              Resolvemos sus Dudas
            </h2>
          </div>
        </AnimatedSection>

        <div className="max-w-3xl mx-auto" data-testid="faq-list">
          {faqs.map((faq, i) => (
            <AnimatedSection key={i} delay={i * 0.05}>
              <div 
                className="border-b border-primary/10"
                data-testid={`faq-item-${i}`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full py-6 flex items-center justify-between text-left group"
                  data-testid={`faq-toggle-${i}`}
                >
                  <span className="font-semibold text-primary group-hover:text-accent transition-colors pr-8">
                    {faq.question}
                  </span>
                  <ChevronDown 
                    size={20} 
                    className={`text-primary/50 transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-foreground/70 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section
const CTASection = () => {
  return (
    <section className="py-24 lg:py-32 bg-primary noise-overlay" data-testid="cta-section">
      <div className="container-custom relative z-10 text-center">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-6 max-w-3xl mx-auto">
            ¿Necesita Defensa Penal en Concepción?
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
            No espere más. Cuanto antes actúe, mejor podremos proteger sus derechos. 
            Contáctenos ahora para una evaluación confidencial de su caso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`${WHATSAPP_LINK}?text=${encodeURIComponent("¡Hola! Necesito una asesoría legal urgente.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent hover:bg-accent-dark text-white px-10 py-5 rounded-md font-bold text-lg transition-all hover:scale-105 shadow-xl flex items-center justify-center gap-3"
              data-testid="cta-whatsapp-btn"
            >
              <MessageCircle size={24} />
              WhatsApp Directo
            </a>
            <a
              href="#contacto"
              className="border-2 border-white/30 text-white hover:bg-white hover:text-primary px-10 py-5 rounded-md font-semibold text-lg transition-all flex items-center justify-center gap-3"
              data-testid="cta-form-btn"
            >
              <Mail size={24} />
              Enviar Mensaje
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

// Contact Section
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    
    try {
      const response = await axios.post(`${API}/contact`, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message
      });
      
      if (response.data.status === "success" || response.data.status === "partial") {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
        setTimeout(() => setIsSubmitted(false), 5000);
      }
    } catch (error) {
      console.error("Error sending contact form:", error);
      setErrorMessage("Error al enviar el mensaje. Por favor intente nuevamente o contáctenos por WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: Phone, label: "Teléfono", value: "+56 9 3543 6770", href: "tel:+56935436770" },
    { icon: Mail, label: "Email", value: "contacto@diazcia.cl", href: "mailto:contacto@diazcia.cl" },
    { icon: MapPin, label: "Dirección", value: "Concepción, Región del Biobío, Chile", href: null },
    { icon: Clock, label: "Horario", value: "Lun - Vie: 9:00 - 18:00", href: null },
  ];

  return (
    <section id="contacto" className="py-24 lg:py-32 bg-white" data-testid="contact-section">
      <div className="container-custom">
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-accent font-semibold text-sm tracking-widest uppercase mb-4 block">
              Contacto
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-primary mb-6">
              Contáctenos Hoy
            </h2>
            <p className="text-foreground/70 text-lg">
              Déjenos sus datos y un abogado experto en materia penal se contactará con usted.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <AnimatedSection delay={0.1}>
            <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-secondary border border-transparent rounded-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                  placeholder="Su nombre"
                  data-testid="contact-name-input"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                  Correo Electrónico *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-secondary border border-transparent rounded-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                  placeholder="su@email.com"
                  data-testid="contact-email-input"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-primary mb-2">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-secondary border border-transparent rounded-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                  placeholder="+56 9 1234 5678"
                  data-testid="contact-phone-input"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
                  Cuéntenos su Caso *
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-secondary border border-transparent rounded-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none"
                  placeholder="Describa brevemente su situación legal..."
                  data-testid="contact-message-input"
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-md font-bold text-lg transition-all hover:scale-[1.02] shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                data-testid="contact-submit-btn"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Enviar Mensaje
                  </>
                )}
              </button>

              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 text-green-700 p-4 rounded-md flex items-center gap-3"
                  data-testid="contact-success-message"
                >
                  <CheckCircle size={20} />
                  ¡Mensaje enviado! Nos contactaremos pronto.
                </motion.div>
              )}

              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 text-red-700 p-4 rounded-md flex items-center gap-3"
                  data-testid="contact-error-message"
                >
                  <AlertTriangle size={20} />
                  {errorMessage}
                </motion.div>
              )}
            </form>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="space-y-8">
              <div className="grid gap-6" data-testid="contact-info">
                {contactInfo.map((info, i) => (
                  <div key={i} className="flex items-start gap-4" data-testid={`contact-info-${i}`}>
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      <info.icon size={22} />
                    </div>
                    <div>
                      <p className="text-sm text-foreground/50 mb-1">{info.label}</p>
                      {info.href ? (
                        <a href={info.href} className="font-semibold text-primary hover:text-accent transition-colors">
                          {info.value}
                        </a>
                      ) : (
                        <p className="font-semibold text-primary">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div 
                className="aspect-video bg-secondary rounded-lg overflow-hidden"
                data-testid="contact-map"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52724.45489073659!2d-73.08540267832031!3d-36.82701440000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9669b5c8c7e8b5c7%3A0x5a5a5a5a5a5a5a5a!2sConcepci%C3%B3n%2C%20B%C3%ADo%20B%C3%ADo%2C%20Chile!5e0!3m2!1ses!2scl!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación Díaz & Cía Abogados - Concepción"
                />
              </div>

              {/* WhatsApp Quick Contact */}
              <a
                href={`${WHATSAPP_LINK}?text=${encodeURIComponent("¡Hola! Necesito una asesoría legal.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group"
                data-testid="contact-whatsapp-quick"
              >
                <div className="p-3 rounded-full bg-green-500 text-white">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <p className="font-bold text-green-700 group-hover:text-green-800">WhatsApp Directo</p>
                  <p className="text-green-600 text-sm">Respuesta inmediata a su consulta</p>
                </div>
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark py-12" data-testid="footer">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="font-serif text-2xl font-bold text-white mb-2">Díaz & Cía</div>
            <p className="text-white/50 text-sm">Abogados Penalistas en Concepción</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Especialidades</h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li><a href="#especialidades" className="hover:text-accent transition-colors">Delitos Sexuales</a></li>
              <li><a href="#especialidades" className="hover:text-accent transition-colors">Delitos Violentos</a></li>
              <li><a href="#especialidades" className="hover:text-accent transition-colors">Delitos contra la Propiedad</a></li>
              <li><a href="#especialidades" className="hover:text-accent transition-colors">Delitos Económicos</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Contacto</h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li><a href="tel:+56935436770" className="hover:text-accent transition-colors">+56 9 3543 6770</a></li>
              <li><a href="mailto:contacto@diazcia.cl" className="hover:text-accent transition-colors">contacto@diazcia.cl</a></li>
              <li>Concepción, Chile</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-white/40 text-sm">
            © {currentYear} Díaz & Cía Abogados. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Floating WhatsApp Button
const FloatingWhatsApp = () => {
  return (
    <a
      href={`${WHATSAPP_LINK}?text=${encodeURIComponent("¡Hola! Necesito una asesoría legal urgente.")}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110"
      data-testid="floating-whatsapp"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
};

// Main App
function App() {
  return (
    <div className="App" data-testid="app-container">
      <Header />
      <main>
        <Hero />
        <Specialties />
        <WhyUs />
        <Team />
        <Process />
        <Testimonials />
        <Metrics />
        <FAQ />
        <CTASection />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
