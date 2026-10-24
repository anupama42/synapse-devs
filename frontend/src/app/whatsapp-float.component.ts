import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AnalyticsService } from './analytics.service';
import { site, whatsappHref } from './config/site';
import { LanguageService } from './i18n/language.service';

@Component({
  selector: 'app-whatsapp-float',
  template: `
    <div class="dock">
      @if (instagram) {
        <a class="soc" [href]="instagram" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <svg viewBox="0 0 24 24" width="36" height="36" aria-hidden="true">
            <defs>
              <radialGradient id="ig-mark" cx="30%" cy="107%" r="150%">
                <stop offset="0%" stop-color="#fdf497" />
                <stop offset="5%" stop-color="#fdf497" />
                <stop offset="45%" stop-color="#fd5949" />
                <stop offset="60%" stop-color="#d6249f" />
                <stop offset="90%" stop-color="#285AEB" />
              </radialGradient>
            </defs>
            <rect width="24" height="24" rx="6" fill="url(#ig-mark)" />
            <rect x="6.1" y="6.1" width="11.8" height="11.8" rx="3.4" fill="none" stroke="#fff" stroke-width="1.6" />
            <circle cx="12" cy="12" r="2.6" fill="none" stroke="#fff" stroke-width="1.6" />
            <circle cx="16.35" cy="7.65" r="0.9" fill="#fff" />
          </svg>
        </a>
      }
      @if (linkedin) {
        <a class="soc" [href]="linkedin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24" width="36" height="36" aria-hidden="true">
            <path
              fill="#0A66C2"
              d="M22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.2 0 22.23 0z"
            />
            <path
              fill="#fff"
              d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z"
            />
          </svg>
        </a>
      }
      @if (href()) {
        <a
          class="wa"
          [href]="href()"
          target="_blank"
          rel="noopener noreferrer"
          [attr.aria-label]="label()"
          (click)="track()"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
            <path
              fill="#ffffff"
              d="M20.5 3.5A11 11 0 0 0 2.1 17.8L1 23l5.3-1.1A11 11 0 0 0 12 23a11 11 0 0 0 8.5-19.5zM12 21a9 9 0 0 1-4.6-1.3l-.3-.2-3.2.8.9-3.1-.2-.3A9 9 0 1 1 12 21zm5-6.7c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7 1c-.1.2-.3.2-.5.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5.2-.4c.1-.2 0-.3 0-.5l-.8-1.9c-.2-.5-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.8 11.8 0 0 0 4.5 4 15 15 0 0 0 1.5.6 3.6 3.6 0 0 0 1.7.1 2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .2-1.2c-.1-.1-.2-.2-.4-.3z"
            />
          </svg>
        </a>
      }
    </div>
  `,
  styles: `
    .dock {
      position: fixed;
      z-index: 40;
      right: max(18px, env(safe-area-inset-right));
      bottom: max(18px, env(safe-area-inset-bottom));
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }

    .soc,
    .wa {
      display: grid;
      place-items: center;
    }

    .soc {
      width: 36px;
      height: 36px;
      line-height: 0;
    }

    .soc svg {
      display: block;
      filter: drop-shadow(0 5px 8px rgba(28, 25, 21, 0.22));
    }

    .wa {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: #25d366;
      box-shadow: 0 5px 8px rgba(28, 25, 21, 0.22);
    }

    @media (prefers-reduced-motion: reduce) {
      .soc,
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
  instagram = site.socials.find((item) => item.label === 'Instagram')?.url ?? '';
  linkedin = site.socials.find((item) => item.label === 'LinkedIn')?.url ?? '';

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
