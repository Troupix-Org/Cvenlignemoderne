import { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Languages, Mail, Phone, Linkedin, Github, MapPin, Download, Zap, Terminal, Rocket, GraduationCap, FileText, Menu, X, Code2, Cloud, Cog, Users, TrendingUp, Award, Book } from 'lucide-react';
import { Link } from 'react-router';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence, useInView } from 'motion/react';
import { cvData } from '../data/cvData';

type Language = 'fr' | 'en';
type Theme = 'light' | 'dark';

const translations = {
  fr: {
    nav: {
      about: 'À propos',
      experience: 'Expérience',
      skills: 'Compétences',
      education: 'Formation',
      projects: 'Projets',
      contact: 'Contact'
    },
    sections: {
      experience: 'Parcours Professionnel',
      skills: 'Compétences Techniques',
      education: 'Formation',
      projects: 'Projets & Passions',
      languages: 'Langues',
      contact: 'Connectons-nous',
      current: 'Actuellement',
      subtitle: 'Toujours ouvert à discuter de nouveaux projets et opportunités',
      download: 'Télécharger le CV'
    },
    stats: [
      { label: 'Ans d\'expérience', value: '5+' },
      { label: 'Projets livrés', value: '20+' },
      { label: 'Technologies', value: '15+' }
    ]
  },
  en: {
    nav: {
      about: 'About',
      experience: 'Experience',
      skills: 'Skills',
      education: 'Education',
      projects: 'Projects',
      contact: 'Contact'
    },
    sections: {
      experience: 'Professional Journey',
      skills: 'Technical Skills',
      education: 'Education',
      projects: 'Projects & Passions',
      languages: 'Languages',
      contact: 'Let\'s Connect',
      current: 'Current',
      subtitle: 'Always open to discussing new projects and opportunities',
      download: 'Download Resume'
    },
    stats: [
      { label: 'Years of experience', value: '5+' },
      { label: 'Projects delivered', value: '20+' },
      { label: 'Technologies', value: '15+' }
    ]
  }
};

function CursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 hidden md:block"
      style={{
        background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1), transparent 80%)`,
      }}
    />
  );
}

function SkillBar({ name, level, delay, isDark, icon }: { name: string; level: number; delay: number; isDark: boolean; icon?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between items-center mb-2">
        <span className={`text-sm font-semibold flex items-center gap-2 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
          {icon && <span>{icon}</span>}
          {name}
        </span>
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${
          isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'
        }`}>
          {level}%
        </span>
      </div>
      <div className={`h-2.5 rounded-full overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-gray-200'} relative`}>
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative overflow-hidden"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.5, delay, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: delay + 1 }}
          />
        </motion.div>
      </div>
    </div>
  );
}

