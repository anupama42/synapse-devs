import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { site } from './config/site';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private platformId = inject(PLATFORM_ID);
  private started = false;

  init() {
    if (!isPlatformBrowser(this.platformId) || this.started) return;
    this.started = true;
    if (site.ga4Id) this.loadGa4(site.ga4Id);
    if (site.clarityId) this.loadClarity(site.clarityId);
  }

  event(name: string, params: Record<string, string>) {
    if (!isPlatformBrowser(this.platformId)) return;
    const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
    gtag?.('event', name, params);
  }

  private loadGa4(id: string) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
    document.head.appendChild(script);
    const inline = document.createElement('script');
    inline.text = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${id}');`;
    document.head.appendChild(inline);
  }

  private loadClarity(id: string) {
    const inline = document.createElement('script');
    inline.text = `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${id}");`;
    document.head.appendChild(inline);
  }
}
