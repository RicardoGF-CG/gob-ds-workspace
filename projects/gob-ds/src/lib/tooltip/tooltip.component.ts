import {
  Component,
  Input,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

@Component({
  standalone: true,
  selector: 'sf-tooltip',
  imports: [CommonModule],
  styleUrl: './tooltip.scss',
  template: `
    <div
      class="tooltip-wrapper"
      (mouseenter)="show()"
      (mouseleave)="hide()"
      (focus)="show()"
      (blur)="hide()"
    >
      <ng-content />
      @if (visible && text) {
        <div
          class="tooltip"
          [class]="'tooltip tooltip--' + position"
          role="tooltip"
        >
          <span class="tooltip__content">{{ text }}</span>
          <span class="tooltip__arrow"></span>
        </div>
      }
    </div>
  `,
})
export class TooltipComponent {
  @Input() text = '';
  @Input() position: TooltipPosition = 'top';
  @Input() delay = 0;

  visible = false;
  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  show(): void {
    if (this.delay > 0) {
      this.timeoutId = setTimeout(() => (this.visible = true), this.delay);
    } else {
      this.visible = true;
    }
  }

  hide(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    this.visible = false;
  }
}
