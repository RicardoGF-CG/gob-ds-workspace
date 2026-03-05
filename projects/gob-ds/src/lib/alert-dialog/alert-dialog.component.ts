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
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type AlertDialogVariant = 'default' | 'destructive';

@Component({
  standalone: true,
  selector: 'ds-alert-dialog',
  imports: [CommonModule],
  templateUrl: './alert-dialog.component.html',
  styleUrl: './alert-dialog.component.scss',
})
export class AlertDialogComponent implements OnChanges, OnDestroy {
  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();

  @Input() title = 'Confirmar acción';
  @Input() description = '';
  @Input() variant: AlertDialogVariant = 'default';

  @Input() confirmText = 'Confirmar';
  @Input() cancelText = 'Cancelar';

  @Input() closeOnOverlayClick = true;
  @Input() disableClose = false;

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  @ViewChild('dialogPanel', { static: false }) dialogPanel?: ElementRef<HTMLElement>;
  @ViewChild('confirmBtn', { static: false }) confirmBtn?: ElementRef<HTMLButtonElement>;

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
    this.lastActiveElement = document.activeElement as HTMLElement | null;
    this.lockScroll();

    queueMicrotask(() => {
      this.confirmBtn?.nativeElement?.focus();
    });
  }

  private onClose(): void {
    this.unlockScroll();
    queueMicrotask(() => {
      this.lastActiveElement?.focus?.();
    });
  }

  private lockScroll(): void {
    document.documentElement.style.overflow = 'hidden';
  }

  private unlockScroll(): void {
    document.documentElement.style.overflow = '';
  }

  requestClose(): void {
    if (this.disableClose) return;
    this.openChange.emit(false);
  }

  onOverlayClick(): void {
    if (!this.closeOnOverlayClick) return;
    this.requestClose();
  }

  onCancel(): void {
    this.cancel.emit();
    this.requestClose();
  }

  onConfirm(): void {
    this.confirm.emit();
    this.requestClose();
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (!this.open) return;

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
    const panel = this.dialogPanel?.nativeElement;
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