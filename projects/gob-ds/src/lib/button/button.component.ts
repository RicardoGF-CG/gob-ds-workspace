import { Component, ElementRef, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Loader2 } from 'lucide-angular';
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonIconPosition = 'left' | 'right' | 'only';
export type ButtonAs = 'button' | 'a';

@Component({
    standalone: true,
    selector: 'sf-button',
    imports: [CommonModule, LucideAngularModule],
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss',
})
export class ButtonComponent {
    private readonly hostEl = inject(ElementRef<HTMLElement>);

    @Input() variant: ButtonVariant = 'primary';
    @Input() size: ButtonSize = 'md';
    @Input() disabled = false;
    @Input() loading = false;
    @Input() fullWidth = false;
    @Input() iconPosition: ButtonIconPosition | null = null;
    @Input() asTag: ButtonAs = 'button';
    @Input() icon: any = null;

    readonly Loader2 = Loader2;

    get hostClasses(): string {
        const classes = [
            'btn',
            `btn--${this.variant}`,
            `btn--${this.size}`,
            this.fullWidth ? 'btn--full' : '',
            this.iconPosition === 'only' ? 'btn--icon-only' : '',
            this.loading ? 'btn--loading' : '',
            this.disabled || this.loading ? 'btn--disabled' : '',
        ];
        return classes.filter(Boolean).join(' ');
    }

    // ✅ Takes classes from the host (Storybook) and passes them to the <button>/<a>
    get stateClasses(): string {
        const host = this.hostEl.nativeElement;
        const allowed = ['is-hover', 'is-active', 'is-focus'];
        return allowed.filter((c) => host.classList.contains(c)).join(' ');
    }

    get isDisabled(): boolean {
        return this.disabled || this.loading;
    }

    get showIconLeft(): boolean {
        return !!this.icon && this.iconPosition === 'left' && !this.loading;
    }

    get showIconRight(): boolean {
        return !!this.icon && this.iconPosition === 'right' && !this.loading;
    }

    get showIconOnly(): boolean {
        return !!this.icon && this.iconPosition === 'only' && !this.loading;
    }

    get iconSize(): number {
        return { sm: 14, md: 16, lg: 18 }[this.size];
    }
}