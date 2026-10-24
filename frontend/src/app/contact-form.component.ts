import { Component, Input, computed, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AnalyticsService } from './analytics.service';
import { site, whatsappHref } from './config/site';
import { responseLine } from './i18n/format';
import { LanguageService } from './i18n/language.service';
import { TranslatePipe } from './i18n/translate.pipe';

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule, TranslatePipe],
  template: `
    <section class="wrap" id="estimate" aria-labelledby="contact-heading">
      <p class="eyebrow">{{ 'contact.eyebrow' | t }}</p>
      <h2 id="contact-heading">{{ headingKey | t }}</h2>
      <p class="lede">{{ response() }}</p>
      <form class="panel" [formGroup]="form" (ngSubmit)="submit()">
        <label>
          {{ 'form.name' | t }}
          <input formControlName="name" autocomplete="name" required />
        </label>
        <label>
          {{ 'form.whatsapp' | t }}
          <input formControlName="whatsapp" type="tel" inputmode="tel" autocomplete="tel" required />
        </label>
        <label>
          {{ 'form.service' | t }}
          <select formControlName="service" required>
            @for (option of services; track option) {
              <option [value]="option">{{ ('form.service.' + option) | t }}</option>
            }
          </select>
        </label>
        <label>
          {{ 'form.need' | t }}
          <textarea formControlName="need" rows="5" required></textarea>
        </label>
        <button class="btn" type="submit">{{ submitKey | t }}</button>
        @if (attempted && form.invalid) {
          <p class="err">{{ 'form.error' | t }}</p>
        }
      </form>
      <p class="direct">
        @if (studioWhatsapp()) {
          <a [href]="studioWhatsapp()" target="_blank" rel="noopener noreferrer" (click)="trackDirect()">{{ 'cta.whatsapp' | t }}</a>
        }
        @if (email) {
          <a [href]="'mailto:' + email">{{ email }}</a>
        }
        @if (phone) {
          <a [href]="'tel:' + phone">{{ phone }}</a>
        }
      </p>
    </section>
  `,
  styles: `
    form {
      display: grid;
      gap: 0.9rem;
      margin-top: 1rem;
    }

    label {
      display: grid;
      gap: 0.35rem;
      font-size: 0.92rem;
    }

    input,
    select,
    textarea {
      font: inherit;
      color: var(--ink);
      background: var(--paper);
      border: 1px solid var(--line);
      padding: 0.7rem 0.8rem;
    }

    .err {
      color: var(--accent);
      margin: 0;
    }

    .direct {
      display: flex;
      flex-wrap: wrap;
      gap: 0.8rem 1.2rem;
    }

    .direct a {
      color: var(--accent);
    }
  `,
})
export class ContactFormComponent {
  private fb = inject(FormBuilder);
  private analytics = inject(AnalyticsService);
  private i18n = inject(LanguageService);

  @Input() headingKey = 'contact.heading';
  @Input() submitKey = 'cta.estimate';
  @Input() page = 'home';

  email = site.email;
  phone = site.phone;
  response = computed(() => responseLine(this.i18n.lang()));
  studioWhatsapp = computed(() => whatsappHref(this.i18n.t(this.waKey())));
  attempted = false;
  services = ['unsure', 'flyers', 'kit', 'website', 'store', 'app', 'hrms'];

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    whatsapp: ['', Validators.required],
    service: ['unsure', Validators.required],
    need: ['', Validators.required],
  });

  submit() {
    this.attempted = true;
    if (this.form.invalid) return;
    const value = this.form.getRawValue();
    const service = this.i18n.t(`form.service.${value.service}`);
    const message = this.i18n.t('form.message', {
      name: value.name.trim(),
      phone: value.whatsapp.trim(),
      service,
      need: value.need.trim(),
    });
    const href = whatsappHref(message);
    if (href) {
      this.analytics.event('form_submit_whatsapp', { page: this.page, placement: 'contact_form' });
      window.open(href, '_blank', 'noopener,noreferrer');
      return;
    }
    this.analytics.event('cta_click', { page: this.page, placement: 'contact_form_email' });
    const mail = `mailto:${site.email}?subject=${encodeURIComponent(this.i18n.t('form.mailSubject'))}&body=${encodeURIComponent(message)}`;
    window.location.href = mail;
  }

  trackDirect() {
    this.analytics.event('whatsapp_click', { page: this.page, placement: 'contact_section' });
  }

  private waKey(): string {
    if (this.page === 'local-business') return 'wa.local';
    if (this.page === 'web-development') return 'wa.web';
    return 'wa.form';
  }
}
