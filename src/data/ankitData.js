export const GENERATED_IMAGES = {
  heroPortrait: '/src/assets/images/hero charecter pose.png',
  deskCandid: '/src/assets/images/ankit_desk_candid_1794759945666.jpg',
  offClockStreet: '/src/assets/images/ankit_offclock_street_1794759944119.jpg',
  vanguardMockup: '/src/assets/images/vanguard_crm_mockup_1794759945154.png',
};

export const ANKIT_PROFILE = {
  firstName: 'Ankit',
  lastName: 'Kumar',
  fullName: 'Ankit Kumar',
  tagline: 'MERN Stack Developer & Customer Operations Specialist',
  locationShort: 'Darbhanga, Bihar, India',
  addressFull: 'Sahganj, Benta, Laheriasarai, Darbhanga, Bihar - 846003',
  phone: '+91-7544873709',
  phoneDisplay: '+91 75448 73709',
  email: 'ankitk13266@gmail.com',
  originQuote: 'Built in Darbhanga. Ready for everywhere.',
  photos: {
    hero: GENERATED_IMAGES.heroPortrait,
    desk: GENERATED_IMAGES.deskCandid,
    street: GENERATED_IMAGES.offClockStreet,
    originalMain: '/assets/aistudio/image_90ee5ba7.png',
    originalCandid: '/assets/aistudio/image_55a24f05.png',
  },
  socials: {
    linkedin: 'https://www.linkedin.com/in/ankit-io',
    github: 'https://github.com/issue14js',
    instagram: 'https://www.instagram.com/issue.io/',
    certificates: 'https://drive.google.com/drive/folders/1lU9Revo3VLZeRyVfg-HmcxdrRjEi8ke2?usp=sharing',
    resume: 'https://drive.google.com/file/d/1znXXZbbR9bbiHE_Bu_bS61sXHtxdWEMl/view?usp=sharing',
  },
  heroCopy: {
    headline: 'FROM HOSPITAL COUNTERS TO FULL-STACK CODE.',
    subhead:
      'Three years handling Darbhanga’s busiest pharmacy billing desks and Daikin/Hitachi service calls taught me how real people behave under pressure. Now I channel that discipline into fast MERN stack apps, Groq AI tools, and kinetic 2D interfaces.',
    metrics: [
      { value: '3+ Years', label: 'Pharmacy Sales & Data Entry Executive ' },
      { value: '4 Builds', label: 'Full-Stack & AI Projects' },
      { value: '2026', label: 'Sheryians MERN Stack + 2 Hackathon' },
      { value: 'Remote / Onsite', label: 'Ready to Relocate' },
    ],
  },
  turningPoint: {
    title: 'Day shifts on the front desk. Night shifts in the terminal.',
    quote:
      '“When a worried family is waiting at a heart hospital pharmacy counter, slow software isn’t a minor bug — it’s a bottleneck. That’s why I care obsessively about clean state, fast typing flows, and zero-clutter UI.”',
    body1:
      'Most developers learn user empathy from textbooks. I learned it over three years at Ugana Medico inside Darbhanga Heart Hospital — balancing counter medicine sales, daily inventory entries, and billing accuracy while assisting doctors and patients in real time.',
    body2:
      'Today, as Customer Care Officer for A.S Galaxy Service (Daikin & Hitachi authorized partner), I coordinate inbound service escalations and field technician schedules by day — and build React, Node.js, MongoDB, JavaScript, and GSAP motion products by night.',
  },
};

