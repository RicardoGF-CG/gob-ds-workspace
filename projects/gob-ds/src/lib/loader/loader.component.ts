import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type LoaderSize = 'sm' | 'md' | 'lg';

@Component({
  standalone: true,
  selector: 'sf-loader',
  imports: [CommonModule],
  styleUrl: './loader.scss',
  template: `
    <div class="loader" [class.loader--inline]="!!text" role="status">
      <svg
        class="loader__spinner"
        [class]="'loader__spinner--' + size"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          class="loader__track"
          cx="12" cy="12" r="10"
          stroke-width="3"
        />
        <path
          class="loader__arc"
          d="M12 2a10 10 0 0 1 10 10"
          stroke-width="3"
          stroke-linecap="round"
        />
      </svg>
      @if (text) {
        <span class="loader__text" [class]="'loader__text--' + size">{{ text }}</span>
      }
      <span class="sr-only">{{ text || 'Cargando...' }}</span>
    </div>
  `,
})
export class LoaderComponent {
  @Input() size: LoaderSize = 'md';
  @Input() text?: string;
}
