import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnalyticsService } from '../analytics.service';
import {
  inr,
  perFlyerPrice,
  savePercent,
  site,
  whatsappHref,
} from '../config/site';
import { BeforeAfterComponent } from '../before-after.component';
import { ContactFormComponent } from '../contact-form.component';
import { localFaqs } from '../data/faqs';
import { FaqListComponent } from '../faq-list.component';
import { HowWeWorkComponent } from '../how-we-work.component';
import { translatePhrase } from '../i18n/copy';
import { addonPriceLabel, flyerTurnaround, revisionLabel, starterKitHeadline, starterKitPriceLabel } from '../i18n/format';
import { LanguageService } from '../i18n/language.service';
import { TranslatePipe } from '../i18n/translate.pipe';

@Component({
  selector: 'app-local-business',
  imports: [RouterLink, HowWeWorkComponent, FaqListComponent, ContactFormComponent, BeforeAfterComponent, TranslatePipe],
  templateUrl: './local-business.page.html',
  styleUrls: ['./home.page.scss', './local-business.page.scss'],
})
export class LocalBusinessPage {
  private analytics = inject(AnalyticsService);
  private i18n = inject(LanguageService);
  fits = ['bakeries', 'boutiques', 'salons', 'tuition', 'restaurants', 'shops'];
  captions = site.includeCaptions;
  freeSample = site.freeSampleOfferEnabled;
  festive = site.festiveOfferEnabled;
  addons = site.starterKitAddons;
  exclusions = site.exclusions;

  headline = computed(() => starterKitHeadline(this.i18n.lang()));
  priceLabel = computed(() => starterKitPriceLabel(this.i18n.lang()));
  revisions = computed(() => revisionLabel(this.i18n.lang()));
  turnaround = computed(() => flyerTurnaround(this.i18n.lang()));
  paymentTerms = computed(() => (site.paymentTerms ? translatePhrase(this.i18n.lang(), site.paymentTerms) : ''));
  faqs = computed(() => localFaqs(this.i18n.lang()));
  sampleHref = computed(() => whatsappHref(this.i18n.t('wa.sample')));
  festiveHref = computed(() => whatsappHref(this.i18n.t('wa.festive')));
  wa = computed(() => whatsappHref(this.i18n.t('wa.local')));
  packs = computed(() =>
    site.flyerPacks.map((pack) => ({
      ...pack,
      name: translatePhrase(this.i18n.lang(), pack.name),
      cadence: translatePhrase(this.i18n.lang(), pack.cadence),
      badge: pack.badge ? translatePhrase(this.i18n.lang(), pack.badge) : '',
      priceLabel: inr(pack.price),
      eachLabel: inr(perFlyerPrice(pack)),
      save: savePercent(pack),
    })),
  );

  addonPrice(price: number | null) {
    return addonPriceLabel(this.i18n.lang(), price);
  }

  label(text: string) {
    return translatePhrase(this.i18n.lang(), text);
  }

  trackWa(placement: string) {
    this.analytics.event('whatsapp_click', { page: 'local-business', placement });
  }

  track(placement: string) {
    this.analytics.event('cta_click', { page: 'local-business', placement });
  }
}
