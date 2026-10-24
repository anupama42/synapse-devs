/**
 * Single source for business facts. Leave a value empty when it is not decided yet.
 * Empty values are hidden or replaced with a plain fallback. Do not put a host you do not own in siteUrl.
 */

export interface SocialLink {
  label: string;
  url: string;
}

export interface FlyerPack {
  id: string;
  name: string;
  flyers: number;
  price: number;
  cadence: string;
  highlight?: boolean;
  badge?: string;
}

export interface Addon {
  name: string;
  price: number | null;
}

export interface SeoEntry {
  title: string;
  description: string;
  path: string;
}

export const site = {
  siteUrl: '',
  brandName: 'SynapseDevs',
  tagline: 'Code. Connect. Create.',
  /** Digits only, with country code. 91 + 9348271497. */
  whatsappNumber: '919348271497',
  email: 'synapsedevs94@gmail.com',
  phone: '',
  cityRegion: '',
  areaServed: 'India',
  socials: [
    { label: 'Instagram', url: 'https://www.instagram.com/synapsedevs.co/' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/company/synapsedevs/' },
    { label: 'Blog', url: 'https://medium.com/@synapsedevs94/' },
  ] as SocialLink[],
  ga4Id: '',
  clarityId: '',
  bookingUrl: '',
  promises: ['Fixed quotes', 'Clear timelines', 'You own everything we build'],
  starterKitPrice: null as number | null,
  starterKitDays: null as number | null,
  webStartingPrices: {} as Record<string, number>,
  quoteHours: null as number | null,
  flyerTurnaroundDays: null as number | null,
  revisions: null as number | null,
  supportPeriod: '',
  responseTime: '',
  paymentTerms: '',
  includeCaptions: false,
  freeSampleOfferEnabled: false,
  festiveOfferEnabled: false,
  firstFlyerPrice: 999,
  flyerPacks: [
    {
      id: 'single',
      name: 'Single Drop',
      flyers: 1,
      price: 1499,
      cadence: 'One flyer, ready to post',
      badge: 'First flyer for new customers: ₹999',
    },
    {
      id: 'weekly',
      name: 'Weekly Push',
      flyers: 4,
      price: 4999,
      cadence: 'One strong push per week',
    },
    {
      id: 'always-fresh',
      name: 'Always Fresh',
      flyers: 12,
      price: 12000,
      cadence: 'About 3 posts a week',
      highlight: true,
    },
  ] as FlyerPack[],
  exclusions: [
    'Domain name fees',
    'Website hosting fees',
    'Professional photography',
    'Paid advertising',
  ],
  starterKitAddons: [
    { name: 'Google Business Profile set-up', price: null },
    { name: 'QR code for your shop', price: null },
    { name: 'WhatsApp Business catalogue set-up', price: null },
    { name: 'Extra flyers', price: null },
  ] as Addon[],
  clientChecklist: [
    'Your logo',
    'Photos of your products or your space',
    'Business name, address and opening hours',
    'Colours you want to use',
    'Your WhatsApp number',
  ],
};

export const publicRoutes: { path: string; changefreq: string; priority: string }[] = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/local-business', changefreq: 'weekly', priority: '0.9' },
  { path: '/web-development', changefreq: 'weekly', priority: '0.9' },
  { path: '/about', changefreq: 'monthly', priority: '0.6' },
  { path: '/privacy', changefreq: 'yearly', priority: '0.3' },
  { path: '/terms', changefreq: 'yearly', priority: '0.3' },
];

