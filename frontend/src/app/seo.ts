import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export const SITE_ORIGIN = 'https://synapse-devs.netlify.app';

export interface SeoPayload {
  title: string;
  description: string;
  path: string;
}

export const PAGE_SEO: Record<string, SeoPayload> = {
  home: {
    title: 'SynapseDevs | Premium Web Development & UI/UX Agency',
    description:
      'We engineer custom, high-performance web applications, digital storefronts, and enterprise HRMS solutions. No bloated templates—just clean code and premium design.',
    path: '/',
  },
  about: {
    title: 'About SynapseDevs | Custom Web Development Agency',
    description:
      'Anupama and Shreya run SynapseDevs — a two-person custom web development agency. Frontend engineering and premium UI/UX from first brief to a live site.',
    path: '/about',
  },
  work: {
    title: 'Portfolio | Fitness, Bakery E-commerce & Custom Web Development | SynapseDevs',
    description:
      'Live work from a custom web development agency: fitness website developer builds, bakery e-commerce UI, B2B catalogs, booking SaaS, and premium UI/UX.',
    path: '/work',
  },
  services: {
    title: 'Web Development Services | Frontend Engineering & Premium UI/UX',
    description:
      'Custom web development, frontend engineering, mobile apps, testing, and scoped fixes. Premium UI/UX for SaaS, retail, fitness, and hospitality sites.',
    path: '/services',
  },
  skills: {
    title: 'Frontend Engineering Stack | Angular, React & Node.js | SynapseDevs',
    description:
      'Frontend engineering with Angular and React, plus Node.js, APIs, and MongoDB. The stack behind our custom web development and premium UI/UX work.',
    path: '/skills',
  },
  contact: {
    title: 'Contact SynapseDevs | Custom Web Development Agency',
    description:
      'Start a project with SynapseDevs — custom web development, frontend engineering, and premium UI/UX. Tell us what you need built.',
    path: '/contact',
  },
};

@Injectable({ providedIn: 'root' })
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);
  private doc = inject(DOCUMENT);

  apply(seo: SeoPayload) {
    const url = `${SITE_ORIGIN}${seo.path}`;
    const image = `${SITE_ORIGIN}/logo.png`;

    this.title.setTitle(seo.title);
    this.meta.updateTag({ name: 'title', content: seo.title });
    this.meta.updateTag({ name: 'description', content: seo.description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:title', content: seo.title });
    this.meta.updateTag({ property: 'og:description', content: seo.description });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:site_name', content: 'SynapseDevs' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: seo.title });
    this.meta.updateTag({ name: 'twitter:description', content: seo.description });
    this.meta.updateTag({ name: 'twitter:image', content: image });
    this.setCanonical(url);
  }

  private setCanonical(url: string) {
    let link = this.doc.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
