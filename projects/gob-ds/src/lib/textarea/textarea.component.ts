import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';

@Component({
    standalone: true,
    selector: 'sf-textarea',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './textarea.component.html',
    styleUrl: './textarea.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextareaComponent),
            multi: true,
        },
    ],
})
export class TextareaComponent implements ControlValueAccessor {
    @Input() label = '';
    @Input() placeholder = '';
    @Input() hint = '';
    @Input() error = '';
    @Input() disabled = false;
    @Input() required = false;

    /** Number of visible rows */
    @Input() rows = 4;

    /** Character limit (0 = no limit) */
    @Input() maxlength = 0;

    /** Shows character counter (requires maxlength) */
    @Input() showCount = false;

    /** Resize control */
    @Input() resize: TextareaResize = 'vertical';

    value = '';
    isFocused = false;

    private onChange = (_: any) => { };
    private onTouched = () => { };

    private static nextId = 0;
    readonly textareaId = `sf-textarea-${TextareaComponent.nextId++}`;

    get hasError(): boolean {
        return !!this.error;
    }

    get wrapperClasses(): string {
        return [
            'input-wrapper',
            this.isFocused ? 'input-wrapper--focused' : '',
            this.hasError ? 'input-wrapper--error' : '',
            this.disabled ? 'input-wrapper--disabled' : '',
            `input-wrapper--resize-${this.resize}`,
        ].filter(Boolean).join(' ');
    }

    onInput(event: Event): void {
        const val = (event.target as HTMLTextAreaElement).value;
        this.value = val;
        this.onChange(val);
    }

    onFocus(): void { this.isFocused = true; }
    onBlur(): void { this.isFocused = false; this.onTouched(); }

    // ── ControlValueAccessor ──────────────────────────────────
    writeValue(val: string): void { this.value = val ?? ''; }
    registerOnChange(fn: any): void { this.onChange = fn; }
    registerOnTouched(fn: any): void { this.onTouched = fn; }
    setDisabledState(is: boolean): void { this.disabled = is; }
}