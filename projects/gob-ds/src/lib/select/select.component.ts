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

export interface SelectOption {
  label: string;
  value: any;
  disabled?: boolean;
}

@Component({
  standalone: true,
  selector: 'sf-select',
  imports: [CommonModule, LucideAngularModule, FormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = 'Seleccionar...';
  @Input() options: SelectOption[] = [];
  @Input() disabled = false;
  @Input() loading = false;
  @Input() showSearch = false;
  @Input() required = false;
  @Input() searchPlaceholder = 'Buscar...';

  @Output() selectionChange = new EventEmitter<any>();

  @ViewChild('searchInput') searchInput?: ElementRef<HTMLInputElement>;

  value: any = null;
  isOpen = false;
  searchTerm = '';
  isFocused = false;

  readonly checkIcon = Check;
  readonly chevronDownIcon = ChevronDown;
  readonly searchIcon = Search;
  readonly xIcon = X;
  readonly loaderIcon = Loader2;

  private onChange = (_: any) => {};
  private onTouched = () => {};

  constructor(private elementRef: ElementRef) {}

  get filteredOptions(): SelectOption[] {
    if (!this.searchTerm) return this.options;
    return this.options.filter(opt =>
      opt.label.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get selectedOption(): SelectOption | undefined {
    return this.options.find(opt => opt.value === this.value);
  }

  get displayValue(): string {
    return this.selectedOption ? this.selectedOption.label : this.placeholder;
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

  selectOption(option: SelectOption): void {
    if (option.disabled || this.disabled) return;
    
    this.value = option.value;
    this.onChange(this.value);
    this.selectionChange.emit(this.value);
    this.close();
  }

  clearSelection(event: MouseEvent): void {
    event.stopPropagation();
    if (this.disabled) return;
    
    this.value = null;
    this.onChange(this.value);
    this.selectionChange.emit(this.value);
  }

  onSearch(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
  }

  // ControlValueAccessor
  writeValue(val: any): void {
    this.value = val;
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