export default function UltimateCv() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [language, setLanguage] = useState<Language>('fr');
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const { scrollYProgress } = useScroll();
  const t = translations[language];
  const data = cvData[language];

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  const toggleLanguage = () => setLanguage(language === 'fr' ? 'en' : 'fr');

  const isDark = theme === 'dark';

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'experience', 'skills', 'education', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`relative ${isDark ? 'bg-gray-950 text-gray-100' : 'bg-white text-gray-900'}`}>
      <CursorGlow />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50 origin-left shadow-lg shadow-blue-500/50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Floating Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-40 ${
          isDark ? 'bg-gray-900/90' : 'bg-white/90'
        } backdrop-blur-xl rounded-full px-6 py-3 shadow-2xl border ${
          isDark ? 'border-gray-800' : 'border-gray-200'
        }`}
      >
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6">
            {[
              { id: 'about', label: t.nav.about },
              { id: 'experience', label: t.nav.experience },
              { id: 'skills', label: t.nav.skills },
              { id: 'education', label: t.nav.education },
              { id: 'projects', label: t.nav.projects },
              { id: 'contact', label: t.nav.contact }
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`text-sm font-medium transition-all relative group ${
                  activeSection === id
                    ? isDark ? 'text-blue-400' : 'text-blue-600'
                    : isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {label}
                {activeSection === id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  />
                )}
              </button>
            ))}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-3 border-l pl-6 border-gray-700">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-800 transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleLanguage}
              className="px-3 py-1 rounded-full hover:bg-gray-800 transition-colors text-xs font-bold"
            >
              {language.toUpperCase()}
            </motion.button>
            {/* <Link to="/simple">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full hover:bg-gray-800 transition-colors"
              >
                <FileText className="w-4 h-4" />
              </motion.div>
            </Link> */}
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-20 left-4 right-4 z-30 ${
              isDark ? 'bg-gray-900' : 'bg-white'
            } rounded-2xl shadow-2xl p-6 md:hidden border ${
              isDark ? 'border-gray-800' : 'border-gray-200'
            }`}
          >
            <div className="space-y-4">
              {[
                { id: 'about', label: t.nav.about },
                { id: 'experience', label: t.nav.experience },
                { id: 'skills', label: t.nav.skills },
                { id: 'education', label: t.nav.education },
                { id: 'projects', label: t.nav.projects },
                { id: 'contact', label: t.nav.contact }
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="block w-full text-left py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  {label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className={`absolute inset-0 ${isDark ? 'opacity-20' : 'opacity-10'}`}>
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-px ${isDark ? 'bg-blue-500' : 'bg-blue-600'}`}
                style={{
                  left: `${(i / 15) * 100}%`,
                  height: '100%',
                }}
                animate={{
                  opacity: [0.1, 0.4, 0.1],
                }}
                transition={{
                  duration: 3 + i * 0.3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        </div>

        {/* Floating orbs */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-96 h-96 rounded-full blur-3xl"
              style={{
                background: i === 0
                  ? 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)'
                  : i === 1
                  ? 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)'
                  : 'radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%)',
                left: `${20 + i * 30}%`,
                top: `${20 + i * 20}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 20, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="mb-8 inline-block"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              <div className={`w-32 h-32 rounded-full ${
                isDark ? 'bg-gradient-to-br from-blue-500 to-purple-600' : 'bg-gradient-to-br from-blue-600 to-purple-700'
              } flex items-center justify-center text-6xl shadow-2xl`}>
                👨‍💻
              </div>
            </motion.div>

            <motion.h1
              className={`text-6xl md:text-8xl font-bold mb-6 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {data.name}
              </span>
            </motion.h1>

            <motion.p
              className={`text-2xl md:text-4xl mb-8 font-semibold ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {data.title}
            </motion.p>

            <motion.p
              className={`text-lg md:text-xl mb-12 max-w-3xl mx-auto ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {data.tagline}
            </motion.p>

            {/* Social Links */}
            <motion.div
              className="flex justify-center gap-4 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              {[
                // { icon: Mail, href: 'mailto:votre.email@example.com', label: 'Email' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/maximilien-tordeux-27ab6a64/', label: 'LinkedIn' },
                { icon: Github, href: 'https://github.com/troupix', label: 'GitHub' },
                { icon: Github, href: 'https://github.com/troupix-org', label: 'GitHub' },
                // { icon: Phone, href: 'tel:+33', label: 'Phone' }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-4 rounded-full ${
                    isDark ? 'bg-gray-900 hover:bg-gray-800 border border-gray-800' : 'bg-gray-100 hover:bg-gray-200 border border-gray-200'
                  } transition-all shadow-lg`}
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-6 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              {t.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`p-6 rounded-2xl ${
                    isDark ? 'bg-gray-900/80 border border-gray-800' : 'bg-white/80 border border-gray-200'
                  } backdrop-blur-sm shadow-xl`}
                >
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className={`text-xs md:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className={`w-6 h-10 rounded-full border-2 ${
              isDark ? 'border-gray-700' : 'border-gray-300'
            } flex justify-center pt-2`}>
              <motion.div
                className={`w-1.5 h-2 rounded-full ${
                  isDark ? 'bg-blue-500' : 'bg-blue-600'
                }`}
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-32 ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-5xl md:text-6xl font-bold mb-8">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    {language === 'fr' ? 'À propos' : 'About Me'}
                  </span>
                </h2>

                <p className={`text-lg leading-relaxed mb-8 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {data.summary}
                </p>

                <div className="space-y-3">
                  {[
                    { icon: '⚡', text: language === 'fr' ? 'Automatisation: -95% de temps de traitement' : 'Automation: -95% processing time' },
                    { icon: '☁️', text: 'Migration VBA → AWS Cloud' },
                    { icon: '🌍', text: language === 'fr' ? 'Collaboration internationale (4 continents)' : 'International collaboration (4 continents)' },
                    { icon: '🚀', text: 'CI/CD avec Jenkins & GitHub Actions' }
                  ].map((highlight, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ x: 5 }}
                      className={`flex items-center gap-4 p-4 rounded-xl ${
                        isDark ? 'bg-gray-800/50 hover:bg-gray-800' : 'bg-white/50 hover:bg-white'
                      } transition-all cursor-pointer border ${
                        isDark ? 'border-gray-800' : 'border-gray-200'
                      }`}
                    >
                      <span className="text-3xl">{highlight.icon}</span>
                      <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                        {highlight.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <motion.div
                  className={`relative z-10 p-8 rounded-3xl ${
                    isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-white to-gray-100'
                  } shadow-2xl border ${
                    isDark ? 'border-gray-800' : 'border-gray-200'
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <Terminal className="w-8 h-8 mb-4 text-green-500" />
                  <div className={`font-mono text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'} space-y-2`}>
                    <div className="text-green-500">$ whoami</div>
                    <div>Full Stack Engineer @ Carrier</div>
                    <div className="text-green-500">$ cat skills.txt</div>
                    <div>React | Node.js | AWS | CI/CD</div>
                    <div className="text-green-500">$ cat education.txt</div>
                    <div>ESEO Angers - Engineering Degree</div>
                    <div className="text-green-500">$ echo $PASSION</div>
                    <div>Building elegant solutions 🚀</div>
                    <div className="flex items-center gap-2">
                      <motion.div
                        className="w-2 h-4 bg-green-500"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    </div>
                  </div>
                </motion.div>

                <div className="absolute -top-6 -right-6 w-40 h-40 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-3xl opacity-20" />
                <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl opacity-20" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold mb-16"
          >
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              {t.sections.experience}
            </span>
          </motion.h2>

          <div className="space-y-12">
            {data.experience.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative group"
              >
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className={`p-8 md:p-12 rounded-3xl ${
                    isDark ? 'bg-gray-900' : 'bg-white'
                  } shadow-2xl border ${
                    isDark ? 'border-gray-800 hover:border-purple-500/50' : 'border-gray-200 hover:border-purple-500/50'
                  } transition-all relative overflow-hidden`}
                >
                  {/* Decorative gradient on hover */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-3xl font-bold">{job.role}</h3>
                          {job.current && (
                            <motion.span
                              animate={{ scale: [1, 1.05, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="px-3 py-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold shadow-lg"
                            >
                              {t.sections.current}
                            </motion.span>
                          )}
                        </div>
                        <p className="text-xl md:text-2xl bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-semibold mb-2">
                          {job.company}
                        </p>
                        <div className={`flex flex-wrap items-center gap-3 text-sm ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          <span className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </span>
                          <span>•</span>
                          <span>{job.type}</span>
                        </div>
                      </div>
                      <div className={`text-sm font-medium px-4 py-2 rounded-full ${
                        isDark ? 'bg-gray-800 border border-gray-700' : 'bg-gray-100 border border-gray-200'
                      }`}>
                        {job.period}
                      </div>
                    </div>

                    {/* Highlights Grid */}
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      {job.highlights.map((highlight, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          whileHover={{ scale: 1.02, x: 5 }}
                          className={`p-5 rounded-2xl ${
                            isDark ? 'bg-gray-800/70' : 'bg-gray-50'
                          } border-l-4 border-purple-500 cursor-pointer group/item`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-base">{highlight.title}</h4>
                            <Zap className="w-5 h-5 text-purple-500 flex-shrink-0 group-hover/item:rotate-12 transition-transform" />
                          </div>
                          <p className={`text-sm mb-3 ${
                            isDark ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {highlight.desc}
                          </p>
                          <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 text-xs font-semibold">
                            {highlight.impact}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {job.tech.map((tech, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05 }}
                          whileHover={{ scale: 1.1, y: -2 }}
                          className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer ${
                            isDark
                              ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 hover:from-blue-500/30 hover:to-purple-500/30'
                              : 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 hover:from-blue-200 hover:to-purple-200'
                          } transition-all`}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-32 ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold mb-16"
          >
            <span className="bg-gradient-to-r from-green-500 to-cyan-500 bg-clip-text text-transparent">
              {t.sections.skills}
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Programming */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
              className={`p-8 rounded-3xl ${
                isDark ? 'bg-gray-800/80' : 'bg-white'
              } shadow-2xl border ${
                isDark ? 'border-gray-700' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <Code2 className="w-8 h-8 text-blue-500" />
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                  {data.skills.programming.name}
                </h3>
              </div>

              <div className="space-y-4">
                {data.skills.programming.items.map((skill, i) => (
                  <SkillBar
                    key={skill}
                    name={skill}
                    level={data.skills.programming.levels[skill] || 70}
                    delay={i * 0.1}
                    isDark={isDark}
                    icon="💻"
                  />
                ))}
              </div>
            </motion.div>

            {/* Cloud & DevOps */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className={`p-8 rounded-3xl ${
                isDark ? 'bg-gray-800/80' : 'bg-white'
              } shadow-2xl border ${
                isDark ? 'border-gray-700' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <Cloud className="w-8 h-8 text-orange-500" />
                <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  {data.skills.cloudDevOps.name}
                </h3>
              </div>

              <div className="space-y-4">
                {['AWS', 'CI/CD', 'GitHub Actions', 'Jenkins', 'Git'].map((skill, i) => (
                  <SkillBar
                    key={skill}
                    name={skill}
                    level={data.skills.cloudDevOps.levels[skill] || 75}
                    delay={i * 0.1}
                    isDark={isDark}
                    icon="☁️"
                  />
                ))}
              </div>
            </motion.div>

            {/* Automation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className={`p-8 rounded-3xl ${
                isDark ? 'bg-gray-800/80' : 'bg-white'
              } shadow-2xl border ${
                isDark ? 'border-gray-700' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <Cog className="w-8 h-8 text-green-500" />
                <h3 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                  {data.skills.automation.name}
                </h3>
              </div>

              <div className="space-y-4">
                {data.skills.automation.items.map((skill, i) => (
                  <SkillBar
                    key={skill}
                    name={skill}
                    level={data.skills.automation.levels[skill] || 85}
                    delay={i * 0.1}
                    isDark={isDark}
                    icon="⚡"
                  />
                ))}
              </div>
            </motion.div>

            {/* Methodologies */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className={`p-8 rounded-3xl ${
                isDark ? 'bg-gray-800/80' : 'bg-white'
              } shadow-2xl border ${
                isDark ? 'border-gray-700' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-8 h-8 text-purple-500" />
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  {data.skills.methodologies.name}
                </h3>
              </div>

              <div className="space-y-4">
                {data.skills.methodologies.items.map((skill, i) => (
                  <SkillBar
                    key={skill}
                    name={skill}
                    level={data.skills.methodologies.levels[skill] || 85}
                    delay={i * 0.1}
                    isDark={isDark}
                    icon="🎯"
                  />
                ))}
                {data.skills.tools.items.map((skill, i) => (
                  <SkillBar
                    key={skill}
                    name={skill}
                    level={data.skills.tools.levels[skill] || 85}
                    delay={(data.skills.methodologies.items.length + i) * 0.1}
                    isDark={isDark}
                    icon="📋"
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-32">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold mb-16"
          >
            <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
              {t.sections.education}
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className={`p-10 md:p-16 rounded-3xl ${
              isDark ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-white to-gray-50'
            } shadow-2xl border ${
              isDark ? 'border-gray-800' : 'border-gray-200'
            } relative overflow-hidden group`}
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10">
              <div className="flex items-start gap-6">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="flex-shrink-0"
                >
                  <GraduationCap className="w-16 h-16 text-yellow-500" />
                </motion.div>

                <div className="flex-1">
                  <h3 className="text-3xl md:text-4xl font-bold mb-2">{data.education.degree}</h3>
                  <p className="text-xl md:text-2xl bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent font-semibold mb-4">
                    {data.education.school}
                  </p>
                  <p className={`text-lg mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {data.education.specialization}
                  </p>
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                    isDark ? 'bg-yellow-500/20 text-yellow-300' : 'bg-yellow-100 text-yellow-700'
                  } font-semibold`}>
                    <Award className="w-5 h-5" />
                    {data.education.year}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <h3 className="text-3xl font-bold mb-8">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                {t.sections.languages}
              </span>
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {data.languages.map((lang, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className={`p-6 rounded-2xl ${
                    isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200'
                  } shadow-lg`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{lang.flag}</span>
                    <div>
                      <h4 className="text-xl font-bold mb-1">{lang.name}</h4>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {lang.level}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects & Passions */}
      <section id="projects" className={`py-32 ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold mb-16"
          >
            <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
              {t.sections.projects}
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Project */}
            {data.projects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`relative overflow-hidden rounded-3xl ${
                  isDark ? 'bg-gray-900' : 'bg-white'
                } shadow-2xl border ${
                  isDark ? 'border-gray-800' : 'border-gray-200'
                } group cursor-pointer`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative p-8">
                  <div className="text-6xl mb-6">🐕</div>

                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-400">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mb-4">{project.name}</h3>

                  <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, j) => (
                      <span
                        key={j}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          isDark
                            ? 'bg-gray-800 text-gray-300'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Interests */}
            {data.interests.map((interest, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (data.projects.length + i) * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-2xl group cursor-pointer"
              >
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative p-8 text-white">
                  <motion.div
                    className="text-6xl mb-6"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  >
                    {interest.icon}
                  </motion.div>

                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-white/20">
                      Passion
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mb-4">{interest.name}</h3>

                  <p className="mb-6 text-white/90">
                    {interest.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {interest.details.map((detail, j) => (
                      <span
                        key={j}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-white/20"
                      >
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {t.sections.contact}
              </span>
            </h2>

            <p className={`text-xl mb-12 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {t.sections.subtitle}
            </p>

            {/* <div className="flex flex-wrap justify-center gap-4 mb-12">
              <motion.a
                href="mailto:votre.email@example.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold flex items-center gap-2 shadow-2xl hover:shadow-blue-500/50 transition-all"
              >
                <Mail className="w-5 h-5" />
                votre.email@example.com
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-4 rounded-full ${
                  isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                } font-semibold flex items-center gap-2 shadow-xl`}
              >
                <Download className="w-5 h-5" />
                {t.sections.download}
              </motion.button>
            </div> */}

            <div className="flex justify-center gap-6">
              {[
                { icon: Linkedin, href: 'https://www.linkedin.com/in/maximilien-tordeux-27ab6a64/', label: 'LinkedIn' },
                { icon: Github, href: 'https://github.com/troupix', label: 'GitHub' },
                { icon: Github, href: 'https://github.com/troupix-org', label: 'GitHub' },
                // { icon: Phone, href: 'tel:+33', label: 'Phone' }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-5 rounded-full ${
                    isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200'
                  } shadow-xl`}
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 text-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={isDark ? 'text-gray-600' : 'text-gray-400'}
        >
          © 2026 - Made with ❤️ and lots of ☕
        </motion.p>
      </footer>
    </div>
  );
}
