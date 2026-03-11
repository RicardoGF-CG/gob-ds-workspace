import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent, BreadcrumbItem } from '../breadcrumb/breadcrumb.component';

@Component({
  standalone: true,
  selector: 'sf-navigator',
  imports: [CommonModule, BreadcrumbComponent],
  templateUrl: './navigator.component.html',
  styleUrl: './navigator.scss',
})
export class NavigatorComponent {
  /** Items to display in the breadcrumb */
  @Input() items: BreadcrumbItem[] = [];
}
