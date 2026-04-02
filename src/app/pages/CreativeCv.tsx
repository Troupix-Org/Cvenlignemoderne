import { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Languages, Mail, Phone, Linkedin, Github, MapPin, Download, Zap, Terminal, Rocket, Target, Users, TrendingUp, FileText, Menu, X } from 'lucide-react';
import { Link } from 'react-router';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';

type Theme = 'light' | 'dark';

function CursorFollower() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-30 pointer-events-none z-50 mix-blend-screen hidden md:block"
      style={{
        left: cursorXSpring,
        top: cursorYSpring,
      }}
    />
  );
}

export default function CreativeCv() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const { t, i18n } = useTranslation();
  const { scrollYProgress } = useScroll();

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  const toggleLanguage = () => {
    const newLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
  };

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
      const sections = ['hero', 'about', 'experience', 'skills', 'projects', 'contact'];
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
      <CursorFollower />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Floating Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-40 ${
          isDark ? 'bg-gray-900/80' : 'bg-white/80'
        } backdrop-blur-xl rounded-full px-6 py-3 shadow-2xl border ${
          isDark ? 'border-gray-800' : 'border-gray-200'
        }`}
      >
        <div className="flex items-center gap-6">
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {[
              { id: 'about', label: t('nav.about') },
              { id: 'experience', label: t('nav.experience') },
              { id: 'skills', label: t('nav.skills') },
              { id: 'projects', label: t('nav.projects') },
              { id: 'contact', label: t('nav.contact') }
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`text-sm font-medium transition-colors relative ${
                  activeSection === id
                    ? isDark ? 'text-blue-400' : 'text-blue-600'
                    : isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {label}
                {activeSection === id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-3 border-l pl-6 border-gray-700">
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-800 transition-colors">
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button onClick={toggleLanguage} className="px-3 py-1 rounded-full hover:bg-gray-800 transition-colors text-xs font-bold">
              {i18n.language.toUpperCase()}
            </button>
            <Link to="/simple" className="p-2 rounded-full hover:bg-gray-800 transition-colors">
              <FileText className="w-4 h-4" />
            </Link>
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
            } rounded-2xl shadow-2xl p-6 md:hidden`}
          >
            <div className="space-y-4">
              {[
                { id: 'about', label: t('nav.about') },
                { id: 'experience', label: t('nav.experience') },
                { id: 'skills', label: t('nav.skills') },
                { id: 'projects', label: t('nav.projects') },
                { id: 'contact', label: t('nav.contact') }
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
        {/* Animated Background Grid */}
        <div className="absolute inset-0">
          <div className={`absolute inset-0 ${isDark ? 'opacity-20' : 'opacity-10'}`}>
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-px ${isDark ? 'bg-blue-500' : 'bg-blue-600'}`}
                style={{
                  left: `${(i / 20) * 100}%`,
                  height: '100%',
                }}
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 3 + i * 0.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${
                isDark ? 'bg-blue-500' : 'bg-blue-600'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, -60, -20],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
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
            <motion.p
              className={`text-lg mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {t('hero.greeting')}
            </motion.p>

            <motion.h1
              className={`text-6xl md:text-8xl font-bold mb-6 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
            >
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Votre Nom
              </span>
            </motion.h1>

            <motion.p
              className={`text-2xl md:text-3xl mb-8 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {t('hero.role')}
            </motion.p>

            <motion.p
              className={`text-lg mb-12 max-w-2xl mx-auto ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {t('hero.tagline')}
            </motion.p>

            {/* Social Links */}
            <motion.div
              className="flex justify-center gap-4 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              {[
                { icon: Mail, href: 'mailto:votre.email@example.com' },
                { icon: Linkedin, href: '#' },
                { icon: Github, href: '#' },
                // { icon: Phone, href: 'tel:+33' }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-4 rounded-full ${
                    isDark ? 'bg-gray-900 hover:bg-gray-800' : 'bg-gray-100 hover:bg-gray-200'
                  } transition-colors`}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              {(t('hero.stats', { returnObjects: true }) as Array<any>).map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className={`p-6 rounded-2xl ${
                    isDark ? 'bg-gray-900/50' : 'bg-gray-100/50'
                  } backdrop-blur-sm border ${
                    isDark ? 'border-gray-800' : 'border-gray-200'
                  }`}
                >
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
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
                className={`w-1 h-2 rounded-full ${
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
      <section id="about" className={`py-32 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-12">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                {t('about.title')}
              </span>
            </h2>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className={`text-lg leading-relaxed mb-8 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {t('about.description')}
                </p>

                <div className="space-y-4">
                  {(t('about.highlights', { returnObjects: true }) as Array<any>).map((highlight, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className={`flex items-start gap-4 p-4 rounded-xl ${
                        isDark ? 'bg-gray-800/50' : 'bg-white/50'
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
                  } shadow-2xl`}
                  whileHover={{ scale: 1.02 }}
                >
                  <Terminal className="w-8 h-8 mb-4 text-green-500" />
                  <div className={`font-mono text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'} space-y-2`}>
                    <div className="text-green-500">$ whoami</div>
                    <div>Full Stack Engineer @ Carrier</div>
                    <div className="text-green-500">$ cat skills.txt</div>
                    <div>React | Node.js | AWS | CI/CD</div>
                    <div className="text-green-500">$ echo $PASSION</div>
                    <div>Building elegant solutions 🚀</div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-4 bg-green-500 animate-pulse" />
                    </div>
                  </div>
                </motion.div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-3xl opacity-20" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl opacity-20" />
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
              {t('experience.title')}
            </span>
          </motion.h2>

          <div className="space-y-16">
            {(t('experience.jobs', { returnObjects: true }) as Array<any>).map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className={`p-8 md:p-12 rounded-3xl ${
                  isDark ? 'bg-gray-900' : 'bg-white'
                } shadow-2xl border ${
                  isDark ? 'border-gray-800' : 'border-gray-200'
                } hover:border-purple-500 transition-colors`}>
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-3xl font-bold">{job.role}</h3>
                        {index === 0 && (
                          <span className="px-3 py-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold">
                            {t('experience.current')}
                          </span>
                        )}
                      </div>
                      <p className="text-xl bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-semibold">
                        {job.company}
                      </p>
                      <div className={`flex flex-wrap items-center gap-3 mt-2 text-sm ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span>•</span>
                        <span>{job.type}</span>
                      </div>
                    </div>
                    <div className={`text-sm font-medium px-4 py-2 rounded-full ${
                      isDark ? 'bg-gray-800' : 'bg-gray-100'
                    }`}>
                      {job.period}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {job.highlights.map((highlight, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className={`p-6 rounded-2xl ${
                          isDark ? 'bg-gray-800' : 'bg-gray-50'
                        } border-l-4 border-purple-500`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-lg">{highlight.title}</h4>
                          <Zap className="w-5 h-5 text-purple-500 flex-shrink-0" />
                        </div>
                        <p className={`text-sm mb-3 ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {highlight.desc}
                        </p>
                        <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 text-xs font-medium">
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
                        whileHover={{ scale: 1.1 }}
                        className={`px-4 py-2 rounded-full text-sm font-medium ${
                          isDark
                            ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300'
                            : 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700'
                        }`}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-32 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold mb-16"
          >
            <span className="bg-gradient-to-r from-green-500 to-cyan-500 bg-clip-text text-transparent">
              {t('skills.title')}
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {(t('skills.categories', { returnObjects: true }) as Array<any>).map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`p-8 rounded-3xl ${
                  isDark ? 'bg-gray-800' : 'bg-white'
                } shadow-2xl border ${
                  isDark ? 'border-gray-700' : 'border-gray-200'
                }`}
              >
                <h3 className={`text-2xl font-bold mb-6 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                  {category.name}
                </h3>

                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{skill.icon}</span>
                          <span className="font-medium">{skill.name}</span>
                        </div>
                        <span className={`text-sm font-bold ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {skill.level}%
                        </span>
                      </div>
                      <div className={`h-3 rounded-full overflow-hidden ${
                        isDark ? 'bg-gray-700' : 'bg-gray-200'
                      }`}>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: skillIndex * 0.1, ease: 'easeOut' }}
                          className={`h-full rounded-full bg-gradient-to-r ${category.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold mb-16"
          >
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              {t('projects.title')}
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {(t('projects.items', { returnObjects: true }) as Array<any>).map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className={`relative overflow-hidden rounded-3xl ${
                  isDark ? 'bg-gray-900' : 'bg-white'
                } shadow-2xl border ${
                  isDark ? 'border-gray-800' : 'border-gray-200'
                } group`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative p-8">
                  <div className="text-6xl mb-6">{project.image}</div>

                  <div className="mb-2">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                      project.category === 'Side Project'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-purple-500/20 text-purple-400'
                    }`}>
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mb-4">{project.name}</h3>

                  <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
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
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-32 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {t('contact.title')}
              </span>
            </h2>

            <p className={`text-xl mb-12 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {t('contact.subtitle')}
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <motion.a
                href="mailto:votre.email@example.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold flex items-center gap-2 shadow-xl"
              >
                <Mail className="w-5 h-5" />
                votre.email@example.com
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-4 rounded-full ${
                  isDark ? 'bg-gray-800' : 'bg-white'
                } font-semibold flex items-center gap-2 shadow-xl border ${
                  isDark ? 'border-gray-700' : 'border-gray-200'
                }`}
              >
                <Download className="w-5 h-5" />
                {t('contact.download')}
              </motion.button>
            </div>

            <div className="flex justify-center gap-6">
              {[
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Github, href: '#', label: 'GitHub' },
                // { icon: Phone, href: 'tel:+33', label: 'Phone' }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-4 rounded-full ${
                    isDark ? 'bg-gray-800' : 'bg-white'
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
      <footer className="py-12 text-center">
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
