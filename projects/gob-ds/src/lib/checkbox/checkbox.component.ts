import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LucideAngularModule, Check, Minus } from 'lucide-angular';

@Component({
    standalone: true,
    selector: 'sf-checkbox',
    imports: [LucideAngularModule],
    templateUrl: './checkbox.component.html',
    styleUrl: './checkbox.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CheckboxComponent),
            multi: true,
        },
    ],
})
export class CheckboxComponent implements ControlValueAccessor {
    @Input() label = '';
    @Input() hint = '';
    @Input() disabled = false;

    /** Supports external control for "mixed" state */
    @Input() indeterminate = false;

    /** ✅ For your stories to work: [checked]="true" */
    @Input()
    get checked(): boolean {
        return this._checked;
    }
    set checked(val: boolean) {
        this._checked = !!val;
    }

    readonly Check = Check;
    readonly Minus = Minus;

    private _checked = false;
    isFocused = false;

    private onChange = (_: boolean) => { };
    private onTouched = () => { };

    get rootClasses(): string {
        return ['cb-root', this.disabled ? 'cb-root--disabled' : ''].filter(Boolean).join(' ');
    }

    get boxClasses(): string {
        return [
            'cb-box',
            (this._checked || this.indeterminate) ? 'cb-box--checked' : '',
            this.disabled ? 'cb-box--disabled' : '',
            this.isFocused ? 'cb-box--focused' : '',
        ].filter(Boolean).join(' ');
    }


    toggle(): void {
        if (this.disabled) return;

        if (this.indeterminate) {
            this.indeterminate = false;
            this._checked = true;
        } else {
            this._checked = !this._checked;
        }

        this.onChange(this._checked);
        this.onTouched();
    }

    onFocus(): void { this.isFocused = true; }
    onBlur(): void { this.isFocused = false; this.onTouched(); }

    // ControlValueAccessor
    writeValue(val: boolean): void {
        this._checked = !!val;
    }
    registerOnChange(fn: any): void { this.onChange = fn; }
    registerOnTouched(fn: any): void { this.onTouched = fn; }
    setDisabledState(is: boolean): void { this.disabled = is; }
}