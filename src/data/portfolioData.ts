import { Project, PhilosophyCard, SkillCategory, CreativePillar } from '../types';
import { ASSETS } from './assets';

export const PERSONAL_INFO = {
  name: 'Aditya Kumar Jha',
  heroHeading: 'ADITYA KR. JHA',
  firstLine: 'ADITYA KR. JHA',
  middleLine: 'KR.',
  lastLine: 'JHA',
  role: 'ASPIRING SDE',
  primaryRole: 'ASPIRING SDE',
  supportingIdentity: 'AI & SOFTWARE BUILDER',
  tagline: 'Building practical software, AI-powered applications, and thoughtful digital experiences.',
  heroDescription: 'Building practical software, AI-powered applications, and thoughtful digital experiences.',
  shortBio: 'Aspiring AI engineer and B.Tech CSE (AI) student at PSIT Kanpur (CGPA 8.5) focused on practical software, algorithms, and applied machine learning.',
  location: 'Kanpur, India',
  timezone: 'Asia/Kolkata (IST)',
  email: '2k24.csai1a.2412094@gmail.com',
  linkedin: 'https://linkedin.com/in/aditya-jha-a16514367',
  hackerrank: 'https://hackerrank.com/profile/2k24_csai1a_2439',
  github: 'https://github.com/git-aadi-ai',
  leetcode: 'https://leetcode.com/u/adityajha_12345/',
  resumeUrl: ASSETS.resumePdf,
  status: 'OPEN FOR SDE & FREELANCE',
  navStatus: 'OPEN FOR SDE & FREELANCE',
};

export const IDENTITY_DATA = {
  heading: 'ENGINEERED TO BUILD.',
  supportingText: 'I am an aspiring Software Development Engineer focused on building practical and intelligent digital products. I enjoy working across algorithms, full-stack development, AI-powered applications and modern digital experiences.',
  philosophyCards: [
    {
      number: '01',
      title: 'BUILD.',
      tagline: 'Turn ideas into functional systems.',
    },
    {
      number: '02',
      title: 'SOLVE.',
      tagline: 'Approach problems with logic, algorithms and engineering discipline.',
    },
    {
      number: '03',
      title: 'CREATE.',
      tagline: 'Combine technology with thoughtful digital experiences.',
    },
    {
      number: '04',
      title: 'LEARN.',
      tagline: 'Continuously explore new technologies and better ways to build.',
    },
  ] as PhilosophyCard[],
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'PROGRAMMING',
    skills: ['Python', 'C/C++', 'Java'],
  },
  {
    name: 'COMPUTER SCIENCE',
    skills: [
      'Data Structures & Algorithms (DSA)',
      'Database Management (DBMS)',
      'Object-Oriented Programming (OOPS)',
      'Problem Solving (HackerRank 5-Star)',
    ],
  },
  {
    name: 'DEVELOPMENT',
    skills: ['React', 'Flutter', 'Firebase'],
  },
  {
    name: 'AI & EMERGING TECHNOLOGY',
    skills: [
      'Google Gemini AI',
      'Generative AI Applications',
      'Applied Machine Learning',
      'IoT Hardware Telemetry',
    ],
  },
  {
    name: 'TOOLS / ECOSYSTEM',
    skills: ['VS Code', 'Android Studio', 'Git', 'GitHub'],
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'interviewiq',
    title: 'IntervuIQ',
    category: 'AI-POWERED PLATFORM',
    subtitle: 'AI-Powered Interview Preparation & Career Platform',
    description:
      'Full-stack platform built with React, TypeScript, Node.js, Express, Gemini AI, and Firebase helping students master technical interviews through mock sessions, DSA practice, and communication coaching.',
    problem:
      'Students and job seekers prepare with scattered resources, lack structured DSA pattern guidance, and have no real-time feedback on speaking tempo, filler words, or ATS resumes.',
    solution:
      'Engineered a unified preparation hub combining 120+ curated DSA questions with a multi-filter pipeline, on-demand AI DSA Coach, real-time Speech Coach, and ATS Resume Analyzer.',
    keyHighlights: [
      '120+ curated DSA questions with multi-filter pipeline',
      'Topic-specific AI DSA Coach for tailored guidance',
      'Real-time Speech Coach analyzing tempo, filler words & volume',
      'Resume Analyzer with ATS scoring & Gemini feedback',
    ],
    aiCapabilities: [
      'Google Gemini integration for structured diagnostic feedback',
      'Context-aware problem solving and DSA pattern recommendations',
      'Real-time speech tempo (WPM) and acoustic filler-word analysis',
    ],
    technology: ['React', 'TypeScript', 'Node.js', 'Express', 'Google Gemini', 'Firebase'],
    impact:
      'Delivers an end-to-end interview coaching environment with secure, user-isolated Firebase data persistence.',
    isPatent: false,
    liveUrl: '#',
    githubUrl: 'https://github.com/git-aadi-ai',
  },
  {
    id: 'patent-project',
    title: 'Intelligent Irrigation System',
    category: 'HARDWARE & IoT PROJECT',
    subtitle: 'Automated Sensing & Environmental Telemetry System',
    description:
      'Co-invented an IoT-based smart agricultural system integrating ESP8266 Wi-Fi, soil moisture and DHT11 sensing, relay pump automation, and Blynk mobile cloud telemetry.',
    problem:
      'Manual field irrigation in agricultural regions leads to erratic watering, water wastage, and delayed response to changing temperature and soil moisture conditions.',
    solution:
      'Built a closed-loop microcontroller setup that reads soil moisture and environmental metrics in real time, automatically actuating water pump relays and syncing data to farmers via Blynk IoT.',
    keyHighlights: [
      'ESP8266 Wi-Fi & Blynk IoT platform integration',
      'Automated relay pump control based on soil moisture',
      'DHT11 environmental temperature & humidity monitoring',
      'PIR-based field security & local I2C LCD readout',
    ],
    innovation:
      'Closed-loop automated irrigation with soil & environmental telemetry, remote Blynk IoT control, and field security.',
    technology: ['ESP8266 Wi-Fi', 'Blynk IoT', 'C++', 'Microcontrollers', 'Relay Actuation'],
    patentStatus: 'Indian Patent App No: 202511077093 A (Published 05/09/2025)',
    isPatent: true,
    githubUrl: 'https://github.com/git-aadi-ai',
  },
];

