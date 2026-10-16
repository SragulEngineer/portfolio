import React from 'react';
import { X, Printer, Mail, Phone, MapPin, Linkedin, Globe, Cpu, CheckCircle2, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCES, PROJECTS, CERTIFICATIONS, EDUCATION, getExperienceDetails } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const expInfo = getExperienceDetails();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto">
        {/* Modal Toolbar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-100 dark:bg-slate-800/90 border-b border-slate-200 dark:border-slate-700/80 sticky top-0 z-20 print:hidden">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-3 font-semibold text-slate-800 dark:text-slate-200 text-sm">
              Resume Preview — {PERSONAL_INFO.name} ({PERSONAL_INFO.role})
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors border border-slate-300 dark:border-slate-600 shadow-sm"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />
              <span>Print / PDF</span>
            </button>
            <a
              href={`mailto:${PERSONAL_INFO.email}?subject=Opportunity%20-%20Full%20Stack%20AI%20Engineer`}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-sky-600 hover:bg-sky-500 rounded-lg transition-colors shadow-sm"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact Candidate</span>
            </a>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close resume preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Content */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-6 text-slate-800 dark:text-slate-200 print:text-black print:bg-white print:p-0">
          {/* Header */}
          <div className="border-b border-slate-200 dark:border-slate-700/80 pb-5 print:border-black">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight print:text-black">
                  {PERSONAL_INFO.name}
                </h1>
                <p className="text-sky-400 font-bold text-base mt-1 print:text-blue-700">
                  {PERSONAL_INFO.role} ({expInfo.displayYears} Experience)
                </p>
                <p className="text-xs text-slate-400 print:text-gray-700 mt-0.5">
                  {PERSONAL_INFO.location}
                </p>
              </div>

              <div className="flex flex-col sm:items-end text-xs text-slate-300 print:text-black space-y-1">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sky-400 hover:underline print:text-blue-700"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn Profile</span>
                </a>
                <a
                  href={PERSONAL_INFO.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sky-400 hover:underline print:text-blue-700"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Portfolio Website</span>
                </a>
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-sky-400 print:text-black" />
                  {PERSONAL_INFO.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-sky-400 print:text-black" />
                  {PERSONAL_INFO.phoneDisplay}
                </span>
              </div>
            </div>

            {/* Summary */}
            <div className="mt-4 pt-4 border-t border-slate-800 print:border-gray-300">
              <h2 className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-1.5 print:text-blue-700">
                Summary
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 print:text-black leading-relaxed">
                Dynamic Full-Stack AI Engineer with {expInfo.textSummary} of experience, currently serving as an Associate Consultant at Infosys. Expertise in building scalable enterprise applications using the MEAN stack and React, and architecting complex AI multi-agent systems using LangGraph and Python. Skilled with next-generation agentic developer tooling including Claude Code, Kiro, Cursor, and MCP. Proven track record in automating business logic and enhancing user engagement through AI-driven solutions.
              </p>
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-2.5 print:text-blue-700">
              Technical Skills
            </h2>
            <div className="space-y-1.5 text-xs text-slate-300 print:text-black">
              <p>
                <strong className="text-white print:text-black">• AI & LLM Orchestration: </strong>
                LangGraph (Multi-Agent Systems), Prompt Engineering, LangChain, RAG, Vector Databases, Generative AI & Fine-Tuning, MCP (Model Context Protocol), Machine Learning
              </p>
              <p>
                <strong className="text-white print:text-black">• AI Developer Tooling & CLI: </strong>
                Claude Code (Agentic CLI), Kiro, Cursor, Copilot, MCP Server Integrations
              </p>
              <p>
                <strong className="text-white print:text-black">• Backend: </strong>
                Python, Node.js, Express.js, RESTful APIs, Microservices
              </p>
              <p>
                <strong className="text-white print:text-black">• Frontend: </strong>
                React, Angular, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, Bootstrap
              </p>
              <p>
                <strong className="text-white print:text-black">• Databases: </strong>
                MongoDB (NoSQL), PostgreSQL
              </p>
              <p>
                <strong className="text-white print:text-black">• Tools & Testing: </strong>
                Git, Jira, Postman, OpenSearch (Logging), Playwright (Testing)
              </p>
            </div>
          </div>

          {/* Professional Experience */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-3 print:text-blue-700">
              Professional Experience
            </h2>
            {EXPERIENCES.map((exp) => (
              <div key={exp.id} className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white print:text-black">
                      {exp.company} | <span className="text-sky-400 print:text-blue-700">{exp.role}</span>
                    </h3>
                  </div>
                  <span className="text-xs font-semibold text-slate-400 print:text-black">
                    {exp.period}
                  </span>
                </div>

                <div className="space-y-4 pl-3 border-l-2 border-slate-700 print:border-gray-400">
                  {exp.projects.map((proj, pIdx) => (
                    <div key={pIdx} className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs sm:text-sm font-bold text-white print:text-black">
                          • {proj.name} ({proj.roleInProject}) — <span className="text-sky-400 print:text-blue-700">{proj.clientOrType}</span>
                        </span>
                      </div>
                      <ul className="list-disc list-inside text-xs text-slate-300 print:text-black space-y-1 ml-2">
                        {proj.impact.map((imp, iIdx) => (
                          <li key={iIdx} className="leading-relaxed">{imp}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Personal Projects */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-2 print:text-blue-700">
              Personal Projects
            </h2>
            <div className="space-y-1 text-xs text-slate-300 print:text-black">
              <p>
                <strong className="text-white print:text-black">• StyleLab: </strong>
                CSS generation utility hosted on Vercel to assist developers with visual styling.{' '}
                <a
                  href="https://styleslab.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 hover:underline print:text-blue-700"
                >
                  (styleslab.vercel.app)
                </a>
              </p>
            </div>
          </div>

          {/* Certifications & Skill Badges */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-2 print:text-blue-700">
              Certifications & Verified Badges
            </h2>
            <ul className="list-disc list-inside text-xs text-slate-300 print:text-black space-y-1.5">
              {CERTIFICATIONS.map((cert, cIdx) => (
                <li key={cIdx} className="leading-relaxed">
                  <strong>{cert.title}</strong> — {cert.issuer}
                  {cert.verificationUrl && (
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 text-sky-400 hover:underline print:text-blue-700 inline-flex items-center gap-0.5"
                    >
                      [Credly Badge ↗]
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Education */}
          <div className="border-t border-slate-700/80 pt-4 print:border-black">
            <h2 className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-1.5 print:text-blue-700">
              Education
            </h2>
            <div className="flex flex-col sm:flex-row justify-between text-xs">
              <div>
                <p className="font-bold text-white print:text-black">
                  {EDUCATION.degree} | {EDUCATION.grade} | {EDUCATION.completionDate}
                </p>
                <p className="text-slate-300 print:text-black">
                  {EDUCATION.institution}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
