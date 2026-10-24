import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnalyticsService } from '../analytics.service';
import { whatsappHref } from '../config/site';
import { LanguageService } from '../i18n/language.service';
import { TranslatePipe } from '../i18n/translate.pipe';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './not-found.page.html',
})
export class NotFoundPage {
  private analytics = inject(AnalyticsService);
  private i18n = inject(LanguageService);

  wa() {
    return whatsappHref(this.i18n.t('wa.notFound'));
  }

  track() {
    this.analytics.event('whatsapp_click', { page: '404', placement: 'not_found' });
  }
}
