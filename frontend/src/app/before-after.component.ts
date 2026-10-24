import { Component } from '@angular/core';
import { flyerSamples } from './data/flyer-samples';

@Component({
  selector: 'app-before-after',
  template: `
    @if (items.length) {
      <section class="wrap" aria-labelledby="samples-heading">
        <p class="eyebrow">Samples</p>
        <h2 id="samples-heading">Your photo, then the finished flyer</h2>
        <div class="grid-2">
          @for (item of items; track item.client) {
            <article class="panel">
              <h3>{{ item.client }}</h3>
              <div class="pair">
                <figure>
                  <img [src]="item.beforeSrc" [alt]="item.beforeAlt" width="640" height="640" loading="lazy" />
                  <figcaption>Your photo</figcaption>
                </figure>
                <figure>
                  <img [src]="item.afterSrc" [alt]="item.afterAlt" width="640" height="640" loading="lazy" />
                  <figcaption>Finished flyer</figcaption>
                </figure>
              </div>
            </article>
          }
        </div>
      </section>
    }
  `,
  styles: `
    .pair {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.6rem;
    }

    img {
      width: 100%;
      height: auto;
      border: 1px solid var(--line);
    }

    figcaption,
    h3 {
      margin: 0.4rem 0;
    }
  `,
})
export class BeforeAfterComponent {
  items = flyerSamples;
}
