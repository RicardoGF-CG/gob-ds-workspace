import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ChevronRight } from 'lucide-angular';

export interface BreadcrumbItem {
  label: string;
  url?: string;
}

@Component({
  standalone: true,
  selector: 'sf-breadcrumb',
  imports: [CommonModule, LucideAngularModule],
  styleUrl: './breadcrumb.scss',
  template: `
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <ol class="breadcrumb__list">
        @for (item of items; track item.label; let last = $last) {
          <li class="breadcrumb__item">
            @if (!last && item.url) {
              <a class="breadcrumb__link" [href]="item.url">{{ item.label }}</a>
            } @else if (!last) {
              <span class="breadcrumb__link">{{ item.label }}</span>
            } @else {
              <span class="breadcrumb__current" aria-current="page">{{ item.label }}</span>
            }
            @if (!last) {
              <lucide-icon class="breadcrumb__separator" [img]="chevronIcon" [size]="14" aria-hidden="true" />
            }
          </li>
        }
      </ol>
    </nav>
  `,
})
export class BreadcrumbComponent {
  @Input() items: BreadcrumbItem[] = [];

  readonly chevronIcon = ChevronRight;
}
