import { Component } from '@angular/core';
import { testimonials } from './data/testimonials';
import { TranslatePipe } from './i18n/translate.pipe';

@Component({
  selector: 'app-testimonials',
  imports: [TranslatePipe],
  template: `
    @if (items.length) {
      <section class="wrap" aria-labelledby="stories-heading">
        <p class="eyebrow">{{ 'stories.eyebrow' | t }}</p>
        <h2 id="stories-heading">{{ 'stories.heading' | t }}</h2>
        <div class="stories">
          @for (item of items; track item.name) {
            <figure>
              <blockquote>
                <p>{{ item.quote }}</p>
              </blockquote>
              <figcaption>{{ item.name }}</figcaption>
            </figure>
          }
        </div>
      </section>
    }
  `,
  styles: `
    .stories {
      margin: 0;
      border-top: 1px solid var(--line);
    }

    figure {
      margin: 0;
      padding: 1.25rem 0;
      border-bottom: 1px solid var(--line);
    }

    blockquote {
      margin: 0;
    }

    blockquote p {
      margin: 0;
    }

    figcaption {
      margin-top: 0.7rem;
      font-weight: 600;
    }
  `,
})
export class TestimonialsComponent {
  items = testimonials;
}
