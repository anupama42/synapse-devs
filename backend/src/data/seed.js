module.exports = {
  site: {
    name: 'SynapseDevs',
    tagline: 'Code. Connect. Create.',
    valueProposition:
      'Anupama & Shreya — a full-stack pair that ships real, live products: web, mobile, and the work that gets a site online.',
    founders: 'Anupama & Shreya',
    about:
      'Anupama & Shreya have more than five years of experience in the IT industry. We work as one team on projects that need website development — from first brief to a live site you can click. Same stack, same backlog, no split of “who owns what.”',
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
      thumbnail: '/projects/fixt.png',
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
      thumbnail: '/projects/real-bearings.png',
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
      thumbnail: '/projects/nordic-nook.png',
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
      thumbnail: '/projects/lps.png',
      shortDescription:
        'Corporate site for a security and manpower company — services, vetting process, FAQ, quotes, careers.',
      description:
        'Services breakdown, a four-step vetting process, team, FAQ, quote-request form, WhatsApp integration, and a dedicated careers page.',
      techStack: ['React', 'Forms', 'Maps', 'Netlify'],
      role: 'Full-stack — multi-section corporate IA, forms, CTAs',
      highlight: 'Feature-dense single-site build: forms, maps, multiple CTAs, careers subpage.',
      accent: '#ce93d8',
      featured: true,
      order: 4,
    },
    {
      slug: 'bakers-pantry',
      name: "The Baker's Pantry",
      category: 'E-commerce / Specialty retail',
      liveUrl: 'https://thebakerspantry.netlify.app',
      thumbnail: '/projects/bakers-pantry.png',
      shortDescription:
        'A modern supply shop for artisan bakers — raw ingredients, décor tools, and weekend masterclasses.',
      description:
        'Catalog for couverture chocolate, molds, and workshops, plus signature bakery items. Shop, class, and order CTAs on a brand-forward pantry site.',
      techStack: ['React', 'CSS', 'Netlify'],
      role: 'Front-end — catalog layout, product cards, retail IA',
      highlight: 'Retail + workshop mix: supplies, specialties, and class booking in one shop.',
      accent: '#e8c39e',
      featured: true,
      order: 5,
    },
    {
      slug: 'apex-athletics',
      name: 'Apex Athletics',
      category: 'Business / Fitness club website',
      liveUrl: 'https://apex-athletics-khaki.vercel.app/',
      thumbnail: '/projects/apex-athletics.png',
      shortDescription:
        'High-performance club site: training pillars, class calendar, membership tiers, and trial CTAs.',
      description:
        'Strength lab, MetCon arena, and recovery zone explained as product pillars. Weekly class roster with remaining spots, plus Foundation / Performance / Private pricing.',
      techStack: ['React', 'Next.js', 'Vercel'],
      role: 'Front-end — conversion layout, schedule, membership plans',
      highlight: 'Outcome-led fitness marketing: schedule, waitlist, and transparent memberships.',
      accent: '#7cff6b',
      featured: true,
      order: 6,
    },
    {
      slug: 'vance-studio',
      name: 'Vance Studio',
      category: 'Portfolio / Photography',
      liveUrl: 'https://vance-studio.netlify.app/',
      thumbnail: '/projects/vance-studio.png',
      shortDescription:
        'Editorial photography folio for Elena Vance — selected works, philosophy, commissions, and contact.',
      description:
        'Quiet, image-led site for editorial portraiture and brand campaigns. Work grid, method, commercial services, and a commission CTA.',
      techStack: ['React', 'CSS', 'Netlify'],
      role: 'Front-end — editorial layout, gallery, commission funnel',
      highlight: 'Fine-art portfolio: still imagery, philosophy, and worldwide commission intake.',
      accent: '#c9b8a8',
      featured: true,
      order: 7,
    },
  ],
};
