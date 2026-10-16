import React, { useState, useEffect } from 'react';
import {
  Mail,
  Phone,
  Linkedin,
  MapPin,
  ExternalLink,
  Briefcase,
  Award,
  GraduationCap,
  Code2,
  Server,
  Database,
  Terminal,
  CheckCircle2,
  Sparkles,
  Cpu,
  Copy,
  Check,
  ArrowUp,
  FileText,
  Send,
  Globe,
  Bot,
  Workflow,
  ShieldCheck,
  Zap,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

import {
  PERSONAL_INFO,
  EXPERIENCES,
  PROJECTS,
  CERTIFICATIONS,
  EDUCATION,
  getExperienceDetails,
} from './data/portfolioData';
import { Navbar } from './components/Navbar';
import { HeroCanvas } from './components/HeroCanvas';
import { ResumeModal } from './components/ResumeModal';

export function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showEarlierWork, setShowEarlierWork] = useState(false);

  // Theme state: checks localStorage, system preference, or defaults to 'dark'
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const expInfo = getExperienceDetails();

  // Contact form state
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formSent, setFormSent] = useState(false);

  // Scroll listener for back to top
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2500);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.email || !formState.message) return;

    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
      formState.subject || 'Portfolio Inquiry from ' + formState.name
    )}&body=${encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
    )}`;

    window.open(mailtoUrl, '_blank');
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setFormState({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Curated work: 3 flagship projects
  const flagshipProjects = [
    {
      id: 'charter-agent',
      title: 'AI Story-Elicitation Agent',
      client: 'Client: Charter Communications',
      role: 'Lead Developer',
      subtitle: 'Multi-agent backlog synthesis with React human-in-the-loop preview interface',
      description: 'Architected an autonomous multi-agent pipeline transforming Jira epics, design files, and enterprise documents into investment-compliant user stories with traceable acceptance criteria.',
      impact: [
        'Integrated automated retrieval of business rules from Confluence/Chalk with evidence-backed citations.',
        'Engineered cross-project duplicate detection to eliminate redundant backlog grooming effort.',
        'Built human-in-the-loop validation interface with React ensuring zero unintended Jira writes.',
      ],
      tags: ['LangGraph', 'Python', 'React', 'TypeScript', 'RAG', 'Vector DBs', 'Jira API', 'MCP'],
      badge: 'Telecom AI Lead',
    },
    {
      id: 'tmobile-agent',
      title: 'Multi-Agent Refund Orchestrator',
      client: 'Client: T-Mobile US',
      role: 'AI Agent Lead',
      subtitle: 'Stateful autonomous decision engine for complex refund processing',
      description: 'Architected a stateful multi-agent system using LangGraph and Python to automate complex customer refund request processing based on granular business logic stored in JSON configs.',
      impact: [
        'Designed autonomous agents that interact to verify transaction history, evaluate policy rules, and approve refunds.',
        'Dynamic decision engine driven by configurable JSON business logic.',
        'Engineered resilient, production-ready Python AI microservices.',
      ],
      tags: ['LangGraph', 'Python', 'Stateful Graphs', 'Autonomous Agents', 'Decision Engine', 'REST APIs'],
      badge: 'Multi-Agent System',
    },
    {
      id: 'stylelab',
      title: 'StyleLab',
      client: 'Personal Tool Suite',
      role: 'Creator & Developer',
      subtitle: 'AI-assisted modern CSS generator hosted on Vercel',
      description: 'An all-in-one developer productivity platform featuring 18+ interactive CSS generators (Grid, Flexbox, Gradients, Keyframe Animations, Glassmorphism) with live code export and WCAG accessibility checking.',
      impact: [
        '18+ visual CSS tool modules with instant cross-browser code export.',
        'Built-in contrast ratio analysis and WCAG accessibility checking.',
        'Actively deployed and maintained on Vercel.',
      ],
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Vercel'],
      liveUrl: 'https://styleslab.vercel.app/',
      badge: 'Live in Production',
    },
  ];

  // Secondary enterprise systems
  const earlierProjects = [
    {
      title: 'Adaptive Course Creator (R-CAT)',
      role: 'Full-Stack Developer • Infosys Internal',
      description: 'Dynamic learning platform that personalizes curriculum modules based on user telemetry, cutting user drop-off by 40% and boosting engagement by 60%.',
      tags: ['Angular', 'Node.js', 'Express.js', 'MongoDB'],
    },
    {
      title: 'AI Emulator – Game-Based Learning',
      role: 'Full-Stack Developer • Infosys Internal',
      description: 'Gamified simulation platform utilizing custom AI scoring algorithms and real-time behavioral telemetry, achieving 45% higher retention and a 4.8/5 satisfaction rating.',
      tags: ['AI Scoring', 'Node.js', 'Express.js', 'Angular'],
    },
  ];

  // Clean, concise skill clusters
  const skillClusters = [
    {
      category: 'AI & Multi-Agent Systems',
      icon: Bot,
      skills: ['LangGraph (Multi-Agent Systems)', 'Python', 'LangChain', 'Prompt Engineering', 'RAG', 'Vector Databases', 'MCP (Model Context Protocol)', 'Fine-Tuning Transformers'],
    },
    {
      category: 'Agentic Tooling & Developer Velocity',
      icon: Zap,
      skills: ['Claude Code (Agentic CLI)', 'Kiro AI', 'Cursor AI', 'MCP Server Integrations', 'Automated Code Generation'],
    },
    {
      category: 'Frontend & Backend Engineering',
      icon: Code2,
      skills: ['React', 'Angular', 'TypeScript', 'JavaScript (ES6+)', 'Node.js', 'Express.js', 'RESTful APIs', 'Microservices', 'Tailwind CSS', 'Bootstrap'],
    },
    {
      category: 'Databases & Tools',
      icon: Database,
      skills: ['MongoDB (NoSQL)', 'PostgreSQL', 'Git', 'Jira', 'Postman', 'OpenSearch (Logging)', 'Playwright (Testing)'],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans selection:bg-sky-500/20 selection:text-sky-600 dark:selection:text-sky-300 relative overflow-x-hidden transition-colors duration-300">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-sky-500/10 dark:bg-sky-600/10 rounded-full blur-[140px] transform -translate-y-1/2" />
        <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-cyan-500/10 dark:bg-cyan-600/10 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-35" />
      </div>

      {/* Navigation */}
      <Navbar
        onOpenResume={() => setIsResumeOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* ===================== HERO SECTION ===================== */}
      <section
        id="home"
        className="relative min-h-[85vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden z-10"
      >
        <HeroCanvas theme={theme} />

        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm mb-6 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-medium text-slate-700 dark:text-slate-200">
              Open to Roles • <span className="text-sky-600 dark:text-sky-400 font-semibold">{expInfo.displayYears} Experience</span>
            </span>
          </div>

          {/* Main Title & Role */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">
            {PERSONAL_INFO.name}
          </h1>

          <p className="text-lg sm:text-xl font-bold text-sky-600 dark:text-sky-400 mb-4">
            Full-Stack AI Engineer <span className="text-slate-400 dark:text-slate-500 font-normal">|</span> Associate Consultant @ Infosys
          </p>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl leading-relaxed">
            Architecting production <span className="text-slate-900 dark:text-white font-semibold">AI Multi-Agent Systems</span> with{' '}
            <span className="text-sky-600 dark:text-sky-400 font-semibold">LangGraph & Python</span> for Fortune 500 telecom leaders (
            <strong className="text-slate-800 dark:text-slate-200">Charter Communications</strong>,{' '}
            <strong className="text-slate-800 dark:text-slate-200">T-Mobile US</strong>), powered by modern agentic tooling (
            <span className="text-cyan-600 dark:text-cyan-300 font-medium">Claude Code</span>, <span className="text-cyan-600 dark:text-cyan-300 font-medium">Kiro</span>) and full-stack engineering.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <a
              href="#work"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-sky-600 to-cyan-500 hover:from-sky-500 hover:to-cyan-400 shadow-md shadow-sky-600/25 transition-all hover:scale-105 active:scale-95"
            >
              <Bot className="w-4 h-4" />
              <span>Featured Work</span>
            </a>

            <button
              onClick={() => setIsResumeOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:scale-105 active:scale-95"
            >
              <FileText className="w-4 h-4 text-sky-500 dark:text-sky-400" />
              <span>Full Resume</span>
            </button>

            <button
              onClick={() => copyToClipboard(PERSONAL_INFO.email, 'email')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white/80 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 transition-all"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                  <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-400" />
                  <span>Copy Email</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Info Strip */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {PERSONAL_INFO.location}
            </span>
            <span>•</span>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sky-600 dark:text-sky-400 hover:underline font-medium"
            >
              <Linkedin className="w-3.5 h-3.5" />
              LinkedIn Profile
            </a>
            <span>•</span>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              {PERSONAL_INFO.email}
            </a>
          </div>
        </div>
      </section>

      {/* ===================== FEATURED WORK & CLIENT SYSTEMS ===================== */}
      <section id="work" className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-800/80">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                Portfolio Highlights
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
                Featured Work & Systems
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 sm:mt-0">
              Selected production AI agents and live developer utilities
            </p>
          </div>

          {/* 3 Flagship Cards */}
          <div className="space-y-6">
            {flagshipProjects.map((project) => (
              <div
                key={project.id}
                className="glass-panel p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-sky-500/40 transition-all duration-300 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-sky-50 dark:bg-sky-500/15 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-500/30">
                      {project.client}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {project.role}
                    </span>
                  </div>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline"
                    >
                      <span>Visit Live Website</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 mb-3">
                  {project.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Impact Bullets */}
                <ul className="space-y-1.5 mb-5 text-xs text-slate-600 dark:text-slate-300">
                  {project.impact.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
                        tag === 'React' || tag === 'LangGraph' || tag === 'Python'
                          ? 'bg-sky-50 dark:bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-500/30 font-semibold'
                          : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700/60'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Expandable Earlier Work */}
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowEarlierWork(!showEarlierWork)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-all"
            >
              <span>{showEarlierWork ? 'Hide earlier enterprise systems' : 'View earlier enterprise systems (R-CAT & AI Emulator)'}</span>
              {showEarlierWork ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showEarlierWork && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-left animate-in fade-in duration-300">
                {earlierProjects.map((ep, idx) => (
                  <div
                    key={idx}
                    className="glass-panel p-5 rounded-xl border border-slate-200 dark:border-slate-800"
                  >
                    <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block mb-1">
                      {ep.role}
                    </span>
                    <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1.5">
                      {ep.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
                      {ep.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {ep.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===================== SKILLS & TECH STACK ===================== */}
      <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8 relative z-10 bg-slate-100/50 dark:bg-slate-950/50">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8 pb-4 border-b border-slate-200 dark:border-slate-800/80">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Technical Stack
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
              Core Skills & Tools
            </h2>
          </div>

          {/* 4 Clean Skill Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {skillClusters.map((cluster) => {
              const IconComp = cluster.icon;
              return (
                <div
                  key={cluster.category}
                  className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800"
                >
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-600 dark:text-sky-400">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                      {cluster.category}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {cluster.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 shadow-2xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== CERTIFICATIONS & CREDLY BADGE ===================== */}
      <section id="awards" className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8 pb-4 border-b border-slate-200 dark:border-slate-800/80">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Verified Credentials
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
              Certifications & Google Cloud Badge
            </h2>
          </div>

          {/* Spotlight Google Cloud Skill Badge */}
          <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-sky-300 dark:border-sky-500/40 bg-gradient-to-r from-sky-50 via-white to-white dark:from-sky-500/10 dark:via-slate-900 dark:to-slate-900 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-500/20 border border-sky-200 dark:border-sky-500/40 flex items-center justify-center text-sky-600 dark:text-sky-400 flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 block">
                  Google Cloud Skill Badge • Credly Verified
                </span>
                <h4 className="font-bold text-slate-900 dark:text-white text-base">
                  Developing, Operating, and Securing Production-Grade Agents
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                  Production agent lifecycles, environment management, and security standards.
                </p>
              </div>
            </div>

            <a
              href="https://www.credly.com/badges/5a6d944f-7d43-4768-b2e3-768af6bcd3a9/linked_in?t=tm35ls"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 shadow-xs whitespace-nowrap self-start sm:self-center transition-colors"
            >
              <span>Verify on Credly</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Compact Certifications Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
            {CERTIFICATIONS.filter((c) => c.type !== 'badge').map((cert, idx) => (
              <div
                key={idx}
                className="glass-panel p-4 rounded-xl border border-slate-200 dark:border-slate-800"
              >
                <span className="text-[10px] font-mono font-semibold text-slate-400 dark:text-slate-500 block mb-1">
                  {cert.issuer}
                </span>
                <h5 className="font-bold text-slate-900 dark:text-white text-xs mb-1">
                  {cert.title}
                </h5>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                  {cert.description}
                </p>
              </div>
            ))}
          </div>

          {/* Education Strip */}
          <div className="mt-6 p-4 rounded-xl glass-panel border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between sm:items-center gap-2 text-xs">
            <div>
              <span className="font-bold text-slate-900 dark:text-white">{EDUCATION.degree}</span>
              <span className="text-slate-500 dark:text-slate-400"> — {EDUCATION.institution}</span>
            </div>
            <span className="text-sky-600 dark:text-sky-400 font-semibold">{EDUCATION.grade} • {EDUCATION.completionDate}</span>
          </div>
        </div>
      </section>

      {/* ===================== CONTACT SECTION ===================== */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 relative z-10 bg-slate-100/60 dark:bg-slate-950/60">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Get In Touch
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
              Let's Connect
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Available for full-time senior AI engineering roles and collaborations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Direct Contact Links */}
            <div className="space-y-3">
              <div className="glass-panel p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-400 block">Email</span>
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="text-xs font-semibold hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(PERSONAL_INFO.email, 'email')}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  title="Copy"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="glass-panel p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-400 block">Phone</span>
                    <a href={`tel:${PERSONAL_INFO.phone}`} className="text-xs font-semibold hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                      {PERSONAL_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(PERSONAL_INFO.phone, 'phone')}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  title="Copy"
                >
                  {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="glass-panel p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Linkedin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-400 block">LinkedIn</span>
                    <a
                      href={PERSONAL_INFO.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
                    >
                      <span>Connect on LinkedIn</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Message Form */}
            <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-3">Send a Direct Message</h4>

              {formSent ? (
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-500/30 text-center text-xs text-emerald-700 dark:text-emerald-300">
                  Opening your email client with your message...
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-3">
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Your Name"
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs focus:outline-none focus:border-sky-500 text-slate-900 dark:text-white"
                  />
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="Your Email"
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs focus:outline-none focus:border-sky-500 text-slate-900 dark:text-white"
                  />
                  <textarea
                    required
                    rows={3}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Your message or role requirements..."
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs focus:outline-none focus:border-sky-500 resize-none text-slate-900 dark:text-white"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-sky-600 to-cyan-500 hover:from-sky-500 hover:to-cyan-400 shadow-sm transition-all"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer className="relative z-10 border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 transition-colors">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            <p className="font-extrabold text-slate-900 dark:text-white">{PERSONAL_INFO.name}</p>
            <p className="text-slate-500 dark:text-slate-400">{PERSONAL_INFO.role} ({expInfo.displayYears})</p>
          </div>

          <div className="flex items-center gap-5 text-slate-600 dark:text-slate-400">
            <a href="#work" className="hover:text-sky-600 dark:hover:text-white transition-colors">Work</a>
            <a href="#skills" className="hover:text-sky-600 dark:hover:text-white transition-colors">Skills</a>
            <a href="#awards" className="hover:text-sky-600 dark:hover:text-white transition-colors">Certifications</a>
            <a href="#contact" className="hover:text-sky-600 dark:hover:text-white transition-colors">Contact</a>
          </div>

          <div className="text-slate-400 dark:text-slate-500">
            &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}
          </div>
        </div>
      </footer>

      {/* Back to Top Floating Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-2.5 rounded-full bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 hover:text-white hover:bg-sky-600 dark:hover:bg-sky-600 border border-slate-200 dark:border-slate-800 shadow-lg transition-all"
          aria-label="Back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Resume Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </div>
  );
}

export default App;
