import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { LucideAngularModule, Check, ChevronDown, Search, X, Loader2 } from 'lucide-angular';

export interface MultiSelectOption {
  label: string;
  value: any;
  disabled?: boolean;
}

@Component({
  standalone: true,
  selector: 'sf-multi-select',
  imports: [CommonModule, LucideAngularModule, FormsModule],
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectComponent),
      multi: true,
    },
  ],
})
export class MultiSelectComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = 'Seleccionar...';
  @Input() options: MultiSelectOption[] = [];
  @Input() disabled = false;
  @Input() loading = false;
  @Input() showSearch = true;
  @Input() required = false;
  @Input() searchPlaceholder = 'Buscar...';

  @Output() selectionChange = new EventEmitter<any[]>();

  @ViewChild('searchInput') searchInput?: ElementRef<HTMLInputElement>;

  value: any[] = [];
  isOpen = false;
  searchTerm = '';

  readonly checkIcon = Check;
  readonly chevronDownIcon = ChevronDown;
  readonly searchIcon = Search;
  readonly xIcon = X;
  readonly loaderIcon = Loader2;

  private onChange = (_: any) => {};
  private onTouched = () => {};

  constructor(private elementRef: ElementRef) {}

  get filteredOptions(): MultiSelectOption[] {
    if (!this.searchTerm) return this.options;
    return this.options.filter(opt =>
      opt.label.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get selectedOptions(): MultiSelectOption[] {
    return this.options.filter(opt => this.value.includes(opt.value));
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.close();
    }
  }

  toggleDropdown(): void {
    if (this.disabled || this.loading) return;
    this.isOpen ? this.close() : this.open();
  }

  open(): void {
    this.isOpen = true;
    if (this.showSearch) {
      setTimeout(() => this.searchInput?.nativeElement.focus(), 0);
    }
  }

  close(): void {
    this.isOpen = false;
    this.searchTerm = '';
  }

  selectOption(option: MultiSelectOption): void {
    if (option.disabled || this.disabled) return;
    
    const index = this.value.indexOf(option.value);
    if (index === -1) {
      this.value = [...this.value, option.value];
    } else {
      this.value = this.value.filter(v => v !== option.value);
    }
    
    this.onChange(this.value);
    this.selectionChange.emit(this.value);
  }

  removeOption(event: MouseEvent, val: any): void {
    event.stopPropagation();
    if (this.disabled) return;
    
    this.value = this.value.filter(v => v !== val);
    this.onChange(this.value);
    this.selectionChange.emit(this.value);
  }

  isSelected(option: MultiSelectOption): boolean {
    return this.value.includes(option.value);
  }

  onSearch(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
  }

  // ControlValueAccessor
  writeValue(val: any[]): void {
    this.value = val || [];
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
