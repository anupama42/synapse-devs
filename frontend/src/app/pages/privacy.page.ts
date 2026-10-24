import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { site } from '../config/site';
import { TranslatePipe } from '../i18n/translate.pipe';

// REVIEW BEFORE PUBLISHING
@Component({
  selector: 'app-privacy',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './privacy.page.html',
})
export class PrivacyPage {
  email = site.email;
  analytics = Boolean(site.ga4Id || site.clarityId);
  brand = site.brandName;
}
