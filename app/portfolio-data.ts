export interface PortfolioProject {
  id: string;
  client: string;
  category: string; // e.g. "HEALTHCARE", "PRIVATE-LABEL MANUFACTURING"
  categoryDisplay: string; // e.g. "Healthcare", "Manufacturing"
  headline: string; // Subtitle / headline in full project
  summary: string; // Before hover card description
  problem: string; // After hover problem
  solution: string; // After hover solution
  challenge: string; // Full project challenge text
  fullSolution: string; // Full project solution text
  outcome: string; // Full project outcome text
  disciplines: string[]; // Disciplines list
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "dr-asghar-endocrinology",
    client: "Dr. Asghar Endocrinology",
    category: "HEALTHCARE",
    categoryDisplay: "Healthcare",
    headline: "Building a credible digital presence for a specialist endocrinology practice.",
    summary: "A specialist endocrinology practice needed a credible digital presence that communicated expertise, organised its services, and guided patients towards the right care.",
    problem: "The practice needed to communicate its specialist expertise clearly while helping patients understand its services and next steps.",
    solution: "We refined the brand communication, positioned the services, mapped the patient journey, and developed a clearer website experience.",
    challenge: "The practice needed more than a visually polished website. Its specialist knowledge, services, and approach to patient care had to be translated into language that patients could understand and trust.\n\nThe website also needed a clearer structure that would help visitors identify the appropriate service and understand what to do next.",
    fullSolution: "We refined the practice’s brand communication, clarified its specialist positioning, mapped the patient journey, and developed the website structure and content around the questions patients were most likely to have.\n\nThe website was designed to balance medical credibility with clear, accessible communication.",
    outcome: "The practice gained a more credible and organised digital presence that communicated its expertise while making it easier for patients to understand the available services and seek the appropriate care.",
    disciplines: [
      "Brand Communication",
      "Service Positioning",
      "Patient Journey Mapping",
      "Website Strategy",
      "Website Content",
      "Website Development"
    ]
  },
  {
    id: "kufi-factory",
    client: "Kufi Factory",
    category: "PRIVATE-LABEL MANUFACTURING",
    categoryDisplay: "Manufacturing",
    headline: "Positioning a regional Kufi manufacturer for international private-label clients.",
    summary: "A Kufi cap manufacturer operating in Egypt and Saudi Arabia needed clearer positioning for international brands seeking private-label production.",
    problem: "An established manufacturer needed clearer positioning to attract international brands seeking reliable private-label Kufi production.",
    solution: "We repositioned the business around its manufacturing capabilities and strengthened its communication for international B2B clients.",
    challenge: "Kufi Factory had the manufacturing capability, production knowledge, and regional presence required to serve international clients, but its business was not positioned clearly for that market.\n\nProspective buyers needed to understand that the company was not simply selling finished caps. It could manufacture custom Kufi caps for businesses, retailers, and brands through private-label arrangements.",
    fullSolution: "We refined the company’s business positioning around private-label manufacturing, clarified its ideal international customer, and strengthened the language used to communicate its production capabilities.\n\nWe also structured its digital messaging around the information international buyers need when evaluating a manufacturing partner.",
    outcome: "Kufi Factory gained a clearer international-facing proposition that presented the company as a manufacturing partner rather than only a product seller.\n\nIts offer became easier for brands, retailers, and private-label buyers to understand and evaluate.",
    disciplines: [
      "Business Positioning",
      "Private-Label Strategy",
      "B2B Communication",
      "International Market Positioning",
      "Service Communication",
      "Digital Discovery Strategy"
    ]
  },
  {
    id: "golden-sand-consultancy",
    client: "Golden Sand Consultancy",
    category: "REAL ESTATE CONSULTANCY",
    categoryDisplay: "Real Estate",
    headline: "Taking a real estate consultancy from initial idea to a structured, launch-ready brand.",
    summary: "A real estate idea needed to become a credible consultancy with a defined offer, professional identity, and clear path to launch.",
    problem: "A real estate idea needed a defined offer, credible identity, and clear foundation for entering a competitive market.",
    solution: "We developed the concept, refined the offer, shaped the brand identity, and created the communication required for launch.",
    challenge: "The business began with an idea and industry knowledge, but it needed a clear concept, stronger service positioning, and a brand capable of establishing trust in a competitive real estate market.\n\nThe offer, communication, identity, and digital presence had to be developed as one connected business foundation.",
    fullSolution: "We helped shape the initial idea into a structured real estate consultancy.\n\nThe work included business and brand ideation, offer refinement, service positioning, brand identity direction, website content, and launch communication.",
    outcome: "Golden Sand Consultancy gained a cohesive business foundation, a clearer value proposition, and a professional brand presence prepared for launch.",
    disciplines: [
      "Business Ideation",
      "Offer Refinement",
      "Service Positioning",
      "Brand Strategy",
      "Brand Identity",
      "Website Content",
      "Launch Communication"
    ]
  },
  {
    id: "halal-investment-company",
    client: "Halal Investment Company",
    category: "FINTECH",
    categoryDisplay: "Fintech",
    headline: "Creating a more cohesive brand, application experience, and investor story for a halal fintech platform.",
    summary: "A halal investment platform needed stronger communication for its application, users, partners, and potential investors.",
    problem: "A halal fintech platform needed more cohesive communication across its application, brand assets, and investor story.",
    solution: "We refined the brand assets, supported the application interface, developed digital content, and created an investor pitch deck.",
    challenge: "The company was developing a fintech application based on halal investment principles, but its brand communication, digital assets, interface, and investor story needed greater consistency.\n\nThe platform had to explain its purpose clearly to users while also presenting a credible commercial opportunity to partners and potential investors.",
    fullSolution: "We refined the company’s brand communication and existing brand assets, supported the application’s user-interface design, and created social media assets that strengthened its visual consistency.\n\nWe also developed an investor pitch deck that organised the platform concept, business opportunity, market proposition, and investment story into a clearer presentation.",
    outcome: "The company gained a more cohesive brand system, a stronger application experience, and a clearer investor-facing narrative for fundraising and partnership conversations.",
    disciplines: [
      "Brand Communication",
      "Brand Asset Refinement",
      "Application UI Design",
      "Digital Brand Assets",
      "Social Media Assets",
      "Investor Storytelling",
      "Pitch Deck Development"
    ]
  },
  {
    id: "pure-squeeze",
    client: "Pure Squeeze",
    category: "FOOD & BEVERAGE",
    categoryDisplay: "Food & Beverage",
    headline: "Building a cold-pressed juice concept into an operating consumer brand in Cairo.",
    summary: "A cold-pressed juice concept needed to become a functioning consumer brand with clear products, packaging, ordering, and launch operations.",
    problem: "A cold-pressed juice concept needed products, packaging, suppliers, pricing, ordering systems, and a practical launch model.",
    solution: "We developed the business from idea to launch, creating its brand, products, packaging, website, customer journey, and operating structure.",
    challenge: "The concept began with a commitment to producing real, cold-pressed juice without added sugar, water, concentrates, or preservatives.\n\nTurning that idea into an operating business required product development, pricing, packaging, supplier sourcing, brand communication, digital ordering, and a production model that could work at a small-business level.",
    fullSolution: "We developed Pure Squeeze from initial concept to launch.\n\nThis included the business and brand direction, product menu, product positioning, bilingual communication, packaging selection, packaging-resource sourcing, label messaging, pricing structure, website, and WhatsApp ordering journey.\n\nWe also structured the preorder and production model around scheduled juicing and delivery days.",
    outcome: "Pure Squeeze became a functioning Cairo-based consumer brand with defined products, a clear customer promise, established packaging, and an integrated journey from discovery to order and delivery.",
    disciplines: [
      "Business Development",
      "Product Architecture",
      "Brand Strategy",
      "Packaging Development",
      "Supplier Sourcing",
      "Pricing",
      "Bilingual Communication",
      "Website Development",
      "Customer Journey Design",
      "Launch Operations"
    ]
  },
  {
    id: "eden-afrique",
    client: "Eden Afrique",
    category: "RETAIL & LIFESTYLE",
    categoryDisplay: "Retail & Lifestyle",
    headline: "Transforming an African-inspired lifestyle concept into a complete physical retail space.",
    summary: "An African-inspired lifestyle concept needed to be transformed from an empty physical space into a complete retail experience.",
    problem: "An empty retail space and an African-inspired concept needed to become a complete physical store and customer experience.",
    solution: "We coordinated the concept, interior direction, renovation, product sourcing, suppliers, packaging, and retail launch.",
    challenge: "Eden Afrique began as an idea for a physical lifestyle store inspired by African products, design, and culture.\n\nThe project required more than a brand identity. The space needed to be planned and renovated, while products, suppliers, fixtures, packaging, and the overall customer experience had to be brought together before the business could open.",
    fullSolution: "We helped develop the business concept and translate it into a physical retail environment.\n\nOur contribution included positioning, interior design direction, renovation coordination, supplier research, product sourcing, fixture sourcing, packaging decisions, and retail launch preparation.",
    outcome: "The project moved from an empty location and broad concept to a completed physical store in which the space, products, presentation, and brand worked together as one customer experience.",
    disciplines: [
      "Business Concept Development",
      "Retail Positioning",
      "Interior Design Direction",
      "Renovation Coordination",
      "Supplier Sourcing",
      "Product Sourcing",
      "Fixture Sourcing",
      "Packaging Selection",
      "Retail Experience",
      "Launch Coordination"
    ]
  },
  {
    id: "zahra-layaali",
    client: "Zahra Layaali",
    category: "LUXURY JEWELRY",
    categoryDisplay: "Luxury Jewelry",
    headline: "Developing the foundation and production pathway for a luxury jewelry brand.",
    summary: "A luxury jewelry idea needed a defined commercial concept, premium positioning, and the right production partner to bring its designs into reality.",
    problem: "A luxury jewelry idea needed stronger positioning, product direction, and the right manufacturer to bring it into reality.",
    solution: "We refined the business concept, shaped its luxury position, and sourced a production partner capable of developing its jewelry.",
    challenge: "The vision was to create a refined jewelry brand capable of offering distinctive, world-class pieces.\n\nTo move forward, the idea needed a clearer business direction, a defined luxury position, and access to a supplier with the technical ability to translate the creative vision into high-quality jewelry.",
    fullSolution: "We developed the business concept, refined the brand’s luxury positioning, and shaped the foundation for its product and customer experience.\n\nWe also researched and sourced a suitable jewelry production partner capable of developing custom pieces to the required standard.",
    outcome: "The original idea became a defined luxury brand concept with a clearer position, product direction, and practical production pathway.",
    disciplines: [
      "Business Ideation",
      "Luxury Brand Positioning",
      "Product Direction",
      "Supplier Research",
      "Manufacturer Sourcing",
      "Product Development Coordination",
      "Launch Foundation"
    ]
  }
];
