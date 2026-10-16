export interface Project {
  id: string;
  title: string;
  category: 'ai-agents' | 'enterprise' | 'personal';
  subtitle: string;
  client?: string;
  description: string;
  highlights: string[];
  technologies: string[];
  liveUrl?: string;
  badge?: string;
  stats?: { label: string; value: string }[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  summary: string;
  projects: {
    name: string;
    clientOrType: string;
    roleInProject: string;
    description: string;
    impact: string[];
    tags: string[];
    badge?: string;
  }[];
}

export interface SkillCategory {
  title: string;
  description: string;
  iconName: string;
  skills: {
    name: string;
    level: number;
    tag?: string;
  }[];
}

export interface Certification {
  title: string;
  issuer: string;
  verificationUrl?: string;
  type: 'certification' | 'badge';
  description?: string;
  badgeText?: string;
}

// Dynamic Real-time Experience calculation from April 2022
export const getExperienceDetails = () => {
  const startDate = new Date(2022, 3, 1); // April 2022
  const now = new Date();
  const diffMonths = (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth());
  const years = Math.floor(diffMonths / 12);
  const remainingMonths = diffMonths % 12;

  return {
    yearsCount: years,
    displayYears: `${years}+ Years`,
    displayYearsShort: `${years}+ Yrs`,
    textSummary: `over ${years} years`,
    monthsCount: diffMonths,
  };
};

export const PERSONAL_INFO = {
  name: 'Ragul Sethuraman',
  role: 'Full-Stack AI Engineer | Associate Consultant',
  headline: 'AI Multi-Agent Systems (LangGraph & Python) & Enterprise Full-Stack',
  bio: `Dynamic Full-Stack AI Engineer with ${getExperienceDetails().textSummary} of experience, currently serving as an Associate Consultant at Infosys. Expertise in building scalable enterprise applications using the MEAN stack and React, and architecting complex AI multi-agent systems using LangGraph, Python, and agentic developer tooling (Claude Code, Kiro, MCP). Proven track record in automating business logic and enhancing user engagement through AI-driven solutions.`,
  email: 'ragul.sethuraman1999@gmail.com',
  phone: '+91 73973 63765',
  phoneDisplay: '+91 73973 63765',
  location: 'Chennai, Tamil Nadu, India',
  linkedin: 'https://www.linkedin.com/in/ragul-sethuraman/',
  portfolioUrl: 'https://Sraguldeveloper.github.io/portfolio',
  status: 'Open to Full-Stack AI & Senior Engineering Roles',
  metrics: [
    { label: 'Real-time Production Experience', value: getExperienceDetails().displayYears },
    { label: 'AI Multi-Agent Frameworks', value: 'LangGraph' },
    { label: 'Key US Enterprise Clients', value: 'Charter & T-Mobile' },
    { label: 'User Retention & Engagement', value: '+45% / +60%' },
  ],
};

export const EXPERIENCES: Experience[] = [
  {
    id: 'infosys',
    role: 'Associate Consultant | Full-Stack Developer',
    company: 'Infosys Private Limited',
    location: 'Chennai, Tamil Nadu',
    period: 'April 2022 – Present',
    type: 'Full-Time',
    summary: 'Serving as Associate Consultant and Full-Stack AI Lead delivering high-stakes enterprise AI multi-agent systems and scalable full-stack applications for tier-1 telecommunications and enterprise clients.',
    projects: [
      {
        name: 'AI Story-Elicitation Agent',
        clientOrType: 'Client: Charter Communications',
        roleInProject: 'Lead Developer',
        description: 'Intelligent agentic pipeline transforming Jira epics, Figma/design files, and business documents into investment-compliant user stories with traceable acceptance criteria.',
        badge: 'Enterprise AI Lead',
        impact: [
          'Architected an intelligent agentic system that significantly cuts manual backlog grooming effort for product and BA teams.',
          'Engineered a cross-project duplicate detection and reuse engine leveraging similar recent epics to minimize rework and eliminate duplicate effort.',
          'Integrated automated retrieval of relevant organizational business rules from Confluence/Chalk knowledge bases, ensuring evidence-backed citations so known rules are never missed during drafting.',
          'Designed an intuitive human-in-the-loop validation interface built with React & TypeScript, ensuring zero automatic Jira writes—requiring explicit user approval with an exact-match preview before asset creation.',
        ],
        tags: ['React', 'TypeScript', 'LangGraph', 'Python', 'Multi-Agent Systems', 'RAG', 'Vector Databases', 'Jira API', 'Confluence/Chalk', 'Human-in-the-Loop'],
      },
      {
        name: 'Multi-Agent Refund Orchestrator',
        clientOrType: 'Client: T-Mobile US',
        roleInProject: 'AI Agent Lead',
        description: 'Stateful autonomous multi-agent system architected using LangGraph to automate complex end-to-end refund request processing.',
        badge: 'Multi-Agent System',
        impact: [
          'Architected a stateful multi-agent system using LangGraph to automate complex refund request processing.',
          'Implemented a dynamic decision engine that executes refund workflows based on granular business logic stored in JSON configurations.',
          'Designed autonomous agents that interact to verify transaction history, apply policy rules, and determine refund eligibility.',
          'Leveraged Python as the core language to build robust, highly reliable AI services and agentic workflows.',
        ],
        tags: ['LangGraph', 'Python', 'Stateful Agents', 'Autonomous Workflows', 'Decision Engine', 'JSON Config', 'Microservices'],
      },
      {
        name: 'AI Emulator – Game-Based Learning',
        clientOrType: 'Internal Project (Infosys)',
        roleInProject: 'Full-Stack Developer',
        description: 'AI-powered gamified learning simulation platform utilizing custom scoring algorithms and real-time behavioral telemetry.',
        badge: 'AI Gamification',
        impact: [
          'Engineered an AI-powered gamified platform using custom scoring algorithms and real-time feedback loops.',
          'Boosted participant knowledge retention by 45% and achieved an outstanding satisfaction rating of 4.8/5 in enterprise surveys.',
          'Delivered low-latency client-server synchronization for interactive multiplayer game scenarios.',
        ],
        tags: ['AI Scoring', 'Node.js', 'Express.js', 'Angular', 'Real-time Telemetry', 'Gamification'],
      },
      {
        name: 'Adaptive Course Creator (R-CAT)',
        clientOrType: 'Internal Project (Infosys)',
        roleInProject: 'Full-Stack Developer',
        description: 'Dynamic educational platform that personalizes learning trajectories in real time based on learner behavior telemetry.',
        badge: 'Adaptive Learning',
        impact: [
          'Developed a dynamic platform using Angular, Node.js, and MongoDB that personalized learning paths based on behavior.',
          'Reduced learner drop-off by 40% and boosted user engagement by 60% through adaptive content sequencing.',
          'Engineered high-performance RESTful APIs and modular Angular UI components.',
        ],
        tags: ['Angular', 'Node.js', 'Express.js', 'MongoDB', 'RESTful APIs', 'Behavioral Pacing'],
      },
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'ai-story-agent',
    title: 'AI Story-Elicitation Agent',
    category: 'ai-agents',
    subtitle: 'Agentic Backlog Grooming with React Human-in-the-Loop UI',
    client: 'Charter Communications',
    description: 'Autonomous multi-agent system converting unstructured Jira epics, design specs, and enterprise docs into investment-compliant user stories. Features a human-in-the-loop React interface with exact-match previews.',
    highlights: [
      'Multi-agent pipeline using LangGraph, RAG, and Vector Databases.',
      'Human-in-the-loop validation interface crafted with React & TypeScript preventing unintended Jira writes.',
      'Cross-project duplicate detection and reuse engine eliminating redundant backlog effort.',
      'Confluence & Chalk knowledge base retrieval with verified citations.',
    ],
    technologies: ['React', 'TypeScript', 'LangGraph', 'Python', 'RAG', 'Vector Databases', 'Jira API', 'Confluence', 'MCP'],
    badge: 'Charter Communications',
    stats: [
      { label: 'Domain', value: 'Telecom' },
      { label: 'Frontend', value: 'React + TS' },
      { label: 'Role', value: 'Lead Dev' },
    ],
  },
  {
    id: 'tmobile-refund-orchestrator',
    title: 'Multi-Agent Refund Orchestrator',
    category: 'ai-agents',
    subtitle: 'Stateful Autonomous Refund Processing Engine',
    client: 'T-Mobile US',
    description: 'Autonomous decision engine powered by LangGraph state machines that parses transaction history, applies dynamic policy rules via JSON configs, and automates refund approvals.',
    highlights: [
      'Stateful multi-agent architecture built with LangGraph and Python.',
      'Dynamic decision engine driven by configurable JSON business logic.',
      'Autonomous policy compliance and customer transaction validation.',
    ],
    technologies: ['LangGraph', 'Python', 'Stateful Graphs', 'Autonomous Agents', 'Decision Engines', 'REST APIs'],
    badge: 'T-Mobile US',
    stats: [
      { label: 'Framework', value: 'LangGraph' },
      { label: 'Core Language', value: 'Python' },
      { label: 'Role', value: 'AI Agent Lead' },
    ],
  },
  {
    id: 'stylelab',
    title: 'StyleLab',
    category: 'personal',
    subtitle: 'AI-Powered Modern CSS Generator & Tool Suite',
    description: 'CSS generation utility hosted on Vercel to assist developers with visual styling. Features 18+ interactive CSS generators, live code export, performance audit metrics, and accessibility analyzers.',
    highlights: [
      'Engineered 18+ visual CSS tool modules (Flexbox, Grid, Gradients, Keyframe Animations, Glassmorphism).',
      'Instant code output with clean vendor prefixes, CSS variables, and Tailwind class equivalents.',
      'Integrated contrast checking and accessibility validation.',
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Web APIs'],
    liveUrl: 'https://styleslab.vercel.app/',
    badge: 'Live on Vercel',
    stats: [
      { label: 'Built-in Tools', value: '18+' },
      { label: 'Platform', value: 'Vercel' },
      { label: 'Status', value: 'Active' },
    ],
  },
  {
    id: 'rcat-platform',
    title: 'Adaptive Course Creator (R-CAT)',
    category: 'enterprise',
    subtitle: 'Behavioral Learning Path Engine',
    client: 'Infosys Internal',
    description: 'Dynamic learning platform that analyzes behavioral telemetry to generate real-time personalized learning paths, cutting learner attrition and driving engagement.',
    highlights: [
      'Cut learner drop-off by 40% and elevated engagement by 60%.',
      'Developed with Angular, Node.js, Express.js, and MongoDB.',
      'Standardized reusable UI component patterns across enterprise training teams.',
    ],
    technologies: ['Angular', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
    badge: 'Infosys Internal',
    stats: [
      { label: 'Drop-off Reduction', value: '-40%' },
      { label: 'Engagement Boost', value: '+60%' },
    ],
  },
  {
    id: 'ai-emulator',
    title: 'AI Emulator – Game-Based Learning',
    category: 'enterprise',
    subtitle: 'Gamified Simulation & Telemetry Platform',
    client: 'Infosys Internal',
    description: 'AI-powered gamified platform engineered with custom scoring algorithms and real-time response telemetry to elevate technical learning retention.',
    highlights: [
      'Boosted knowledge retention by 45% with a 4.8/5 satisfaction rating.',
      'Implemented custom algorithmic scoring and real-time telemetry.',
      'Low-latency client-server synchronization for simulation trials.',
    ],
    technologies: ['AI Scoring', 'Angular', 'Node.js', 'Express.js', 'Real-Time APIs'],
    badge: 'Infosys Internal',
    stats: [
      { label: 'Retention Boost', value: '+45%' },
      { label: 'Satisfaction', value: '4.8 / 5.0' },
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'AI & LLM Orchestration',
    description: 'Multi-agent systems, prompt engineering, RAG, and agentic workflows',
    iconName: 'Cpu',
    skills: [
      { name: 'LangGraph (Multi-Agent Systems)', level: 96, tag: 'Specialist' },
      { name: 'Prompt Engineering', level: 95, tag: 'Certified' },
      { name: 'LangChain', level: 92, tag: 'Core' },
      { name: 'RAG (Retrieval-Augmented Generation)', level: 92, tag: 'Core' },
      { name: 'Vector Databases', level: 90 },
      { name: 'Generative AI & LLM Fine-Tuning', level: 92, tag: 'IBM Certified' },
      { name: 'MCP (Model Context Protocol)', level: 90, tag: 'Modern' },
      { name: 'Machine Learning', level: 86 },
    ],
  },
  {
    title: 'AI Developer Tooling & Agentic CLI',
    description: 'Next-generation AI coding tools, terminal agents & developer velocity',
    iconName: 'Bot',
    skills: [
      { name: 'Claude Code (Agentic CLI)', level: 94, tag: 'Expert' },
      { name: 'Kiro (AI Coding Assistant)', level: 92, tag: 'Advanced' },
      { name: 'Cursor AI & Copilot', level: 94, tag: 'Daily Driver' },
      { name: 'MCP Server Integrations', level: 90, tag: 'Protocol' },
      { name: 'Automated Code Generation & Testing', level: 92 },
    ],
  },
  {
    title: 'Backend Engineering',
    description: 'High-performance microservices, Python AI backends & Node.js APIs',
    iconName: 'Server',
    skills: [
      { name: 'Python', level: 94, tag: 'Primary AI' },
      { name: 'Node.js', level: 92, tag: 'Primary' },
      { name: 'Express.js', level: 92, tag: 'Primary' },
      { name: 'RESTful APIs', level: 96, tag: 'Core' },
      { name: 'Microservices Architecture', level: 90 },
    ],
  },
  {
    title: 'Frontend Engineering',
    description: 'Modern reactive client applications, human-in-the-loop interfaces',
    iconName: 'Code2',
    skills: [
      { name: 'React', level: 92, tag: 'Charter HITL' },
      { name: 'Angular', level: 92, tag: 'Primary' },
      { name: 'TypeScript', level: 94, tag: 'Core' },
      { name: 'JavaScript', level: 94, tag: 'Core' },
      { name: 'HTML5 & CSS3', level: 95 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'Bootstrap', level: 90 },
    ],
  },
  {
    title: 'Databases',
    description: 'Relational & NoSQL database architecture and schema optimization',
    iconName: 'Database',
    skills: [
      { name: 'MongoDB (NoSQL)', level: 92, tag: 'Primary' },
      { name: 'PostgreSQL', level: 88, tag: 'Relational' },
    ],
  },
  {
    title: 'Tools & Observability',
    description: 'Version control, agile project tracking, logging & end-to-end testing',
    iconName: 'Terminal',
    skills: [
      { name: 'Git', level: 95, tag: 'Core' },
      { name: 'Jira', level: 92 },
      { name: 'Postman', level: 92 },
      { name: 'OpenSearch (Logging)', level: 86 },
      { name: 'Playwright (Testing)', level: 85 },
    ],
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    title: 'Developing, Operating, and Securing Production-Grade Agents',
    issuer: 'Google Cloud (Credly Verified)',
    type: 'badge',
    badgeText: 'Google Cloud Badge',
    verificationUrl: 'https://www.credly.com/badges/5a6d944f-7d43-4768-b2e3-768af6bcd3a9/linked_in?t=tm35ls',
    description: 'Demonstrated mastery in developing, operating, and securing production-grade agents with version control, environment branching, conversation logging, exports, and automated test cases.',
  },
  {
    title: 'Generative AI Engineering and Fine-Tuning Transformers',
    issuer: 'IBM (Coursera)',
    type: 'certification',
    badgeText: 'IBM Generative AI',
    description: 'In-depth specialization covering transformer architectures, parameter-efficient fine-tuning (PEFT/LoRA), tokenization, attention mechanisms, and model evaluation.',
  },
  {
    title: 'Generative AI Advanced Fine-Tuning for LLMs',
    issuer: 'IBM (Coursera)',
    type: 'certification',
    badgeText: 'Advanced LLM',
    description: 'Advanced LLM alignment methodologies, supervised fine-tuning (SFT), Reinforcement Learning from Human Feedback (RLHF), quantization, and production inference optimization.',
  },
  {
    title: 'Prompt Engineering',
    issuer: 'Infosys',
    type: 'certification',
    badgeText: 'AI & LLM',
    description: 'Advanced prompt chaining, multi-turn elicitation, few-shot prompting, and generative AI orchestration.',
  },
  {
    title: 'MEAN Stack Developer',
    issuer: 'Infosys',
    type: 'certification',
    badgeText: 'Full Stack',
    description: 'Comprehensive certification in Angular, Node.js, Express.js, and MongoDB enterprise development principles.',
  },
  {
    title: 'API Development',
    issuer: 'Infosys',
    type: 'certification',
    badgeText: 'Backend',
    description: 'Enterprise API architectural design, REST standards, middleware security, and asynchronous server programming.',
  },
];

export const EDUCATION = {
  institution: 'Prince Shri Venkateshwara Padmavathy Engineering College, Chennai',
  location: 'Chennai, Tamil Nadu',
  degree: 'Bachelors in Mechanical Engineering',
  grade: 'CGPA: 8.2',
  completionDate: 'May 2021',
  highlights: [
    'Strong analytical foundation and mathematical modeling expertise.',
    'Graduated with First Class distinction.',
    'Pioneered full-stack and multi-agent AI engineering at Infosys.',
  ],
};
