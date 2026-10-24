import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnalyticsService } from '../analytics.service';
import { site, whatsappHref } from '../config/site';
import { ContactFormComponent } from '../contact-form.component';
import { homeFaqs } from '../data/faqs';
import { projects } from '../data/projects';
import { FaqListComponent } from '../faq-list.component';
import { HowWeWorkComponent } from '../how-we-work.component';
import { starterKitPriceLabel } from '../i18n/format';
import { translatePhrase } from '../i18n/copy';
import { LanguageService } from '../i18n/language.service';
import { TranslatePipe } from '../i18n/translate.pipe';
import { ProjectCardComponent } from '../project-card.component';
import { TestimonialsComponent } from '../testimonials.component';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    ProjectCardComponent,
    HowWeWorkComponent,
    TestimonialsComponent,
    FaqListComponent,
    ContactFormComponent,
    TranslatePipe,
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {
  private analytics = inject(AnalyticsService);
  private i18n = inject(LanguageService);
  projects = projects.slice(0, 3);
  promises = computed(() => site.promises.map((item) => translatePhrase(this.i18n.lang(), item)));
  faqs = computed(() => homeFaqs(this.i18n.lang()));
  starterPrice = computed(() => starterKitPriceLabel(this.i18n.lang()));
  wa = computed(() => whatsappHref(this.i18n.t('wa.home')));

  trackWa(placement: string) {
    this.analytics.event('whatsapp_click', { page: 'home', placement });
  }

  track(placement: string) {
    this.analytics.event('cta_click', { page: 'home', placement });
  }
}
