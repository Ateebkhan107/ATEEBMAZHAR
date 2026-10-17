export const personalInfo = {
  name: "Ateeb Mazhar",
  title: "Software Engineer • Full-Stack Developer • AI Builder",
  headline: "I build intelligent products, scalable applications, and digital experiences that solve real problems.",
  aboutBrief: "Computer Science and Engineering student at Techno India University, Kolkata, graduating in 2027. Co-founder of Prepzii. I specialize in full-stack architecture, RAG and AI integrations, mobile apps, and turning complex systems into intuitive digital experiences.",
  university: "Techno India University, Kolkata",
  degree: "B.Tech in Computer Science and Engineering",
  graduationYear: "2027",
  location: "Kolkata, India",
  email: "ateebmazhar07@gmail.com",
  github: "https://github.com/ateebmazhar",
  linkedin: "https://linkedin.com/in/ateebmazhar",
  status: "Available for ambitious products & engineering roles",
};

export const navLinks = [
  { id: "about", title: "About", code: "01" },
  { id: "projects", title: "Projects", code: "02" },
  { id: "experience", title: "Experience", code: "03" },
  { id: "tech", title: "Tech Stack", code: "04" },
  { id: "contact", title: "Contact", code: "05" },
];

export const technologiesData = [
  {
    category: "Frontend",
    items: [
      {
        name: "React",
        level: "Advanced",
        iconType: "react",
        description: "Component architecture, hooks, state machines, and real-time UI rendering.",
        projectsUsed: ["Prepzii", "SkaleKraft", "Portfolio"],
      },
      {
        name: "Next.js",
        level: "Advanced",
        iconType: "nextjs",
        description: "App Router, SSR, Server Components, API routes, and high-performance SEO.",
        projectsUsed: ["Prepzii", "SkaleKraft", "CaseFlow"],
      },
      {
        name: "TypeScript",
        level: "Proficient",
        iconType: "typescript",
        description: "Type safety, robust domain modeling, generics, and DX acceleration.",
        projectsUsed: ["Prepzii", "CaseFlow"],
      },
      {
        name: "Tailwind CSS",
        level: "Advanced",
        iconType: "tailwind",
        description: "Modern responsive utility systems, design tokens, micro-interactions, and dark mode.",
        projectsUsed: ["Prepzii", "SkaleKraft", "IMCPL", "Portfolio"],
      },
    ],
  },
  {
    category: "Backend & Database",
    items: [
      {
        name: "Node.js",
        level: "Proficient",
        iconType: "nodejs",
        description: "RESTful APIs, middleware pipelines, streaming endpoints, and backend services.",
        projectsUsed: ["Prepzii", "CaseFlow"],
      },
      {
        name: "Supabase",
        level: "Advanced",
        iconType: "supabase",
        description: "Postgres schema design, Row Level Security (RLS), real-time subscriptions, and Edge Functions.",
        projectsUsed: ["Prepzii"],
      },
      {
        name: "PostgreSQL",
        level: "Proficient",
        iconType: "postgres",
        description: "Relational modeling, indexing, foreign keys, complex queries, and data integrity.",
        projectsUsed: ["Prepzii", "CaseFlow"],
      },
    ],
  },
  {
    category: "AI & Development",
    items: [
      {
        name: "Python",
        level: "Proficient",
        iconType: "python",
        description: "Data processing, script automation, API wrappers, and ML/AI pipelines.",
        projectsUsed: ["CaseFlow", "AI Revision Assistant"],
      },
      {
        name: "LLM Integrations",
        level: "Proficient",
        iconType: "ai",
        description: "Prompt engineering, structured JSON outputs, streaming AI answers, and context management.",
        projectsUsed: ["Prepzii (Zi)", "CaseFlow"],
      },
      {
        name: "RAG Architecture",
        level: "Proficient",
        iconType: "rag",
        description: "Document chunking, vector embedding generation, semantic similarity retrieval, and grounded synthesis.",
        projectsUsed: ["CaseFlow"],
      },
    ],
  },
  {
    category: "Mobile",
    items: [
      {
        name: "Flutter",
        level: "Proficient",
        iconType: "flutter",
        description: "Cross-platform mobile UI, animations, local storage integration, and native platform channels.",
        projectsUsed: ["Flamzi"],
      },
      {
        name: "Dart",
        level: "Proficient",
        iconType: "dart",
        description: "Object-oriented mobile application programming, asynchronous event loops, and state structures.",
        projectsUsed: ["Flamzi"],
      },
    ],
  },
  {
    category: "Tools & DevOps",
    items: [
      {
        name: "Git",
        level: "Advanced",
        iconType: "git",
        description: "Distributed version control, branching strategies, rebase workflows, and conflict resolution.",
        projectsUsed: ["All Projects"],
      },
      {
        name: "GitHub",
        level: "Advanced",
        iconType: "github",
        description: "Code review, GitHub Actions CI/CD workflows, releases, and issue management.",
        projectsUsed: ["All Projects"],
      },
      {
        name: "Vercel",
        level: "Advanced",
        iconType: "vercel",
        description: "Production deployments, serverless functions, edge routing, custom domains, and analytics.",
        projectsUsed: ["Prepzii", "SkaleKraft", "Portfolio"],
      },
    ],
  },
];

