import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'app-topbar',
    imports: [CommonModule],
    templateUrl: './topbar.component.html',
    styleUrl: './topbar.component.scss',
})
export class TopbarComponent {
    /** Título centrado — columna del medio */
    @Input() title = 'Sistema de Evaluación Individual del Desempeño';
}