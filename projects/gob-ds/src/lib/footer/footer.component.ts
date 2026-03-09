import {
    Component,
    Input,
    Output,
    EventEmitter,
    HostListener,
    ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ChevronDown } from 'lucide-angular';

export interface PolicyItem {
    label: string;
    id?: string;
    url?: string;
}

export type FooterMode = 'login' | 'app';

@Component({
    standalone: true,
    selector: 'app-footer',
    imports: [CommonModule, LucideAngularModule],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
})
export class FooterComponent {
    /** 'login' → muestra políticas como dropdown
     *  'app'   → muestra políticas como links inline */
    @Input() mode: FooterMode = 'login';

    @Input() policies: PolicyItem[] = [
        { label: 'Políticas de la Calidad y Gestión Ética', id: 'calidad' },
        {
            label: 'Política de Igualdad Laboral y No Discriminación para la Administración Pública del Estado de Guanajuato',
            id: 'igualdad',
        },
    ];

    @Output() policyClick = new EventEmitter<PolicyItem>();

    readonly ChevronDownIcon = ChevronDown;

    year = new Date().getFullYear();
    policiesOpen = false;

    /** true = dropdown abre hacia arriba, false = hacia abajo */
    dropdownOpenUp = true;

    constructor(private el: ElementRef) { }

    togglePolicies(event: MouseEvent): void {
        if (!this.policiesOpen) {
            this.calculateDropdownDirection(event.currentTarget as HTMLElement);
        }
        this.policiesOpen = !this.policiesOpen;
    }

    private calculateDropdownDirection(trigger: HTMLElement): void {
        const triggerRect = trigger.getBoundingClientRect();
        const dropdownEstimatedHeight = this.policies.length * 44 + 8; // altura aprox por item
        const spaceAbove = triggerRect.top;
        const spaceBelow = window.innerHeight - triggerRect.bottom;

        // Abre hacia arriba si hay espacio suficiente arriba,
        // o si hay menos espacio abajo que arriba
        this.dropdownOpenUp = spaceAbove >= dropdownEstimatedHeight || spaceAbove > spaceBelow;
    }

    onPolicyClick(policy: PolicyItem): void {
        this.policiesOpen = false;
        this.policyClick.emit(policy);
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(e: MouseEvent): void {
        if (!this.el.nativeElement.contains(e.target)) {
            this.policiesOpen = false;
        }
    }
}