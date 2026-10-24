import { Pipe, PipeTransform, inject } from '@angular/core';
import { LanguageService } from './language.service';
import { translatePhrase } from './copy';

@Pipe({ name: 't', pure: false })
export class TranslatePipe implements PipeTransform {
  private i18n = inject(LanguageService);

  transform(key: string, params?: Record<string, string | number>): string {
    return this.i18n.t(key, params);
  }
}

@Pipe({ name: 'phrase', pure: false })
export class PhrasePipe implements PipeTransform {
  private i18n = inject(LanguageService);

  transform(text: string): string {
    return translatePhrase(this.i18n.lang(), text);
  }
}