export const PATENT_DATA = {
  sectionCode: '05 // INTELLECTUAL PROPERTY & PATENTS',
  heading: 'Published Patent & Inventions.',
  tagline: 'Formal intellectual property publication documenting automated real-time hardware telemetry and closed-loop control.',
  title: 'Intelligent Irrigation Control System with Automated Watering Based on Real-Time Data',
  applicationNumber: '202511077093 A',
  filingDate: '13 August 2025',
  publicationDate: '05 September 2025',
  inventor: 'Aditya Kumar Jha',
  role: 'Co-Inventor (10-Member Team)',
  status: 'PUBLISHED OFFICIAL JOURNAL',
  jurisdiction: 'Patent Office Journal (India No. 36/2025)',
  classification: 'Agricultural Automation & Real-Time Telemetry Control',
  abstract:
    'Co-invented an automated IoT-based irrigation system utilizing ESP8266 Wi-Fi, soil moisture sensing, and relay-driven water pump actuation, paired with DHT11 temperature/humidity tracking, PIR field security, and remote Blynk cloud telemetry for farmers.',
  highlights: [
    'ESP8266 Wi-Fi module with Blynk IoT platform integration',
    'Automated water pump actuation via soil moisture relay logic',
    'DHT11 ambient temperature & humidity environmental sensing',
    'PIR motion-based field security & local I2C display readout',
  ],
};

