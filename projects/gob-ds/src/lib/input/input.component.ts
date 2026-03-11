import { Component, Input, forwardRef, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { LucideAngularModule, Eye, EyeOff } from 'lucide-angular';

@Component({
    standalone: true,
    selector: 'sf-input',
    imports: [LucideAngularModule, ReactiveFormsModule],
    templateUrl: './input.component.html',
    styleUrl: './input.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputComponent),
            multi: true,
        },
    ],
})
export class InputComponent implements ControlValueAccessor {
    @Input() label = '';
    @Input() placeholder = '';
    @Input() hint = '';
    @Input() error = '';
    @Input() type = 'text';
    @Input() disabled = false;
    @Input() prefixIcon: any = null;
    @Input() suffixIcon: any = null;
    @Input() required = false;

    readonly Eye = Eye;
    readonly EyeOff = EyeOff;

    value = '';
    isFocused = false;
    showPassword = signal(false);

    private onChange = (_: any) => { };
    private onTouched = () => { };

    private static nextId = 0;
    readonly inputId = `sf-input-${InputComponent.nextId++}`;

    get currentType(): string {
        if (this.type === 'password') {
            return this.showPassword() ? 'text' : 'password';
        }
        return this.type;
    }

    get isPassword(): boolean {
        return this.type === 'password';
    }

    get hasError(): boolean {
        return !!this.error;
    }

    get wrapperClasses(): string {
        return [
            'input-wrapper',
            this.isFocused ? 'input-wrapper--focused' : '',
            this.hasError ? 'input-wrapper--error' : '',
            this.disabled ? 'input-wrapper--disabled' : '',
            this.prefixIcon ? 'input-wrapper--has-prefix' : '',
            (this.suffixIcon || this.isPassword) ? 'input-wrapper--has-suffix' : '',
        ].filter(Boolean).join(' ');
    }

    togglePassword(): void {
        this.showPassword.update(v => !v);
    }

    onInput(event: Event): void {
        const val = (event.target as HTMLInputElement).value;
        this.value = val;
        this.onChange(val);
    }

    onFocus(): void { this.isFocused = true; }
    onBlur(): void { this.isFocused = false; this.onTouched(); }

    // ControlValueAccessor
    writeValue(val: string): void { this.value = val ?? ''; }
    registerOnChange(fn: any): void { this.onChange = fn; }
    registerOnTouched(fn: any): void { this.onTouched = fn; }
    setDisabledState(is: boolean): void { this.disabled = is; }
}