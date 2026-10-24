import { Component, effect, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { AnalyticsService } from './analytics.service';
import { SeoEntry, site, whatsappHref } from './config/site';
import { FaqItem, homeFaqs, localFaqs, webFaqs } from './data/faqs';
import { Lang, seoKeyForPath, translate, translatePhrase } from './i18n/copy';
import { LanguageService } from './i18n/language.service';
import { TranslatePipe } from './i18n/translate.pipe';
import { Crumb, SeoService } from './seo';
import { WhatsappFloatComponent } from './whatsapp-float.component';

interface RouteSeo {
  seo: SeoEntry;
  crumbs: Crumb[];
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, WhatsappFloatComponent, TranslatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private seo = inject(SeoService);
  private analytics = inject(AnalyticsService);
  private i18n = inject(LanguageService);
  private routeSeo = signal<RouteSeo | null>(null);

  brand = site.brandName;
  email = site.email;
  phone = site.phone;
  socials = site.socials.filter((item) => item.url);
  blogsUrl = site.socials.find((item) => item.label === 'Blog')?.url ?? '';
  menuOpen = false;
  lang = this.i18n.lang;
  links = [
    { path: '/', labelKey: 'nav.home', exact: true },
    { path: '/local-business', labelKey: 'nav.local', exact: false },
    { path: '/web-development', labelKey: 'nav.web', exact: false },
    { path: '/about', labelKey: 'nav.about', exact: false },
  ];

  constructor(router: Router) {
    this.analytics.init();
    effect(() => {
      const lang = this.i18n.lang();
      const data = this.routeSeo();
      if (!data) return;
      this.applySeo(lang, data);
    });
    router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd)).subscribe(() => {
      this.menuOpen = false;
      let route = router.routerState.root;
      while (route.firstChild) route = route.firstChild;
      const seo = (route.snapshot.data['seo'] as SeoEntry | undefined) ?? pageFallback();
      const crumbs = (route.snapshot.data['crumbs'] as Crumb[] | undefined) ?? [{ name: 'Home', path: '/' }];
      this.routeSeo.set({ seo, crumbs });
    });
  }

  setLang(lang: Lang) {
    this.i18n.setLang(lang);
  }

  closeMenu() {
    this.menuOpen = false;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  footerWa() {
    return whatsappHref(this.i18n.t('wa.home'));
  }

  trackFooter() {
    this.analytics.event('whatsapp_click', { page: 'footer', placement: 'footer' });
  }

  private applySeo(lang: Lang, data: RouteSeo) {
    const key = seoKeyForPath(data.seo.path);
    const seo: SeoEntry = {
      title: translate(lang, `seo.${key}.title`),
      description: translate(lang, `seo.${key}.description`),
      path: data.seo.path,
    };
    const crumbs = data.crumbs.map((crumb) => ({ ...crumb, name: translatePhrase(lang, crumb.name) }));
    this.seo.apply(seo, crumbs, faqsFor(data.seo.path, lang), translate(lang, 'seo.home.description'));
  }
}

function faqsFor(path: string, lang: Lang): FaqItem[] {
  if (path === '/') return homeFaqs(lang);
  if (path === '/local-business') return localFaqs(lang);
  if (path === '/web-development') return webFaqs(lang);
  return [];
}

function pageFallback(): SeoEntry {
  return {
    title: 'SynapseDevs – Websites, Web Apps & Instagram Flyers',
    description:
      'We build business websites, online stores and web apps, and design Instagram and WhatsApp flyers from your real photos. Get a free estimate on WhatsApp.',
    path: '/',
  };
}
