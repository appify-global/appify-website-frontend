// services.ts - Centralized services data

export type ServiceCategory = 'strategy' | 'intelligence' | 'development' | 'creative';

export interface Service {
  id: string;
  name: string;
  slug: string;
  category: ServiceCategory;
  categoryLabel: string;
  description: string;
  href: string;
}

// Extended interfaces for detailed service pages
export interface ServiceOffering {
  title: string;
  description: string;
  category: string;
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  description: string;
  image?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ServicePageContent {
  // Hero section
  heroSubtitle: string;
  heroImage: string;
  
  // Experience section
  experienceTagline: string;
  experienceDescription: string;
  
  // What We Do section
  whatWeDoSubtitle: string;
  offerings: ServiceOffering[];
  
  // Process section
  processSubtitle: string;
  processSteps: ProcessStep[];
  
  // FAQ section
  faqs: FAQItem[];
  
  // Next service navigation
  nextService: {
    category: string;
    slug: string;
    name: string;
  };
}

export interface Category {
  id: ServiceCategory;
  label: string;
  description: string;
  services: Service[];
}

export const categories: Category[] = [
  {
    id: 'strategy',
    label: 'Strategy',
    description: 'Leveraging extensive enterprise software experience, our strategic consulting services guide digital transformation, technology selection, and business process optimisation for organisations across Australia, UAE, and Qatar. We combine technical architecture expertise with pragmatic business analysis to create scalable roadmaps that align technology investments with long-term strategic objectives.',
    services: [
      {
        id: 'digital-transformation',
        name: 'Digital Transformation',
        slug: 'digital-transformation',
        category: 'strategy',
        categoryLabel: 'Strategy',
        description: 'End-to-end digital transformation services',
        href: '/services/strategy/digital-transformation'
      },
      {
        id: 'technology-consulting',
        name: 'Technology Consulting',
        slug: 'technology-consulting',
        category: 'strategy',
        categoryLabel: 'Strategy',
        description: 'Expert technology advisory services',
        href: '/services/strategy/technology-consulting'
      },
      {
        id: 'business-analysis',
        name: 'Business Analysis',
        slug: 'business-analysis',
        category: 'strategy',
        categoryLabel: 'Strategy',
        description: 'In-depth business process analysis',
        href: '/services/strategy/business-analysis'
      },
      {
        id: 'process-optimisation',
        name: 'Process Optimisation',
        slug: 'process-optimisation',
        category: 'strategy',
        categoryLabel: 'Strategy',
        description: 'Streamline and optimise business processes',
        href: '/services/strategy/process-optimisation'
      },
      {
        id: 'architecture-design',
        name: 'Architecture Design',
        slug: 'architecture-design',
        category: 'strategy',
        categoryLabel: 'Strategy',
        description: 'Enterprise and solution architecture',
        href: '/services/strategy/architecture-design'
      }
    ]
  },
  {
    id: 'creative',
    label: 'Creative',
    description: 'Our design team crafts exceptional user experiences through research-driven UI/UX design, product strategy, and rapid prototyping. We combine user research, scalable design systems, and intuitive interface design to create mobile apps and enterprise software that users love - delivering digital products that drive engagement and measurable business results.',
    services: [
      {
        id: 'ui-ux-design',
        name: 'UI/UX Design',
        slug: 'ui-ux-design',
        category: 'creative',
        categoryLabel: 'Creative',
        description: 'User interface and experience design',
        href: '/services/creative/ui-ux-design'
      },
      {
        id: 'product-design',
        name: 'Product Design',
        slug: 'product-design',
        category: 'creative',
        categoryLabel: 'Creative',
        description: 'End-to-end product design',
        href: '/services/creative/product-design'
      },
      {
        id: 'user-research',
        name: 'User Research',
        slug: 'user-research',
        category: 'creative',
        categoryLabel: 'Creative',
        description: 'In-depth user research and testing',
        href: '/services/creative/user-research'
      },
      {
        id: 'design-systems',
        name: 'Design Systems',
        slug: 'design-systems',
        category: 'creative',
        categoryLabel: 'Creative',
        description: 'Scalable design system creation',
        href: '/services/creative/design-systems'
      },
      {
        id: 'prototyping',
        name: 'Prototyping',
        slug: 'prototyping',
        category: 'creative',
        categoryLabel: 'Creative',
        description: 'Interactive prototype development',
        href: '/services/creative/prototyping'
      }
    ]
  },
  {
    id: 'development',
    label: 'Development',
    description: 'Our development team builds custom software solutions, mobile applications, and enterprise ERP systems using modern cloud architecture and agile methodologies. From scalable web applications to complex system integrations, we deliver robust, maintainable code that powers businesses across Australia, UAE, and Qatar - creating technology built to evolve with your needs.',
    services: [
      {
        id: 'software-development',
        name: 'Software Development',
        slug: 'software-development',
        category: 'development',
        categoryLabel: 'Development',
        description: 'Custom software solutions',
        href: '/services/development/software-development'
      },
      {
        id: 'web-applications',
        name: 'Web Applications',
        slug: 'web-applications',
        category: 'development',
        categoryLabel: 'Development',
        description: 'Modern web application development',
        href: '/services/development/web-applications'
      },
      {
        id: 'app-development',
        name: 'App Development',
        slug: 'app-development',
        category: 'development',
        categoryLabel: 'Development',
        description: 'iOS and Android mobile apps',
        href: '/services/development/app-development'
      },
      {
        id: 'erp-solutions',
        name: 'ERP Solutions',
        slug: 'erp-solutions',
        category: 'development',
        categoryLabel: 'Development',
        description: 'Enterprise resource planning systems',
        href: '/services/development/erp-solutions'
      },
      {
        id: 'system-integration',
        name: 'System Integration',
        slug: 'system-integration',
        category: 'development',
        categoryLabel: 'Development',
        description: 'Seamless system and API integration',
        href: '/services/development/system-integration'
      }
    ]
  },
  {
    id: 'intelligence',
    label: 'Intelligence',
    description: 'We specialise in AI and machine learning engineering - from intelligent automation and agentic solutions to MCP development and custom AI models. Our team builds enterprise-grade artificial intelligence systems, generative AI integrations, and predictive analytics that solve complex business challenges at scale.',
    services: [
      {
        id: 'ai-ml-engineering',
        name: 'AI & ML Engineering',
        slug: 'ai-ml-engineering',
        category: 'intelligence',
        categoryLabel: 'Intelligence',
        description: 'Custom AI and machine learning solutions',
        href: '/services/intelligence/ai-ml-engineering'
      },
      {
        id: 'agentic-solutions',
        name: 'Agentic Solutions',
        slug: 'agentic-solutions',
        category: 'intelligence',
        categoryLabel: 'Intelligence',
        description: 'Autonomous AI agent development',
        href: '/services/intelligence/agentic-solutions'
      },
      {
        id: 'mcp-development',
        name: 'MCP Development',
        slug: 'mcp-development',
        category: 'intelligence',
        categoryLabel: 'Intelligence',
        description: 'Model Context Protocol integration',
        href: '/services/intelligence/mcp-development'
      },
      {
        id: 'intelligent-automation',
        name: 'Intelligent Automation',
        slug: 'intelligent-automation',
        category: 'intelligence',
        categoryLabel: 'Intelligence',
        description: 'Smart process automation with AI',
        href: '/services/intelligence/intelligent-automation'
      },
      {
        id: 'custom-ai-models',
        name: 'Custom AI Models',
        slug: 'custom-ai-models',
        category: 'intelligence',
        categoryLabel: 'Intelligence',
        description: 'Bespoke AI model development',
        href: '/services/intelligence/custom-ai-models'
      }
    ]
  }
];

// Helper functions
export const getAllServices = (): Service[] => {
  return categories.flatMap(cat => cat.services);
};

export const getServiceBySlug = (categorySlug: string, serviceSlug: string): Service | undefined => {
  const category = categories.find(c => c.id === categorySlug);
  return category?.services.find(s => s.slug === serviceSlug);
};

export const getServicesByCategory = (categoryId: ServiceCategory): Service[] => {
  const category = categories.find(c => c.id === categoryId);
  return category?.services || [];
};

export const getCategoryById = (categoryId: ServiceCategory): Category | undefined => {
  return categories.find(c => c.id === categoryId);
};

// Order for display on services page (as shown in Figma)
export const categoryDisplayOrder: ServiceCategory[] = ['strategy', 'creative', 'development', 'intelligence'];

// Detailed service page content
export const servicePageContent: Record<string, ServicePageContent> = {
  'digital-transformation': {
    heroSubtitle: 'ENTERPRISE DIGITAL TRANSFORMATION EXPERTS ACROSS AUSTRALIA, UAE & QATAR',
    heroImage: '/services/digital-transformation/hero.jpg',
    
    experienceTagline: 'CREATING THE EXPERIENCE',
    experienceDescription: 'At Appify, we guide digital transformation initiatives that others find too complex - from legacy system modernisation and cloud migration to enterprise architecture redesign and AI powered process automation across Australia, UAE, and Qatar. We specialise in technology transformations that require deep expertise and strategic innovation.',
    
    whatWeDoSubtitle: 'GUIDING DIGITAL TRANSFORMATION FOR ENTERPRISES ACROSS AUSTRALIA, UAE, AND QATAR - FROM STRATEGY TO EXECUTION.',
    offerings: [
      {
        title: 'Digital Transformation Strategy & Roadmapping',
        description: 'We assess your current technology landscape, identify transformation opportunities, and create strategic roadmaps aligned with business objectives. From C-suite workshops to technical audits, we build actionable plans.',
        category: 'STRATEGY'
      },
      {
        title: 'System Modernisation & Cloud Migration',
        description: 'We modernise outdated systems and migrate legacy infrastructure to cloud-native architecture reducing technical debt while maintaining business continuity. Strategic re-platforming that improves performance & scalability.',
        category: 'STRATEGY'
      },
      {
        title: 'Process Automation & AI Integration',
        description: 'We identify automation opportunities and implement AI-powered workflows that eliminate manual tasks and reduce errors. From RPA to machine learning integration, we deliver intelligent automation that drives efficiency.',
        category: 'STRATEGY'
      },
      {
        title: 'Architecture & Infrastructure Redesign',
        description: 'We redesign enterprise architecture for scalability, security, and agility from monoliths to microservices, on-premise to cloud. Modern infrastructure built on best practices that supports growth and adapts to business needs.',
        category: 'STRATEGY'
      }
    ],
    
    processSubtitle: 'Delivered for forward-thinking enterprises and startups across Australia, UAE, and Qatar over the years.',
    processSteps: [
      {
        stepNumber: '01',
        title: 'ASSESSMENT & DISCOVERY',
        description: 'We assess your technology landscape, processes, and digital maturity through stakeholder workshops and technical audits to identify transformation opportunities.',
        image: '/services/digital-transformation/globe.png'
      },
      {
        stepNumber: '02',
        title: 'STRATEGY & ROADMAP DEVELOPMENT',
        description: 'We develop a strategic transformation roadmap with prioritised initiatives, timelines, and KPIs - balancing quick wins with long-term modernisation for sustainable business impact.',
        image: '/services/digital-transformation/process-1.png'
      },
      {
        stepNumber: '03',
        title: 'EXECUTION & MIGRATION',
        description: 'We implement transformation initiatives using agile delivery - migrating legacy systems, deploying cloud infrastructure, and integrating AI-powered automation with minimal business disruption.',
        image: '/services/digital-transformation/globe.png'
      },
      {
        stepNumber: '04',
        title: 'ENABLEMENT & OPTIMISATION',
        description: 'We ensure adoption through change management and training, then continuously optimise based on performance data and user feedback - sustaining transformation value long-term.',
        image: '/services/digital-transformation/process-1.png'
      }
    ],
    
    faqs: [
      {
        question: 'How long does a typical digital transformation project take?',
        answer: 'Digital transformation timelines vary based on scope and complexity, but most enterprise initiatives range from 6-18 months. We use phased, agile delivery to provide incremental value throughout - with initial quick wins often delivered within 8-12 weeks.'
      },
      {
        question: 'How do you minimise business disruption during transformation?',
        answer: 'We employ parallel running strategies, comprehensive testing, and phased rollouts to minimise disruption. Our change management approach includes stakeholder communication, training programmes, and dedicated support during transition periods.'
      },
      {
        question: "What's the typical ROI of digital transformation investments?",
        answer: 'ROI varies by initiative, but our clients typically see 20-40% operational efficiency gains, 15-30% cost reductions, and significant improvements in customer satisfaction and employee productivity within 12-18 months of implementation.'
      },
      {
        question: 'Can we transform in phases rather than replacing everything at once?',
        answer: 'Absolutely. We recommend phased transformation approaches that prioritise high-impact, low-risk initiatives first. This builds momentum, demonstrates value early, and allows for learning and adjustment throughout the journey.'
      },
      {
        question: 'How do you ensure our teams adopt new systems and processes?',
        answer: 'Change management is integral to our approach. We involve end-users from discovery through deployment, provide comprehensive training programmes, create internal champions, and offer post-launch support to ensure sustainable adoption.'
      }
    ],
    
    nextService: {
      category: 'strategy',
      slug: 'technology-consulting',
      name: 'TECHNOLOGY CONSULTING'
    }
  },

  'technology-consulting': {
    heroSubtitle: 'TECHNOLOGY CONSULTING FOR ENTERPRISES ACROSS AUSTRALIA, UAE & QATAR',
    heroImage: '/services/technology-consulting/hero.jpg',
    
    experienceTagline: 'ADVISING ON TECHNOLOGY',
    experienceDescription: 'At Appify, we help enterprises navigate technology decisions that others find overwhelming - from platform selection and vendor evaluation to technical due diligence and IT strategy across Australia, UAE, and Qatar. Our consultants bring hands-on development experience to every advisory engagement, providing practical guidance grounded in real-world implementation expertise.',
    
    whatWeDoSubtitle: 'GUIDING TECHNOLOGY DECISIONS FOR ENTERPRISES AND STARTUPS ACROSS AUSTRALIA, UAE, AND QATAR.',
    offerings: [
      {
        title: 'Technology Strategy Development',
        description: 'We develop comprehensive technology strategies aligned with business objectives - from IT roadmaps and architecture vision to technology governance frameworks. Strategic planning that guides investment decisions and drives competitive advantage.',
        category: 'STRATEGY'
      },
      {
        title: 'Platform Selection & Vendor Evaluation',
        description: 'We evaluate platforms, tools, and vendors against your specific requirements - providing unbiased recommendations based on technical fit, total cost of ownership, and long-term viability. Independent advice without vendor bias.',
        category: 'STRATEGY'
      },
      {
        title: 'Technical Due Diligence & Assessment',
        description: 'We conduct comprehensive technical assessments for acquisitions, investments, and partnerships - evaluating code quality, architecture, security posture, and technical debt. Detailed analysis that informs critical business decisions.',
        category: 'STRATEGY'
      },
      {
        title: 'IT Governance & Compliance Advisory',
        description: 'We establish IT governance frameworks and compliance programmes that meet regulatory requirements while enabling business agility. Risk management, security standards, and audit readiness across your technology portfolio.',
        category: 'STRATEGY'
      }
    ],
    
    processSubtitle: 'Delivered for forward-thinking enterprises and startups across Australia, UAE, and Qatar over the years.',
    processSteps: [
      {
        stepNumber: '01',
        title: 'DISCOVERY & TECHNOLOGY AUDIT',
        description: 'We assess your current technology landscape, business objectives, and strategic priorities through stakeholder interviews and technical analysis to understand your unique context and challenges.',
        image: '/services/technology-consulting/process-1.png'
      },
      {
        stepNumber: '02',
        title: 'STRATEGY DEVELOPMENT & RECOMMENDATIONS',
        description: 'We develop strategic recommendations based on industry best practices, emerging technologies, and your specific requirements - providing actionable guidance with clear rationale and prioritisation.',
        image: '/services/technology-consulting/process-2.png'
      },
      {
        stepNumber: '03',
        title: 'VENDOR EVALUATION & SELECTION',
        description: 'We conduct rigorous vendor and platform evaluations using structured criteria - facilitating demos, proof of concepts, and reference checks to ensure the right technology decisions for your business.',
        image: '/services/technology-consulting/process-1.png'
      },
      {
        stepNumber: '04',
        title: 'IMPLEMENTATION PLANNING & GOVERNANCE',
        description: 'We create detailed implementation roadmaps and governance frameworks that guide execution - ensuring technology investments deliver expected value with appropriate risk management and oversight.',
        image: '/services/technology-consulting/process-2.png'
      }
    ],
    
    faqs: [
      {
        question: 'What makes your technology consulting different from traditional IT consultancies?',
        answer: 'Our consultants are practising engineers and architects who build systems, not just advisors who create PowerPoints. This hands-on experience means our recommendations are grounded in real-world implementation realities, not theoretical best practices.'
      },
      {
        question: 'Do you have vendor partnerships that might bias your recommendations?',
        answer: 'No. We maintain vendor independence specifically to provide unbiased advice. We recommend the best solutions for your specific needs, not the ones that generate commissions or partnership benefits for us.'
      },
      {
        question: 'How do you conduct technical due diligence for acquisitions?',
        answer: 'Our due diligence covers code quality, architecture assessment, security posture, technical debt, team capability, and operational maturity. We provide detailed reports with risk ratings, remediation estimates, and integration recommendations.'
      },
      {
        question: 'Can you help us build internal technology capability rather than just advising?',
        answer: 'Absolutely. We often combine advisory work with capability building - helping clients establish internal centres of excellence, upskill teams, and develop the processes and practices needed for long-term technology success.'
      },
      {
        question: 'What industries do you have technology consulting experience in?',
        answer: 'Our consultants have deep experience across financial services, healthcare, government, retail, and logistics - bringing industry-specific knowledge of regulations, best practices, and technology patterns to every engagement.'
      }
    ],
    
    nextService: {
      category: 'strategy',
      slug: 'business-analysis',
      name: 'BUSINESS ANALYSIS'
    }
  },

  'business-analysis': {
    heroSubtitle: 'BUSINESS ANALYSIS CONSULTANTS FOR ENTERPRISES ACROSS AUSTRALIA, UAE & QATAR',
    heroImage: '/services/business-analysis/hero.jpg',
    
    experienceTagline: 'ANALYSING YOUR BUSINESS',
    experienceDescription: 'At Appify, we bridge the gap between business objectives and technical solutions that others find difficult to navigate - from requirements engineering and process mapping to stakeholder workshops and solution design across Australia, UAE, and Qatar. We specialise in translating complex business needs into clear, actionable specifications that development teams can execute.',
    
    whatWeDoSubtitle: 'REQUIREMENTS ENGINEERING AND BUSINESS ANALYSIS FOR ENTERPRISES ACROSS AUSTRALIA, UAE, AND QATAR.',
    offerings: [
      {
        title: 'Requirements Engineering & Documentation',
        description: 'We elicit, analyse, and document business and technical requirements using proven methodologies - creating clear specifications that reduce ambiguity and prevent costly rework. From user stories to detailed functional requirements.',
        category: 'STRATEGY'
      },
      {
        title: 'Process Mapping & Analysis',
        description: 'We map current-state business processes, identify inefficiencies, and design future-state workflows that optimise operations. Visual process documentation that drives understanding and enables continuous improvement.',
        category: 'STRATEGY'
      },
      {
        title: 'Stakeholder Engagement & Workshops',
        description: 'We facilitate workshops that bring together diverse stakeholders to align on requirements, priorities, and solutions. Structured collaboration that builds consensus and surfaces critical business needs early.',
        category: 'STRATEGY'
      },
      {
        title: 'Business Case Development',
        description: 'We develop comprehensive business cases that quantify the value of technology investments - from cost-benefit analysis and ROI modelling to risk assessment and strategic alignment. Evidence-based justification for initiatives.',
        category: 'STRATEGY'
      }
    ],
    
    processSubtitle: 'Delivered for forward-thinking enterprises and startups across Australia, UAE, and Qatar over the years.',
    processSteps: [
      {
        stepNumber: '01',
        title: 'STAKEHOLDER DISCOVERY & ENGAGEMENT',
        description: 'We identify and engage key stakeholders across business and technology teams - understanding their perspectives, pain points, and success criteria through interviews, surveys, and observation.',
        image: '/services/business-analysis/process-1.png'
      },
      {
        stepNumber: '02',
        title: 'PROCESS ANALYSIS & DOCUMENTATION',
        description: 'We analyse current business processes and document findings using standard notations - identifying bottlenecks, redundancies, and improvement opportunities that inform solution design.',
        image: '/services/business-analysis/process-2.png'
      },
      {
        stepNumber: '03',
        title: 'REQUIREMENTS DEFINITION & VALIDATION',
        description: 'We define detailed requirements through collaborative workshops and iterative refinement - validating with stakeholders to ensure accuracy, completeness, and alignment with business objectives.',
        image: '/services/business-analysis/process-1.png'
      },
      {
        stepNumber: '04',
        title: 'SOLUTION DESIGN & HANDOVER',
        description: 'We translate validated requirements into solution designs and specifications that development teams can implement - ensuring smooth handover with clear acceptance criteria and traceability.',
        image: '/services/business-analysis/process-2.png'
      }
    ],
    
    faqs: [
      {
        question: 'What methodologies do you use for requirements gathering?',
        answer: 'We adapt our approach to your context - using techniques like user story mapping, event storming, and traditional BRD documentation based on project complexity and team preferences. Our focus is on clarity and completeness, not methodology dogma.'
      },
      {
        question: 'How do you handle conflicting stakeholder requirements?',
        answer: 'We use structured prioritisation frameworks and facilitated workshops to surface conflicts early and build consensus. When trade-offs are necessary, we ensure decisions are documented with clear rationale and stakeholder sign-off.'
      },
      {
        question: 'Can you work embedded with our development teams?',
        answer: 'Yes. Many of our engagements involve business analysts working as embedded team members - participating in agile ceremonies, refining backlogs, and providing ongoing requirements clarification throughout development.'
      },
      {
        question: 'How do you ensure requirements remain accurate as projects evolve?',
        answer: 'We establish traceability from business objectives through to detailed requirements, maintain living documentation that evolves with the project, and implement change management processes that capture and assess requirement changes.'
      },
      {
        question: 'Do you provide business analysis training for internal teams?',
        answer: 'Yes. We offer training programmes and coaching that build internal business analysis capability - covering requirements engineering, process mapping, stakeholder management, and agile BA practices.'
      }
    ],
    
    nextService: {
      category: 'strategy',
      slug: 'process-optimisation',
      name: 'PROCESS OPTIMISATION'
    }
  },

  'process-optimisation': {
    heroSubtitle: 'BUSINESS PROCESS OPTIMISATION CONSULTANTS ACROSS AUSTRALIA, UAE & QATAR',
    heroImage: '/services/process-optimisation/hero.jpg',
    
    experienceTagline: 'OPTIMISING YOUR PROCESSES',
    experienceDescription: 'At Appify, we analyse, redesign, and automate business processes that others find too complex to untangle - from workflow optimisation and bottleneck elimination to performance measurement and continuous improvement across Australia, UAE, and Qatar. We specialise in process transformations that deliver measurable efficiency gains and operational excellence.',
    
    whatWeDoSubtitle: 'PROCESS REDESIGN AND OPTIMISATION FOR ENTERPRISES ACROSS AUSTRALIA, UAE, AND QATAR.',
    offerings: [
      {
        title: 'Process Mapping & Analysis',
        description: 'We document and analyse your business processes to identify inefficiencies, bottlenecks, and waste - using process mining, value stream mapping, and root cause analysis to understand where improvements will have the greatest impact.',
        category: 'STRATEGY'
      },
      {
        title: 'Workflow Redesign & Optimisation',
        description: 'We redesign workflows to eliminate waste, reduce cycle times, and improve quality - applying lean principles and best practices to create streamlined processes that deliver better outcomes with fewer resources.',
        category: 'STRATEGY'
      },
      {
        title: 'Automation Opportunity Assessment',
        description: 'We identify processes suitable for automation and evaluate the business case for RPA, workflow automation, and intelligent automation - prioritising opportunities based on value, complexity, and feasibility.',
        category: 'STRATEGY'
      },
      {
        title: 'Performance Measurement & KPIs',
        description: 'We establish process performance metrics and dashboards that enable continuous monitoring and improvement - defining KPIs that matter, implementing measurement systems, and creating visibility into operational performance.',
        category: 'STRATEGY'
      }
    ],
    
    processSubtitle: 'Delivered for forward-thinking enterprises and startups across Australia, UAE, and Qatar over the years.',
    processSteps: [
      {
        stepNumber: '01',
        title: 'PROCESS DISCOVERY & MAPPING',
        description: 'We document current-state processes through observation, interviews, and process mining - creating detailed maps that show how work actually flows through your organisation.',
        image: '/services/process-optimisation/process-1.png'
      },
      {
        stepNumber: '02',
        title: 'ANALYSIS & OPPORTUNITY IDENTIFICATION',
        description: 'We analyse processes to identify bottlenecks, waste, and variation - quantifying improvement opportunities and prioritising based on business impact and implementation feasibility.',
        image: '/services/process-optimisation/process-2.png'
      },
      {
        stepNumber: '03',
        title: 'REDESIGN & SOLUTION DEVELOPMENT',
        description: 'We design optimised future-state processes that address identified issues - developing implementation plans that include process changes, technology enablement, and change management.',
        image: '/services/process-optimisation/process-1.png'
      },
      {
        stepNumber: '04',
        title: 'IMPLEMENTATION & CONTINUOUS IMPROVEMENT',
        description: 'We support process implementation and establish continuous improvement frameworks - embedding measurement, feedback loops, and governance that sustain operational excellence long-term.',
        image: '/services/process-optimisation/process-2.png'
      }
    ],
    
    faqs: [
      {
        question: 'How do you measure the success of process optimisation initiatives?',
        answer: 'We establish baseline metrics before starting and track improvements in cycle time, error rates, cost per transaction, and customer satisfaction. Most clients see 20-40% efficiency improvements within 6 months of implementation.'
      },
      {
        question: 'Do you use process mining technology in your analysis?',
        answer: 'Yes. For organisations with digital process data, we use process mining tools to analyse actual process flows, identify variations, and quantify bottlenecks - providing data-driven insights that complement qualitative analysis.'
      },
      {
        question: 'How do you ensure process changes are adopted by employees?',
        answer: 'We involve process participants throughout design and implementation, provide training and support materials, and work with management to reinforce new ways of working. Sustainable change requires both process design and change management.'
      },
      {
        question: 'Can you help with processes that span multiple departments or systems?',
        answer: 'Absolutely. End-to-end process optimisation that crosses organisational boundaries is often where the biggest improvements lie. We facilitate cross-functional collaboration and address integration points between departments and systems.'
      },
      {
        question: 'What\'s the relationship between process optimisation and automation?',
        answer: 'We always optimise processes before automating them - automating a broken process just creates faster problems. Once processes are streamlined, we identify automation opportunities that further improve efficiency and reduce manual effort.'
      }
    ],
    
    nextService: {
      category: 'strategy',
      slug: 'architecture-design',
      name: 'ARCHITECTURE DESIGN'
    }
  },

  'architecture-design': {
    heroSubtitle: 'ENTERPRISE & SOLUTION ARCHITECTURE DESIGN ACROSS AUSTRALIA, UAE & QATAR',
    heroImage: '/services/architecture-design/hero.jpg',
    
    experienceTagline: 'DESIGNING YOUR ARCHITECTURE',
    experienceDescription: 'At Appify, we design enterprise and solution architectures that balance scalability, security, and pragmatic delivery - from cloud-native designs and microservices to integration patterns and security architecture across Australia, UAE, and Qatar. We specialise in architecture decisions that enable business agility while managing technical complexity.',
    
    whatWeDoSubtitle: 'ENTERPRISE AND SOLUTION ARCHITECTURE FOR ORGANISATIONS ACROSS AUSTRALIA, UAE, AND QATAR.',
    offerings: [
      {
        title: 'Enterprise Architecture Design',
        description: 'We develop enterprise architecture frameworks that align technology investments with business strategy - creating reference architectures, governance standards, and roadmaps that guide technology decisions across the organisation.',
        category: 'STRATEGY'
      },
      {
        title: 'Solution Architecture & Design',
        description: 'We design solution architectures for specific initiatives - defining components, interfaces, data flows, and technology choices that meet functional and non-functional requirements while fitting within enterprise standards.',
        category: 'STRATEGY'
      },
      {
        title: 'Cloud Architecture & Migration Planning',
        description: 'We design cloud-native architectures and migration strategies for AWS, Azure, and GCP - optimising for cost, performance, and operational excellence while ensuring security and compliance requirements are met.',
        category: 'STRATEGY'
      },
      {
        title: 'Security Architecture & Compliance',
        description: 'We design security architectures that protect data and systems while enabling business operations - implementing defence in depth, zero trust principles, and compliance controls appropriate to your regulatory environment.',
        category: 'STRATEGY'
      }
    ],
    
    processSubtitle: 'Delivered for forward-thinking enterprises and startups across Australia, UAE, and Qatar over the years.',
    processSteps: [
      {
        stepNumber: '01',
        title: 'REQUIREMENTS & CONTEXT ANALYSIS',
        description: 'We analyse business requirements, technical constraints, and existing systems to understand the context for architecture decisions - identifying drivers, risks, and success criteria that shape the design.',
        image: '/services/architecture-design/process-1.png'
      },
      {
        stepNumber: '02',
        title: 'ARCHITECTURE OPTIONS & EVALUATION',
        description: 'We develop architecture options and evaluate them against requirements using structured decision frameworks - considering trade-offs in scalability, cost, complexity, and time to delivery.',
        image: '/services/architecture-design/process-2.png'
      },
      {
        stepNumber: '03',
        title: 'DETAILED DESIGN & DOCUMENTATION',
        description: 'We create detailed architecture documentation including component diagrams, data models, interface specifications, and deployment architectures - providing the blueprint for implementation teams.',
        image: '/services/architecture-design/process-1.png'
      },
      {
        stepNumber: '04',
        title: 'GOVERNANCE & EVOLUTION',
        description: 'We establish architecture governance processes and support ongoing evolution - ensuring designs remain relevant as business needs change and technology advances through regular review and refinement.',
        image: '/services/architecture-design/process-2.png'
      }
    ],
    
    faqs: [
      {
        question: 'What\'s the difference between enterprise and solution architecture?',
        answer: 'Enterprise architecture provides the strategic framework and standards that guide all technology decisions. Solution architecture designs specific systems within that framework. We work at both levels depending on client needs.'
      },
      {
        question: 'How do you approach architecture for cloud-native vs legacy environments?',
        answer: 'We design architectures appropriate to your context - greenfield cloud-native designs leverage modern patterns like microservices and serverless, while brownfield environments require pragmatic approaches that integrate with existing systems.'
      },
      {
        question: 'Do you follow specific architecture frameworks like TOGAF?',
        answer: 'We\'re familiar with major frameworks including TOGAF, Zachman, and domain-driven design - but we adapt our approach to your organisation\'s maturity and needs rather than imposing rigid frameworks.'
      },
      {
        question: 'How do you ensure architectures are implementable, not just theoretical?',
        answer: 'Our architects are practising engineers who understand implementation realities. We validate designs through proof of concepts, involve delivery teams in reviews, and remain engaged during implementation to address issues that emerge.'
      },
      {
        question: 'Can you help modernise our legacy architecture incrementally?',
        answer: 'Yes. We specialise in strangler fig and other incremental modernisation patterns that allow you to evolve architecture over time while maintaining business continuity - avoiding risky big-bang replacements.'
      }
    ],
    
    nextService: {
      category: 'intelligence',
      slug: 'ai-ml-engineering',
      name: 'AI & ML ENGINEERING'
    }
  },

  'ai-ml-engineering': {
    heroSubtitle: 'AI & MACHINE LEARNING ENGINEERING FOR ENTERPRISES ACROSS AUSTRALIA, UAE & QATAR',
    heroImage: '/services/ai-ml-engineering/hero.jpg',
    
    experienceTagline: 'ENGINEERING WITH AI & ML',
    experienceDescription: 'At Appify, we engineer production-grade AI and machine learning systems that others find too complex to deploy - from custom model development and computer vision to NLP solutions and MLOps across Australia, UAE, and Qatar. We specialise in taking ML from prototype to production with robust, scalable implementations.',
    
    whatWeDoSubtitle: 'PRODUCTION-GRADE AI & ML SOLUTIONS FOR ENTERPRISES ACROSS AUSTRALIA, UAE, AND QATAR.',
    offerings: [
      {
        title: 'Machine Learning Model Development',
        description: 'We develop custom ML models tailored to your business problems - from predictive analytics and classification to recommendation systems and anomaly detection. Production-ready models that deliver measurable business value.',
        category: 'INTELLIGENCE'
      },
      {
        title: 'Computer Vision & NLP Solutions',
        description: 'We build computer vision systems for image recognition, object detection, and visual inspection - alongside NLP solutions for text analysis, entity extraction, and language understanding. Specialised AI for complex data types.',
        category: 'INTELLIGENCE'
      },
      {
        title: 'MLOps & Model Lifecycle Management',
        description: 'We implement MLOps practices that enable continuous training, deployment, and monitoring of ML models - creating pipelines that maintain model performance and enable rapid iteration in production environments.',
        category: 'INTELLIGENCE'
      },
      {
        title: 'AI Integration & API Development',
        description: 'We integrate AI capabilities into existing systems and develop APIs that make ML models accessible to applications - ensuring AI becomes a seamless part of your technology ecosystem.',
        category: 'INTELLIGENCE'
      }
    ],
    
    processSubtitle: 'Delivered for forward-thinking enterprises and startups across Australia, UAE, and Qatar over the years.',
    processSteps: [
      {
        stepNumber: '01',
        title: 'PROBLEM DEFINITION & DATA ASSESSMENT',
        description: 'We work with you to define the ML problem clearly, assess data availability and quality, and determine whether machine learning is the right approach - ensuring we solve real business problems with appropriate methods.',
        image: '/services/ai-ml-engineering/process-1.png'
      },
      {
        stepNumber: '02',
        title: 'MODEL DEVELOPMENT & EXPERIMENTATION',
        description: 'We develop and experiment with ML models using rigorous methodology - testing hypotheses, comparing approaches, and iterating on features and architectures to achieve optimal performance.',
        image: '/services/ai-ml-engineering/process-2.png'
      },
      {
        stepNumber: '03',
        title: 'PRODUCTION ENGINEERING & DEPLOYMENT',
        description: 'We engineer ML systems for production - optimising for performance and scale, implementing monitoring and alerting, and deploying with robust CI/CD pipelines that enable continuous improvement.',
        image: '/services/ai-ml-engineering/process-1.png'
      },
      {
        stepNumber: '04',
        title: 'MONITORING & CONTINUOUS IMPROVEMENT',
        description: 'We establish monitoring for model performance, data drift, and business metrics - creating feedback loops that trigger retraining and enable continuous improvement of ML systems over time.',
        image: '/services/ai-ml-engineering/process-2.png'
      }
    ],
    
    faqs: [
      {
        question: 'What\'s the difference between AI engineering and data science?',
        answer: 'Data science focuses on analysis, insights, and model development. AI engineering focuses on taking models to production with robust, scalable implementations. We bridge both - developing models and engineering production systems.'
      },
      {
        question: 'Do we need a lot of data to build useful ML models?',
        answer: 'It depends on the problem. Some approaches like transfer learning and few-shot learning work with limited data. We assess your data during discovery and recommend approaches appropriate to your situation - including whether ML is the right solution.'
      },
      {
        question: 'How do you ensure ML models remain accurate over time?',
        answer: 'We implement monitoring for model performance and data drift, establish retraining pipelines, and create governance processes for model updates. MLOps practices ensure models maintain accuracy as data and business conditions evolve.'
      },
      {
        question: 'Can you integrate ML with our existing systems and workflows?',
        answer: 'Yes. Integration is core to our approach - we design ML systems to work within your existing architecture, develop APIs for model access, and ensure AI capabilities enhance rather than disrupt current operations.'
      },
      {
        question: 'What cloud platforms do you work with for ML?',
        answer: 'We work across major cloud platforms including AWS SageMaker, Azure ML, and GCP Vertex AI - as well as open-source tools like MLflow and Kubeflow. We recommend platforms based on your existing infrastructure and specific requirements.'
      }
    ],
    
    nextService: {
      category: 'intelligence',
      slug: 'agentic-solutions',
      name: 'AGENTIC SOLUTIONS'
    }
  },

  'agentic-solutions': {
    heroSubtitle: 'AUTONOMOUS AI AGENT DEVELOPMENT FOR ENTERPRISES ACROSS AUSTRALIA, UAE & QATAR',
    heroImage: '/services/agentic-solutions/hero.jpg',
    
    experienceTagline: 'BUILDING AUTONOMOUS AGENTS',
    experienceDescription: 'At Appify, we develop autonomous AI agents that others find too complex to build reliably - from reasoning systems that plan and execute multi-step tasks to multi-agent orchestration and tool integration across Australia, UAE, and Qatar. We specialise in agentic AI that operates safely and effectively in enterprise environments.',
    
    whatWeDoSubtitle: 'AUTONOMOUS AI AGENT DEVELOPMENT FOR ENTERPRISES ACROSS AUSTRALIA, UAE, AND QATAR.',
    offerings: [
      {
        title: 'Autonomous Agent Development',
        description: 'We develop AI agents that reason, plan, and execute complex tasks autonomously - from customer service agents and research assistants to workflow automation agents that handle multi-step processes independently.',
        category: 'INTELLIGENCE'
      },
      {
        title: 'Multi-Agent Systems & Orchestration',
        description: 'We design and build multi-agent systems where specialised agents collaborate to solve complex problems - implementing orchestration patterns that coordinate agent activities and manage emergent behaviours.',
        category: 'INTELLIGENCE'
      },
      {
        title: 'Tool Integration & Function Calling',
        description: 'We integrate agents with enterprise tools and systems through function calling and API integration - enabling agents to access databases, trigger workflows, and interact with external services safely.',
        category: 'INTELLIGENCE'
      },
      {
        title: 'Agent Monitoring & Governance',
        description: 'We implement monitoring, guardrails, and governance frameworks that ensure agents operate within defined boundaries - providing visibility into agent decisions and maintaining human oversight of autonomous systems.',
        category: 'INTELLIGENCE'
      }
    ],
    
    processSubtitle: 'Delivered for forward-thinking enterprises and startups across Australia, UAE, and Qatar over the years.',
    processSteps: [
      {
        stepNumber: '01',
        title: 'USE CASE DEFINITION & FEASIBILITY',
        description: 'We work with you to define agentic use cases, assess feasibility, and identify the right level of autonomy - ensuring agents are applied where they add value with appropriate risk management.',
        image: '/services/agentic-solutions/process-1.png'
      },
      {
        stepNumber: '02',
        title: 'AGENT DESIGN & PROTOTYPING',
        description: 'We design agent architectures including reasoning patterns, tool access, and safety guardrails - building prototypes that validate approaches before full implementation.',
        image: '/services/agentic-solutions/process-2.png'
      },
      {
        stepNumber: '03',
        title: 'DEVELOPMENT & INTEGRATION',
        description: 'We develop production-ready agents with robust error handling, integrate with enterprise systems, and implement the orchestration layer for multi-agent coordination.',
        image: '/services/agentic-solutions/process-1.png'
      },
      {
        stepNumber: '04',
        title: 'DEPLOYMENT & GOVERNANCE',
        description: 'We deploy agents with comprehensive monitoring, implement governance frameworks for autonomous decisions, and establish processes for ongoing improvement and human oversight.',
        image: '/services/agentic-solutions/process-2.png'
      }
    ],
    
    faqs: [
      {
        question: 'What\'s the difference between AI agents and traditional automation?',
        answer: 'Traditional automation follows predefined rules. AI agents use reasoning and planning to handle novel situations, make decisions, and adapt their approach based on context - enabling automation of complex, variable tasks.'
      },
      {
        question: 'How do you ensure AI agents operate safely in enterprise environments?',
        answer: 'We implement multiple safety layers including input validation, output filtering, action boundaries, human-in-the-loop for high-stakes decisions, and comprehensive monitoring. Agents are designed with appropriate guardrails for their use case.'
      },
      {
        question: 'Can AI agents integrate with our existing enterprise systems?',
        answer: 'Yes. Integration is fundamental to useful agents. We design agents to interact with your systems through APIs, databases, and existing automation tools - making them effective participants in your technology ecosystem.'
      },
      {
        question: 'What types of tasks are AI agents best suited for?',
        answer: 'Agents excel at tasks requiring reasoning, multi-step execution, and adaptation - such as research and analysis, customer interactions, workflow orchestration, and decision support. We help identify where agents add most value.'
      },
      {
        question: 'How do you handle the unpredictability of AI agent behaviour?',
        answer: 'We design for predictability through clear objectives, bounded actions, and comprehensive testing. Monitoring catches unexpected behaviours, and governance processes ensure human oversight for important decisions.'
      }
    ],
    
    nextService: {
      category: 'intelligence',
      slug: 'mcp-development',
      name: 'MCP DEVELOPMENT'
    }
  },

  'mcp-development': {
    heroSubtitle: 'MODEL CONTEXT PROTOCOL DEVELOPMENT FOR AI SYSTEMS ACROSS AUSTRALIA, UAE & QATAR',
    heroImage: '/services/mcp-development/hero.jpg',
    
    experienceTagline: 'DEVELOPING MCP SOLUTIONS',
    experienceDescription: 'At Appify, we develop Model Context Protocol implementations that connect AI systems to enterprise data and tools - from custom MCP servers and resource providers to context management and secure integration across Australia, UAE, and Qatar. We specialise in MCP solutions that make AI genuinely useful in enterprise environments.',
    
    whatWeDoSubtitle: 'MODEL CONTEXT PROTOCOL DEVELOPMENT FOR ENTERPRISES ACROSS AUSTRALIA, UAE, AND QATAR.',
    offerings: [
      {
        title: 'MCP Server Development',
        description: 'We develop custom MCP servers that expose your enterprise data and capabilities to AI systems - creating secure, performant connections between large language models and your business systems.',
        category: 'INTELLIGENCE'
      },
      {
        title: 'Tool & Resource Implementation',
        description: 'We implement MCP tools and resources that enable AI to interact with your systems - from database queries and API calls to document retrieval and workflow triggers. Structured access to enterprise capabilities.',
        category: 'INTELLIGENCE'
      },
      {
        title: 'Context Management Systems',
        description: 'We build context management systems that provide AI with relevant, current information - implementing retrieval strategies, context windows, and caching that optimise AI performance for your use cases.',
        category: 'INTELLIGENCE'
      },
      {
        title: 'MCP Integration & Deployment',
        description: 'We integrate MCP servers into your infrastructure and deploy with appropriate security, monitoring, and governance - ensuring reliable, secure operation in production environments.',
        category: 'INTELLIGENCE'
      }
    ],
    
    processSubtitle: 'Delivered for forward-thinking enterprises and startups across Australia, UAE, and Qatar over the years.',
    processSteps: [
      {
        stepNumber: '01',
        title: 'REQUIREMENTS & ARCHITECTURE DESIGN',
        description: 'We analyse your data sources, AI use cases, and security requirements to design MCP architectures that provide appropriate access while maintaining security and performance.',
        image: '/services/mcp-development/process-1.png'
      },
      {
        stepNumber: '02',
        title: 'SERVER & TOOL DEVELOPMENT',
        description: 'We develop MCP servers and implement tools and resources that expose your systems to AI - following best practices for security, error handling, and performance.',
        image: '/services/mcp-development/process-2.png'
      },
      {
        stepNumber: '03',
        title: 'INTEGRATION & TESTING',
        description: 'We integrate MCP implementations with AI systems and conduct comprehensive testing - validating functionality, security, and performance under realistic conditions.',
        image: '/services/mcp-development/process-1.png'
      },
      {
        stepNumber: '04',
        title: 'DEPLOYMENT & OPERATIONS',
        description: 'We deploy MCP infrastructure with monitoring, logging, and governance - establishing operational procedures that maintain security and reliability in production.',
        image: '/services/mcp-development/process-2.png'
      }
    ],
    
    faqs: [
      {
        question: 'What is the Model Context Protocol and why does it matter?',
        answer: 'MCP is a standard for connecting AI systems to external data and tools. It matters because it enables AI to access current, relevant information and take actions in your systems - moving beyond static knowledge to dynamic, useful AI applications.'
      },
      {
        question: 'How do you ensure MCP implementations are secure?',
        answer: 'We implement authentication, authorisation, and audit logging for all MCP access. Data is filtered and sanitised before exposure, and we follow least-privilege principles - AI only accesses what it needs for specific use cases.'
      },
      {
        question: 'Can MCP work with our existing enterprise systems?',
        answer: 'Yes. We develop MCP servers that connect to databases, APIs, file systems, and enterprise applications - creating a bridge between AI capabilities and your existing technology investments.'
      },
      {
        question: 'What AI systems work with MCP implementations?',
        answer: 'MCP is supported by major AI assistants and can be integrated with custom AI applications. We design implementations that work with your chosen AI platforms while maintaining flexibility for future changes.'
      },
      {
        question: 'How do you handle performance when AI makes many MCP requests?',
        answer: 'We implement caching, connection pooling, and request optimisation to maintain performance. Architecture designs consider expected load patterns, and we implement monitoring to identify and address bottlenecks.'
      }
    ],
    
    nextService: {
      category: 'intelligence',
      slug: 'intelligent-automation',
      name: 'INTELLIGENT AUTOMATION'
    }
  },

  'intelligent-automation': {
    heroSubtitle: 'INTELLIGENT AUTOMATION SOLUTIONS FOR ENTERPRISES ACROSS AUSTRALIA, UAE & QATAR',
    heroImage: '/services/intelligent-automation/hero.jpg',
    
    experienceTagline: 'AUTOMATING INTELLIGENTLY',
    experienceDescription: 'At Appify, we implement intelligent automation solutions that combine RPA, AI, and workflow orchestration - from document processing and decision automation to end-to-end process automation across Australia, UAE, and Qatar. We specialise in automation that handles exceptions and edge cases that traditional approaches cannot.',
    
    whatWeDoSubtitle: 'AI-POWERED AUTOMATION FOR ENTERPRISES ACROSS AUSTRALIA, UAE, AND QATAR.',
    offerings: [
      {
        title: 'Robotic Process Automation (RPA)',
        description: 'We implement RPA solutions that automate repetitive, rule-based tasks - from data entry and reconciliation to report generation and system integration. Automation that frees your team for higher-value work.',
        category: 'INTELLIGENCE'
      },
      {
        title: 'Intelligent Document Processing',
        description: 'We build IDP solutions that extract, classify, and process documents using AI - handling invoices, contracts, forms, and unstructured documents with accuracy that improves over time.',
        category: 'INTELLIGENCE'
      },
      {
        title: 'Workflow Automation & Orchestration',
        description: 'We automate end-to-end workflows that span systems and departments - orchestrating tasks, managing approvals, and ensuring processes complete reliably with appropriate exception handling.',
        category: 'INTELLIGENCE'
      },
      {
        title: 'AI-Enhanced Automation',
        description: 'We enhance automation with AI capabilities that handle judgment-based decisions, natural language understanding, and adaptive behaviour - extending automation beyond simple rule-based scenarios.',
        category: 'INTELLIGENCE'
      }
    ],
    
    processSubtitle: 'Delivered for forward-thinking enterprises and startups across Australia, UAE, and Qatar over the years.',
    processSteps: [
      {
        stepNumber: '01',
        title: 'PROCESS ASSESSMENT & PRIORITISATION',
        description: 'We assess your processes for automation potential, evaluating volume, complexity, and business value - creating a prioritised roadmap that delivers quick wins while building toward comprehensive automation.',
        image: '/services/intelligent-automation/process-1.png'
      },
      {
        stepNumber: '02',
        title: 'SOLUTION DESIGN & ARCHITECTURE',
        description: 'We design automation solutions that combine appropriate technologies - RPA, AI, workflow tools - architected for reliability, maintainability, and scale.',
        image: '/services/intelligent-automation/process-2.png'
      },
      {
        stepNumber: '03',
        title: 'DEVELOPMENT & TESTING',
        description: 'We develop automation solutions with comprehensive testing including edge cases and exception scenarios - ensuring reliable operation and appropriate error handling.',
        image: '/services/intelligent-automation/process-1.png'
      },
      {
        stepNumber: '04',
        title: 'DEPLOYMENT & CONTINUOUS IMPROVEMENT',
        description: 'We deploy automation with monitoring and analytics, then continuously improve based on performance data - expanding automation scope and handling new scenarios as they emerge.',
        image: '/services/intelligent-automation/process-2.png'
      }
    ],
    
    faqs: [
      {
        question: 'What\'s the difference between RPA and intelligent automation?',
        answer: 'RPA automates rule-based tasks by mimicking human actions. Intelligent automation adds AI capabilities for judgment-based decisions, document understanding, and adaptive behaviour - handling complexity that pure RPA cannot.'
      },
      {
        question: 'How do you handle exceptions and errors in automated processes?',
        answer: 'We design for exceptions from the start - implementing retry logic, escalation paths, and human-in-the-loop handling for cases automation cannot resolve. Monitoring alerts on issues before they impact business operations.'
      },
      {
        question: 'What ROI should we expect from intelligent automation?',
        answer: 'ROI varies by process, but clients typically see 40-70% effort reduction on automated tasks, with payback periods of 6-12 months. We help identify high-value opportunities and build business cases with realistic projections.'
      },
      {
        question: 'Can automation work with our legacy systems?',
        answer: 'Yes. RPA is particularly effective with legacy systems that lack APIs - automating through the user interface. We also build integrations where possible to create more robust, maintainable automation.'
      },
      {
        question: 'How do you ensure automated processes remain compliant?',
        answer: 'We implement audit logging, approval workflows, and compliance checks within automation. Documentation and change management processes maintain regulatory compliance, and monitoring ensures processes operate as designed.'
      }
    ],
    
    nextService: {
      category: 'intelligence',
      slug: 'custom-ai-models',
      name: 'CUSTOM AI MODELS'
    }
  },

  'custom-ai-models': {
    heroSubtitle: 'CUSTOM AI MODEL DEVELOPMENT FOR ENTERPRISES ACROSS AUSTRALIA, UAE & QATAR',
    heroImage: '/services/custom-ai-models/hero.jpg',
    
    experienceTagline: 'BUILDING CUSTOM AI',
    experienceDescription: 'At Appify, we develop custom AI models tailored to your specific business challenges - from fine-tuned language models and domain-specific classifiers to proprietary algorithms that provide competitive advantage across Australia, UAE, and Qatar. We specialise in AI models that work with your unique data and requirements.',
    
    whatWeDoSubtitle: 'BESPOKE AI MODEL DEVELOPMENT FOR ENTERPRISES ACROSS AUSTRALIA, UAE, AND QATAR.',
    offerings: [
      {
        title: 'Custom Model Development',
        description: 'We develop AI models from scratch when off-the-shelf solutions do not meet your requirements - designing architectures and training approaches optimised for your specific use case and data.',
        category: 'INTELLIGENCE'
      },
      {
        title: 'Model Fine-Tuning & Optimisation',
        description: 'We fine-tune foundation models on your domain data to improve performance for specific tasks - achieving accuracy that general-purpose models cannot match while reducing inference costs.',
        category: 'INTELLIGENCE'
      },
      {
        title: 'Domain-Specific AI Solutions',
        description: 'We build AI solutions for specialised domains including legal, medical, financial, and technical fields - incorporating domain knowledge and terminology that improves accuracy and relevance.',
        category: 'INTELLIGENCE'
      },
      {
        title: 'Model Evaluation & Benchmarking',
        description: 'We rigorously evaluate model performance using appropriate metrics and benchmarks - ensuring models meet accuracy, fairness, and robustness requirements before deployment.',
        category: 'INTELLIGENCE'
      }
    ],
    
    processSubtitle: 'Delivered for forward-thinking enterprises and startups across Australia, UAE, and Qatar over the years.',
    processSteps: [
      {
        stepNumber: '01',
        title: 'REQUIREMENTS & DATA ANALYSIS',
        description: 'We analyse your requirements and data to determine the best approach - custom development, fine-tuning, or adaptation of existing models based on your needs and data availability.',
        image: '/services/custom-ai-models/process-1.png'
      },
      {
        stepNumber: '02',
        title: 'MODEL DESIGN & EXPERIMENTATION',
        description: 'We design model architectures and conduct experiments to identify optimal approaches - testing hypotheses and iterating on designs to achieve target performance.',
        image: '/services/custom-ai-models/process-2.png'
      },
      {
        stepNumber: '03',
        title: 'TRAINING & OPTIMISATION',
        description: 'We train models using best practices for data preparation, training, and validation - optimising for accuracy, efficiency, and robustness through rigorous methodology.',
        image: '/services/custom-ai-models/process-1.png'
      },
      {
        stepNumber: '04',
        title: 'EVALUATION & DEPLOYMENT',
        description: 'We evaluate models comprehensively, deploy with appropriate infrastructure, and establish processes for monitoring and updates - ensuring models deliver value in production.',
        image: '/services/custom-ai-models/process-2.png'
      }
    ],
    
    faqs: [
      {
        question: 'When should we build custom AI models vs use off-the-shelf solutions?',
        answer: 'Custom models make sense when off-the-shelf solutions do not achieve required accuracy, you have proprietary data that provides competitive advantage, or you need capabilities that do not exist in available products. We help assess which approach is right.'
      },
      {
        question: 'How much data do we need for custom model development?',
        answer: 'Requirements vary significantly by approach. Fine-tuning can work with hundreds of examples, while training from scratch may need millions. We assess your data during discovery and recommend approaches appropriate to your situation.'
      },
      {
        question: 'How do you ensure custom models are fair and unbiased?',
        answer: 'We evaluate models for bias using appropriate metrics, audit training data for representation issues, and implement testing specifically for fairness. Ongoing monitoring detects drift that could introduce bias over time.'
      },
      {
        question: 'What compute infrastructure is needed for custom AI models?',
        answer: 'We design for your infrastructure constraints - training on cloud GPU resources and optimising models for efficient inference. Solutions can run on cloud, on-premise, or edge devices depending on requirements.'
      },
      {
        question: 'How do you protect our proprietary data during model development?',
        answer: 'We implement strict data handling procedures including access controls, encryption, and secure development environments. Data never leaves your approved infrastructure without explicit permission and appropriate safeguards.'
      }
    ],
    
    nextService: {
      category: 'development',
      slug: 'software-development',
      name: 'SOFTWARE DEVELOPMENT'
    }
  },

  'software-development': {
    heroSubtitle: 'CUSTOM SOFTWARE DEVELOPMENT FOR ENTERPRISES ACROSS AUSTRALIA, UAE & QATAR',
    heroImage: '/services/software-development/hero.jpg',
    
    experienceTagline: 'DEVELOPING CUSTOM SOFTWARE',
    experienceDescription: 'At Appify, we develop custom software solutions that others find too complex to build reliably - from enterprise applications and backend systems to legacy modernisation and cloud-native development across Australia, UAE, and Qatar. We specialise in software that solves unique business challenges with maintainable, scalable code.',
    
    whatWeDoSubtitle: 'CUSTOM SOFTWARE SOLUTIONS FOR ENTERPRISES ACROSS AUSTRALIA, UAE, AND QATAR.',
    offerings: [
      {
        title: 'Custom Application Development',
        description: 'We build bespoke applications tailored to your specific requirements - from internal tools and workflow systems to customer-facing platforms. Software designed for your unique processes and competitive advantage.',
        category: 'DEVELOPMENT'
      },
      {
        title: 'API & Backend Development',
        description: 'We develop robust APIs and backend systems that power applications and enable integration - designing for scalability, security, and maintainability with modern architecture patterns.',
        category: 'DEVELOPMENT'
      },
      {
        title: 'Legacy System Modernisation',
        description: 'We modernise legacy systems incrementally - refactoring code, updating architectures, and migrating to modern platforms while maintaining business continuity and preserving institutional knowledge.',
        category: 'DEVELOPMENT'
      },
      {
        title: 'Cloud-Native Development',
        description: 'We build cloud-native applications optimised for AWS, Azure, and GCP - leveraging managed services, serverless architectures, and containerisation for scalability and operational efficiency.',
        category: 'DEVELOPMENT'
      }
    ],
    
    processSubtitle: 'Delivered for forward-thinking enterprises and startups across Australia, UAE, and Qatar over the years.',
    processSteps: [
      {
        stepNumber: '01',
        title: 'DISCOVERY & REQUIREMENTS',
        description: 'We work with stakeholders to understand business needs, define requirements, and establish success criteria - ensuring we build the right solution with clear scope and priorities.',
        image: '/services/software-development/process-1.png'
      },
      {
        stepNumber: '02',
        title: 'ARCHITECTURE & DESIGN',
        description: 'We design software architecture that balances current needs with future flexibility - making technology choices that support maintainability, scalability, and team capabilities.',
        image: '/services/software-development/process-2.png'
      },
      {
        stepNumber: '03',
        title: 'AGILE DEVELOPMENT & TESTING',
        description: 'We develop software iteratively with continuous testing and stakeholder feedback - delivering working software in sprints that allow for learning and adjustment.',
        image: '/services/software-development/process-1.png'
      },
      {
        stepNumber: '04',
        title: 'DEPLOYMENT & SUPPORT',
        description: 'We deploy software with robust CI/CD pipelines and provide ongoing support - ensuring smooth launches and continuous improvement based on production feedback.',
        image: '/services/software-development/process-2.png'
      }
    ],
    
    faqs: [
      {
        question: 'What technologies and languages do you work with?',
        answer: 'We work across modern technology stacks including TypeScript, Python, Java, .NET, React, Node.js, and more. We recommend technologies based on your requirements, team capabilities, and existing ecosystem.'
      },
      {
        question: 'How do you ensure software quality and maintainability?',
        answer: 'We follow software engineering best practices including code review, automated testing, continuous integration, and documentation. Our code is designed for the next developer, not just to work today.'
      },
      {
        question: 'Can you work with our existing development team?',
        answer: 'Yes. We frequently augment internal teams, provide technical leadership, or work as a collaborative partner. We adapt our engagement model to complement your existing capabilities and ways of working.'
      },
      {
        question: 'How do you handle changing requirements during development?',
        answer: 'We use agile methodologies that embrace change - prioritising backlogs, delivering iteratively, and adjusting scope based on learning. Architecture decisions account for likely changes to maintain flexibility.'
      },
      {
        question: 'What happens after the software is deployed?',
        answer: 'We offer ongoing support and maintenance, knowledge transfer to internal teams, or a combination. We document systems thoroughly and ensure you have the capability to operate and evolve the software long-term.'
      }
    ],
    
    nextService: {
      category: 'development',
      slug: 'web-applications',
      name: 'WEB APPLICATIONS'
    }
  },

  'web-applications': {
    heroSubtitle: 'CUSTOM WEB APPLICATION DEVELOPMENT FOR ENTERPRISES ACROSS AUSTRALIA, UAE & QATAR',
    heroImage: '/services/web-applications/hero.jpg',
    
    experienceTagline: 'BUILDING WEB APPS THAT PERFORM',
    experienceDescription: 'At Appify, we develop custom web applications that deliver desktop-level functionality through browsers - from progressive web apps and single page applications to enterprise portals and real-time systems across Australia, UAE, and Qatar. We specialise in web applications that are fast, accessible, and maintainable.',
    
    whatWeDoSubtitle: 'RESPONSIVE WEB APPLICATIONS FOR ENTERPRISES ACROSS AUSTRALIA, UAE, AND QATAR.',
    offerings: [
      {
        title: 'Progressive Web Apps (PWA)',
        description: 'We build progressive web apps that combine web reach with app-like experience - offline capability, push notifications, and home screen installation. Modern web technology that works everywhere.',
        category: 'DEVELOPMENT'
      },
      {
        title: 'Single Page Applications (SPA)',
        description: 'We develop single page applications with smooth navigation and responsive interfaces - using React, Vue, or Angular to create fluid user experiences that rival native applications.',
        category: 'DEVELOPMENT'
      },
      {
        title: 'Customer & Enterprise Portals',
        description: 'We build customer portals and enterprise applications that serve complex workflows - from self-service platforms and dashboards to internal tools that improve operational efficiency.',
        category: 'DEVELOPMENT'
      },
      {
        title: 'Real-time Web Applications',
        description: 'We develop web applications with real-time capabilities - live updates, collaborative features, and streaming data. WebSocket and server-sent events for instant, responsive experiences.',
        category: 'DEVELOPMENT'
      }
    ],
    
    processSubtitle: 'Delivered for forward-thinking enterprises and startups across Australia, UAE, and Qatar over the years.',
    processSteps: [
      {
        stepNumber: '01',
        title: 'REQUIREMENTS & USER EXPERIENCE',
        description: 'We define requirements and design user experiences that meet business goals and user needs - creating wireframes and prototypes that validate concepts before development.',
        image: '/services/web-applications/process-1.png'
      },
      {
        stepNumber: '02',
        title: 'ARCHITECTURE & TECHNOLOGY',
        description: 'We design technical architecture and select technologies appropriate for your requirements - considering performance, scalability, team capabilities, and long-term maintainability.',
        image: '/services/web-applications/process-2.png'
      },
      {
        stepNumber: '03',
        title: 'DEVELOPMENT & TESTING',
        description: 'We develop iteratively with continuous testing across browsers and devices - ensuring responsive, accessible applications that work reliably for all users.',
        image: '/services/web-applications/process-1.png'
      },
      {
        stepNumber: '04',
        title: 'OPTIMISATION & DEPLOYMENT',
        description: 'We optimise performance, implement monitoring, and deploy with robust infrastructure - ensuring fast, reliable applications with visibility into real-world usage.',
        image: '/services/web-applications/process-2.png'
      }
    ],
    
    faqs: [
      {
        question: 'What frontend frameworks do you work with?',
        answer: 'We work with React, Next.js, Vue, and Angular - recommending frameworks based on project requirements, team familiarity, and ecosystem considerations. Our preference is for typed, maintainable code regardless of framework.'
      },
      {
        question: 'How do you ensure web applications are accessible?',
        answer: 'We follow WCAG guidelines and test with assistive technologies throughout development. Accessibility is built in from the start, not added at the end - ensuring applications work for users with diverse abilities.'
      },
      {
        question: 'Can you build web applications that work offline?',
        answer: 'Yes. Progressive Web App technology enables offline capability, background sync, and app-like experiences. We implement service workers and caching strategies appropriate for your use case.'
      },
      {
        question: 'How do you handle performance for complex web applications?',
        answer: 'We implement performance budgets, code splitting, lazy loading, and caching strategies. Performance is monitored throughout development and in production - ensuring applications remain fast as they grow.'
      },
      {
        question: 'What about SEO for web applications?',
        answer: 'We implement server-side rendering, proper metadata, and semantic HTML for SEO-critical applications. For internal tools where SEO is not needed, we optimise for user experience and performance instead.'
      }
    ],
    
    nextService: {
      category: 'development',
      slug: 'app-development',
      name: 'APP DEVELOPMENT'
    }
  },

  'app-development': {
    heroSubtitle: 'CUSTOM MOBILE APP DEVELOPMENT FOR IOS AND ANDROID ACROSS AUSTRALIA, UAE & QATAR',
    heroImage: '/services/app-development/hero.jpg',
    
    experienceTagline: 'BUILDING APPS USERS LOVE',
    experienceDescription: 'At Appify, we develop custom mobile applications that users love to use - from native iOS and Android apps to cross-platform solutions and enterprise mobile deployments across Australia, UAE, and Qatar. We specialise in mobile experiences that combine beautiful design with robust engineering.',
    
    whatWeDoSubtitle: 'NATIVE AND CROSS-PLATFORM MOBILE APPLICATIONS FOR ENTERPRISES AND STARTUPS ACROSS AUSTRALIA, UAE, AND QATAR.',
    offerings: [
      {
        title: 'Native iOS & Android Apps',
        description: 'We build native mobile applications that leverage platform-specific capabilities - delivering optimal performance, native UI patterns, and deep integration with device features.',
        category: 'DEVELOPMENT'
      },
      {
        title: 'Cross-Platform App Development',
        description: 'We develop cross-platform applications using React Native and Flutter - sharing code across iOS and Android while maintaining native-quality experiences and efficient development.',
        category: 'DEVELOPMENT'
      },
      {
        title: 'Enterprise Mobile Solutions',
        description: 'We build enterprise mobile applications for internal operations - field service apps, inventory management, and workflow tools that improve productivity and enable mobile-first operations.',
        category: 'DEVELOPMENT'
      },
      {
        title: 'MVP & Startup App Development',
        description: 'We build MVPs and startup applications that validate ideas quickly - iterating rapidly based on user feedback while establishing foundations for scale when product-market fit is achieved.',
        category: 'DEVELOPMENT'
      }
    ],
    
    processSubtitle: 'Delivered for forward-thinking enterprises and startups across Australia, UAE, and Qatar over the years.',
    processSteps: [
      {
        stepNumber: '01',
        title: 'DISCOVERY & UX STRATEGY',
        description: 'We research users, define requirements, and create UX strategies that guide app development - ensuring we build mobile experiences that meet real user needs and business goals.',
        image: '/services/app-development/process-1.png'
      },
      {
        stepNumber: '02',
        title: 'DESIGN & PROTOTYPING',
        description: 'We design mobile interfaces following platform guidelines and best practices - creating interactive prototypes that validate concepts and align stakeholders before development.',
        image: '/services/app-development/process-2.png'
      },
      {
        stepNumber: '03',
        title: 'AGILE APP DEVELOPMENT',
        description: 'We develop apps iteratively with regular builds and testing - maintaining quality through automated testing, code review, and continuous integration throughout development.',
        image: '/services/app-development/process-1.png'
      },
      {
        stepNumber: '04',
        title: 'TESTING & APP STORE LAUNCH',
        description: 'We conduct comprehensive testing, manage app store submissions, and support launch activities - ensuring smooth releases and successful user adoption.',
        image: '/services/app-development/process-2.png'
      }
    ],
    
    faqs: [
      {
        question: 'Should we build native or cross-platform apps?',
        answer: 'It depends on your requirements. Native apps offer best performance and platform integration. Cross-platform reduces development cost and time-to-market. We help evaluate trade-offs based on your specific needs and constraints.'
      },
      {
        question: 'How long does mobile app development typically take?',
        answer: 'Timelines vary significantly based on scope - simple apps may take 2-3 months, while complex applications can take 6-12 months. We provide estimates after understanding your requirements and work iteratively to deliver value early.'
      },
      {
        question: 'How do you handle app store submission and approval?',
        answer: 'We manage the entire submission process - preparing assets, writing descriptions, configuring settings, and addressing reviewer feedback. Our experience with both app stores helps avoid common rejection reasons.'
      },
      {
        question: 'What happens after the app is launched?',
        answer: 'We offer ongoing maintenance, feature development, and support. Apps require regular updates for OS compatibility, security patches, and feature improvements - we help plan for sustainable long-term maintenance.'
      },
      {
        question: 'Can you integrate with our backend systems and APIs?',
        answer: 'Yes. Mobile apps typically require backend integration for data, authentication, and business logic. We design APIs and integrations that support mobile requirements including offline capability and efficient data transfer.'
      }
    ],
    
    nextService: {
      category: 'development',
      slug: 'erp-solutions',
      name: 'ERP SOLUTIONS'
    }
  },

  'erp-solutions': {
    heroSubtitle: 'CUSTOM ERP DEVELOPMENT AND IMPLEMENTATION FOR ENTERPRISES ACROSS AUSTRALIA, UAE & QATAR',
    heroImage: '/services/erp-solutions/hero.jpg',
    
    experienceTagline: 'UNIFIED BUSINESS MANAGEMENT',
    experienceDescription: 'At Appify, we develop custom ERP solutions that unify business operations - from financial management and supply chain to HR and operations across Australia, UAE, and Qatar. We specialise in ERP implementations that fit your processes rather than forcing you to adapt to rigid software.',
    
    whatWeDoSubtitle: 'ERP SYSTEMS AND ENTERPRISE RESOURCE PLANNING FOR ORGANISATIONS ACROSS AUSTRALIA, UAE, AND QATAR.',
    offerings: [
      {
        title: 'Custom ERP Development',
        description: 'We build custom ERP systems tailored to your industry and processes - from ground-up development to extensions of existing platforms. Enterprise software that matches how you work.',
        category: 'DEVELOPMENT'
      },
      {
        title: 'ERP Implementation & Integration',
        description: 'We implement and integrate ERP platforms including SAP, Oracle, and Microsoft Dynamics - configuring, customising, and connecting with your existing systems for unified operations.',
        category: 'DEVELOPMENT'
      },
      {
        title: 'Financial & Accounting Modules',
        description: 'We develop and implement financial modules covering general ledger, accounts payable and receivable, budgeting, and reporting - providing accurate, timely financial visibility.',
        category: 'DEVELOPMENT'
      },
      {
        title: 'Supply Chain & Inventory Management',
        description: 'We build supply chain and inventory modules that optimise procurement, warehouse operations, and logistics - improving visibility, reducing costs, and enabling better decisions.',
        category: 'DEVELOPMENT'
      }
    ],
    
    processSubtitle: 'Delivered for forward-thinking enterprises and startups across Australia, UAE, and Qatar over the years.',
    processSteps: [
      {
        stepNumber: '01',
        title: 'PROCESS ANALYSIS & REQUIREMENTS',
        description: 'We analyse your business processes and define ERP requirements - understanding how you work today and designing systems that improve operations while fitting your organisation.',
        image: '/services/erp-solutions/process-1.png'
      },
      {
        stepNumber: '02',
        title: 'SYSTEM DESIGN & ARCHITECTURE',
        description: 'We design ERP architecture and module structure - planning data models, workflows, integrations, and user interfaces that support your operations.',
        image: '/services/erp-solutions/process-2.png'
      },
      {
        stepNumber: '03',
        title: 'PHASED IMPLEMENTATION',
        description: 'We implement ERP in phases that deliver value incrementally - reducing risk through manageable rollouts and allowing for learning and adjustment throughout the project.',
        image: '/services/erp-solutions/process-1.png'
      },
      {
        stepNumber: '04',
        title: 'TRAINING, GO-LIVE & SUPPORT',
        description: 'We provide comprehensive training, manage go-live activities, and offer ongoing support - ensuring successful adoption and continuous improvement of your ERP investment.',
        image: '/services/erp-solutions/process-2.png'
      }
    ],
    
    faqs: [
      {
        question: 'Should we build custom ERP or implement a commercial platform?',
        answer: 'It depends on your requirements and budget. Commercial platforms offer proven functionality but may require process changes. Custom development fits your processes exactly but requires more investment. We help evaluate both options.'
      },
      {
        question: 'How long does ERP implementation typically take?',
        answer: 'ERP timelines range from 6 months for focused implementations to 2+ years for full enterprise rollouts. We use phased approaches that deliver value early while building toward comprehensive solutions.'
      },
      {
        question: 'How do you minimise disruption during ERP implementation?',
        answer: 'We use parallel running, phased rollouts, and comprehensive training to minimise disruption. Change management is integral to our approach - helping users adapt to new systems while maintaining business operations.'
      },
      {
        question: 'Can you integrate ERP with our existing systems?',
        answer: 'Yes. Integration is typically essential for ERP success. We connect ERP systems with CRM, ecommerce, manufacturing, and other applications - ensuring unified data and streamlined processes.'
      },
      {
        question: 'What industries do you have ERP experience in?',
        answer: 'We have ERP experience across manufacturing, distribution, professional services, and retail - bringing industry-specific knowledge of processes, requirements, and best practices to every engagement.'
      }
    ],
    
    nextService: {
      category: 'development',
      slug: 'system-integration',
      name: 'SYSTEM INTEGRATION'
    }
  },

  'system-integration': {
    heroSubtitle: 'ENTERPRISE SYSTEM INTEGRATION CONNECTING APPLICATIONS AND DATA ACROSS AUSTRALIA, UAE & QATAR',
    heroImage: '/services/system-integration/hero.jpg',
    
    experienceTagline: 'CONNECTING YOUR SYSTEMS',
    experienceDescription: 'At Appify, we develop system integration solutions that connect disparate applications, databases, and services - from API development and enterprise service buses to data integration and legacy connectivity across Australia, UAE, and Qatar. We specialise in integration that creates unified, reliable data flows.',
    
    whatWeDoSubtitle: 'ENTERPRISE SYSTEM INTEGRATION FOR ORGANISATIONS ACROSS AUSTRALIA, UAE, AND QATAR.',
    offerings: [
      {
        title: 'API Development & Management',
        description: 'We design and develop APIs that enable system connectivity - RESTful services, GraphQL endpoints, and API gateways that provide secure, manageable access to enterprise capabilities.',
        category: 'DEVELOPMENT'
      },
      {
        title: 'Enterprise Service Bus (ESB)',
        description: 'We implement enterprise service bus solutions that orchestrate communication between systems - message routing, transformation, and protocol mediation for complex integration scenarios.',
        category: 'DEVELOPMENT'
      },
      {
        title: 'Data Integration & ETL',
        description: 'We build data integration pipelines that synchronise information across systems - ETL processes, real-time streaming, and data quality management that ensure consistent, accurate data.',
        category: 'DEVELOPMENT'
      },
      {
        title: 'Legacy System Integration',
        description: 'We connect legacy systems with modern applications - building adapters, APIs, and middleware that extend the life of existing investments while enabling digital transformation.',
        category: 'DEVELOPMENT'
      }
    ],
    
    processSubtitle: 'Delivered for forward-thinking enterprises and startups across Australia, UAE, and Qatar over the years.',
    processSteps: [
      {
        stepNumber: '01',
        title: 'INTEGRATION ASSESSMENT & STRATEGY',
        description: 'We assess your systems landscape and integration requirements - mapping data flows, identifying pain points, and developing integration strategies aligned with business objectives.',
        image: '/services/system-integration/process-1.png'
      },
      {
        stepNumber: '02',
        title: 'ARCHITECTURE & DESIGN',
        description: 'We design integration architecture including patterns, technologies, and governance - creating blueprints for reliable, maintainable integration that scales with your needs.',
        image: '/services/system-integration/process-2.png'
      },
      {
        stepNumber: '03',
        title: 'DEVELOPMENT & TESTING',
        description: 'We develop integration solutions with comprehensive testing - validating data accuracy, error handling, and performance under realistic conditions.',
        image: '/services/system-integration/process-1.png'
      },
      {
        stepNumber: '04',
        title: 'DEPLOYMENT & MONITORING',
        description: 'We deploy integrations with monitoring and alerting - ensuring reliable operation with visibility into data flows and rapid response to issues.',
        image: '/services/system-integration/process-2.png'
      }
    ],
    
    faqs: [
      {
        question: 'What integration patterns do you recommend?',
        answer: 'Pattern selection depends on requirements - point-to-point for simple scenarios, hub-and-spoke for centralised management, or event-driven for real-time needs. We recommend patterns based on your specific context and scalability requirements.'
      },
      {
        question: 'How do you handle integration with systems that lack APIs?',
        answer: 'We build adapters using available interfaces - database connections, file transfers, screen scraping, or custom protocols. Legacy integration often requires creative approaches to extract and inject data reliably.'
      },
      {
        question: 'What integration platforms do you work with?',
        answer: 'We work with major platforms including MuleSoft, Dell Boomi, Microsoft Azure Integration Services, and AWS integration services - as well as open-source tools. We recommend platforms based on your requirements and existing investments.'
      },
      {
        question: 'How do you ensure data quality across integrated systems?',
        answer: 'We implement validation, transformation, and cleansing as part of integration pipelines. Master data management and data governance practices ensure consistency - integrations include monitoring for data quality issues.'
      },
      {
        question: 'Can you help with real-time vs batch integration decisions?',
        answer: 'Yes. We evaluate requirements for timeliness, volume, and system capabilities to recommend appropriate patterns. Real-time adds complexity and cost - we help determine where it provides business value vs where batch is sufficient.'
      }
    ],
    
    nextService: {
      category: 'strategy',
      slug: 'digital-transformation',
      name: 'DIGITAL TRANSFORMATION'
    }
  }
};

// Helper function to get service page content
export const getServicePageContent = (serviceSlug: string): ServicePageContent | undefined => {
  return servicePageContent[serviceSlug];
};
