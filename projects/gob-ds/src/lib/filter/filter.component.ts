import { Component, Input, Output, EventEmitter, ElementRef, HostListener, ContentChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Plus, X, ChevronDown } from 'lucide-angular';

@Component({
  standalone: true,
  selector: 'ds-filter',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  @Input() label = '';
  @Input() active = false;
  @Input() activeLabel = '';
  
  @Output() apply = new EventEmitter<void>();
  @Output() reset = new EventEmitter<void>();
  @Output() clear = new EventEmitter<MouseEvent>();

  isOpen = false;

  readonly plusIcon = Plus;
  readonly xIcon = X;
  readonly chevronDownIcon = ChevronDown;

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as Node;
    if (!target.isConnected) return;
    if (!this.elementRef.nativeElement.contains(target)) {
      this.isOpen = false;
    }
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  onApply(): void {
    this.apply.emit();
    this.isOpen = false;
  }

  onReset(): void {
    this.reset.emit();
    this.isOpen = false;
  }

  onClear(event: MouseEvent): void {
    event.stopPropagation();
    this.clear.emit(event);
  }
}
