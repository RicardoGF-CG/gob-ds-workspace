import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

export type ModalSize = 'sm' | 'md' | 'lg';

@Component({
  standalone: true,
  selector: 'ds-modal',
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent implements OnChanges, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();

  @Input() title = '';
  @Input() size: ModalSize = 'md';
  @Input() closeOnOverlayClick = true;
  @Input() disableClose = false;

  @Output() closed = new EventEmitter<void>();

  @ViewChild('modalPanel', { static: false }) modalPanel?: ElementRef<HTMLElement>;

  private lastActiveElement: HTMLElement | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open']) {
      if (this.open) this.onOpen();
      else this.onClose();
    }
  }

  ngOnDestroy(): void {
    this.unlockScroll();
  }

  private onOpen(): void {
    if (!this.isBrowser) return;
    this.lastActiveElement = document.activeElement as HTMLElement | null;
    this.lockScroll();
  }

  private onClose(): void {
    if (!this.isBrowser) return;
    this.unlockScroll();
    queueMicrotask(() => {
      this.lastActiveElement?.focus?.();
    });
  }

  private lockScroll(): void {
    if (this.isBrowser) {
      document.documentElement.style.overflow = 'hidden';
    }
  }

  private unlockScroll(): void {
    if (this.isBrowser) {
      document.documentElement.style.overflow = '';
    }
  }

  requestClose(): void {
    if (this.disableClose) return;
    this.open = false;
    this.openChange.emit(false);
    this.closed.emit();
  }

  onOverlayClick(): void {
    if (!this.closeOnOverlayClick) return;
    this.requestClose();
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (!this.isBrowser || !this.open) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      this.requestClose();
      return;
    }

    if (event.key === 'Tab') {
      this.trapFocus(event);
    }
  }

  private trapFocus(event: KeyboardEvent): void {
    if (!this.isBrowser) return;

    const panel = this.modalPanel?.nativeElement;
    if (!panel) return;

    const focusables = Array.from(
      panel.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter(el => !el.hasAttribute('disabled') && !el.getAttribute('aria-disabled'));

    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement as HTMLElement | null;

    if (event.shiftKey) {
      if (!active || active === first) {
        event.preventDefault();
        last.focus();
      }
    } else {
      if (!active || active === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }
}