export const projects = [
  {
    id: "prepzii",
    screenshot: true,
    name: "Prepzii",
    badge: "FLAGSHIP SaaS",
    category: "EdTech / SaaS / AI",
    role: "Co-Founder & Full-Stack Developer",
    shortDescription:
      "AI-powered exam preparation ecosystem for JEE and NEET aspirants with realistic mock testing, performance analytics, cut-off forecasting, and AI tutor Zi.",
    description:
      "Prepzii is an AI-powered learning platform engineered for JEE and NEET aspirants. It combines exam practice, previous-year questions, performance analytics, leaderboards, college prediction, and an intelligent AI study assistant called Zi.",
    features: [
      "AI-powered tutoring through Zi with step-by-step doubt resolution",
      "Context-aware doubt answering tailored to high-school science curricula",
      "JEE Main & Advanced and NEET mock tests with authentic timer and question palette",
      "Student performance analytics with subject-level weak-area diagnostics",
      "Score and rank forecasting based on real historical percentiles",
      "College prediction using official admission cutoff data",
      "Student dashboards, study streaks, and progress tracking",
      "Authentication and multi-step user onboarding with Clerk",
      "Coaching institution platform development & batch management",
    ],
    technologies: ["Next.js", "React", "Tailwind CSS", "Supabase", "Clerk", "AI APIs"],
    challenges: [
      "Simulating high-stakes exam timing and synchronized question state without data loss on browser refresh.",
      "Structuring context-grounded AI doubt assistance to prevent generic answers on complex physics and math problems.",
      "Designing a low-latency dashboard that handles student mock exam logs and calculates real-time leaderboards efficiently.",
    ],
    solution:
      "Architected the application using Next.js with Supabase for real-time relational state, Clerk for secure student authentication, and integrated LLM APIs with custom physics/chemistry system prompts to power 'Zi'.",
    github: "https://github.com/ateebmazhar",
    live: "https://prepzii.com",
    metrics: [
      { label: "Role", value: "Co-Founder & Full-Stack" },
      { label: "Target Exams", value: "JEE & NEET" },
      { label: "AI Assistant", value: "Zi Study Engine" },
      { label: "Database", value: "Supabase Postgres" },
    ],
  },
  {
    id: "caseflow",
    name: "CaseFlow",
    badge: "AI / RAG INTELLIGENCE",
    category: "LegalTech / AI / RAG",
    role: "AI & Full-Stack Developer",
    shortDescription:
      "AI-powered legal document intelligence platform featuring Retrieval-Augmented Generation (RAG) for context-grounded legal analysis and search.",
    description:
      "CaseFlow is an AI-powered legal document intelligence project featuring Retrieval-Augmented Generation (RAG). The system uses document retrieval and AI to help users interact with legal information through context-grounded responses.",
    features: [
      "Retrieval-Augmented Generation (RAG) architecture for hallucination-resistant answers",
      "Document processing and text extraction pipeline for complex legal papers",
      "Semantic search enabling natural language query matching over legal clauses",
      "Context-aware AI responses grounded strictly in uploaded legal context",
      "LLM integration with source citation pinpoints",
      "Document-based question answering with clause comparison",
    ],
    technologies: ["Next.js", "Python", "RAG Pipeline", "Vector Embeddings", "LLM APIs", "Tailwind CSS"],
    challenges: [
      "Legal texts contain dense, multi-page clauses where traditional keyword search misses conceptual matches.",
      "Preventing LLMs from hallucinating legal precedents by enforcing strict citation anchoring in context.",
    ],
    solution:
      "Implemented a chunking and vector retrieval pipeline that identifies the exact statutory provisions and contract terms before passing top-k context to the LLM with rigorous source citation instructions.",
    github: "https://github.com/ateebmazhar",
    live: null,
    metrics: [
      { label: "Architecture", value: "RAG Pipeline" },
      { label: "Domain", value: "Legal Intelligence" },
      { label: "Search Type", value: "Semantic & Vector" },
      { label: "Citation Style", value: "Clause-Grounded" },
    ],
  },
  {
    id: "skalekraft",
    screenshot: true,
    name: "SkaleKraft",
    badge: "LIVE PRODUCTION BRAND",
    category: "Digital Agency / Web Development / Brand Experience",
    role: "Founder & Lead Developer",
    shortDescription:
      "Premium digital agency brand delivering high-performance responsive web applications, animated interactive experiences, and AI solutions for modern businesses.",
    description:
      "SkaleKraft is a digital solutions brand focused on helping businesses build a stronger digital presence through websites, applications, AI integrations, creative design, and digital experiences.",
    features: [
      "Premium responsive website development with fast loading speeds",
      "Animated digital experience with fluid transitions and modern typography",
      "Interactive service presentation with modern cyber-minimal aesthetics",
      "Inbound contact and qualified lead generation workflow",
      "SEO-friendly server-rendered architecture",
      "Modern brand identity and digital design language",
      "Production deployment with high performance standards",
    ],
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "Vercel"],
    challenges: [
      "Creating an agency website that conveys tech-forward innovation while maintaining rapid mobile performance and zero layout shift.",
      "Crafting smooth interactive animations without impacting core Web Vitals.",
    ],
    solution:
      "Built with Next.js and Tailwind CSS utilizing optimized Framer Motion micro-interactions, responsive grid layouts, and Vercel edge deployment for sub-second global page loads.",
    github: "https://github.com/ateebmazhar",
    live: "https://skalekraft.in",
    metrics: [
      { label: "Brand", value: "SkaleKraft.in" },
      { label: "Role", value: "Founder / Dev" },
      { label: "Deployment", value: "Vercel Global Edge" },
      { label: "Status", value: "Live Production" },
    ],
  },
  {
    id: "flamzi",
    name: "Flamzi",
    badge: "MOBILE APP",
    category: "Mobile Development / Productivity",
    role: "Flutter Developer",
    shortDescription:
      "Gamified mobile productivity application combining focus sessions, streak tracking, XP milestones, and study mascot Zi.",
    description:
      "Flamzi is a Flutter-based productivity application combining focus sessions, task management, streak tracking, reminders, and gamification to help students and professionals build consistent deep-work habits.",
    features: [
      "Customizable focus timer (Pomodoro and deep-work modes)",
      "Structured task management with prioritization levels",
      "Gamified XP progression system and consecutive-day streaks",
      "Local notifications to nudge focus intervals without cloud lag",
      "Engaging user onboarding and habit-tracking dashboard",
      "Productivity statistics and historical focus session summaries",
    ],
    technologies: ["Flutter", "Dart", "Local Notifications", "SharedPreferences"],
    challenges: [
      "Maintaining accurate timer countdowns across mobile lifecycle states (background, screen lock, resume).",
      "Designing a playful yet uncluttered gamification system that motivates without distracting from deep work.",
    ],
    solution:
      "Engineered state management with background lifecycle listeners, integrated SharedPreferences for zero-latency offline persistence, and implemented an XP leveling curve.",
    github: "https://github.com/ateebmazhar",
    live: null,
    metrics: [
      { label: "Platform", value: "Flutter Mobile" },
      { label: "Core Feature", value: "Focus Engine" },
      { label: "Gamification", value: "XP & Streaks" },
      { label: "Storage", value: "Local Persistence" },
    ],
  },
];

