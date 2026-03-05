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
  selector: 'ds-context-menu',
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

  toggle(): void {
    this.isOpen = !this.isOpen;
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

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (!this.isBrowser || !this.isOpen) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      this.close();
    }
  }
}
