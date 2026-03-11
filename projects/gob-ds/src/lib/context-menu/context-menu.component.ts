import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';

export interface ContextMenuItem {
  label: string;
  icon?: LucideIconData;
  disabled?: boolean;
  danger?: boolean;
  divider?: boolean;
}

@Component({
  standalone: true,
  selector: 'sf-context-menu',
  imports: [CommonModule, LucideAngularModule],
  styleUrl: './context-menu.scss',
  templateUrl: './context-menu.component.html',
})
export class ContextMenuComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly el = inject(ElementRef);

  @Input() items: ContextMenuItem[] = [];
  @Input() align: 'left' | 'right' = 'left';

  @Output() itemClick = new EventEmitter<ContextMenuItem>();

  isOpen = false;
  dropdownStyles: { [key: string]: string } = {};

  toggle(): void {
    if (!this.isOpen) {
      this.calculatePosition();
    }
    this.isOpen = !this.isOpen;
  }

  calculatePosition(): void {
    if (!this.isBrowser) return;

    const nativeEl = this.el.nativeElement as HTMLElement;
    const trigger = nativeEl.querySelector('.context-menu__trigger');
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    const space = 4; // Gap between trigger and dropdown

    // Estimate menu height: items (36px ea) + dividers (17px ea) + padding (8px)
    const estimatedHeight = 
      (this.items.filter(i => !i.divider).length * 36) + 
      (this.items.filter(i => i.divider).length * 17) + 
      8;

    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;

    const styles: { [key: string]: string } = {
      position: 'fixed',
      minWidth: '180px',
      zIndex: '1000',
    };

    // Collision detection: If not enough space below AND more space above
    if (spaceBelow < estimatedHeight && spaceAbove > spaceBelow) {
      styles['bottom'] = `${viewportHeight - rect.top + space}px`;
      styles['top'] = 'auto';
    } else {
      styles['top'] = `${rect.bottom + space}px`;
      styles['bottom'] = 'auto';
    }

    if (this.align === 'right') {
      styles['left'] = `${rect.right}px`;
      styles['transform'] = 'translateX(-100%)';
    } else {
      styles['left'] = `${rect.left}px`;
      styles['transform'] = 'none';
    }

    this.dropdownStyles = styles;
  }

  close(): void {
    this.isOpen = false;
  }

  onItemClick(item: ContextMenuItem): void {
    if (item.disabled || item.divider) return;
    this.itemClick.emit(item);
    this.close();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.isBrowser) return;
    if (!this.el.nativeElement.contains(event.target)) {
      this.close();
    }
  }

  @HostListener('window:scroll')
  @HostListener('window:resize')
  onWindowChange(): void {
    if (this.isOpen) {
      this.close();
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (!this.isBrowser || !this.isOpen) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      this.close();
    }
  }
}