export const CAPABILITIES = [
  {
    id: 'mern',
    number: '01',
    title: 'Full-Stack MERN Engineering',
    shortHook: 'Clean React frontends wired to dependable Node & MongoDB backends.',
    proof:
      'Completed Full Stack + DSA Bootcamp at Sheryians Coding School (June 2026) and shipped full-stack MERN modules during my internship at InCodec Technology.',
    tools: ['React.js', 'JavaScript ES6+', 'Node.js', 'Express.js', 'MongoDB', 'JWT Auth'],
  },
  {
    id: 'tactile-ui',
    number: '02',
    title: 'Tactile UI & 2D Motion Systems',
    shortHook: 'Interfaces that feel crisp, kinetic, and effortless to scan.',
    proof:
      'Designed the custom "Tactile Ivory" design system for Vanguard CRM and engineered scroll-choreographed 2D editorial motion systems with GSAP and Motion.',
    tools: ['Custom Design Systems', 'GSAP', 'ScrollTrigger', 'Motion', 'HTML5', 'CSS3'],
  },
  {
    id: 'ai-apis',
    number: '03',
    title: 'AI Workflows & REST APIs',
    shortHook: 'Turning complex user problems into instant, practical web tools.',
    proof:
      'Engineered an AI Terms & Conditions Summarizer powered by Node.js, Express.js, and Groq API during the Sheryians Cohort Hackathon 2026 with Team Afdhruval.',
    tools: ['Groq API', 'REST APIs', 'Prompt Pipelines', 'Express Middleware'],
  },
  {
    id: 'ops-care',
    number: '04',
    title: 'Customer Care & Service Dispatch',
    shortHook: 'Calm communication, rapid triage, and zero dropped follow-ups.',
    proof:
      'Currently serving as CCO at Galaxy Service (Daikin & Hitachi partner), handling inbound repair/installation calls and scheduling technician visits on tight timelines.',
    tools: ['Inbound Call Handling', 'Complaint Resolution', 'Technician Scheduling', 'CRM Workflows'],
  },
  {
    id: 'data-billing',
    number: '05',
    title: 'Pharmacy Sales & High-Speed Data Ops',
    shortHook: 'Three years of zero-error billing, stock ledgers, and rapid typing.',
    proof:
      'Managed daily inventory data entry, billing software, and counter sales for 3 years at Ugana Medico under Darbhanga Heart Hospital.',
    tools: ['Billing Software', 'Inventory Control', 'MS Excel & Word', 'Fast Typing'],
  },
];

