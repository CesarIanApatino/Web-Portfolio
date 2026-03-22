import type { Project, ProjectCategory } from '~/types/stack'

export const useProjects = () => {
  const filters: ProjectCategory[] = [
    'ALL', 'WEB APPS', 'DESKTOP APPS', 'ACADEMIC', 'EXPERIMENTAL', 'ARCHIVED'
  ]

  const projects: Project[] = [
    {
      link: 'https://github.com/GameSa0/Funds-Recorder',
      text: 'Funds Recorder',
      category: 'ARCHIVED',
      description: 'Desktop GUI application for managing financial records with full CRUD functionality. Built with Java Swing, featuring file-based data persistence without requiring database installation.',
      stack: 'Java, Swing, File I/O',
      features: [
        'Create, read, update, and delete financial records',
        'File-based data storage (no database required)',
        'Custom text parsing and manipulation algorithms',
        'Desktop GUI interface with Java Swing',
      ],
      images: [],
      year: '2025',
      role: 'Solo Developer',
    },
    {
      link: '#',
      text: 'Faculty Evaluation with Sentiment Analysis',
      category: 'ACADEMIC',
      description: 'AI-powered evaluation platform featuring NLP and sentiment analysis to automatically classify student feedback as positive, negative, or neutral.',
      stack: 'Python, Flask, Google Colab, PostgreSQL, Render, NLP',
      features: [
        'Sentiment analysis engine (Positive/Negative/Neutral classification)',
        'Automated feedback categorization and reporting',
        'PostgreSQL database integration for data persistence',
        'Cloud deployment on Render platform',
        'Real-time evaluation processing and analytics',
      ],
      images: [
        '/Images/Sentiment/Sentiment1.png',
        '/Images/Sentiment/Sentiment2.png',
        '/Images/Sentiment/Sentiment3.png',
        '/Images/Sentiment/Sentiment4.png',
        '/Images/Sentiment/Sentiment5.png',
      ],
      year: '2025',
      role: 'Team Developer (Thesis)',
    },
    {
      link: '#',
      text: 'Tourist Spot',
      category: 'ACADEMIC',
      description: 'Cross-platform mobile application for discovering tourist destinations with real-time navigation, location-based recommendations, and bookmarking.',
      stack: 'Flutter, Firebase, Firestore, OpenStreetMap',
      features: [
        'Interactive map with OpenStreetMap integration',
        'Location-based hotspot recommendations',
        'Bookmark and save favorite destinations',
        'Real-time navigation and directions',
        'Firebase authentication and Firestore database',
      ],
      images: [
        '/Images/MobileApps/MobileApp1.jpg',
        '/Images/MobileApps/MobileApp2.jpg',
        '/Images/MobileApps/MobileApp3.jpg',
        '/Images/MobileApps/MobileApp4.jpg',
      ],
      year: '2025',
      role: 'Solo Developer (Capstone)',
    },
    {
      link: '#',
      text: 'Sigma Accounting System',
      category: 'WEB APPS',
      description: 'Contributed to an accounting system as part of the Sigma project suite, designed to streamline financial management and reporting for project stakeholders.',
      stack: 'Nuxt.js, Laravel, MySQL, Tailwind CSS, TypeScript, PHP',
      features: [
        'Accounting dashboard with real-time financial data visualization',
        'Automated financial reporting and analytics',
        'Role-based access control for secure data management',
        'Integration with Sigma project suite for seamless data flow',
      ],
      images: ['/Images/1.png'],
      year: '2025',
      role: 'Junior Developer (Internship)',
    },
    {
      link: '#',
      text: 'Predicting Graduate Competitiveness',
      category: 'ACADEMIC',
      description: 'Web application that predicts graduate competitiveness using a Random Forest ML model, providing insights and recommendations for career development.',
      stack: 'Python, Google Colab, Pandas, scikit-learn, Flask, Render',
      features: [
        'Random Forest model to predict graduate competitiveness',
        'Data preprocessing and feature engineering pipeline',
        'Interactive web interface for entering graduate data',
        'Consistent evaluation across Render app and Google Forms',
      ],
      images: [
        '/Images/Tracers/Tracer1.png',
        '/Images/Tracers/tracer2.png',
        '/Images/Tracers/tracer3.png',
      ],
      year: '2025',
      role: 'Solo Developer (Thesis)',
    },
    {
      link: '#',
      text: 'React Practice Project',
      category: 'EXPERIMENTAL',
      description: 'A personal project built with React to practice frontend development concepts, featuring interactive components and clean state management.',
      stack: 'React, Tailwind CSS, TypeScript',
      features: [
        'Compilation of basic React concepts and patterns',
        'Implementation of interactive components and state management',
        'Clean responsive UI using Tailwind CSS',
        'Focus on code organization and best practices',
      ],
      images: [],
      year: '2025',
      role: 'Solo Developer (Practice)',
    },
  ]

  return { filters, projects }
}