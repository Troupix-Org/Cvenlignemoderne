import { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Languages, Mail, Phone, Linkedin, Github, MapPin, Calendar, Briefcase, GraduationCap, Heart, FileText, ChevronRight, Code, Award } from 'lucide-react';
import { Link } from 'react-router';
import { motion, useInView, useScroll, useTransform } from 'motion/react';

type Language = 'fr' | 'en';
type Theme = 'light' | 'dark';

const translations = {
  fr: {
    toggleTheme: 'Basculer le thème',
    toggleLanguage: 'Switch to English',
    experience: 'Expérience Professionnelle',
    projects: 'Projets Personnels',
    passions: 'Passions & Loisirs',
    skills: 'Compétences Techniques',
    simpleVersion: 'Version Simple',
    scrollToExplore: 'Faites défiler pour explorer',
    yearsOfExperience: 'Années d\'expérience',
    experiences: [
      {
        company: 'Carrier',
        role: 'Ingénieur Projet',
        period: '2021 – Présent',
        achievements: [
          'Développement et maintenance d\'une application de pré-vente avec moteur de règles de configuration produit',
          'Développement front-end React et back-end Node.js',
          'Traduction des besoins métier en règles configurables',
          'Migration d\'une solution legacy (VBA, application locale IIS Express) vers architecture cloud AWS',
          'Implémentation et maintenance de pipelines CI/CD (Jenkins puis GitHub Actions)',
          'Gestion des mises en production mensuelles',
          'Automatisation de flux de données et de règles (réduction de 2 semaines à 10 minutes)',
          'Formation de rules authors et support utilisateurs',
          'Collaboration avec équipes EMEA, Amérique du Nord, Chine, Inde',
          'Travail en méthodologie Agile'
        ]
      },
      {
        company: 'Akkodis',
        role: 'Consultant Ingénierie Logicielle (mission chez Carrier)',
        period: '2021',
        achievements: [
          'Développement de scripts de tests automatisés pour applications legacy VB6',
          'Support à la maintenance applicative',
          'Intégration dans un environnement technique complexe',
          'Internalisation chez le client final'
        ]
      },
      {
        company: 'Mission Transverse',
        role: 'Scrum Master',
        period: 'Durée à préciser',
        achievements: [
          'Animation de rituels Agile (Scrum, Scrum of Scrums)',
          'Coordination inter-équipes',
          'Utilisation de Rally et Jira',
          'Suivi d\'avancement et gestion des dépendances'
        ]
      }
    ],
    personalProjects: [
      {
        name: 'Site de Carnet d\'Activité Canine',
        description: 'Application web pour suivre et gérer les activités de ses chiens',
        tech: ['React', 'Node.js', 'MongoDB']
      }
    ],
    passionsList: [
      {
        name: 'Rugby',
        icon: '🏉',
        description: 'Passion pour le rugby et l\'esprit d\'équipe'
      },
      {
        name: 'Chiens',
        icon: '🐕',
        description: 'Amateur de chiens et activités canines'
      }
    ],
    skillCategories: [
      {
        name: 'Front-end',
        skills: [
          { name: 'React', level: 90 },
          { name: 'JavaScript/TypeScript', level: 85 },
          { name: 'HTML/CSS', level: 85 }
        ]
      },
      {
        name: 'Back-end',
        skills: [
          { name: 'Node.js', level: 85 },
          { name: 'VB6', level: 70 },
          { name: 'APIs REST', level: 80 }
        ]
      },
      {
        name: 'DevOps & Cloud',
        skills: [
          { name: 'AWS', level: 75 },
          { name: 'CI/CD (Jenkins, GitHub Actions)', level: 85 },
          { name: 'Docker', level: 70 }
        ]
      },
      {
        name: 'Méthodologies',
        skills: [
          { name: 'Agile/Scrum', level: 90 },
          { name: 'Jira/Rally', level: 85 },
          { name: 'Scrum Master', level: 80 }
        ]
      }
    ]
  },
  en: {
    toggleTheme: 'Toggle theme',
    toggleLanguage: 'Passer au français',
    experience: 'Professional Experience',
    projects: 'Personal Projects',
    passions: 'Passions & Hobbies',
    skills: 'Technical Skills',
    simpleVersion: 'Simple Version',
    scrollToExplore: 'Scroll to explore',
    yearsOfExperience: 'Years of experience',
    experiences: [
      {
        company: 'Carrier',
        role: 'Project Engineer',
        period: '2021 – Present',
        achievements: [
          'Development and maintenance of a pre-sales application with product configuration rule engine',
          'React front-end and Node.js back-end development',
          'Translation of business requirements into configurable rules',
          'Migration from legacy solution (VBA, local IIS Express application) to AWS cloud architecture',
          'Implementation and maintenance of CI/CD pipelines (Jenkins then GitHub Actions)',
          'Management of monthly production releases',
          'Automation of data flows and rules (reduction from 2 weeks to 10 minutes)',
          'Training of rules authors and user support',
          'Collaboration with EMEA, North America, China, and India teams',
          'Work in Agile methodology'
        ]
      },
      {
        company: 'Akkodis',
        role: 'Software Engineering Consultant (assignment at Carrier)',
        period: '2021',
        achievements: [
          'Development of automated test scripts for legacy VB6 applications',
          'Application maintenance support',
          'Integration into a complex technical environment',
          'Internalization at the final client'
        ]
      },
      {
        company: 'Cross-functional Mission',
        role: 'Scrum Master',
        period: 'Duration to be specified',
        achievements: [
          'Facilitation of Agile ceremonies (Scrum, Scrum of Scrums)',
          'Inter-team coordination',
          'Use of Rally and Jira',
          'Progress tracking and dependency management'
        ]
      }
    ],
    personalProjects: [
      {
        name: 'Dog Activity Log Website',
        description: 'Web application to track and manage dog activities',
        tech: ['React', 'Node.js', 'MongoDB']
      }
    ],
    passionsList: [
      {
        name: 'Rugby',
        icon: '🏉',
        description: 'Passion for rugby and team spirit'
      },
      {
        name: 'Dogs',
        icon: '🐕',
        description: 'Dog lover and canine activities enthusiast'
      }
    ],
    skillCategories: [
      {
        name: 'Front-end',
        skills: [
          { name: 'React', level: 90 },
          { name: 'JavaScript/TypeScript', level: 85 },
          { name: 'HTML/CSS', level: 85 }
        ]
      },
      {
        name: 'Back-end',
        skills: [
          { name: 'Node.js', level: 85 },
          { name: 'VB6', level: 70 },
          { name: 'REST APIs', level: 80 }
        ]
      },
      {
        name: 'DevOps & Cloud',
        skills: [
          { name: 'AWS', level: 75 },
          { name: 'CI/CD (Jenkins, GitHub Actions)', level: 85 },
          { name: 'Docker', level: 70 }
        ]
      },
      {
        name: 'Methodologies',
        skills: [
          { name: 'Agile/Scrum', level: 90 },
          { name: 'Jira/Rally', level: 85 },
          { name: 'Scrum Master', level: 80 }
        ]
      }
    ]
  }
};

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

