import { Component, computed, inject } from '@angular/core';
import { site } from './config/site';
import { translatePhrase } from './i18n/copy';
import { quoteTiming, revisionLabel, supportLine } from './i18n/format';
import { LanguageService } from './i18n/language.service';
import { TranslatePipe } from './i18n/translate.pipe';

@Component({
  selector: 'app-how-we-work',
  imports: [TranslatePipe],
  template: `
    <section class="wrap" aria-labelledby="how-heading">
      <p class="eyebrow">{{ 'how.eyebrow' | t }}</p>
      <h2 id="how-heading">{{ 'how.heading' | t }}</h2>
      <ol class="steps">
        @for (step of steps(); track step.title) {
          <li class="panel">
            <h3>{{ step.title }}</h3>
            <p>{{ step.body }}</p>
          </li>
        }
      </ol>
      <div class="grid-2 extra">
        <div class="panel">
          <h3>{{ 'how.need' | t }}</h3>
          <ul>
            @for (item of checklist(); track item) {
              <li>{{ item }}</li>
            }
          </ul>
        </div>
        <div class="panel">
          <h3>{{ 'how.after' | t }}</h3>
          <p>{{ afterLaunch() }}</p>
        </div>
      </div>
    </section>
  `,
  styles: `
    .steps {
      list-style: none;
      margin: 1rem 0 0;
      padding: 0;
      display: grid;
      gap: 0.8rem;
    }

    .steps h3,
    .extra h3 {
      margin: 0 0 0.35rem;
      font-size: 1.05rem;
    }

    .steps p,
    .extra p,
    .extra li {
      color: var(--muted);
      margin: 0.2rem 0;
    }

    .extra {
      margin-top: 1rem;
    }
  `,
})
export class HowWeWorkComponent {
  private i18n = inject(LanguageService);
  checklist = computed(() => site.clientChecklist.map((item) => translatePhrase(this.i18n.lang(), item)));
  afterLaunch = computed(() => `${supportLine(this.i18n.lang())} ${this.i18n.t('how.afterExtra')}`);
  steps = computed(() => {
    const lang = this.i18n.lang();
    return [
      { title: this.i18n.t('how.1.title'), body: this.i18n.t('how.1.body') },
      { title: this.i18n.t('how.2.title'), body: `${quoteTiming(lang)}.` },
      { title: this.i18n.t('how.3.title'), body: this.i18n.t('how.3.body') },
      { title: this.i18n.t('how.4.title'), body: this.i18n.t('how.4.body', { revisions: revisionLabel(lang) }) },
      { title: this.i18n.t('how.5.title'), body: supportLine(lang) },
    ];
  });
}
