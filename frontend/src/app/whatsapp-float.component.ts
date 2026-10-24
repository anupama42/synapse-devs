import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AnalyticsService } from './analytics.service';
import { whatsappHref } from './config/site';
import { LanguageService } from './i18n/language.service';

@Component({
  selector: 'app-whatsapp-float',
  template: `
    @if (href()) {
      <a
        class="wa"
        [href]="href()"
        target="_blank"
        rel="noopener noreferrer"
        [attr.aria-label]="label()"
        (click)="track()"
      >
        <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
          <path
            fill="#ffffff"
            d="M20.5 3.5A11 11 0 0 0 2.1 17.8L1 23l5.3-1.1A11 11 0 0 0 12 23a11 11 0 0 0 8.5-19.5zM12 21a9 9 0 0 1-4.6-1.3l-.3-.2-3.2.8.9-3.1-.2-.3A9 9 0 1 1 12 21zm5-6.7c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7 1c-.1.2-.3.2-.5.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5.2-.4c.1-.2 0-.3 0-.5l-.8-1.9c-.2-.5-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.8 11.8 0 0 0 4.5 4 15 15 0 0 0 1.5.6 3.6 3.6 0 0 0 1.7.1 2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .2-1.2c-.1-.1-.2-.2-.4-.3z"
          />
        </svg>
      </a>
    }
  `,
  styles: `
    .wa {
      position: fixed;
      z-index: 40;
      right: max(16px, env(safe-area-inset-right));
      bottom: max(16px, env(safe-area-inset-bottom));
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: #25d366;
      display: grid;
      place-items: center;
    }

    @media (prefers-reduced-motion: reduce) {
      .wa {
        transition: none;
      }
    }
  `,
})
export class WhatsappFloatComponent {
  private analytics = inject(AnalyticsService);
  private i18n = inject(LanguageService);
  private page = signal('home');

  constructor(router: Router) {
    const apply = (url: string) => {
      const path = url.split('?')[0].split('#')[0];
      const name = path.replace(/^\//, '') || 'home';
      this.page.set(name === 'local-business' ? 'local' : name === 'web-development' ? 'web' : name === '404' ? 'notFound' : name);
    };
    apply(router.url);
    router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event) => {
      apply((event as NavigationEnd).urlAfterRedirects);
    });
  }

  href(): string | null {
    return whatsappHref(this.i18n.t(this.messageKey()));
  }

  label(): string {
    return this.i18n.t('wa.aria');
  }

  track() {
    this.analytics.event('whatsapp_click', { page: this.page(), placement: 'floating' });
  }

  private messageKey(): string {
    const key = `wa.${this.page()}`;
    const translated = this.i18n.t(key);
    return translated === key ? 'wa.home' : key;
  }
}
