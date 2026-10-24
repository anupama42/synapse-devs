import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { site } from '../config/site';
import { translatePhrase } from '../i18n/copy';
import { quoteTiming, revisionLabel, supportLine } from '../i18n/format';
import { LanguageService } from '../i18n/language.service';
import { PhrasePipe, TranslatePipe } from '../i18n/translate.pipe';

// REVIEW BEFORE PUBLISHING
@Component({
  selector: 'app-terms',
  imports: [RouterLink, TranslatePipe, PhrasePipe],
  templateUrl: './terms.page.html',
})
export class TermsPage {
  private i18n = inject(LanguageService);
  brand = site.brandName;
  email = site.email;
  quote = computed(() => quoteTiming(this.i18n.lang()));
  revisions = computed(() => revisionLabel(this.i18n.lang()));
  ownership = computed(() => supportLine(this.i18n.lang()));
  payment = computed(() => (site.paymentTerms ? translatePhrase(this.i18n.lang(), site.paymentTerms) : ''));
  exclusions = site.exclusions;
}