export const experiences = [
  {
    title: "Co-Founder & Full-Stack Developer",
    company_name: "Prepzii",
    type: "EdTech Startup",
    date: "2024 — Present",
    location: "Kolkata, India",
    points: [
      "Co-founded and engineered the full-stack architecture for Prepzii, an AI-powered EdTech platform serving JEE and NEET aspirants.",
      "Built comprehensive mock exam engine, timed test simulator, dynamic question palette, and instant score evaluation pipeline.",
      "Designed student dashboard, leaderboard algorithms, historical percentile forecasting, and college prediction modules.",
      "Integrated Clerk for authentication and Supabase PostgreSQL with Row Level Security for robust multi-tenant data storage.",
      "Built 'Zi', an intelligent AI study tutor offering step-by-step doubt resolution and context-grounded hints.",
    ],
    tags: ["Next.js", "React", "Supabase", "Clerk", "Tailwind CSS", "AI APIs"],
  },
  {
    title: "Founder & Lead Developer",
    company_name: "SkaleKraft",
    type: "Digital Agency",
    date: "2024 — Present",
    location: "https://skalekraft.in",
    points: [
      "Founded digital agency brand delivering modern web applications, digital products, and brand experiences.",
      "Engineered fast, responsive, and SEO-optimized production websites using Next.js and Framer Motion.",
      "Implemented client consultation, technical scoping, UX wireframing, and deployment pipelines.",
    ],
    tags: ["Next.js", "Framer Motion", "Tailwind CSS", "SEO", "Vercel"],
  },
  {
    title: "Solo Developer",
    company_name: "IMCPL Cricket Auction App",
    type: "Web Application",
    date: "2024",
    location: "Kolkata, India",
    points: [
      "Engineered an IPL-style real-time cricket auction web application for local neighborhood tournaments.",
      "Programmed purse calculation engine with automated validation guards for player bids and remaining budget caps.",
      "Designed Starting XI visualizer and team squad rosters with persistent local storage state.",
    ],
    tags: ["React", "JavaScript", "Tailwind CSS", "UI/UX"],
  },
  {
    title: "Flutter Mobile Developer",
    company_name: "Flamzi",
    type: "Mobile Application",
    date: "2023 — 2024",
    location: "Independent Project",
    points: [
      "Developed cross-platform mobile productivity application using Flutter and Dart.",
      "Implemented Pomodoro focus session timer with background lifecycle state synchronization.",
      "Created XP progression curve, streak tracking system, and mascot 'Zi' visual states.",
      "Utilized SharedPreferences for zero-latency offline persistence and local push notifications.",
    ],
    tags: ["Flutter", "Dart", "Mobile UI", "SharedPreferences"],
  },
  {
    title: "Computer Science & Engineering Student",
    company_name: "Techno India University, Kolkata",
    type: "Undergraduate Degree",
    date: "2023 — 2027",
    location: "Kolkata, India",
    points: [
      "Pursuing B.Tech in Computer Science and Engineering with focused coursework in Data Structures, Algorithms, AI, and Software Engineering.",
      "Active builder, hackathon participant, and software developer building production digital applications alongside academic studies.",
    ],
    tags: ["Data Structures", "Algorithms", "AI", "Software Engineering"],
  },
];
