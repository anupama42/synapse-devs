import { Routes } from '@angular/router';
import { PAGE_SEO } from './seo';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home.page').then((m) => m.HomePage), data: { seo: PAGE_SEO['home'] } },
  { path: 'about', loadComponent: () => import('./pages/about.page').then((m) => m.AboutPage), data: { seo: PAGE_SEO['about'] } },
  { path: 'work', loadComponent: () => import('./pages/work.page').then((m) => m.WorkPage), data: { seo: PAGE_SEO['work'] } },
  { path: 'services', loadComponent: () => import('./pages/services.page').then((m) => m.ServicesPage), data: { seo: PAGE_SEO['services'] } },
  { path: 'skills', loadComponent: () => import('./pages/skills.page').then((m) => m.SkillsPage), data: { seo: PAGE_SEO['skills'] } },
  { path: 'contact', loadComponent: () => import('./pages/contact.page').then((m) => m.ContactPage), data: { seo: PAGE_SEO['contact'] } },
  { path: '**', redirectTo: '' },
];
