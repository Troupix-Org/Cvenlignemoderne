import { useState } from 'react';
import { Moon, Sun, Languages, Mail, Phone, Linkedin, Github, MapPin, Calendar, Briefcase, GraduationCap, Heart, Sparkles } from 'lucide-react';
import { Link } from 'react-router';

type Language = 'fr' | 'en';
type Theme = 'light' | 'dark';

const translations = {
  fr: {
    toggleTheme: 'Basculer le thème',
    toggleLanguage: 'Switch to English',
    experience: 'Expérience Professionnelle',
    projects: 'Projets Personnels',
    passions: 'Passions & Loisirs',
    present: 'Présent',
    duration: 'Durée à préciser',
    contact: 'Contact',
    interactiveVersion: 'Version Interactive',
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
        description: 'Application web pour suivre et gérer les activités de ses chiens'
      }
    ],
    passionsList: [
      {
        name: 'Rugby',
        icon: '🏉'
      },
      {
        name: 'Chiens',
        icon: '🐕'
      }
    ]
  },
  en: {
    toggleTheme: 'Toggle theme',
    toggleLanguage: 'Passer au français',
    experience: 'Professional Experience',
    projects: 'Personal Projects',
    passions: 'Passions & Hobbies',
    present: 'Present',
    duration: 'Duration to be specified',
    contact: 'Contact',
    interactiveVersion: 'Interactive Version',
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
        description: 'Web application to track and manage dog activities'
      }
    ],
    passionsList: [
      {
        name: 'Rugby',
        icon: '🏉'
      },
      {
        name: 'Dogs',
        icon: '🐕'
      }
    ]
  }
};

export default function SimpleCv() {
  const [theme, setTheme] = useState<Theme>('light');
  const [language, setLanguage] = useState<Language>('fr');

  const t = translations[language];

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Header avec toggles */}
      <div className={`sticky top-0 z-10 backdrop-blur-md ${
        isDark ? 'bg-gray-900/90 border-gray-800' : 'bg-white/90 border-gray-200'
      } border-b`}>
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link
            to="/"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
            } text-white`}
          >
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-medium">{t.interactiveVersion}</span>
          </Link>
          <div className="flex gap-3">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              }`}
              aria-label={t.toggleTheme}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={toggleLanguage}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
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

      {/* Contenu principal */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <header className="mb-16">
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-8 md:p-12`}>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div>
                <h1 className={`text-4xl md:text-5xl font-bold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Votre Nom
                </h1>
                <p className={`text-xl md:text-2xl ${
                  isDark ? 'text-blue-400' : 'text-blue-600'
                } mb-4`}>
                  {language === 'fr' ? 'Ingénieur Projet | Full Stack Developer' : 'Project Engineer | Full Stack Developer'}
                </p>
                <div className={`flex flex-wrap gap-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{language === 'fr' ? 'France' : 'France'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">votre.email@example.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">+33 X XX XX XX XX</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <a
                  href="#"
                  className={`p-3 rounded-lg transition-colors ${
                    isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className={`p-3 rounded-lg transition-colors ${
                    isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Compétences clés */}
        <section className="mb-12">
          <div className={`${isDark ? 'bg-gradient-to-r from-blue-900 to-purple-900' : 'bg-gradient-to-r from-blue-500 to-purple-500'} rounded-xl shadow-lg p-6`}>
            <div className="flex flex-wrap gap-2">
              {['React', 'Node.js', 'AWS', 'CI/CD', 'Agile', 'Jenkins', 'GitHub Actions', 'VB6', 'Rally', 'Jira'].map((skill) => (
                <span
                  key={skill}
                  className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Expérience Professionnelle */}
        <section className="mb-12">
          <h2 className={`text-3xl font-bold mb-6 flex items-center gap-3 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            <Briefcase className="w-8 h-8" />
            {t.experience}
          </h2>
          <div className="space-y-6">
            {t.experiences.map((exp, index) => (
              <div
                key={index}
                className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 md:p-8 border-l-4 ${
                  isDark ? 'border-blue-500' : 'border-blue-600'
                }`}
              >
                <div className="mb-4">
                  <h3 className={`text-xl md:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {exp.role}
                  </h3>
                  <p className={`text-lg ${isDark ? 'text-blue-400' : 'text-blue-600'} mb-1`}>
                    {exp.company}
                  </p>
                  <p className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Calendar className="w-4 h-4" />
                    {exp.period}
                  </p>
                </div>
                <ul className={`space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex gap-3">
                      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                        isDark ? 'bg-blue-400' : 'bg-blue-600'
                      }`} />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Projets Personnels */}
        <section className="mb-12">
          <h2 className={`text-3xl font-bold mb-6 flex items-center gap-3 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            <GraduationCap className="w-8 h-8" />
            {t.projects}
          </h2>
          <div className="space-y-4">
            {t.personalProjects.map((project, index) => (
              <div
                key={index}
                className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 md:p-8`}
              >
                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {project.name}
                </h3>
                <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Passions */}
        <section className="mb-12">
          <h2 className={`text-3xl font-bold mb-6 flex items-center gap-3 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            <Heart className="w-8 h-8" />
            {t.passions}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.passionsList.map((passion, index) => (
              <div
                key={index}
                className={`${isDark ? 'bg-gradient-to-br from-purple-900 to-pink-900' : 'bg-gradient-to-br from-purple-500 to-pink-500'} rounded-xl shadow-lg p-6 text-white`}
              >
                <div className="text-4xl mb-2">{passion.icon}</div>
                <h3 className="text-xl font-bold">{passion.name}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          <p className="text-sm">
            © 2026 - {language === 'fr' ? 'CV créé avec passion' : 'Resume created with passion'}
          </p>
        </footer>
      </div>
    </div>
  );
}