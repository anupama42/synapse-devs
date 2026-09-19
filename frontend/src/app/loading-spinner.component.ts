import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  template: `
    <div class="loading" role="status" aria-live="polite">
      <span class="ring" aria-hidden="true"></span>
      <span class="label">Loading</span>
    </div>
  `,
  styles: `
    .loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.85rem;
      min-height: 42vh;
      padding: 3rem 1rem;
    }

    .ring {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      border: 3px solid rgba(0, 229, 255, 0.18);
      border-top-color: var(--cyan);
      animation: spin 0.75s linear infinite;
    }

    .label {
      color: var(--muted);
      font-size: 0.85rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `,
})
export class LoadingSpinnerComponent {}
