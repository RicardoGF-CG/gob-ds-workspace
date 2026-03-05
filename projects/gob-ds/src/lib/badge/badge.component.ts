import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type BadgeVariant = 'success' | 'warning' | 'neutral' | 'default' | 'error';
export type BadgeSize = 'sm' | 'md';

@Component({
  standalone: true,
  selector: 'cg-badge',
  imports: [CommonModule],
  styleUrl: './badge.scss',
  template: `
    <span [class]="badgeClasses">
      <ng-content />
    </span>
  `,
})
export class BadgeComponent {
  @Input() variant: BadgeVariant = 'default';
  @Input() size: BadgeSize = 'md';

  get badgeClasses(): string {
    return `badge badge--${this.variant} badge--${this.size}`;
  }
}