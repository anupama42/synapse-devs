import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { filter } from 'rxjs';
import { ApiService } from './api.service';
import { PAGE_SEO, SeoPayload, SeoService } from './seo';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private api = inject(ApiService);
  private seo = inject(SeoService);
  menuOpen = false;
  data$ = this.api.site();
  links = [
    { path: '/', label: 'Home', exact: true },
    { path: '/about', label: 'About', exact: false },
    { path: '/work', label: 'Work', exact: false },
    { path: '/services', label: 'Services', exact: false },
    { path: '/skills', label: 'Skills', exact: false },
    { path: '/contact', label: 'Contact', exact: false },
  ];

  constructor(router: Router) {
    router.events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd)).subscribe(() => {
      this.menuOpen = false;
      let route = router.routerState.root;
      while (route.firstChild) {
        route = route.firstChild;
      }
      const seo = (route.snapshot.data['seo'] as SeoPayload | undefined) ?? PAGE_SEO['home'];
      this.seo.apply(seo);
    });
  }

  closeMenu() {
    this.menuOpen = false;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
