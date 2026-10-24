import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { FaqItem } from './data/faqs';
import { absoluteUrl, pageSeo, SeoEntry, site } from './config/site';

export interface Crumb {
  name: string;
  path: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);
  private doc = inject(DOCUMENT);

  apply(seo: SeoEntry, crumbs: Crumb[], faq: FaqItem[] = [], orgDescription = pageSeo['home'].description) {
    const url = absoluteUrl(seo.path);
    const image = absoluteUrl('/og.png');

    this.meta.updateTag({ name: 'robots', content: seo.path === '/404' ? 'noindex' : 'index,follow' });
    this.title.setTitle(seo.title);
    this.meta.updateTag({ name: 'title', content: seo.title });
    this.meta.updateTag({ name: 'description', content: seo.description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: site.brandName });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:title', content: seo.title });
    this.meta.updateTag({ property: 'og:description', content: seo.description });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: seo.title });
    this.meta.updateTag({ name: 'twitter:description', content: seo.description });
    this.meta.updateTag({ name: 'twitter:image', content: image });
    this.setCanonical(url);
    this.setJsonLd(seo, crumbs, faq, orgDescription);
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

  private setJsonLd(seo: SeoEntry, crumbs: Crumb[], faq: FaqItem[], orgDescription: string) {
    const sameAs = site.socials.map((item) => item.url).filter(Boolean);
    const org: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: site.brandName,
      url: absoluteUrl('/'),
      logo: absoluteUrl('/logo.png'),
      image: absoluteUrl('/og.png'),
      description: orgDescription,
      slogan: site.tagline,
      areaServed: site.areaServed,
      email: site.email,
    };
    if (site.phone) org['telephone'] = site.phone;
    if (site.cityRegion) org['address'] = { '@type': 'PostalAddress', addressRegion: site.cityRegion, addressCountry: 'IN' };
    if (sameAs.length) org['sameAs'] = sameAs;

    const graph: Record<string, unknown>[] = [
      org,
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: crumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.name,
          item: absoluteUrl(crumb.path),
        })),
      },
    ];
    if (faq.length) {
      graph.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      });
    }

    let script = this.doc.getElementById('site-jsonld');
    if (!script) {
      script = this.doc.createElement('script');
      script.id = 'site-jsonld';
      script.setAttribute('type', 'application/ld+json');
      this.doc.head.appendChild(script);
    }
    script.textContent = JSON.stringify(graph);
  }
}
