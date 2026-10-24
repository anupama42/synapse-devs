import { Component, Input } from '@angular/core';
import { FaqItem } from './data/faqs';
import { TranslatePipe } from './i18n/translate.pipe';

@Component({
  selector: 'app-faq-list',
  imports: [TranslatePipe],
  template: `
    <section class="wrap" aria-labelledby="faq-heading">
      <p class="eyebrow">{{ 'faq.eyebrow' | t }}</p>
      <h2 id="faq-heading">{{ headingKey | t }}</h2>
      <div class="list">
        @for (item of items; track item.question) {
          <details class="panel">
            <summary>
              <h3>{{ item.question }}</h3>
            </summary>
            <p>{{ item.answer }}</p>
          </details>
        }
      </div>
    </section>
  `,
  styles: `
    .list {
      display: grid;
      gap: 0.7rem;
    }

    summary {
      cursor: pointer;
      list-style: none;
    }

    summary::-webkit-details-marker {
      display: none;
    }

    h3 {
      display: inline;
      margin: 0;
      font-size: 1.05rem;
    }

    p {
      color: var(--muted);
      margin: 0.7rem 0 0;
    }
  `,
})
export class FaqListComponent {
  @Input({ required: true }) items: FaqItem[] = [];
  @Input() headingKey = 'faq.home';
}