export const pageSeo: Record<string, SeoEntry> = {
  home: {
    title: 'SynapseDevs – Websites, Web Apps & Instagram Flyers',
    description:
      'We build business websites, online stores and web apps, and design Instagram and WhatsApp flyers from your real photos. Get a free estimate on WhatsApp.',
    path: '/',
  },
  local: {
    title: 'Instagram Flyers & Starter Website Kit | SynapseDevs',
    description:
      'Real-photo Instagram and WhatsApp flyers from ₹999 and a ready-to-launch page for bakeries, salons and boutiques. Chat with us on WhatsApp.',
    path: '/local-business',
  },
  web: {
    title: 'Custom Website & Web App Development | SynapseDevs',
    description:
      'Fast, mobile-friendly business websites, online stores and web apps, with clear timelines and fixed quotes. Get an estimate.',
    path: '/web-development',
  },
  about: {
    title: 'About SynapseDevs | Web and Design Studio',
    description:
      'Anupama and Shreya build websites, web apps and social designs as one team, from the first brief to a site you can open.',
    path: '/about',
  },
  privacy: {
    title: 'Privacy Policy | SynapseDevs',
    description:
      'What SynapseDevs collects through the contact form, WhatsApp and optional analytics, and how to ask about your information.',
    path: '/privacy',
  },
  terms: {
    title: 'Terms of Service | SynapseDevs',
    description:
      'How SynapseDevs quotes, revises, hands over and supports websites, web apps and flyer design. Read this before you book.',
    path: '/terms',
  },
  notFound: {
    title: 'Page not found | SynapseDevs',
    description: 'That page is not on the SynapseDevs site. Go back to the homepage or message us for a project estimate.',
    path: '/404',
  },
};

export const whatsappMessages: Record<string, string> = {
  home: "Hi, I'd like a free estimate for my business.",
  local: "Hi, I'd like a quote for Instagram flyers.",
  web: "Hi, I'd like an estimate for a website or web app.",
  about: "Hi, I'd like to talk about a project.",
  privacy: 'Hi, I have a question about your privacy policy.',
  terms: 'Hi, I have a question about your terms.',
  notFound: 'Hi, I was looking for a page on your site and could not find it.',
  sample: "Hi, I'd like a free sample flyer.",
  festive: "Hi, I'd like the festival offer flyer pack.",
  call: "Hi, I'd like to book a 15-minute call.",
};

export function digitsOnly(value: string): string {
  return value.replace(/\D/g, '');
}

export function whatsappHref(message: string): string | null {
  const digits = digitsOnly(site.whatsappNumber);
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function inr(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function absoluteUrl(path: string): string {
  const base = site.siteUrl.replace(/\/$/, '');
  if (!base) return path || '/';
  if (path === '/') return `${base}/`;
  return `${base}${path}`;
}

export function quoteTiming(): string {
  if (site.quoteHours == null) return 'Fixed quote in writing before we start';
  return `Fixed quote within ${site.quoteHours} hours`;
}

export function revisionLabel(): string {
  if (site.revisions == null) return 'revision rounds written into your quote';
  if (site.revisions === 1) return '1 round of revisions';
  return `${site.revisions} rounds of revisions`;
}

export function flyerTurnaround(): string {
  if (site.flyerTurnaroundDays == null) return 'a delivery date we confirm in your quote';
  if (site.flyerTurnaroundDays === 1) return '1 day';
  return `${site.flyerTurnaroundDays} days`;
}

export function starterKitHeadline(): string {
  if (site.starterKitDays == null) return 'Your business online, on a timeline we confirm in writing';
  return `Your business online in ${site.starterKitDays} days`;
}

export function starterKitPriceLabel(): string {
  if (site.starterKitPrice == null) return 'Get a fixed quote on WhatsApp';
  return `Starting from ${inr(site.starterKitPrice)}`;
}

export function webPriceLabel(serviceKey: string): string {
  const price = site.webStartingPrices[serviceKey];
  if (price == null) return quoteTiming();
  return `Starting from ${inr(price)}`;
}

export function perFlyerPrice(pack: FlyerPack): number {
  return Math.round(pack.price / pack.flyers);
}

export function savePercent(pack: FlyerPack): number {
  const single = site.flyerPacks.find((item) => item.flyers === 1)?.price ?? pack.price;
  const each = pack.price / pack.flyers;
  if (each >= single) return 0;
  return Math.round((1 - each / single) * 100);
}

export function supportLine(): string {
  if (!site.supportPeriod) return 'You own everything we build.';
  return `You own everything we build. After launch: ${site.supportPeriod}.`;
}

export function responseLine(): string {
  if (site.responseTime) return site.responseTime;
  return 'Message us and we reply on WhatsApp or email.';
}
