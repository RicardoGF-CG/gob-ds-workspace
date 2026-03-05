import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded';

@Component({
  standalone: true,
  selector: 'ds-skeleton',
  imports: [CommonModule],
  styleUrl: './skeleton.scss',
  template: `
    <div
      class="skeleton"
      [class.skeleton--text]="variant === 'text'"
      [class.skeleton--circular]="variant === 'circular'"
      [class.skeleton--rectangular]="variant === 'rectangular'"
      [class.skeleton--rounded]="variant === 'rounded'"
      [style.width]="width"
      [style.height]="height"
      [attr.aria-busy]="true"
      [attr.aria-label]="'Loading'"
      role="status"
    ></div>
  `,
})
export class SkeletonComponent {
  @Input() variant: SkeletonVariant = 'text';
  @Input() width = '100%';
  @Input() height = '1em';
}
