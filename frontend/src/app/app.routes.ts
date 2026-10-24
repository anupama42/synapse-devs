import { Routes } from '@angular/router';
import { pageSeo } from './config/site';
import { homeFaqs, localFaqs, webFaqs } from './data/faqs';

const homeCrumb = [{ name: 'Home', path: '/' }];

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home.page').then((m) => m.HomePage),
    data: { seo: pageSeo['home'], crumbs: homeCrumb, faq: homeFaqs() },
  },
  {
    path: 'local-business',
    loadComponent: () => import('./pages/local-business.page').then((m) => m.LocalBusinessPage),
    data: {
      seo: pageSeo['local'],
      crumbs: [...homeCrumb, { name: 'Local businesses', path: '/local-business' }],
      faq: localFaqs(),
    },
  },
  {
    path: 'web-development',
    loadComponent: () => import('./pages/web-development.page').then((m) => m.WebDevelopmentPage),
    data: {
      seo: pageSeo['web'],
      crumbs: [...homeCrumb, { name: 'Websites and apps', path: '/web-development' }],
      faq: webFaqs(),
    },
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about.page').then((m) => m.AboutPage),
    data: { seo: pageSeo['about'], crumbs: [...homeCrumb, { name: 'About', path: '/about' }] },
  },
  {
    path: 'privacy',
    loadComponent: () => import('./pages/privacy.page').then((m) => m.PrivacyPage),
    data: { seo: pageSeo['privacy'], crumbs: [...homeCrumb, { name: 'Privacy', path: '/privacy' }] },
  },
  {
    path: 'terms',
    loadComponent: () => import('./pages/terms.page').then((m) => m.TermsPage),
    data: { seo: pageSeo['terms'], crumbs: [...homeCrumb, { name: 'Terms', path: '/terms' }] },
  },
  {
    path: '404',
    loadComponent: () => import('./pages/not-found.page').then((m) => m.NotFoundPage),
    data: { seo: pageSeo['notFound'], crumbs: [...homeCrumb, { name: 'Page not found', path: '/404' }] },
  },
  { path: 'work', redirectTo: 'web-development', pathMatch: 'full' },
  { path: 'services', redirectTo: 'web-development', pathMatch: 'full' },
  { path: 'skills', redirectTo: 'web-development', pathMatch: 'full' },
  { path: 'contact', redirectTo: '', pathMatch: 'full' },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found.page').then((m) => m.NotFoundPage),
    data: { seo: pageSeo['notFound'], crumbs: [...homeCrumb, { name: 'Page not found', path: '/404' }] },
  },
];
