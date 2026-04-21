// Content data for GDPA site with URL slugs

export const CERTIFICATIONS = [
  {
    id: 1,
    slug: "aigp-exam",
    title: "AIGP Exam",
    level: "Professional",
    duration: "3 months",
    description: "The AI Governance Professional (AIGP) exam validates your ability to develop, implement, and manage responsible AI governance programs.",
    locked: true,
    offerId: "OFYJWRMTUY5S",
    resourceId: "R9KI7UN",
  },
  {
    id: 2,
    slug: "cipm-exam",
    title: "CIPM Exam",
    level: "Management",
    duration: "2 months",
    description: "The Certified Information Privacy Manager (CIPM) exam demonstrates your ability to establish, maintain, and manage a privacy program.",
    locked: true
  },
  {
    id: 3,
    slug: "cipp-a-exam",
    title: "CIPP/A Exam",
    level: "Professional",
    duration: "3 months",
    description: "The CIPP/A exam certifies your knowledge of privacy laws and practices across the Asia-Pacific region.",
    locked: false
  },
  {
    id: 4,
    slug: "cipp-c-exam",
    title: "CIPP/C Exam",
    level: "Professional",
    duration: "3 months",
    description: "The CIPP/C exam certifies your expertise in Canadian privacy legislation including PIPEDA and provincial privacy laws.",
    locked: true
  },
];

export const TRAINING = [
  {
    id: 1,
    slug: "aigp-online-training",
    code: "AIGP-100",
    title: "AI Governance Professional (AIGP) Online Training",
    instructor: "Dr. Marcus Rodriguez",
    date: "Apr 22, 2026",
    seats: 60,
    duration: "120 min",
    locked: true,
    offerId: "OF7TWO03VVWY",
    resourceId: "R4K8M9E",
  },
  {
    id: 2,
    slug: "cipp-c-online-training",
    code: "CIPP-C-100",
    title: "Canadian Privacy (CIPP/C) Online Training",
    instructor: "Jennifer Park, CIPP/C",
    date: "Apr 29, 2026",
    seats: 45,
    duration: "90 min",
    locked: true
  },
  {
    id: 3,
    slug: "cipp-e-online-training",
    code: "CIPP-E-100",
    title: "European Data Protection (CIPP/E) Online Training",
    instructor: "Sarah Chen, CIPP/E",
    date: "May 6, 2026",
    seats: 80,
    duration: "120 min",
    locked: true
  },
  {
    id: 4,
    slug: "foundations-privacy",
    code: "FOUND-100",
    title: "Foundations of Privacy and Data Protection Online Training",
    instructor: "Kevin Thompson, CIPM",
    date: "Apr 15, 2026",
    seats: 200,
    duration: "60 min",
    locked: false
  },
];

export const RESOURCES = [
  {
    id: 1,
    slug: "global-privacy-enforcement-tracker",
    title: "Global Privacy Enforcement Tracker 2026",
    type: "Research Report",
    date: "Mar 2026",
    pages: 142,
    description: "Comprehensive analysis of global privacy enforcement actions, penalties, and regulatory trends across 85 jurisdictions.",
    locked: true
  },
  {
    id: 2,
    slug: "data-transfer-mechanisms",
    title: "Data Transfer Mechanisms: Post-Schrems II Landscape",
    type: "White Paper",
    date: "Feb 2026",
    pages: 28,
    description: "Practical guidance on implementing valid data transfer mechanisms following major CJEU decisions.",
    locked: true
  },
  {
    id: 3,
    slug: "privacy-by-design-checklist",
    title: "Privacy by Design: Implementation Checklist",
    type: "Tool",
    date: "Mar 2026",
    pages: 8,
    description: "Free checklist for integrating privacy considerations into product development and business processes.",
    locked: false
  },
  {
    id: 4,
    slug: "ai-privacy-impact-assessment",
    title: "AI Privacy Impact Assessment Template",
    type: "Template",
    date: "Jan 2026",
    pages: 15,
    description: "Customizable DPIA template specifically designed for AI/ML systems and algorithmic decision-making.",
    locked: true
  },
];

export const NEWS = [
  {
    id: 1,
    slug: "eu-ai-act-approved",
    title: "EU Council Approves AI Act: Privacy Professionals Respond",
    date: "Apr 4, 2026",
    category: "Regulation",
    excerpt: "The European Council's final approval of the AI Act marks a watershed moment for algorithmic governance. Privacy professionals weigh in on compliance implications.",
    locked: false
  },
  {
    id: 2,
    slug: "annual-conference-2026",
    title: "GDPA Annual Conference 2026 Registration Now Open",
    date: "Apr 2, 2026",
    category: "Events",
    excerpt: "Join 5,000+ privacy professionals in Barcelona this September for the world's largest privacy conference featuring 200+ sessions and workshops.",
    locked: false
  },
  {
    id: 3,
    slug: "cppa-first-enforcement",
    title: "California Privacy Protection Agency Issues First Enforcement Action",
    date: "Mar 29, 2026",
    category: "Enforcement",
    excerpt: "CPPA's inaugural enforcement proceeding signals aggressive stance on CPRA violations. Analysis of penalties and compliance takeaways.",
    locked: true
  },
  {
    id: 4,
    slug: "salary-survey-2026",
    title: "New Research: Privacy Professionals Salary Survey Results",
    date: "Mar 26, 2026",
    category: "Industry",
    excerpt: "Comprehensive compensation analysis reveals 18% year-over-year salary growth for privacy professionals amid global talent shortage.",
    locked: true
  },
];

export const COLORS = {
  primary: "#48843B",
  primaryLight: "#71BF4B",
  primaryDark: "#3A6B2F",
  secondary: "#0078B7",
  neutral: "#231F20",
  neutralLight: "#F4F4F4",
  border: "#E5E5E5",
  success: "#227845",
  warning: "#8E242A",
};

export const PIANO_CONFIG = {
  AID: "gtdSyi74su",
  SANDBOX: true,
  CONTRACT_ID: "TM7SCAJ1NJXX",
};
