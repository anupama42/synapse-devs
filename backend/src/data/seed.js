module.exports = {
  site: {
    name: 'SynapseDevs',
    tagline: 'Code. Connect. Create.',
    valueProposition:
      'A two-person full-stack team that ships real, live products — web, mobile, and the systems behind them.',
    email: 'synapsedevs94@gmail.com',
    whatsapp: '',
    instagram: 'https://www.instagram.com/synapsedevs94/',
    instagramHandle: 'synapsedevs94',
    linkedin: '',
    freelancer: 'https://www.freelancer.com',
    peoplePerHour: 'https://www.peopleperhour.com',
    showTestimonials: false,
    pricingNote: 'Fixed packages or a scoped quote — we confirm the shape of work before we write a line.',
  },
  team: [
    {
      name: 'Anupama',
      role: 'Software engineer',
      shortBio:
        'Full-stack builder on the SynapseDevs pair — ships web, mobile, and the work that gets a product live.',
      longBio:
        'Anupama is one half of SynapseDevs. She and Shreya share the same stack and the same backlog: interfaces, APIs, data, and launch. Every project is treated as a live demo of craft — real deployments, not mockups.',
    },
    {
      name: 'Shreya Singh',
      role: 'Software engineer',
      shortBio:
        'Full-stack builder on the SynapseDevs pair — ships web, mobile, and the work that gets a product live.',
      longBio:
        'Shreya Singh is the other half of SynapseDevs. She and Anupama work as one delivery unit — one conversation, one quality bar, mixed across the product rather than split by specialty. Together they take briefs through to something you can click.',
    },
  ],
  services: [
    {
      title: 'Web development',
      body: 'Marketing sites, SaaS dashboards, and B2B catalogs — designed, built, and deployed.',
    },
    {
      title: 'Mobile development',
      body: 'Cross-platform apps with React Native when the product needs to live in someone’s pocket.',
    },
    {
      title: 'Testing',
      body: 'Manual QA plus automated checks so launches are boring in the best way.',
    },
    {
      title: 'Fixes & small features',
      body: 'Targeted work on an existing codebase: bugs, polish, and scoped enhancements.',
    },
  ],
  skills: [
    { name: 'Angular', group: 'Frontend' },
    { name: 'React', group: 'Frontend' },
    { name: 'React Native', group: 'Mobile' },
    { name: 'Node.js', group: 'Backend' },
    { name: 'Express', group: 'Backend' },
    { name: 'MongoDB', group: 'Data' },
    { name: 'PostgreSQL', group: 'Data' },
    { name: 'MEAN stack', group: 'Architecture' },
    { name: 'REST APIs', group: 'Architecture' },
    { name: 'Netlify', group: 'Delivery' },
  ],
  projects: [
    {
      slug: 'fixt',
      name: 'Fixt',
      category: 'SaaS / Booking platform',
      liveUrl: 'https://fixtbookingsaas.netlify.app/',
      shortDescription:
        'Online appointment booking for independent service providers — public booking, no customer account required.',
      description:
        'Clients manage services, availability, and appointments. Customers book through a public link. Built as a system-design piece: owner workspace plus a clean public booking page.',
      techStack: ['React', 'Node.js', 'PostgreSQL', 'Netlify'],
      role: 'Full-stack — booking flows, owner workspace, availability model',
      highlight:
        'Public booking page + owner workspace with availability management and appointment overview.',
      accent: '#00e5ff',
      featured: true,
      order: 1,
    },
    {
      slug: 'real-bearings',
      name: 'Raaj Bearings',
      category: 'B2B e-commerce / Product catalog',
      liveUrl: 'https://raajbearings.netlify.app/',
      shortDescription:
        'Industrial bearings catalog with multi-field filters and enquiry-first lead capture — WhatsApp and email, not a cart.',
      description:
        'Structured product specs (MOQ, material, model number), brand/type/discount filters, and enquiry-based generation of leads. A real-world B2B UX pattern: no checkout, enquiry first.',
      techStack: ['Angular', 'Node.js', 'Express', 'SQLite'],
      role: 'Full-stack — catalog UX, filtering, enquiry pipeline',
      highlight: 'Enquiry-first B2B UX — product thinking, not just a storefront clone.',
      accent: '#ffb74d',
      featured: true,
      order: 2,
    },
    {
      slug: 'nordic-nook',
      name: 'Nordic Nook',
      category: 'Business / Hospitality website',
      liveUrl: 'https://nordicnookcafe.netlify.app/',
      shortDescription:
        'A Scandinavian café marketing site: spaces, daily menu, testimonials, and a brand-forward visual system.',
      description:
        'Terrace and Main Hall stories, a daily menu section, customer voices, and location details. Design-led on purpose — range beyond dashboards and data apps.',
      techStack: ['React', 'CSS', 'Netlify'],
      role: 'Front-end — visual identity, content sections, responsive layout',
      highlight: 'Design-forward hospitality work that balances the more technical pieces in the grid.',
      accent: '#80deea',
      featured: true,
      order: 3,
    },
    {
      slug: 'lps',
      name: 'Loyal Protection & Solution',
      category: 'Corporate / Service business website',
      liveUrl: 'https://loyalprotectionandsolution.netlify.app/',
      shortDescription:
        'Corporate site for a security and manpower company — services, vetting process, FAQ, quotes, careers.',
      description:
        'Services breakdown, a four-step vetting process, team, FAQ, quote-request form, WhatsApp integration, and a dedicated careers page. The densest of the four builds.',
      techStack: ['React', 'Forms', 'Maps', 'Netlify'],
      role: 'Full-stack — multi-section corporate IA, forms, CTAs',
      highlight: 'Feature-dense single-site build: forms, maps, multiple CTAs, careers subpage.',
      accent: '#ce93d8',
      featured: true,
      order: 4,
    },
  ],
};
