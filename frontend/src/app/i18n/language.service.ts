import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';
import { Lang, translate } from './copy';

const STORAGE_KEY = 'synapse-lang';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private doc = inject(DOCUMENT);
  readonly lang = signal<Lang>(this.read());

  constructor() {
    this.applyDocument(this.lang());
  }

  t(key: string, params?: Record<string, string | number>): string {
    return translate(this.lang(), key, params);
  }

  setLang(lang: Lang) {
    this.lang.set(lang);
    this.applyDocument(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* private mode */
    }
  }

  private read(): Lang {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'hi' ? 'hi' : 'en';
    } catch {
      return 'en';
    }
  }

  private applyDocument(lang: Lang) {
    this.doc.documentElement.lang = lang;
  }
}
