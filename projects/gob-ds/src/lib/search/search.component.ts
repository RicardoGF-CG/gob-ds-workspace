import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LucideAngularModule, Search, X } from 'lucide-angular';

@Component({
  standalone: true,
  selector: 'sf-search',
  imports: [LucideAngularModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchComponent),
      multi: true,
    },
  ],
})
export class SearchComponent implements ControlValueAccessor {
  @Input() placeholder = 'Buscar...';
  @Input() disabled = false;

  @Output() search = new EventEmitter<string>();
  @Output() cleared = new EventEmitter<void>();

  readonly Search = Search;
  readonly X = X;

  value = '';
  isFocused = false;

  private onChange = (_: any) => { };
  private onTouched = () => { };

  get wrapperClasses(): string {
    return [
      'search-wrapper',
      this.isFocused ? 'search-wrapper--focused' : '',
      this.disabled ? 'search-wrapper--disabled' : '',
    ].filter(Boolean).join(' ');
  }

  get iconSize(): number {
    return 16;
  }

  onInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.value = val;
    this.onChange(val);
    this.search.emit(val);
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') this.search.emit(this.value);
    if (event.key === 'Escape') this.clear();
  }

  clear(): void {
    this.value = '';
    this.onChange('');
    this.cleared.emit();
    this.search.emit('');
  }

  onFocus(): void { this.isFocused = true; }
  onBlur(): void { this.isFocused = false; this.onTouched(); }

  writeValue(val: string): void { this.value = val ?? ''; }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState(is: boolean): void { this.disabled = is; }
}