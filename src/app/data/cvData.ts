export const cvData = {
  fr: {
    name: 'Votre Nom',
    title: 'Ingénieur Full Stack & Scrum Master',
    tagline: 'Ingénieur généraliste passionné par le développement logiciel, l\'automatisation et le cloud',
    summary: 'Ingénieur généraliste diplômé (ESEO Angers, Master - spécialisation Énergie & Environnement) avec expérience confirmée en développement logiciel, automatisation de processus et déploiement cloud. Expert en applications de pré-vente intégrant des moteurs de règles pour la configuration d\'équipements techniques. Capacité à travailler en environnement international et à faire l\'interface entre équipes métier et développement.',
    
    education: {
      school: 'ESEO Angers',
      degree: 'Diplôme d\'Ingénieur (Master)',
      specialization: 'Spécialisation Énergie et Environnement',
      year: '2016'
    },

    experience: [
      {
        company: 'Carrier',
        role: 'Ingénieur Projet',
        period: '2021 – Présent',
        location: 'France',
        type: 'CDI',
        current: true,
        highlights: [
          {
            title: 'Automatisation Intelligente',
            desc: 'Automatisation de flux de données et de règles - Réduction de 2 semaines à 10 minutes',
            impact: '95% gain de temps'
          },
          {
            title: 'Migration Cloud',
            desc: 'Migration d\'une solution legacy (VBA, application locale IIS Express) vers architecture cloud AWS',
            impact: 'Architecture moderne'
          },
          {
            title: 'Full Stack Development',
            desc: 'Développement et maintenance d\'application de pré-vente React/Node.js avec moteur de règles de configuration produit',
            impact: 'Solution scalable'
          },
          {
            title: 'DevOps & CI/CD',
            desc: 'Implémentation et maintenance de pipelines CI/CD (Jenkins puis GitHub Actions) - Gestion des mises en production mensuelles',
            impact: 'Livraison continue'
          },
          {
            title: 'Collaboration Internationale',
            desc: 'Collaboration avec équipes EMEA, Amérique du Nord, Chine, Inde',
            impact: '4 continents'
          }
        ],
        tasks: [
          'Développement front-end React et back-end Node.js',
          'Traduction des besoins métier en règles configurables',
          'Formation de rules authors et support utilisateurs',
          'Travail en méthodologie Agile'
        ],
        tech: ['React', 'Node.js', 'AWS', 'Jenkins', 'GitHub Actions', 'VBA', 'C#', 'JavaScript']
      },
      {
        company: 'Akkodis',
        role: 'Consultant Ingénierie Logicielle',
        period: '2021',
        location: 'Mission chez Carrier',
        type: 'Consultant',
        current: false,
        highlights: [
          {
            title: 'Tests Automatisés',
            desc: 'Développement de scripts de tests automatisés pour applications legacy VB6',
            impact: 'Qualité améliorée'
          },
          {
            title: 'Maintenance Applicative',
            desc: 'Support à la maintenance applicative',
            impact: 'Stabilité'
          },
          {
            title: 'Intégration Réussie',
            desc: 'Internalisation chez le client final',
            impact: 'Transition CDI'
          }
        ],
        tasks: [
          'Intégration dans un environnement technique complexe'
        ],
        tech: ['VB6', 'Tests Automatisés']
      },
      {
        company: 'Mission Transverse',
        role: 'Scrum Master',
        period: 'Durée à préciser',
        location: 'France',
        type: 'Transverse',
        current: false,
        highlights: [
          {
            title: 'Coordination Agile',
            desc: 'Animation de rituels Agile (Scrum, Scrum of Scrums)',
            impact: 'Agilité optimisée'
          },
          {
            title: 'Gestion des Dépendances',
            desc: 'Suivi d\'avancement et gestion des dépendances',
            impact: 'Synchronisation'
          },
          {
            title: 'Coordination Inter-équipes',
            desc: 'Coordination inter-équipes',
            impact: 'Collaboration'
          }
        ],
        tasks: [
          'Utilisation de Rally et Jira'
        ],
        tech: ['Scrum', 'Scrum of Scrums', 'Rally', 'Jira', 'Agile']
      }
    ],

    skills: {
      programming: {
        name: 'Programmation',
        items: ['React', 'Node.js', 'JavaScript', 'C#', 'VBA'],
        levels: {
          'React': 90,
          'Node.js': 85,
          'JavaScript': 85,
          'C#': 75,
          'VBA': 70
        }
      },
      cloudDevOps: {
        name: 'Cloud & DevOps',
        items: ['AWS', 'CI/CD', 'GitHub Actions', 'Jenkins', 'Git', 'Deployment', 'Environment Management'],
        levels: {
          'AWS': 75,
          'CI/CD': 85,
          'GitHub Actions': 80,
          'Jenkins': 80,
          'Git': 90
        }
      },
      automation: {
        name: 'Automatisation & Configuration',
        items: ['Rule-based systems', 'Business rules configuration', 'Process automation', 'Data flow automation'],
        levels: {
          'Rule-based systems': 85,
          'Process automation': 90,
          'Data flow automation': 85
        }
      },
      methodologies: {
        name: 'Méthodologies',
        items: ['Agile', 'Scrum', 'Scrum of Scrums'],
        levels: {
          'Agile': 90,
          'Scrum': 90,
          'Scrum of Scrums': 85
        }
      },
      tools: {
        name: 'Outils',
        items: ['Jira', 'Rally'],
        levels: {
          'Jira': 85,
          'Rally': 85
        }
      }
    },

    languages: [
      { name: 'Français', level: 'Natif', flag: '🇫🇷' },
      { name: 'Anglais', level: 'Professionnel (collaboration internationale quotidienne)', flag: '🇬🇧' }
    ],

    interests: [
      {
        name: 'Activités Canines',
        description: 'Passionné par le mantrailing et le canicross',
        details: ['Mantrailing', 'Canicross'],
        icon: '🐾'
      },
      {
        name: 'Rugby',
        description: 'Pratique du Rugby XV et Rugby à 5',
        details: ['Rugby XV', 'Rugby à 5'],
        icon: '🏉'
      }
    ],

    projects: [
      {
        name: 'Carnet d\'Activité Canine',
        description: 'Application web full-stack pour tracker et gérer les activités canines',
        tech: ['React', 'Node.js', 'MongoDB', 'Express'],
        category: 'Side Project'
      }
    ]
  },
  en: {
    name: 'Your Name',
    title: 'Full Stack Engineer & Scrum Master',
    tagline: 'Generalist engineer passionate about software development, automation and cloud',
    summary: 'Generalist engineer graduate (ESEO Angers, Master - Energy & Environment specialization) with proven experience in software development, process automation and cloud deployment. Expert in pre-sales applications integrating rule engines for technical equipment configuration. Ability to work in international environments and interface between business and development teams.',
    
    education: {
      school: 'ESEO Angers',
      degree: 'Engineering Degree (Master)',
      specialization: 'Energy and Environment Specialization',
      year: '2016'
    },

    experience: [
      {
        company: 'Carrier',
        role: 'Project Engineer',
        period: '2021 – Present',
        location: 'France',
        type: 'Full-time',
        current: true,
        highlights: [
          {
            title: 'Smart Automation',
            desc: 'Automation of data flows and rules - Reduction from 2 weeks to 10 minutes',
            impact: '95% time saved'
          },
          {
            title: 'Cloud Migration',
            desc: 'Migration from legacy solution (VBA, local IIS Express application) to AWS cloud architecture',
            impact: 'Modern architecture'
          },
          {
            title: 'Full Stack Development',
            desc: 'Development and maintenance of React/Node.js pre-sales application with product configuration rule engine',
            impact: 'Scalable solution'
          },
          {
            title: 'DevOps & CI/CD',
            desc: 'Implementation and maintenance of CI/CD pipelines (Jenkins then GitHub Actions) - Monthly production releases management',
            impact: 'Continuous delivery'
          },
          {
            title: 'International Collaboration',
            desc: 'Collaboration with EMEA, North America, China, India teams',
            impact: '4 continents'
          }
        ],
        tasks: [
          'React front-end and Node.js back-end development',
          'Translation of business requirements into configurable rules',
          'Training of rules authors and user support',
          'Work in Agile methodology'
        ],
        tech: ['React', 'Node.js', 'AWS', 'Jenkins', 'GitHub Actions', 'VBA', 'C#', 'JavaScript']
      },
      {
        company: 'Akkodis',
        role: 'Software Engineering Consultant',
        period: '2021',
        location: 'Assignment at Carrier',
        type: 'Consultant',
        current: false,
        highlights: [
          {
            title: 'Automated Testing',
            desc: 'Development of automated test scripts for legacy VB6 applications',
            impact: 'Improved quality'
          },
          {
            title: 'Application Maintenance',
            desc: 'Application maintenance support',
            impact: 'Stability'
          },
          {
            title: 'Successful Integration',
            desc: 'Internalization at final client',
            impact: 'Full-time transition'
          }
        ],
        tasks: [
          'Integration into a complex technical environment'
        ],
        tech: ['VB6', 'Automated Testing']
      },
      {
        company: 'Cross-functional Mission',
        role: 'Scrum Master',
        period: 'Duration to be specified',
        location: 'France',
        type: 'Transverse',
        current: false,
        highlights: [
          {
            title: 'Agile Coordination',
            desc: 'Facilitation of Agile ceremonies (Scrum, Scrum of Scrums)',
            impact: 'Optimized agility'
          },
          {
            title: 'Dependency Management',
            desc: 'Progress tracking and dependency management',
            impact: 'Synchronization'
          },
          {
            title: 'Inter-team Coordination',
            desc: 'Inter-team coordination',
            impact: 'Collaboration'
          }
        ],
        tasks: [
          'Use of Rally and Jira'
        ],
        tech: ['Scrum', 'Scrum of Scrums', 'Rally', 'Jira', 'Agile']
      }
    ],

    skills: {
      programming: {
        name: 'Programming',
        items: ['React', 'Node.js', 'JavaScript', 'C#', 'VBA'],
        levels: {
          'React': 90,
          'Node.js': 85,
          'JavaScript': 85,
          'C#': 75,
          'VBA': 70
        }
      },
      cloudDevOps: {
        name: 'Cloud & DevOps',
        items: ['AWS', 'CI/CD', 'GitHub Actions', 'Jenkins', 'Git', 'Deployment', 'Environment Management'],
        levels: {
          'AWS': 75,
          'CI/CD': 85,
          'GitHub Actions': 80,
          'Jenkins': 80,
          'Git': 90
        }
      },
      automation: {
        name: 'Automation & Configuration',
        items: ['Rule-based systems', 'Business rules configuration', 'Process automation', 'Data flow automation'],
        levels: {
          'Rule-based systems': 85,
          'Process automation': 90,
          'Data flow automation': 85
        }
      },
      methodologies: {
        name: 'Methodologies',
        items: ['Agile', 'Scrum', 'Scrum of Scrums'],
        levels: {
          'Agile': 90,
          'Scrum': 90,
          'Scrum of Scrums': 85
        }
      },
      tools: {
        name: 'Tools',
        items: ['Jira', 'Rally'],
        levels: {
          'Jira': 85,
          'Rally': 85
        }
      }
    },

    languages: [
      { name: 'French', level: 'Native', flag: '🇫🇷' },
      { name: 'English', level: 'Professional (daily international collaboration)', flag: '🇬🇧' }
    ],

    interests: [
      {
        name: 'Canine Activities',
        description: 'Passionate about mantrailing and canicross',
        details: ['Mantrailing', 'Canicross'],
        icon: '🐾'
      },
      {
        name: 'Rugby',
        description: 'Playing Rugby XV and Rugby 5s',
        details: ['Rugby XV', 'Rugby 5s'],
        icon: '🏉'
      }
    ],

    projects: [
      {
        name: 'Dog Activity Tracker',
        description: 'Full-stack web application to track and manage canine activities',
        tech: ['React', 'Node.js', 'MongoDB', 'Express'],
        category: 'Side Project'
      }
    ]
  }
};
