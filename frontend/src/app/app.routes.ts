import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home.page').then((m) => m.HomePage) },
  { path: 'about', loadComponent: () => import('./pages/about.page').then((m) => m.AboutPage) },
  { path: 'work', loadComponent: () => import('./pages/work.page').then((m) => m.WorkPage) },
  { path: 'services', loadComponent: () => import('./pages/services.page').then((m) => m.ServicesPage) },
  { path: 'skills', loadComponent: () => import('./pages/skills.page').then((m) => m.SkillsPage) },
  { path: 'contact', loadComponent: () => import('./pages/contact.page').then((m) => m.ContactPage) },
  { path: '**', redirectTo: '' },
];