export const CREATIVE_DATA = {
  heading: 'BEYOND PURE CODE.',
  supportingStatement:
    "I don't just build software. I explore how technology, AI, visual storytelling and interaction can come together to create memorable digital experiences.",
  labels: [
    'CREATIVE TECHNOLOGY',
    'VISUAL STORYTELLING',
    'INTERACTION DESIGN',
    'AI + DIGITAL EXPERIENCES',
  ],
  pillars: [
    {
      title: 'Creative Technology',
      description:
        'Bridging software engineering with spatial UI, 3D WebGL shaders, and experimental digital canvases.',
      tag: '01 // SPATIAL',
    },
    {
      title: 'Visual Storytelling',
      description:
        'Translating complex algorithmic and AI architectures into clear, compelling, and memorable visual narratives.',
      tag: '02 // NARRATIVE',
    },
    {
      title: 'Interaction Design',
      description:
        'Designing fluid micro-interactions, responsive typography, and tactile digital interfaces that prioritize user flow.',
      tag: '03 // UX & CRAFT',
    },
    {
      title: 'AI + Digital Experiences',
      description:
        'Exploring generative models, intelligent interfaces, and modern human-software collaboration paradigms.',
      tag: '04 // INTELLIGENCE',
    },
  ] as CreativePillar[],
};

export const PAST_EXPERIENCE_DATA = {
  sectionCode: '07 // PAST EXPERIENCE & CONTENT SCALE',
  heading: 'Beyond Code — Past Experiences',
  subheading: 'Past Digital Content & Audience Scaling',
  description:
    'Built, edited, and scaled content to reach millions — long before turning the focus toward engineering.',
  instagramHandle: '@aadi_ediits_',
  instagramUrl:
    'https://www.instagram.com/aadi_ediits_?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw==',
  metrics: [
    { label: 'Followers', value: '11K+', subtext: 'Organic Community' },
    { label: 'Reach', value: '30M+', subtext: 'Content Impressions' },
    { label: 'Engagement', value: '2.5M+', subtext: 'User Interactions' },
  ],
  disclaimer:
    'Archived past endeavor in content editing and digital media distribution prior to software engineering transition.',
};

export const CERTIFICATIONS_DATA = {
  sectionCode: '06 // CREDENTIALS & INDUSTRY CERTIFICATIONS',
  heading: 'Professional Certifications',
  description:
    'Rigorous industry-recognized training in high-performance compute architectures, GPU infrastructure, and scalable AI system operations.',
  certificate: {
    title: 'AI Infrastructure and Operations Fundamentals',
    issuer: 'NVIDIA Training',
    platform: 'Coursera',
    issueDate: 'August 13, 2026',
    credentialId: 'Coursera XS36A92INGIJ',
    topics: [
      'Accelerated Computing & GPU Architectures',
      'AI Workload Orchestration & Data Center Operations',
      'High-Throughput Infrastructure & Cluster Networking',
      'Scalable Deep Learning Pipeline Deployment',
    ],
    verifiedBy: 'Coursera & NVIDIA Training Institute',
  },
};

export const CONTACT_DATA = {
  ctaHeading: "LET'S BUILD.",
  supportingText:
    "Have a project, opportunity, or idea in mind? Let’s build something meaningful.",
  email: '2k24.csai1a.2412094@gmail.com',
  channels: [
    {
      label: 'Email',
      value: '2k24.csai1a.2412094@gmail.com',
      href: 'mailto:2k24.csai1a.2412094@gmail.com',
      type: 'email',
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/aditya-jha-a16514367',
      href: 'https://linkedin.com/in/aditya-jha-a16514367',
      type: 'link',
    },
    {
      label: 'GitHub',
      value: 'github.com/git-aadi-ai',
      href: 'https://github.com/git-aadi-ai',
      type: 'link',
    },
    {
      label: 'LeetCode',
      value: 'leetcode.com/u/adityajha_12345',
      href: 'https://leetcode.com/u/adityajha_12345/',
      type: 'link',
    },
    {
      label: 'HackerRank',
      value: 'hackerrank.com/profile/2k24_csai1a_2439',
      href: 'https://hackerrank.com/profile/2k24_csai1a_2439',
      type: 'link',
    },
  ],
};