export const PROJECTS = [
  {
    id: 'vanguard-crm',
    indexLabel: '01 / 04',
    title: 'Vanguard CRM',
    subtitle: 'Lead & Customer Management System',
    tagline:
      'Built with a custom "Tactile Ivory" design system — turning messy sales leads into a calm, multi-filterable pipeline.',
    primaryMetaLabel: 'Architecture',
    primaryMetaValue: 'React.js + Context API',
    role: 'UI System & Frontend Engineering',
    year: '2026',
    outcome: 'Auth + Multi-Level Lead Filters',
    stack: ['React.js', 'Context API', 'Tactile Ivory UI', 'Login / Register Flow', 'State Management'],
    story:
      'Sales teams lose hours in bloated dashboards. I designed Vanguard CRM around warm paper contrast, zero visual noise, complete Login/Register authentication, and instant multi-level filtering powered by React Context API.',
    highlights: [
      'Crafted the original "Tactile Ivory" visual language for long-session readability.',
      'Implemented Login & Register flows with protected routes and clean session state.',
      'Built multi-level lead filtering by stage, source, and status without prop-drilling.',
    ],
    imageUrl: GENERATED_IMAGES.vanguardMockup,
    visualType: 'vanguard',
  },
  {
    id: 'ai-tc-summarizer',
    indexLabel: '02 / 04',
    title: 'AI Terms & Conditions Summarizer',
    subtitle: 'Sheryians Cohort Hackathon 2026 · Team Afdhruval',
    tagline:
      'Nobody reads 15-page legal agreements before clicking "Accept." This Groq-powered tool distills dense T&Cs into plain truth in seconds.',
    primaryMetaLabel: 'Event',
    primaryMetaValue: 'Sheryians Cohort Hackathon 2026',
    role: 'Backend & Groq API Integration',
    year: '2026',
    outcome: 'Shipped Under Hackathon Deadline',
    stack: ['Node.js', 'Express.js', 'Groq API', 'REST API', 'JavaScript ES6+'],
    story:
      'Built with Team Afdhruval during Sheryians Cohort Hackathon 2026. I wired the Node.js and Express backend to Groq’s high-speed inference API so long legal clauses become structured takeaways before a user ever clicks agree.',
    highlights: [
      'Built low-latency Express endpoints interfacing directly with Groq LLM API.',
      'Extracted hidden obligations, renewal clauses, and privacy caveats into bullet summaries.',
      'Collaborated tightly with Team Afdhruval from architecture to live demo.',
    ],
    visualType: 'summarizer',
  },
  {
    id: 'kinetic-motion-lab',
    indexLabel: '03 / 04',
    title: 'Kinetic 2D & GSAP Lab',
    subtitle: 'Full-Stack Builds & Editorial Motion',
    tagline:
      'Experimental full-stack web apps combining modular JavaScript architecture, GSAP timeline choreography, kinetic 2D SVG/UI systems, and AWS.',
    primaryMetaLabel: 'Experience',
    primaryMetaValue: 'Personal & InCodec Builds',
    role: 'Creative & Full-Stack Developer',
    year: '2026',
    outcome: 'MERN + 2D Motion Mastery',
    stack: ['MERN Stack', 'JavaScript ES6+', 'GSAP', 'ScrollTrigger', 'AWS'],
    story:
      'Static CRUD screens weren’t enough. Across personal portfolio experiments and my internship at InCodec Technology, I paired clean Node/Express backends with fluid 2D GSAP scroll timelines, masked typography, and tactile UI feedback.',
    highlights: [
      'Built scroll-synchronized GSAP animation systems, masked line reveals, and magnetic controls.',
      'Shipped REST API and JWT-authenticated MERN modules at InCodec Technology.',
      'Structured production deployments and asset pipelines with AWS.',
    ],
    visualType: 'kinetic2d',
  },
  {
    id: 'operations-desk',
    indexLabel: '04 / 04',
    title: 'Operations & Care Command',
    subtitle: 'Galaxy Service (Daikin & Hitachi) · Ugana Medico',
    tagline:
      'Three years of real-world service dispatch, hospital pharmacy billing, and customer conflict resolution in Darbhanga.',
    primaryMetaLabel: 'Track Record',
    primaryMetaValue: '2023 — Present (3+ Years)',
    role: 'CCO & Data Entry Executive',
    year: '2023–26',
    outcome: 'High-Accuracy Daily Operations',
    stack: ['Inbound Support', 'Technician Scheduling', 'Medicine Billing', 'Inventory', 'MS Excel'],
    story:
      'Before writing production React code, I spent 3+ years keeping high-stakes physical operations moving — managing hospital medicine inventory at Ugana Medico and scheduling Daikin & Hitachi field technicians at Galaxy Service.',
    highlights: [
      'CCO at Galaxy Service (Aug 2026–Present): handling AC service/repair calls and technician dispatch.',
      'Ugana Medico (Jul 2023–Jul 2026): daily pharmacy billing, stock entry, and patient/hospital coordination.',
      'Fluent communication in Hindi and English with calm composure under peak load.',
    ],
    visualType: 'operations',
  },
];