function SkillBar({ name, level, delay, isDark }: { name: string; level: number; delay: number; isDark: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between mb-2">
        <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{name}</span>
        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{level}%</span>
      </div>
      <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
        <motion.div
          className={`h-full rounded-full ${isDark ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gradient-to-r from-blue-600 to-purple-600'}`}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function InteractiveCv() {
  const [theme, setTheme] = useState<Theme>('light');
  const [language, setLanguage] = useState<Language>('fr');
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);

  const t = translations[language];

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  const isDark = theme === 'dark';

  // Parallax effect for hero
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Header avec toggles */}
      <div className={`fixed top-1 left-0 right-0 z-40 backdrop-blur-md ${
        isDark ? 'bg-gray-900/90 border-gray-800' : 'bg-white/90 border-gray-200'
      } border-b`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link
            to="/simple"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:scale-105 ${
              isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span className="text-sm font-medium">{t.simpleVersion}</span>
          </Link>
          <div className="flex gap-3">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all hover:scale-110 ${
                isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              }`}
              aria-label={t.toggleTheme}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={toggleLanguage}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all hover:scale-105 ${
                isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              }`}
              aria-label={t.toggleLanguage}
            >
              <Languages className="w-5 h-5" />
              <span className="text-sm font-medium">{language.toUpperCase()}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section avec parallax */}
      <motion.section
        ref={heroRef}
        style={{ y, opacity }}
        className={`relative min-h-screen flex items-center justify-center overflow-hidden ${
          isDark ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
        }`}
      >
        {/* Animated background circles */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full ${isDark ? 'bg-blue-500/10' : 'bg-blue-300/20'} blur-3xl`}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full ${isDark ? 'bg-purple-500/10' : 'bg-purple-300/20'} blur-3xl`}
            animate={{
              scale: [1.2, 1, 1.2],
              x: [0, -30, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="mb-8"
          >
            <div className={`w-32 h-32 mx-auto rounded-full ${
              isDark ? 'bg-gradient-to-br from-blue-500 to-purple-500' : 'bg-gradient-to-br from-blue-600 to-purple-600'
            } flex items-center justify-center text-6xl text-white shadow-2xl`}>
              👨‍💻
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`text-5xl md:text-7xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
          >
            Votre Nom
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`text-2xl md:text-3xl mb-8 ${isDark ? 'text-blue-300' : 'text-blue-600'} font-medium`}
          >
            {language === 'fr' ? 'Ingénieur Projet | Full Stack Developer' : 'Project Engineer | Full Stack Developer'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className={`flex flex-wrap justify-center gap-6 mb-12 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>France</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              <span>votre.email@example.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              <span>+33 X XX XX XX XX</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center gap-4"
          >
            <motion.a
              href="#"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className={`p-4 rounded-full ${
                isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'
              } shadow-lg`}
            >
              <Linkedin className="w-6 h-6" />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`p-4 rounded-full ${
                isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'
              } shadow-lg`}
            >
              <Github className="w-6 h-6" />
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-16"
          >
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>{t.scrollToExplore}</p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronRight className="w-6 h-6 mx-auto rotate-90" />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Contenu principal */}
      <div className="relative max-w-6xl mx-auto px-6 py-20">
        {/* Stats rapides */}
        <AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8 text-center`}
            >
              <div className={`text-5xl font-bold mb-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>5+</div>
              <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>{t.yearsOfExperience}</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8 text-center`}
            >
              <div className={`text-5xl mb-2`}>
                <Code className={`w-16 h-16 mx-auto ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
              </div>
              <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>Full Stack</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8 text-center`}
            >
              <div className={`text-5xl mb-2`}>
                <Award className={`w-16 h-16 mx-auto ${isDark ? 'text-green-400' : 'text-green-600'}`} />
              </div>
              <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>Scrum Master</div>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Compétences avec barres animées */}
        <AnimatedSection delay={0.2}>
          <section className="mb-20">
            <h2 className={`text-4xl font-bold mb-12 flex items-center gap-3 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              <Code className="w-10 h-10" />
              {t.skills}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {t.skillCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                  className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8`}
                >
                  <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                    {category.name}
                  </h3>
                  {category.skills.map((skill, skillIndex) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      delay={skillIndex * 0.1}
                      isDark={isDark}
                    />
                  ))}
                </motion.div>
              ))}
            </div>
          </section>
        </AnimatedSection>

        {/* Expérience Professionnelle */}
        <AnimatedSection delay={0.3}>
          <section className="mb-20">
            <h2 className={`text-4xl font-bold mb-12 flex items-center gap-3 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              <Briefcase className="w-10 h-10" />
              {t.experience}
            </h2>
            <div className="space-y-8">
              {t.experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ scale: 1.02 }}
                  className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8 md:p-10 border-l-4 ${
                    isDark ? 'border-blue-500' : 'border-blue-600'
                  } relative overflow-hidden`}
                >
                  {/* Decorative gradient */}
                  <div className={`absolute top-0 right-0 w-64 h-64 ${
                    isDark ? 'bg-blue-500/5' : 'bg-blue-500/5'
                  } rounded-full blur-3xl -z-0`} />

                  <div className="relative z-10">
                    <div className="mb-6">
                      <h3 className={`text-2xl md:text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {exp.role}
                      </h3>
                      <p className={`text-xl ${isDark ? 'text-blue-400' : 'text-blue-600'} mb-2`}>
                        {exp.company}
                      </p>
                      <p className={`flex items-center gap-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        <Calendar className="w-5 h-5" />
                        {exp.period}
                      </p>
                    </div>
                    <ul className={`space-y-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {exp.achievements.map((achievement, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05 }}
                          className="flex gap-3"
                        >
                          <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${
                            isDark ? 'bg-blue-400' : 'bg-blue-600'
                          }`} />
                          <span>{achievement}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </AnimatedSection>

        {/* Projets Personnels */}
        <AnimatedSection delay={0.4}>
          <section className="mb-20">
            <h2 className={`text-4xl font-bold mb-12 flex items-center gap-3 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              <GraduationCap className="w-10 h-10" />
              {t.projects}
            </h2>
            <div className="space-y-6">
              {t.personalProjects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, rotate: 0.5 }}
                  className={`${isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-white to-gray-50'} rounded-2xl shadow-xl p-8 md:p-10`}
                >
                  <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {project.name}
                  </h3>
                  <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className={`px-3 py-1 rounded-full text-sm ${
                          isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </AnimatedSection>

        {/* Passions */}
        <AnimatedSection delay={0.5}>
          <section className="mb-20">
            <h2 className={`text-4xl font-bold mb-12 flex items-center gap-3 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              <Heart className="w-10 h-10" />
              {t.passions}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {t.passionsList.map((passion, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`${
                    isDark
                      ? 'bg-gradient-to-br from-purple-900 to-pink-900'
                      : 'bg-gradient-to-br from-purple-500 to-pink-500'
                  } rounded-2xl shadow-xl p-8 text-white relative overflow-hidden`}
                >
                  <motion.div
                    className="absolute top-0 right-0 text-9xl opacity-10"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    {passion.icon}
                  </motion.div>
                  <div className="relative z-10">
                    <div className="text-5xl mb-4">{passion.icon}</div>
                    <h3 className="text-2xl font-bold mb-2">{passion.name}</h3>
                    <p className="text-white/90">{passion.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </AnimatedSection>

        {/* Footer */}
        <footer className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            © 2026 - {language === 'fr' ? 'CV créé avec passion ❤️' : 'Resume created with passion ❤️'}
          </motion.p>
        </footer>
      </div>
    </div>
  );
}
