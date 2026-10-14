// Single place for the organisation's fixed content (taken from the ESWAMCU
// requirements document). Anything that changes often - news, projects,
// leaders, affiliates, resources - lives in the database and is edited from
// the admin panel instead.

export const ORG = {
  name: "Eswatini Multipurpose Cooperatives Union",
  short: "ESWAMCU",
  motto: "Sibambene sakha umnotfo!",
  established: 2006,
};

export const CONTACT = {
  phones: ["+268 2505 9156", "+268 3502 0613"],
  whatsapp: "+268 7622 9856",
  emails: ["info@swafcu.coop", "swafcu@swazi.net"],
  website: "www.swafcu.coop",
  postal: ["P.O. Box 551", "Manzini, Eswatini"],
  physical: [
    "Corner of Mhlakuvane and Mancishane Streets,",
    "below Manzini Main Market,",
    "Manzini, Eswatini",
  ],
  hours: "To be confirmed by management.",
};

export const telHref = (n) => `tel:${n.replace(/[^+\d]/g, "")}`;
export const waHref = (n) => `https://wa.me/${n.replace(/[^\d]/g, "")}`;
export const mapsHref =
  "https://www.google.com/maps/search/?api=1&query=Mhlakuvane+and+Mancishane+Streets+Manzini+Eswatini";

export const NAV = [
  { label: "Home", to: "/", end: true },
  { label: "About Us", to: "/about" },
  { label: "Our Affiliates", to: "/affiliates" },
  { label: "Projects", to: "/projects" },
  { label: "News & Events", to: "/news-events" },
  { label: "Opportunities", to: "/opportunities" },
];
export const NAV_CONTACT = { label: "Contact Us" }; // opens the contact pop-up

export const ABOUT = {
  background: [
    "The Eswatini Multipurpose Cooperatives Union (ESWAMCU) was established in 2006 to provide a collective voice and support structure for multipurpose cooperatives in Eswatini.",
    "As an apex body serving the multipurpose cooperative sector, ESWAMCU seeks to strengthen its affiliated cooperatives through representation, institutional development, business advisory services, capacity building, resource mobilisation, and the promotion of sustainable cooperative enterprises.",
    "The organisation works to create an enabling environment in which multipurpose cooperatives can improve their governance, strengthen their financial and operational management, expand their business activities, and deliver greater economic and social benefits to their members.",
    "ESWAMCU also promotes collaboration among cooperatives, government institutions, financial service providers, development partners, and the private sector to mobilise resources and unlock business opportunities for the cooperative movement.",
    "Through its programmes and strategic initiatives, ESWAMCU aims to position multipurpose cooperatives as important contributors to economic empowerment, employment creation, food security, and sustainable community development in Eswatini.",
  ],
  vision: "Leading multipurpose Cooperatives to drive inclusive sustainable economic growth",
  mission:
    "To strengthen multipurpose member Cooperatives through capacity building, resource mobilisation, market access and strategic partnerships – fostering sustainable growth and improved livelihoods from grassroots.",
};

export const OBJECTIVES = [
  "Represent the interests of multipurpose cooperatives at national and relevant regional levels.",
  "Promote good governance and effective management among affiliated cooperatives.",
  "Provide business development support and advisory services.",
  "Facilitate access to finance, markets, technology, and productive resources.",
  "Promote agricultural production and cooperative agribusiness.",
  "Mobilise resources for cooperative development programmes.",
  "Facilitate training and capacity building for cooperative leaders, managers, and members.",
  "Encourage collaboration and networking among affiliated cooperatives.",
  "Promote youth and women’s participation in cooperative enterprises.",
  "Support the development of sustainable income-generating activities.",
  "Promote research, innovation, and digital transformation within the cooperative sector.",
  "Strengthen partnerships with government, financial institutions, and development organisations.",
];

export const VALUES_INTRO =
  "To fulfil its mandate, pursue its vision, and accomplish its mission, the Apex is guided by core values that promote ethical conduct and responsible decision-making. These values form the foundation of the Apex’s culture and the pillars of service excellence.";

export const VALUES = [
  { title: "Delivery", text: "Zero tolerance for poor customer and affiliates service." },
  { title: "Respect", text: "Commitment to treating Members equally regardless of status." },
  {
    title: "Integrity",
    text: "The quality of being honest, ethical and consistent in doing what is right, even when no one is watching or looking.",
  },
  { title: "Competency", text: "Commit to high quality performance and service delivery." },
  {
    title: "Inclusivity",
    text: "To ensure all members feel welcomed, respected and empowered to succeed.",
  },
];

// Used on the Home and What We Do pages if the API is not reachable. The
// live versions are managed in the admin panel (Site content > What We Do).
export const SERVICES_FALLBACK = [
  {
    id: "f1",
    icon: "development",
    title: "Cooperative Development",
    summary: "Strengthening governance, management and institutional capacity.",
    description:
      "We help affiliated multipurpose cooperatives improve their governance, strengthen their financial and operational management, and build the skills of their leaders, managers and members through training and capacity building.",
  },
  {
    id: "f2",
    icon: "business",
    title: "Business Support",
    summary: "Advisory services that help cooperatives grow their enterprises.",
    description:
      "ESWAMCU provides business development support and advisory services so that cooperatives can expand their business activities and build sustainable income-generating activities.",
  },
  {
    id: "f3",
    icon: "agriculture",
    title: "Agriculture",
    summary: "Promoting agricultural production and cooperative agribusiness.",
    description:
      "We promote agricultural production and cooperative agribusiness, supporting food security and rural livelihoods across Eswatini.",
  },
  {
    id: "f4",
    icon: "finance",
    title: "Finance Facilitation",
    summary: "Opening doors to finance, markets, technology and resources.",
    description:
      "We facilitate access to finance, markets, technology and productive resources, and mobilise resources for cooperative development programmes through partnerships with financial service providers and development partners.",
  },
  {
    id: "f5",
    icon: "property",
    title: "Property Management",
    summary: "Property management services for the Union and its affiliates.",
    description: "Property management services supporting the Union and the cooperative movement.",
  },
];

export const BENEFITS = [
  {
    icon: "voice",
    title: "A collective voice",
    text: "Representation of your interests at national and relevant regional levels.",
  },
  {
    icon: "governance",
    title: "Governance support",
    text: "Guidance to promote good governance and effective management in your cooperative.",
  },
  {
    icon: "business",
    title: "Business advisory",
    text: "Business development support and advisory services to grow your enterprise.",
  },
  {
    icon: "finance",
    title: "Finance, markets & technology",
    text: "Help accessing finance, markets, technology and productive resources.",
  },
  {
    icon: "training",
    title: "Training & capacity building",
    text: "Training for cooperative leaders, managers and members.",
  },
  {
    icon: "network",
    title: "Networks & partnerships",
    text: "Collaboration with other cooperatives, government, financial institutions and development partners.",
  },
];

export const REGIONS = [
  { value: "hhohho", label: "Hhohho" },
  { value: "manzini", label: "Manzini" },
  { value: "shiselweni", label: "Shiselweni" },
  { value: "lubombo", label: "Lubombo" },
];