export const EXPERIENCES = [
  {
    id: 'galaxy-service',
    index: '01',
    kicker: 'Aug 2026 – Present · Darbhanga, Bihar',
    title: 'Customer Care Officer (CCO)',
    organization: 'Galaxy Service (Authorized Partner: Daikin & Hitachi)',
    location: 'Darbhanga, Bihar',
    period: 'Aug 2026 – Present',
    storyLead:
      'The first voice customers hear when their AC breaks in peak Bihar heat — turning urgent complaints into scheduled technician resolutions.',
    responsibilities: [
      'Handle inbound calls for AC servicing, repair troubleshooting, and new installations.',
      'Resolve customer escalations empathetically while tracking ticket closure SLAs.',
      'Coordinate and schedule daily field technician routes for on-time visits.',
    ],
    tags: ['Call Handling', 'Complaint Resolution', 'Technician Scheduling', 'Front-Desk Ops'],
  },
  {
    id: 'ugana-medico',
    index: '02',
    kicker: 'Jul 2023 – Jul 2026 · Darbhanga, Bihar',
    title: 'Pharmacy Sales & Data Entry Executive',
    organization: 'Ugana Medico (Under Darbhanga Heart Hospital)',
    location: 'Darbhanga, Bihar',
    period: 'Jul 2023 – Jul 2026',
    storyLead:
      'Three years of fast, error-free counter sales, stock reconciliation, and patient support inside a busy cardiac hospital ecosystem.',
    responsibilities: [
      'Managed counter medicine sales and answered patient & family queries clearly.',
      'Performed daily stock data entry, billing software entries, and record audits.',
      'Supported Darbhanga Heart Hospital staff and patients with critical medicine availability.',
    ],
    tags: ['Medicine Sales', 'Billing Software', 'Inventory & Stock', 'MS Excel / Word'],
  },
  {
    id: 'incodec-tech',
    index: '03',
    kicker: '1 Month Intensive Internship',
    title: 'Full Stack Development Intern',
    organization: 'InCodec Technology',
    location: 'Remote / India',
    period: '1 Month',
    storyLead:
      'Bridged bootcamp theory with real client-style engineering — building end-to-end MERN features cleanly.',
    responsibilities: [
      'Built responsive React.js user interfaces backed by Express.js and Node.js servers.',
      'Designed MongoDB schemas, REST APIs, and JWT authentication flows.',
      'Practiced clean component reuse, Git collaboration, and debugging.',
    ],
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
  },
];

export const FAQS = [
  {
    id: 'faq-1',
    question:
      'How does 3+ years of pharmacy & customer care experience make you a better developer?',
    answer:
      'When you’ve handled anxious hospital patients at a pharmacy counter and scheduled AC technicians for frustrated homeowners, you stop building software for yourself. I debug calmly under pressure, communicate clearly with non-technical stakeholders, and design UI flows that don’t waste a single click.',
  },
  {
    id: 'faq-2',
    question: 'Are you open to relocating from Darbhanga, or only looking for remote roles?',
    answer:
      'Yes — I am open to both relocating anywhere for the right full-time team and collaborating remotely from day one. What matters most is meaningful work where I can ship reliable software or streamline real operations.',
  },
  {
    id: 'faq-3',
    question: 'What roles are you currently targeting?',
    answer:
      'Junior / Entry-Level MERN Stack Developer, Frontend Developer (React/JavaScript), or hybrid Tech-Operations / Customer Operations roles where full-stack literacy and 3+ years of front-line experience create an unfair advantage.',
  },
  {
    id: 'faq-4',
    question: 'Where can we verify your bootcamp, Forage simulations, and NSDC credentials?',
    answer:
      'Every certificate — Sheryians Coding School (Full Stack + DSA Excellence, June 2026), NSDC Skill India Digital Hub (Web Design & Dev, June 2026), Deloitte Data Analytics, and Electronic Arts Product Management — is organized in my Google Drive folder linked directly in the About and Contact sections.',
  },
];

export const EDUCATION_AND_CERTS = {
  education: [
    {
      title: 'ITI — Computer Operator & Programming Assistant (COPA)',
      institution: 'Integrated Infotech Private ITI, Baheri (NCVT Approved)',
      status: 'Currently Pursuing',
    },
    {
      title: '10th Standard (Secondary School)',
      institution: 'BBOSE (Bihar Board of Open Schooling and Examination)',
      status: 'Score: 315',
    },
  ],
  certifications: [
    {
      title: 'Full Stack Web Development & DSA (Certificate of Excellence)',
      issuer: 'Sheryians Coding School',
      date: 'June 2026',
    },
    {
      title: 'Web Design & Development',
      issuer: 'NSDC Skill India Digital Hub',
      date: 'June 2026',
    },
    {
      title: 'Data Analytics Job Simulation',
      issuer: 'Deloitte (Forage)',
      date: 'Completed',
    },
    {
      title: 'Product Management Job Simulation',
      issuer: 'Electronic Arts (Forage)',
      date: 'Completed',
    },
  ],
};

