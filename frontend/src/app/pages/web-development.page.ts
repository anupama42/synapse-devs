import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnalyticsService } from '../analytics.service';
import { site, whatsappHref } from '../config/site';
import { ContactFormComponent } from '../contact-form.component';
import { webFaqs } from '../data/faqs';
import { projects } from '../data/projects';
import { FaqListComponent } from '../faq-list.component';
import { HowWeWorkComponent } from '../how-we-work.component';
import { webPriceLabel } from '../i18n/format';
import { LanguageService } from '../i18n/language.service';
import { TranslatePipe } from '../i18n/translate.pipe';
import { ProjectCardComponent } from '../project-card.component';

@Component({
  selector: 'app-web-development',
  imports: [RouterLink, ProjectCardComponent, HowWeWorkComponent, FaqListComponent, ContactFormComponent, TranslatePipe],
  templateUrl: './web-development.page.html',
  styleUrl: './home.page.scss',
})
export class WebDevelopmentPage {
  private analytics = inject(AnalyticsService);
  private i18n = inject(LanguageService);
  projects = projects;
  faqs = computed(() => webFaqs(this.i18n.lang()));
  wa = computed(() => whatsappHref(this.i18n.t('wa.web')));
  call = computed(() => site.bookingUrl || this.wa());
  callExternal = computed(() => Boolean(site.bookingUrl || this.wa()));
  services = computed(() =>
    (['website', 'store', 'app', 'hrms'] as const).map((key) => ({
      key,
      title: this.i18n.t(`web.service.${key}.title`),
      body: this.i18n.t(`web.service.${key}.body`),
      price: webPriceLabel(this.i18n.lang(), key),
    })),
  );

  track(placement: string) {
    this.analytics.event('cta_click', { page: 'web-development', placement });
  }

  trackWa(placement: string) {
    this.analytics.event('whatsapp_click', { page: 'web-development', placement });
  }
}
