import {
    Component,
    Input,
    Output,
    EventEmitter,
    HostListener,
    ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, LogOut } from 'lucide-angular';

@Component({
    standalone: true,
    selector: 'app-profile-menu',
    imports: [CommonModule, LucideAngularModule],
    templateUrl: './profile-menu.component.html',
    styleUrl: './profile-menu.component.scss',
})
export class ProfileMenuComponent {
    @Input() name = '';
    @Input() role = '';
    @Input() avatarColor = '';

    @Output() logout = new EventEmitter<void>();

    readonly LogOutIcon = LogOut;
    isOpen = false;
    dropdownTop = 0;
    dropdownRight = 0;

    constructor(private el: ElementRef) { }

    get initials(): string {
        return this.name
            .split(' ')
            .slice(0, 2)
            .map(w => w[0]?.toUpperCase() ?? '')
            .join('');
    }

    toggle(): void {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            const rect = this.el.nativeElement.getBoundingClientRect();
            this.dropdownTop = rect.bottom + 8;
            // Alinea el borde derecho del dropdown con el borde derecho del avatar
            this.dropdownRight = window.innerWidth - rect.right;
        }
    }

    onLogout(): void {
        this.isOpen = false;
        this.logout.emit();
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(e: MouseEvent): void {
        if (!this.el.nativeElement.contains(e.target)) {
            this.isOpen = false;
        }
    }
}