export const PLAYGROUND_CARDS = [
  {
    id: 'pg-01',
    title: 'Tactile Ivory Tokens',
    category: 'Design System',
    year: '2026',
    bg: '#141413',
    description: 'Warm paper surfaces paired with crisp hairline borders from Vanguard CRM.',
    stack: 'React · CSS Variables',
    variant: 'ivory-system',
  },
  {
    id: 'pg-02',
    title: 'Groq Clause Extractor',
    category: 'AI Interface',
    year: '2026',
    bg: '#a9ebd5',
    darkText: true,
    description: 'Streaming legal summary card compressing 15 pages of T&C text into 5 clear risks.',
    stack: 'Node.js · Groq API',
    variant: 'groq-parser',
  },
  {
    id: 'pg-03',
    title: 'GSAP Velocity Scroll',
    category: '2D Motion Study',
    year: '2026',
    bg: '#d9381e',
    description: 'Smooth cubic-bezier reveal choreography for editorial typography.',
    stack: 'GSAP · ScrollTrigger',
    variant: 'gsap-motion',
  },
  {
    id: 'pg-04',
    title: 'Magnetic 2D Physics',
    category: '2D Interaction',
    year: '2026',
    bg: '#d7ff46',
    darkText: true,
    description: 'Pointer-reactive spring displacement and elastic snaps built with gsap.quickTo.',
    stack: 'GSAP · quickTo',
    variant: 'magnetic-2d',
  },
  {
    id: 'pg-05',
    title: 'CRM Lead Funnel',
    category: 'State Store',
    year: '2026',
    bg: '#3020e8',
    description: 'Multi-level filterable lead pipeline powered by React Context API.',
    stack: 'React · Context API',
    variant: 'crm-pipeline',
  },
  {
    id: 'pg-06',
    title: 'Hospital Stock Ledger',
    category: 'Operations UI',
    year: '2025',
    bg: '#e8e3d8',
    darkText: true,
    colSpan: 2,
    description: 'Keyboard-first medicine billing and stock reconciliation grid inspired by Ugana Medico.',
    stack: 'Tabular Data · Excel Logic',
    variant: 'billing-grid',
  },
  {
    id: 'pg-07',
    title: 'JWT Auth Handshake',
    category: 'Backend Security',
    year: '2026',
    bg: '#a9ebd5',
    darkText: true,
    colSpan: 2,
    description: 'Token verification & Express middleware architecture from InCodec internship.',
    stack: 'Express · JWT · MongoDB',
    variant: 'jwt-auth',
  },
  {
    id: 'pg-08',
    title: 'Technician Dispatch Grid',
    category: 'Service Ops',
    year: '2026',
    bg: '#141413',
    description: 'Daily AC repair & installation route matrix for Daikin & Hitachi field visits.',
    stack: 'Scheduling · CCO Ops',
    variant: 'dispatch-map',
  },
  {
    id: 'pg-09',
    title: 'Display + Editorial Type',
    category: 'Typography',
    year: '2026',
    bg: '#d9381e',
    description: 'Condensed architectural display headlines paired with italic literary serif.',
    stack: 'Antonio · Cormorant',
    variant: 'type-study',
  },
  {
    id: 'pg-10',
    title: 'DSA Complexity Matrix',
    category: 'Algorithms',
    year: '2026',
    bg: '#d7ff46',
    darkText: true,
    description: 'Visual cheat sheet for array, sliding window, tree, and graph complexities.',
    stack: 'DSA · JavaScript',
    variant: 'dsa-matrix',
  },
];
