export interface PortfolioProject {
  id: string;
  client: string;
  category: string;
  categoryDisplay: string;
  challenge: string;
  solution: string;
  fullCaseStudy: string[];
  keyResults: string[];
  toolsUsed: string[];
  featured?: boolean;
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "daarul-quraan-islamic-school",
    client: "Daarul Quraan Islamic School",
    category: "ISLAMIC EDUCATION",
    categoryDisplay: "Islamic Education",
    challenge:
      "A mission-led Islamic school needed clearer business structure, stronger parent-facing communication, and a modern digital foundation to support trust, enrollment, and daily operations.",
    solution:
      "We refined the school’s business direction, strengthened the brand communication, structured the website experience, and introduced digital systems to help the school operate with more clarity and professionalism.",
    fullCaseStudy: [
      "Daarul Quraan Islamic School carried a strong educational mission, but needed the structure and digital presence to communicate that mission with more confidence. The work focused on helping the school become easier for parents to understand, easier to trust, and easier to engage with.",
      "As a business development partner, we supported the school beyond visuals. We helped clarify the offer, organize the communication, shape the website direction, and improve the digital foundation behind the parent experience. The goal was to help the school move from informal visibility into a more structured and professional education brand.",
    ],
    keyResults: [
      "Clearer school positioning",
      "Stronger parent-facing communication",
      "Improved website and digital structure",
      "Better foundation for enrollment and operations",
    ],
    toolsUsed: [
      "Business Development",
      "Website Strategy",
      "Brand Communication",
      "Digital Systems",
    ],
    featured: true,
  },
  {
    id: "dr-asghar-endocrinology",
    client: "Dr. Asghar Endocrinology",
    category: "HEALTHCARE",
    categoryDisplay: "Healthcare",
    challenge:
      "An endocrinology practice needed a credible digital presence that communicated medical expertise, patient trust, and specialist care with clarity.",
    solution:
      "We developed the brand communication, website structure, service positioning, and patient journey messaging for a professional endocrinology brand.",
    fullCaseStudy: [
      "Dr. Asghar’s endocrinology project needed more than a website. The practice needed a clear digital identity that could communicate medical authority while still feeling accessible and patient-centered.",
      "We shaped the positioning, clarified the service communication, and structured the website experience around patient trust, specialist expertise, and clarity. The result was a more polished healthcare presence that helped the practice communicate its value with professionalism and confidence.",
    ],
    keyResults: [
      "Clear specialist positioning",
      "Stronger patient trust messaging",
      "Professional healthcare website direction",
      "Improved service communication",
    ],
    toolsUsed: [
      "Brand Communication",
      "Website Strategy",
      "Service Positioning",
      "Patient Journey Mapping",
    ],
    featured: true,
  },
  {
    id: "kufi-factory",
    client: "Kufi Factory",
    category: "ISLAMIC FASHION",
    categoryDisplay: "Islamic Fashion",
    challenge:
      "An Islamic fashion brand needed clearer positioning, stronger product communication, and a more structured digital identity to support future growth.",
    solution:
      "We refined the business direction, clarified the brand message, and shaped the digital presence to help the brand present its products with confidence and commercial clarity.",
    fullCaseStudy: [
      "Kufi Factory had a valuable product concept but needed a stronger business and brand foundation. The challenge was to help the brand move from product idea into a clearer market position.",
      "We worked on the brand direction, product communication, and digital presentation so the business could feel more organized, recognizable, and ready for growth. The focus was on building a Muslim-owned product brand with clearer identity, stronger messaging, and better customer understanding.",
    ],
    keyResults: [
      "Clearer brand positioning",
      "Improved product communication",
      "More professional digital identity",
      "Stronger foundation for online sales",
    ],
    toolsUsed: [
      "Business Development",
      "Brand Strategy",
      "Product Positioning",
      "Digital Identity",
    ],
    featured: true,
  },
  {
    id: "abu-attar-company",
    client: "Abu Attar Company",
    category: "ISLAMIC LIFESTYLE",
    categoryDisplay: "Islamic Lifestyle",
    challenge:
      "An Islamic lifestyle company needed a more refined brand identity and clearer product communication across its men’s products and Sunnah-inspired items.",
    solution:
      "We developed the brand direction, product positioning, packaging ideas, and customer communication style to create a cleaner and more premium brand experience.",
    fullCaseStudy: [
      "Abu Attar Company needed greater cohesion across its product range. The business had the foundation of an Islamic lifestyle brand, but needed clearer positioning and a more refined customer experience.",
      "We supported the brand through business direction, product messaging, packaging concepts, and communication strategy. The goal was to help the company present its products in a way that felt trustworthy, intentional, and commercially polished while staying connected to its Islamic values.",
    ],
    keyResults: [
      "More refined Islamic lifestyle positioning",
      "Clearer product categories and messaging",
      "Improved packaging direction",
      "Stronger customer experience",
    ],
    toolsUsed: [
      "Brand Strategy",
      "Product Communication",
      "Packaging Direction",
      "Customer Experience",
    ],
  },
  {
    id: "golden-sand-consultancy",
    client: "Golden Sand Consultancy",
    category: "REAL ESTATE CONSULTANCY",
    categoryDisplay: "Real Estate",
    challenge:
      "A real estate consultancy needed a credible brand presence and clearer communication to position its services with trust and professionalism.",
    solution:
      "We created strategic brand messaging and business positioning to help the consultancy communicate its services clearly in a competitive real estate market.",
    fullCaseStudy: [
      "Golden Sand Consultancy needed to build trust quickly. In real estate, clarity and credibility are essential because clients are making major financial decisions and need confidence in who they are working with.",
      "We supported the consultancy by refining its positioning, service communication, and brand messaging. The work helped create a clearer foundation for presenting the company as a serious, reliable, and professional real estate consultancy.",
    ],
    keyResults: [
      "Clearer consultancy positioning",
      "Stronger trust-based messaging",
      "More professional service presentation",
      "Improved market communication",
    ],
    toolsUsed: [
      "Business Positioning",
      "Brand Messaging",
      "Service Strategy",
      "Real Estate Communication",
    ],
  },
  {
    id: "halal-investment-company",
    client: "Halal Investment Company",
    category: "FINTECH",
    categoryDisplay: "Fintech",
    challenge:
      "A halal investment company needed clear launch communication for its app, including a stronger story for users, partners, and potential investors.",
    solution:
      "We supported the app launch with pitch deck development, brand communication, and strategic messaging rooted in clarity, trust, and halal investment principles.",
    fullCaseStudy: [
      "The halal investment company needed to communicate a serious financial product in a way that was clear, credible, and aligned with the expectations of Muslim users and investors. The challenge was to explain the platform’s value without losing the trust and ethical sensitivity required in the Islamic finance space.",
      "We helped develop the pitch deck, app launch messaging, and brand communication. The focus was on making the company’s vision easier to understand for users, partners, and investors while keeping the message grounded in halal investment values.",
    ],
    keyResults: [
      "Clearer app launch story",
      "Stronger pitch deck structure",
      "Improved investor and partner communication",
      "More trustworthy halal finance messaging",
    ],
    toolsUsed: [
      "Pitch Deck",
      "Launch Strategy",
      "Brand Communication",
      "Fintech Positioning",
    ],
  },
  {
    id: "pure-squeeze",
    client: "Pure Squeeze",
    category: "FOOD & BEVERAGE",
    categoryDisplay: "Food & Beverage",
    challenge:
      "A fresh juice concept needed to become a launch-ready business with clear products, packaging, ordering, payment, and customer communication.",
    solution:
      "We developed the brand direction, product menu, bilingual copy, label messaging, website structure, WhatsApp order flow, and preorder-based launch communication.",
    fullCaseStudy: [
      "Pure Squeeze needed to move from idea into execution. The business required more than a nice logo or menu. It needed a clear customer journey, defined products, practical ordering, payment instructions, bilingual communication, and packaging that could support a real launch.",
      "We built the launch foundation around product clarity, customer convenience, and simple operations. The work included menu development, label copy, English and Arabic messaging, website structure, WhatsApp ordering, and preorder communication. The result was a food and beverage brand with a practical structure for selling directly to customers.",
    ],
    keyResults: [
      "Launch-ready product menu",
      "Clear WhatsApp ordering journey",
      "Bilingual customer communication",
      "Packaging and label direction created",
    ],
    toolsUsed: [
      "Brand Strategy",
      "Website Structure",
      "Packaging Copy",
      "Customer Journey",
      "WhatsApp Sales Flow",
    ],
  },
  {
    id: "leverage-ai-solutions",
    client: "Leverage AI Solutions",
    category: "AI SERVICES",
    categoryDisplay: "AI Services",
    challenge:
      "Women wanted to use AI in their businesses but lacked the structure, workflows, and practical setup to make AI useful in daily operations.",
    solution:
      "We built the brand strategy, offer structure, service positioning, and communication framework for an AI solutions company focused on practical business implementation.",
    fullCaseStudy: [
      "Leverage AI Solutions was created to help women move beyond scattered prompts and use AI as a real business support system. The challenge was to position the brand clearly without making it feel like another trend-based AI offer.",
      "We developed the business direction, service structure, offer categories, brand messaging, and communication framework. The result was a more focused AI services brand built around implementation, workflows, and helping women use technology to work with more clarity and control.",
    ],
    keyResults: [
      "Clear AI service positioning",
      "Defined offer structure",
      "Stronger business communication",
      "Practical implementation-focused messaging",
    ],
    toolsUsed: [
      "Offer Development",
      "AI Strategy",
      "Workflow Planning",
      "Brand Communication",
    ],
  },
  {
    id: "baytul-muhaajirun",
    client: "Baytul Muhaajirun",
    category: "SOCIAL PLATFORM",
    categoryDisplay: "Social Platform",
    challenge:
      "Women making hijrah needed trusted resources, suppliers, contacts, and business opportunities in Egypt, but the information was scattered and difficult to organize.",
    solution:
      "We designed the platform concept, ecosystem structure, resource model, and business direction for a community-centered hub supporting Muslim women with practical hijrah and business resources.",
    fullCaseStudy: [
      "Baytul Muhaajirun was developed to solve a real information and access problem for Muslim women navigating hijrah and business in Egypt. The challenge was not simply building a community, but organizing scattered knowledge into a useful platform model.",
      "We structured the concept around resources, supplier access, community support, and business opportunity mapping. The work helped turn a broad idea into a clearer platform direction with a practical support model for women who needed trustworthy information and grounded help.",
    ],
    keyResults: [
      "Clear platform concept",
      "Organized resource model",
      "Stronger community direction",
      "Practical support structure for women in Egypt",
    ],
    toolsUsed: [
      "Platform Strategy",
      "Community Design",
      "Resource Mapping",
      "Business Model Planning",
    ],
  },
  {
    id: "dream-plan-fund-build",
    client: "Dream Plan Fund Build",
    category: "EDUCATION",
    categoryDisplay: "Education",
    challenge:
      "Women preparing for hijrah often felt overwhelmed, financially unclear, and unsure how to turn their desire into a realistic plan.",
    solution:
      "We created a four-part orientation framework to help women clarify their dream, organize their plan, understand funding, and prepare to build with more confidence.",
    fullCaseStudy: [
      "Dream Plan Fund Build was created as a grounding orientation experience for Muslim women preparing for hijrah. The challenge was that many women did not need more noise or pressure. They needed calm, clarity, and a simple structure to understand what the journey would require.",
      "We developed the framework around four core stages: dream, plan, fund, and build. The result was an educational product that helps women organize their thinking, prepare financially, and approach hijrah with more responsibility and direction.",
    ],
    keyResults: [
      "Clear four-part educational framework",
      "Stronger hijrah planning structure",
      "Improved learner clarity",
      "Foundation for digital product expansion",
    ],
    toolsUsed: [
      "Curriculum Strategy",
      "Content Planning",
      "Educational Framework",
      "Digital Product Development",
    ],
  },
  {
    id: "eden-afrique",
    client: "Eden Afrique",
    category: "LIFESTYLE BRAND",
    categoryDisplay: "Lifestyle Brand",
    challenge:
      "An African-inspired lifestyle concept needed clearer identity, business direction, and positioning to become a refined commercial brand.",
    solution:
      "We developed the brand concept, positioning, and business direction to shape Eden Afrique into a thoughtful lifestyle brand with room for future product, retail, and digital expansion.",
    fullCaseStudy: [
      "Eden Afrique was shaped as an African-inspired lifestyle brand with potential across products, retail, beauty, home, and digital growth. The challenge was to give the idea a clearer commercial direction without losing the cultural richness behind it.",
      "We worked on concept development, positioning, and business direction. The goal was to create a foundation for a brand that could grow intentionally, communicate beauty and refinement, and develop into a recognizable lifestyle business.",
    ],
    keyResults: [
      "Clearer lifestyle brand concept",
      "Stronger commercial positioning",
      "Defined expansion potential",
      "More refined brand direction",
    ],
    toolsUsed: [
      "Brand Strategy",
      "Business Direction",
      "Lifestyle Positioning",
      "Concept Development",
    ],
  },
  {
    id: "zahra-layaali",
    client: "Zahra Layaali",
    category: "LUXURY JEWELRY",
    categoryDisplay: "Luxury Jewelry",
    challenge:
      "A luxury jewelry brand needed to be built from scratch with a refined identity, clear positioning, and a premium customer experience.",
    solution:
      "We developed the brand concept, naming direction, positioning, visual identity direction, product communication, and launch foundation.",
    fullCaseStudy: [
      "Zahra Layaali was built from the ground up as a luxury jewelry brand. The challenge was to create a brand that felt elegant, premium, and trustworthy while giving it enough structure to move from concept into a real commercial identity.",
      "We shaped the brand concept, positioning, visual direction, product communication, and launch foundation. The work focused on building a refined Muslim-owned luxury brand with strong emotional appeal, clear market direction, and a premium customer experience.",
    ],
    keyResults: [
      "Luxury brand built from scratch",
      "Clear positioning and identity",
      "Premium product communication",
      "Launch foundation created",
    ],
    toolsUsed: [
      "Brand Strategy",
      "Naming Direction",
      "Visual Identity",
      "Product Communication",
      "Launch Planning",
    ],
  },
];
